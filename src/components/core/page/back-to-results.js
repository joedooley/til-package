import * as React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import ArrowIcon from 'public/assets/icons/arrows/left.svg';

const base = ({ theme }) => css`
  align-items: center;
  display: flex;

  svg {
    margin-right: ${theme.space[1]};
  }

  a {
    font-weight: ${theme.fontWeights.medium};
    font-size: ${theme.fontSizes[3]};
    line-height: ${theme.lineHeights.default};
  }
`;

const StyledLink = styled('p')`
  ${base}
`;

export default function BackToResults({ label, href, ...rest }) {
  return (
    label &&
    href && (
      <StyledLink {...rest}>
        <ArrowIcon />
        <Link href={href}>{label}</Link>
      </StyledLink>
    )
  );
}

BackToResults.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
};
