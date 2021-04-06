import * as React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Spinner from './spinner';

const base = ({ theme, isLoading }) => css`
  align-items: center;
  appearance: none;
  background-color: ${theme.colors.brand.primary};
  border: none;
  box-shadow: none;
  border-radius: ${theme.radii[2]};
  color: ${theme.colors.white};
  cursor: ${isLoading ? 'not-allowed' : 'pointer'};
  display: flex;
  font-size: ${theme.fontSizes[2]};
  font-weight: ${theme.fontWeights.bold};
  justify-content: center;
  line-height: ${theme.lineHeights.default};
  outline: none;
  padding: ${theme.space[2]} ${theme.space[4]};
  transition: background-color 300ms ease-in-out, color 150ms linear;

  &:hover {
    background-color: ${theme.colors.brand.hover};
  }

  &:focus {
    background-color: ${theme.colors.brand.focus};
  }

  &:disabled,
  &:disabled:hover {
    background: ${theme.colors.disabled.bg};
    color: ${theme.colors.disabled.text};
    cursor: not-allowed;
  }
`;

let dynamicStyle = ({ theme, variant, inverted }) => {
  if (variant === 'warning') {
    return css`
      background-color: ${theme.colors.error.primary};
      outline-color: none;

      &:hover {
        background-color: ${theme.colors.error.hover};
      }

      &:focus {
        background-color: ${theme.colors.error.focus};
      }
    `;
  }

  if (variant === 'outline') {
    return css`
      background-color: transparent;
      border: ${inverted ? theme.borders.dark : theme.borders.primary};
      border-radius: ${theme.radii[6]};
      color: ${inverted ? theme.colors.white : theme.colors.brand.primary};
      padding: 11px;

      &:hover {
        background-color: ${theme.colors.brand.hover};
        border: ${inverted && theme.borders.transparent};
        color: ${theme.colors.white};
      }

      &:focus {
        background-color: ${theme.colors.brand.focus};
        border: ${inverted && theme.borders.transparent};
        border-radius: 30px;
        color: ${theme.colors.white};
      }
    `;
  }

  if (variant === 'unstyled') {
    return css`
      appearance: none;
      background-color: transparent;
      border: none;
      box-shadow: none;
      margin: 0;
      padding: 0;

      &:focus,
      &:hover {
        background-color: transparent;
        border: none;
        outline-color: ${theme.colors.brand.focus};
      }
    `;
  }
};

const StyledComponent = styled(motion.button)`
  ${base}
  ${dynamicStyle}
`;

const buttonVariants = (variant, disabled) => {
  if (disabled || variant === 'unstyled') {
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
      inverted,
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
        inverted={inverted}
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
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'outline', 'warning', 'unstyled']),
  inverted: PropTypes.bool,
};

Button.displayName = 'Button';

export default Button;
