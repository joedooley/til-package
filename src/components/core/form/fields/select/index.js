import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useSelect } from 'downshift';
import { useFormContext, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import Field from '../field';
import Icon from 'public/assets/icons/table/down-arrow.svg';

const Button = styled.button(
  ({ theme, isOpen, isPlaceholder }) => css`
    align-items: center;
    background: ${theme.colors.text};
    border: ${theme.borders.primary};
    border-radius: ${theme.radii[2]};
    color: ${theme.colors.text};
    display: flex;
    font-size: ${theme.fontSizes[2]};
    justify-content: space-between;
    line-height: 20px;
    margin-bottom: ${isOpen ? '3px' : 0};
    padding: 6px 8px;
    width: 100%;

    span {
      opacity: ${isPlaceholder ? 0.5 : 1};
    }
  `
);

const DownArrowIcon = styled(Icon)(
  ({ theme }) => css`
    path {
      fill: ${theme.colors.text};
      stroke: ${theme.colors.text};
    }
  `
);

const MenuContainer = styled.div`
  background: transparent;
  position: relative;
`;

const Menu = styled.ul(
  ({ theme }) => css`
    background: ${theme.colors.text};
    border-radius: ${theme.radii[2]};
    border-top: 0;
    list-style: none;
    margin: 0;
    max-height: 150px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
  `
);

const Item = styled(motion.li)(
  ({ theme, isSelected, isHighlighted }) => css`
    background: ${isHighlighted ? theme.colors.brand.primary : theme.colors.text};
    color: ${isSelected ? theme.colors.brand.primary : theme.colors.text};
    cursor: pointer;
    font-size: ${theme.fontSizes[4]};
    font-weight: ${isSelected ? theme.fontWeights.bold : theme.fontWeights.normal};
    line-height: ${theme.lineHeights.default};
    padding: 4px ${theme.space[3]};

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

const itemToString = item => (item ? item.name : '');

const BaseSelect = React.forwardRef(({ name, label, options, ...rest }, ref) => {
  const { setValue, getValues } = useFormContext();
  const inputValue = rest.value || getValues()[name];

  const {
    isOpen,
    getLabelProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    selectedItem,
    highlightedIndex,
  } = useSelect({
    items: options,
    initialSelectedItem: inputValue,
    itemToString: item => itemToString(item),
    inputValue: itemToString(rest.value),
  });

  React.useEffect(() => {
    if (selectedItem) {
      setValue(name, selectedItem, { shouldValidate: true, shouldDirty: true });
    }
  }, [selectedItem, name, setValue]);

  const buttonText = selectedItem?.name ?? rest.placeholder;

  return (
    <Field {...getLabelProps({ name, label, required: rest.required, className: rest.className })}>
      <Button
        name={name}
        {...getToggleButtonProps({
          isOpen,
          id: rest.id,
          className: 'toggle-button',
          type: 'button',
          isPlaceholder: typeof rest.value === 'string',
        })}
      >
        <span>{buttonText}</span>
        <DownArrowIcon />
      </Button>

      <MenuContainer>
        <Menu {...getMenuProps({ ref })}>
          <AnimatePresence initial={false}>
            {isOpen &&
              options.map((item, index) => (
                <Item
                  key={`${item.name}-${index}`}
                  {...getItemProps({
                    item,
                    index,
                    isSelected: selectedItem === item.name,
                    isHighlighted: highlightedIndex === index,
                  })}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <motion.div
                    key={`${item.name}-${index}`}
                    variants={{ open: { x: 0 }, collapsed: { x: 5 } }}
                    transition={{ duration: 0.4 }}
                    css={css`
                      transform-origin: top center;
                    `}
                  >
                    {itemToString(item)}
                  </motion.div>
                </Item>
              ))}
          </AnimatePresence>
        </Menu>
      </MenuContainer>
    </Field>
  );
});

export default function Select({ name, label, options, ...rest }) {
  return <Controller name={name} label={label} as={BaseSelect} options={options} {...rest} />;
}

BaseSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
};

BaseSelect.displayName = 'BaseSelect';

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};
