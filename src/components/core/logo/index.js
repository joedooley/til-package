import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from '@components/core/html';
import Image from 'next/image';
import { css } from '@emotion/react';
import { Flex } from '@components/core/html';

const SiteTitle = styled(Flex)(
  ({ theme }) => css`
    cursor: pointer;
    align-self: flex-start;

    h1 {
      color: ${theme.colors.text};
      font-size: ${theme.fontSizes[5]};
      margin-bottom: 0;
      margin-left: 0.5rem;
    }
  `
);

export default function Logo({ className }) {
  return (
    <Link href="/" passHref className={className}>
      <SiteTitle>
        <Image src="/assets/icons/logo/small.svg" height="30" width="30" />
        <h1>til</h1>
      </SiteTitle>
    </Link>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};
