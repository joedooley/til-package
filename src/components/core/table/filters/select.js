import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { sortBy } from 'lodash';
import { useSelect } from 'downshift';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'public/assets/icons/table/down-arrow.svg';

const StyledSelect = styled.div`
  position: relative;
`;

const Button = styled.button(
  ({ theme, isOpen }) => css`
    align-items: center;
    background: ${theme.colors.text};
    border: none;
    color: ${theme.colors.brand.hover};
    cursor: pointer;
    display: flex;
    font-size: ${theme.fontSizes[1]};
    line-height: 18px;
    margin-bottom: ${isOpen ? '3px' : 0};
    outline: none;
    padding: 0;
    width: 100%;

    &:focus,
    &:active,
    &:hover {
      border: none;
      outline: none;
    }
  `
);

const DownArrowIcon = styled(Icon)(
  ({ theme }) => css`
    margin-left: 3px;

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
  ({ theme, isOpen }) => css`
    background: ${theme.colors.text};
    border: ${isOpen && theme.borders.primary};
    border-radius: ${theme.radii[2]};
    box-shadow: ${theme.shadows.menu};
    list-style: none;
    margin: 0;
    max-height: 150px;
    min-width: ${isOpen && '170px'};
    outline: none;
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
    background: ${isHighlighted || isSelected ? theme.colors.brand.primary : theme.colors.text};
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

export default function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id }, ...rest }) {
  const options = React.useMemo(() => {
    const options = new Set();

    options.add('All');

    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });

    return sortBy([...options.values()]);
  }, [id, preFilteredRows]);

  const { isOpen, getToggleButtonProps, getMenuProps, getItemProps, selectedItem, highlightedIndex } = useSelect({
    items: options,
    initialSelectedItem: filterValue,
    onStateChange: e => {
      const actions = [
        '__item_click__',
        '__menu_keydown_arrow_down__',
        '__menu_keydown_enter__',
        '__togglebutton_keydown_character__',
      ];

      if (actions.includes(e.type)) {
        if (e.selectedItem === 'All') {
          setFilter('');

          return;
        }

        setFilter(e.selectedItem || '');
      }
    },
  });

  React.useEffect(() => {
    if (!filterValue || filterValue === 'All') {
      setFilter('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledSelect id={id} className={rest.className}>
      <Button
        {...getToggleButtonProps({
          isOpen,
          id: `toggle-button--${id}`,
          className: 'toggle-button',
          'aria-labelledby': id,
          type: 'button',
          suppressRefError: true,
        })}
      >
        <span>{selectedItem || 'All'}</span>
        <DownArrowIcon />
      </Button>

      <MenuContainer className="container">
        <Menu className="menu" isOpen={isOpen} {...getMenuProps({ id: `menu--${id}`, 'aria-labelledby': id })}>
          <AnimatePresence initial={false}>
            {isOpen &&
              options.map((item, index) => (
                <Item
                  key={`${item}-${index}`}
                  {...getItemProps({
                    item,
                    index,
                    isSelected: selectedItem === item,
                    isHighlighted: highlightedIndex === index,
                  })}
                  initial="collapsed"
                  animate="open"
                  exit="exit"
                  variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0.5, height: 0 },
                    exit: { height: 0 },
                  }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <motion.div
                    key={`${item}-${index}`}
                    variants={{ open: { x: 0 }, collapsed: { x: 5 } }}
                    transition={{ duration: 0.4 }}
                    css={css`
                      transform-origin: top center;
                    `}
                  >
                    {item}
                  </motion.div>
                </Item>
              ))}
          </AnimatePresence>
        </Menu>
      </MenuContainer>
    </StyledSelect>
  );
}

SelectColumnFilter.propTypes = {
  column: PropTypes.object,
};
