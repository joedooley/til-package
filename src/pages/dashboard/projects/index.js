import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { getCollection } from '@lib/firebase/db-admin.js';
import { Flex, Button } from '@components/core/html';
import useDialog from '@hooks/useDialog';
import CreatePostPanel from '@components/dashboard/panels/create-post';
import EmptyState from '@components/dashboard/empty-state';

export default function Projects({ initialData, ...rest }) {
  const [data, setData] = React.useState(initialData);
  const [isOpen, togglePanel] = useDialog();

  const content = React.useMemo(
    () => ({
      heading: 'Add a project',
      button: {
        ariaLabel: 'Click button to start adding content',
        label: 'Create Project',
      },
    }),
    []
  );

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
          onClick={() => {}}
          css={theme => css`
            margin-top: ${theme.space[5]};
          `}
        >
          New Project
        </Button>
      ) : (
        <EmptyState onActionClick={togglePanel} content={content} />
      )}

      {isOpen && <CreatePostPanel onCancel={togglePanel} />}
    </Flex>
  );
}

export async function getStaticProps() {
  const { entries } = await getCollection('project');

  return {
    props: {
      initialData: entries,
    },
    revalidate: 1,
  };
}

Projects.propTypes = {
  initialData: PropTypes.array.isRequired,
};
