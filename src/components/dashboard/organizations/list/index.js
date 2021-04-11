import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { mq } from '@styles/utils';
import { Flex, Link, Text } from '@components/core/html';

export default function OrganizationsList({ items, ...rest }) {
  return (
    <Flex
      {...rest}
      css={mq({
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: ['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)'],
        width: '100%',
      })}
    >
      {items.map(x => (
        <Link
          key={x.id}
          href={`/dashboard/organizations/${x.id}`}
          css={theme => css`
            background-color: rgb(42, 42, 42);
            border: 2px solid transparent;
            border-radius: 2px;
            box-shadow: ${theme.shadows.modal};
            height: 8rem;
            padding: ${theme.space[4]};
            grid-column: span 1 / span 1;
            &:hover {
              border: 2px solid ${theme.colors.brand.primary};
            }
          `}
        >
          <Flex
            css={css`
              align-items: flex-start;
              flex-direction: column;
              width: 100%;
            `}
          >
            <Text
              css={theme => css`
                color: rgb(224, 224, 224);
                font-size: ${theme.fontSizes[5]};
                font-weight: ${theme.fontWeights.semiBold};
                margin-bottom: ${theme.space[2]};
                text-align: left;
              `}
            >
              {x.name}
            </Text>

            <Text
              css={theme => css`
                font-size: ${theme.fontSizes[1]};
              `}
            >
              {x.role}
            </Text>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
}

OrganizationsList.propTypes = {
  items: PropTypes.array,
};
