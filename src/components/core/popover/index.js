import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Popover as BasePopover } from 'react-tiny-popover';
import { Flex, Button } from '@components/core/html';
import useDialog from '@hooks/useDialog';
import DotsIcon from 'public/assets/icons/dots.svg';

const StyledButton = styled(Button)(
  ({ theme }) => css`
    border: ${theme.borders.secondary};
    border-radius: ${theme.radii[2]};
    padding: 10px;

    &:hover,
    &:focus {
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.white};
      color: #000;
    }
  `
);

const StyledPopover = styled.div(
  ({ theme }) => css`
    align-items: flex-start;
    background-color: ${theme.colors.black[400]};
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.5) 0px 10px 15px -3px, rgba(0, 0, 0, 0.25) 0px 4px 6px -2px;
    border-radius: 6px;
    color: ${theme.colors.text};
    flex-direction: column;
    padding: 0;
  `
);

export default function Popover({ children, align, positions, ...rest }) {
  const [isOpen, toggle] = useDialog();
  const buttonRef = React.useRef(null);

  return (
    <BasePopover
      isOpen={isOpen}
      content={<StyledPopover {...rest}>{children}</StyledPopover>}
      onClickOutside={toggle}
      align={align}
      positions={positions}
      padding={6}
    >
      <StyledButton
        ref={buttonRef}
        variant="unstyled"
        ariaLabel="Click button for additional table actions"
        onClick={toggle}
      >
        <DotsIcon />
      </StyledButton>
    </BasePopover>
  );
}

Popover.propTypes = {
  children: PropTypes.node,
  align: PropTypes.oneOf(['start', 'center', 'end']),
  positions: PropTypes.arrayOf(PropTypes.string),
};
