import * as React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { css } from '@emotion/react';
import { Flex, Button, Heading } from '@components/core/html';

export default function EmptyState({ onActionClick, heading, btnLabel, ...rest }) {
  return (
    <Flex
      className={rest.className}
      direction="column"
      css={theme => css`
        background-color: ${theme.colors.black[400]};
        box-shadow: ${theme.shadows.modal};
        padding: 130px 20px;
        width: 100%;
      `}
    >
      <Image src="/assets/images/content-structure.svg" height="200" width="200" />

      <Heading
        level={2}
        css={theme => css`
          margin-top: ${theme.space[5]};
        `}
      >
        {heading}
      </Heading>

      <Button
        onClick={onActionClick}
        ariaLabel="Click button to add new content"
        variant="outline"
        css={theme => css`
          padding-left: ${theme.space[5]};
          padding-right: ${theme.space[5]};
        `}
      >
        {btnLabel}
      </Button>
    </Flex>
  );
}

EmptyState.propTypes = {
  onActionClick: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  btnLabel: PropTypes.string.isRequired,
};
