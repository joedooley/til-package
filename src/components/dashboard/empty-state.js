import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Flex, Text, Button, Heading } from '@components/core/html';

export default function EmptyState(props) {
  return (
    <Flex
      direction="column"
      css={theme => css`
        background-color: ${theme.colors.black[400]};
        box-shadow: ${theme.shadows.modal};
        padding: 130px 20px;
        width: 100%;
      `}
    >
      <Heading level={2}>You haven&apos;t added any content.</Heading>
      <Text>Welcome. Let&apos;s get started</Text>

      <Button
        ariaLabel="Click button to start adding content"
        variant="outline"
        css={theme => css`
          padding-left: ${theme.space[5]};
          padding-right: ${theme.space[5]};
        `}
      >
        Add Content
      </Button>
    </Flex>
  );
}

EmptyState.propTypes = {};
