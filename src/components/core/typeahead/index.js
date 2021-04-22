/* eslint-disable react/jsx-key */
import * as React from 'react';
import { useCombobox } from 'downshift';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { client } from '@util/api-client';
import { Button } from '@components/core/html';
import UserIcon from 'public/assets/icons/user.svg';
import ClearIcon from 'public/assets/icons/clear-icon.svg';
import Spinner from '@components/core/html/button/spinner';

const Wrapper = styled.div(
  ({ theme }) => css`
    margin-bottom: ${theme.space[3]};
    position: relative;
    width: 100%;

    & > svg {
      color: ${theme.colors.white};
      position: absolute;
      right: ${theme.space[2]};
      top: 50%;
      transform: translateY(-50%);

      &:first-of-type {
        left: ${theme.space[2]};
      }
    }
  `
);

const Input = styled.input(
  ({ theme }) => css`
    border-radius: ${theme.radii[2]};
    padding: 6px 10px 6px 36px;

    &:focus {
      border: ${theme.borders.primary};
      outline: none;
    }
  `
);

const ToggleButton = styled(Button)(
  ({ theme }) => css`
    position: absolute;
    top: 50%;
    right: ${theme.space[2]};
    transform: translateY(-50%);
  `
);

const Menu = styled('ul')(
  ({ theme, isOpen }) => css`
    box-shadow: ${isOpen ? theme.shadows.menu : 'none'};
    border-radius: ${theme.radii[2]};
    list-style: none;
    margin: 0;
    max-height: 15rem;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
  `
);

const Item = styled('li')(
  ({ theme, isHighlighted, notFound, isMember }) => css`
    background: ${isHighlighted ? theme.colors.black[600] : theme.colors.black[500]};
    color: ${theme.colors.text};
    cursor: ${isMember || notFound ? 'not-allowed' : 'pointer'};
    font-size: ${theme.fontSizes[3]};
    font-weight: ${theme.fontWeights.normal};
    line-height: ${theme.lineHeights.default};
    padding: ${theme.space[1]} ${theme.space[3]};
    padding-bottom: ${notFound && theme.space[3]};
    padding-top: ${notFound && theme.space[3]};
    width: 100%;

    &:hover {
      background: ${isMember || notFound ? theme.colors.black[500] : theme.colors.black[600]};
    }

    p {
      margin-bottom: 0;

      &:first-of-type {
        color: ${theme.colors.white};
        font-size: ${theme.fontSizes[3]};
        line-height: ${theme.lineHeights.default};
      }

      &:last-of-type {
        color: ${theme.colors.textlight};
        font-size: ${theme.fontSizes[1]};
        line-height: 20px;
      }
    }
  `
);

const Typeahead = React.forwardRef(({ onChange, currentMembers, ...rest }, ref) => {
  const cancelToken = React.useRef(null);
  const [state, setState] = React.useState({ data: undefined, loading: false, error: false });
  const [inputItems, setInputItems] = React.useState([]);
  const [notFound, setNotFound] = React.useState(false);

  const getUsers = React.useCallback(query => {
    setState({ data: undefined, loading: true, error: false });

    return client(`/api/users?s=${query}`).then(response => {
      setState({ loading: false, error: false });

      return response;
    });
  }, []);

  const itemToString = React.useCallback(item => (item ? item.username : ''), []);

  const currentMembersIds = currentMembers.map(member => member.uid);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    selectedItem,
    getItemProps,
    reset,
  } = useCombobox({
    items: inputItems,
    itemToString,
    onInputValueChange: ({ inputValue }) => {
      if (!state.loading) {
        getUsers(inputValue)
          .then(response => {
            if (response.data.length > 0) {
              setNotFound(false);
              setInputItems(
                response.data.filter(item => itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase()))
              );

              return;
            }

            if (inputValue.length > 0) {
              setNotFound(true);
              setInputItems([]);
            }

            if (inputValue.length === 0) {
              setNotFound(false);
              setInputItems([]);
            }
          })
          .catch(error => setState({ loading: false, error: error.message }));
      }
    },
  });

  React.useEffect(() => {
    onChange(selectedItem);

    return () => onChange(selectedItem);
  }, [onChange, selectedItem]);

  return (
    <div
      className={rest.className}
      css={css`
        position: relative;
      `}
    >
      <Wrapper {...getComboboxProps()}>
        <UserIcon />
        <Input
          {...getInputProps({
            ref,
            refKey: 'ref',
            ...rest,
          })}
        />

        {state.loading && <Spinner />}

        {selectedItem && !state.loading && (
          <ToggleButton
            type="button"
            tabIndex={-1}
            onClick={() => {
              reset();
              setNotFound(false);
            }}
            ariaLabel="Clear selection"
            variant="unstyled"
          >
            <ClearIcon />
          </ToggleButton>
        )}
      </Wrapper>

      <Menu isOpen={isOpen} {...getMenuProps()}>
        {notFound && selectedItem === null && (
          <Item notFound={notFound} {...getItemProps({ index: 0, disabled: true })}>
            Could not find account. Has the user already signed up?
          </Item>
        )}
        {!isOpen
          ? null
          : inputItems.map((item, index) => {
              const isMember = currentMembersIds.includes(item.uid);

              return (
                <Item
                  isMember={isMember}
                  key={`${item?.username}${index}`}
                  {...getItemProps({
                    item,
                    index,
                    isHighlighted: highlightedIndex === index,
                    disabled: isMember,
                  })}
                >
                  <p>{item?.username}</p>
                  <p>
                    {item.displayName && <span>{`${item.displayName} • `}</span>}
                    <span>{isMember ? 'Already in this organization' : 'Invite member'}</span>
                  </p>
                </Item>
              );
            })}
      </Menu>
    </div>
  );
});

Typeahead.displayName = 'Typeahead';

Typeahead.propTypes = {
  onChange: PropTypes.func,
  currentMembers: PropTypes.array,
};

export default Typeahead;
