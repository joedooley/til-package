import * as React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const SiteHeader = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.colors.green.gradients.dark};
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: space-between;
  padding: 10px 25px;
`;

const SiteTitle = styled.h1(
  ({ theme }) => css`
    color: ${theme.colors.white.primary};
  `
);

export default function Header() {
  return (
    <SiteHeader>
      <Link href="/" passHref>
        <SiteTitle>TIL</SiteTitle>
      </Link>
    </SiteHeader>
  );
}
