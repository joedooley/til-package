import * as React from 'react';
import { css } from '@emotion/react';
import { Flex } from '@components/core/html';
import useDialog from '@hooks/useDialog';
import PageTitle from '@components/core/page/title';
import CreatePostPanel from '@components/dashboard/panels/create-post';
import EmptyState from '@components/dashboard/empty-state';

export default function Dashboard(props) {
  const [isOpen, togglePanel] = useDialog();

  return (
    <Flex
      direction="column"
      vAlign="flex-start"
      css={css`
        width: 100%;
      `}
    >
      <PageTitle {...props} value="Dashboard" />
      <EmptyState onActionClick={togglePanel} />
      {isOpen && <CreatePostPanel onCancel={togglePanel} />}
    </Flex>
  );
}
