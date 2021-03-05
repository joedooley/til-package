import * as React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const base = ({ theme }) => css`
  align-items: center;
  background-color: ${theme.colors.brand.primary};
  border: none;
  border-radius: ${theme.radii[2]};
  color: ${theme.colors.text};
  display: inline-flex;
  font-size: ${theme.fontSizes[0]};
  font-weight: ${theme.fontWeights.bold};
  justify-content: center;
  line-height: 14px;
  outline: none;
  padding: 4px ${theme.space[1]};
  white-space: nowrap;
`;

const variantStyles = ({ theme, value }) => {
  if (value === 'Pending') {
    return css`
      background-color: transparent;
      border: ${theme.borders[1]} ${theme.colors.orange.primary};
      color: ${theme.colors.orange.primary};

      &:active,
      &:focus,
      &:hover {
        background-color: ${theme.colors.orange.primary};
        color: ${theme.colors.text};
      }
    `;
  }

  if (value === 'Approved') {
    return css`
      background-color: ${theme.colors.blue.primary};

      &:active,
      &:focus,
      &:hover {
        background-color: ${theme.colors.blue.primary};
      }
    `;
  }

  if (value === 'Published') {
    return css`
      background-color: ${theme.colors.brand.focus};

      &:active,
      &:focus,
      &:hover {
        background-color: ${theme.colors.brand.focus};
      }
    `;
  }
};

const StyledChip = styled(motion.span)`
  ${base}
  ${variantStyles}
`;

export default function Chip({ value, ...rest }) {
  return (
    <StyledChip value={value} {...rest}>
      {value}
    </StyledChip>
  );
}

Chip.propTypes = {
  value: PropTypes.oneOf(['Pending', 'Approved', 'Published']),
};
