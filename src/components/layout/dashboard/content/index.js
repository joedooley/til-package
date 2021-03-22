import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useUser } from '@components/auth/user';
import { Flex } from '@components/core/html';
import { SkipNavContent } from '@components/core/skip-nav';
import Breadcrumbs from '../../breadcrumbs';

export default function Content({ children, siteTitle, ...rest }) {
  const { user, loading, error } = useUser();

  return (
    <article
      className={rest.className}
      css={theme => css`
        align-content: flex-start;
        border-left: ${theme.borders.secondary};
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: 100%;
      `}
    >
      <Flex
        css={theme => css`
          border-bottom: ${theme.borders.secondary};
          padding: ${theme.space[2]};
        `}
      >
        <Breadcrumbs siteTitle={siteTitle} />
      </Flex>

      <SkipNavContent />
      <Flex
        css={theme => css`
          padding: ${theme.space[4]};
          width: 100%;
        `}
      >
        {loading && <p>Loading...</p>}
        {error && <p>{JSON.stringify(error)}</p>}

        {user &&
          React.Children.map(children, child =>
            React.createElement(child.type, {
              ...child.props,
              user,
            })
          )}
      </Flex>
    </article>
  );
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
  siteTitle: PropTypes.string.isRequired,
};
