/* eslint-disable react/jsx-key */
import * as React from 'react';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import Field from '@components/core/form/fields/field/index.js';
import SearchIcon from 'public/assets/icons/search.svg';
import ClearIcon from 'public/assets/icons/clear-icon.svg';

const Wrapper = styled.div(
  ({ theme }) => css`
    border-radius: ${theme.radii[5]};
    box-shadow: ${theme.shadows.large};
    position: relative;
    width: 100%;
  `
);

const Input = styled.input(
  ({ theme }) => css`
    border: none;
    border-radius: ${theme.radii[5]};
    &:focus {
      border: none;
      outline: none;
    }
  `
);

const ToggleButton = styled('button')(
  ({ theme }) => css`
    background-color: ${theme.colors.text};
    border: none;
    cursor: pointer;
    display: flex;
    padding: 0;
    place-content: center;
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
  `
);

const Menu = styled('ul')(
  ({ theme, isOpen }) => css`
    background: ${theme.colors.text};
    border: ${isOpen ? '1px solid #ced4da' : 'none'};
    border-color: ${isOpen ? theme.colors.text : 'none'};
    border-top: 0;
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
  ({ theme, isSelected, isHighlighted }) => css`
    background: ${isHighlighted ? theme.colors.brand.primary : theme.colors.text};
    color: ${isSelected ? theme.colors.brand.primary : theme.colors.text};
    cursor: pointer;
    font-size: ${theme.fontSizes[4]};
    font-weight: ${isSelected ? theme.fontWeights.bold : theme.fontWeights.normal};
    line-height: ${theme.lineHeights.default};
    padding: 4px ${theme.space[3]};
    transition: opacity 0.1s ease;
    &:first-of-type {
      padding-top: ${theme.space[1]};
    }
    &:last-of-type {
      padding-bottom: ${theme.space[1]};
    }
    &:hover {
      background: ${theme.colors.brand.primary};
    }
  `
);

const itemToString = item => {
  // @TODO Revisit this to make sure it's bug free.
  if (typeof item === 'string') {
    return item;
  }

  return item ? `${item.title} (${item.format.name})` : '';
};

const Autocomplete = React.forwardRef(({ name, label, onChange, items = [], ...rest }, ref) => {
  const [currentItem, setCurrentItem] = React.useState();
  const { setValue } = useFormContext();

  React.useEffect(() => {
    if (currentItem) {
      setValue(name, currentItem, { shouldValidate: true, shouldDirty: true });
    }
  }, [currentItem, name, setValue]);

  return (
    <Downshift
      inputValue={itemToString(rest.value)}
      itemToString={item => itemToString(item)}
      onStateChange={e => {
        onChange(e.inputValue || '');
        setCurrentItem(e.selectedItem || '');
      }}
    >
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        getLabelProps,
        getToggleButtonProps,
        getMenuProps,
        isOpen,
        clearSelection,
        openMenu,
        inputValue,
        selectedItem,
        highlightedIndex,
        toggleMenu,
      }) => (
        <Field {...getLabelProps({ name, label, required: rest.required })}>
          <Wrapper {...getRootProps({ name }, { suppressRefError: true })}>
            <Input
              placeholder={rest.placeholder}
              {...getInputProps({ name, className: `input ${rest.className}`, onFocus: openMenu, ref: ref })}
            />
            {selectedItem ? (
              <ToggleButton aria-label="Click icon to clear selection" onClick={clearSelection}>
                <ClearIcon />
              </ToggleButton>
            ) : (
              <ToggleButton {...getToggleButtonProps()} aria-label="Click icon to toggle menu" onClick={toggleMenu}>
                <SearchIcon />
              </ToggleButton>
            )}
          </Wrapper>

          <div
            css={css`
              background: transparent;
              position: relative;
            `}
          >
            <Menu isOpen={isOpen} {...getMenuProps()}>
              {isOpen
                ? items
                    .filter(item => !inputValue || item.title.toLowerCase().includes(inputValue))
                    .map((item, index) => {
                      return (
                        <Item
                          {...getItemProps({
                            key: item.title,
                            index,
                            item,
                            isSelected: selectedItem === item,
                            isHighlighted: highlightedIndex === index,
                          })}
                        >
                          {item.title}
                        </Item>
                      );
                    })
                : null}
            </Menu>
          </div>
        </Field>
      )}
    </Downshift>
  );
});

Autocomplete.displayName = 'Autocomplete';

Autocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default Autocomplete;
