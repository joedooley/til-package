import * as React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Spinner from './spinner';

const base = ({ theme, isLoading }) => css`
  align-items: center;
  appearance: none;
  background-color: ${theme.colors.green.primary};
  border: none;
  box-shadow: ${theme.shadows.small};
  border-radius: ${theme.radii[2]};
  color: ${theme.colors.white.primary};
  cursor: ${isLoading ? 'not-allowed' : 'pointer'};
  display: flex;
  font-size: ${theme.fontSizes[2]};
  font-weight: ${theme.fontWeights.bold};
  justify-content: center;
  line-height: ${theme.lineHeights.default};
  outline-color: ${theme.colors.green.primary};
  padding: ${theme.space[1]} ${theme.space[3]};
  transition: background-color 300ms ease-in-out, color 150ms linear;

  &:active,
  &:focus,
  &:hover {
    background-color: ${theme.colors.green.secondary};
  }

  &:visited {
    outline-width: 1px;
  }

  &:disabled,
  &:disabled:hover {
    background: ${theme.colors.grey.primary};
    color: ${theme.colors.grey.disabledText};
    cursor: not-allowed;
  }
`;

let dynamicStyle = ({ theme, variant }) => {
  if (variant === 'warning') {
    return css`
      background-color: ${theme.colors.red.primary};
      outline-color: ${theme.colors.red.primary};

      &:active,
      &:focus,
      &:hover {
        background-color: ${theme.colors.red.secondary};
      }
    `;
  }

  if (variant === 'outline') {
    return css`
      background-color: ${theme.colors.white.primary};
      border: ${theme.borders[1]} ${theme.colors.green.primary};
      color: ${theme.colors.green.primary};
      padding: 5px 11px;

      &:active,
      &:focus,
      &:hover {
        background-color: ${theme.colors.green.primary};
        color: ${theme.colors.white.primary};
      }
    `;
  }

  if (variant === 'unstyled') {
    return css`
      appearance: none;
      background-color: transparent;
      border-color: transparent;
      box-shadow: none;
      margin: 0;
      padding: 0;

      &:active,
      &:focus,
      &:hover {
        background-color: transparent;
        border-color: transparent;
        outline-color: ${theme.colors.grey.border};
      }
    `;
  }
};

const StyledComponent = styled(motion.button)`
  ${base}
  ${dynamicStyle}
`;

const buttonVariants = (variant, disabled) => {
  if (disabled || variant === 'outline' || variant === 'unstyled') {
    return {
      hover: { scale: 1 },
      pressed: { scale: 1 },
      rest: { scale: 1 },
    };
  }

  return {
    hover: clicked => ({
      scale: clicked ? 1 : 1.05,
    }),
    pressed: {
      scale: 0.95,
    },
    rest: {
      scale: 1,
    },
  };
};

const Button = React.forwardRef(
  (
    {
      ariaLabel,
      role = 'button',
      type = 'button',
      disabled,
      loading,
      onClick,
      onKeyDown,
      children,
      variant = 'primary',
      ...rest
    },
    ref
  ) => {
    const [clicked, setClicked] = React.useState(false);
    const handleClick = React.useCallback(() => {
      setClicked(true);
      if (typeof onClick === `function`) {
        return onClick();
      }
    }, [onClick]);

    const label = !disabled && loading ? <Spinner /> : children;
    const variants = buttonVariants(variant, disabled);

    return (
      <StyledComponent
        {...rest}
        ref={ref}
        aria-label={ariaLabel}
        role={role}
        type={type}
        disabled={disabled}
        isLoading={!disabled && loading}
        variant={variant}
        initial="rest"
        whileHover="hover"
        whileTap="pressed"
        variants={variants}
        custom={clicked}
        onClick={handleClick}
        onKeyDown={onKeyDown}
      >
        {label}
      </StyledComponent>
    );
  }
);

Button.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  role: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'outline', 'warning', 'unstyled']),
};

Button.displayName = 'Button';

export default Button;
