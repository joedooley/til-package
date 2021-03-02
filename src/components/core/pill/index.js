import * as React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const base = ({ theme }) => css`
  align-items: center;
  background-color: ${theme.colors.green.primary};
  border-radius: ${theme.radii[5]};
  box-shadow: 0 1px 2px #dde4e7;
  color: ${theme.colors.white.primary};
  display: flex;
  font-size: ${theme.fontSizes[0]};
  font-weight: ${theme.fontWeights.normal};
  justify-content: center;
  line-height: ${theme.lineHeights.default};
  overflow: hidden;
  padding: 2px 10px;
  white-space: nowrap;

  &:hover {
    background-color: ${theme.colors.green.secondary};
  }
`;

const StyledPill = styled(motion.span)`
  ${base}
`;

export default function Pill({ children, ...rest }) {
  return (
    <StyledPill whileHover={{ backgroundColor: '#014727' }} transition={{ duration: 0.3 }} {...rest}>
      {children}
    </StyledPill>
  );
}

Pill.propTypes = {
  children: PropTypes.node,
};
