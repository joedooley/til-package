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
    padding-left: 34px;

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
  ({ theme, isHighlighted, notFound }) => css`
    background: ${isHighlighted ? theme.colors.black[600] : theme.colors.black[500]};
    color: ${theme.colors.text};
    cursor: ${!notFound ? 'pointer' : 'not-allowed'};
    font-size: ${theme.fontSizes[3]};
    font-weight: ${theme.fontWeights.normal};
    line-height: ${theme.lineHeights.default};
    padding: ${theme.space[1]} ${theme.space[3]};
    padding-bottom: ${notFound && theme.space[3]};
    padding-top: ${notFound && theme.space[3]};
    width: 100%;

    &:hover {
      background: ${!notFound ? theme.colors.black[600] : theme.colors.black[500]};
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

const Typeahead = React.forwardRef((props, ref) => {
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

  const {
    isOpen,
    getLabelProps,
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
            if (inputValue.length > 0 && response.data.length === 0) {
              setInputItems([]);
              return setNotFound(true);
            }

            setInputItems(
              response.data.filter(item => itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase()))
            );

            setNotFound(false);
          })
          .catch(error => setState({ loading: false, error: error.message }));
      }
    },
  });

  return (
    <div
      css={theme => css`
        position: relative;
      `}
    >
      <label {...getLabelProps()}>Search by username:</label>
      <Wrapper {...getComboboxProps()}>
        <UserIcon />
        <Input
          {...getInputProps({
            ref,
            refKey: 'ref',
            ...props,
          })}
        />

        {state.loading && <Spinner />}

        {selectedItem && (
          <ToggleButton
            type="button"
            tabIndex={-1}
            onClick={() => reset()}
            ariaLabel="Clear selection"
            variant="unstyled"
          >
            <ClearIcon />
          </ToggleButton>
        )}
      </Wrapper>

      <Menu isOpen={isOpen} {...getMenuProps()}>
        {notFound && (
          <Item notFound={notFound} {...getItemProps({ index: 0, disabled: true })}>
            Could not find account. Has the user already signed up?
          </Item>
        )}
        {!isOpen
          ? null
          : inputItems.map((item, index) => (
              <Item
                key={`${item?.username}${index}`}
                {...getItemProps({
                  item,
                  index,
                  isHighlighted: highlightedIndex === index,
                })}
              >
                <p>{item?.username}</p>
                <p>
                  {item.displayName && <span>{`${item.displayName} • `}</span>}
                  <span>Invite member</span>
                </p>
              </Item>
            ))}
      </Menu>
    </div>
  );
});

Typeahead.displayName = 'Typeahead';

Typeahead.propTypes = {};

export default Typeahead;
