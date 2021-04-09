import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { getCollection } from '@lib/firebase/db-admin';
import { Flex, Button } from '@components/core/html';
import useDialog from '@hooks/useDialog';
import CreatePostPanel from '@components/dashboard/panels/create-post';
import EmptyState from '@components/dashboard/empty-state';

export async function getStaticProps() {
  const { entries } = await getCollection('post');

  return {
    props: { initialData: entries },
  };
}

export default function ProjectsPage({ initialData, ...rest }) {
  const [data, setData] = React.useState(initialData);
  const [isOpen, togglePanel] = useDialog();

  console.log(`data`, data);

  return (
    <Flex
      direction="column"
      vAlign="flex-start"
      className={rest.className}
      css={css`
        width: 100%;
      `}
    >
      {data.length ? (
        <Button
          ariaLabel="Click button to add a new project"
          onClick={togglePanel}
          css={theme => css`
            margin-top: ${theme.space[5]};
          `}
        >
          New Project
        </Button>
      ) : (
        <EmptyState onActionClick={togglePanel} heading="Add a project" btnLabel="Create project" />
      )}

      {isOpen && <CreatePostPanel onCancel={togglePanel} />}
    </Flex>
  );
}

ProjectsPage.propTypes = {
  initialData: PropTypes.array,
};
