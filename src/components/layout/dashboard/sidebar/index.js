import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { SkipNavLink } from '@components/core/skip-nav';
import { Flex, Text, Heading } from '@components/core/html';
import Menu from '@components/core/menu/list';

const InnerWrap = styled(Flex)``;

const SiteTitle = styled(Heading)`
  margin-bottom: 0;
`;

const NavHeading = styled(Text)(
  ({ theme }) => css`
    color: ${theme.colors.black[700]};
    font-family: ${theme.fonts.heading};
    margin-bottom: 0;
    padding-bottom: ${theme.space[2]};
    padding-left: ${theme.space[2]};
    padding-top: ${theme.space[2]};
    text-align: left;
  `
);

const NavSection = styled('div')(
  ({ theme }) => css`
    margin-bottom: 20px;
    margin-top: 20px;

    li {
      padding-bottom: ${theme.space[2]};
      padding-left: ${theme.space[2]};
      padding-top: ${theme.space[2]};

      &:hover {
        background-color: rgb(15, 15, 15);
      }

      a {
        color: hsla(0, 0%, 88%, 100%);
        font-family: ${theme.fonts.heading};
        font-size: ${theme.fontSizes[3]};
        line-height: 21px;

        &:hover,
        &:focus {
          color: hsla(0, 0%, 88%, 100%);
        }
      }
    }
  `
);

const NavWrap = styled('div')(
  ({ theme }) => css`
    padding-left: ${theme.space[2]};
    padding-right: ${theme.space[2]};
    width: 100%;

    ${NavSection} {
      border-bottom: ${theme.borders.secondary};
    }
  `
);

const Aside = styled('aside')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    min-height: 100vh;
    min-width: 271px;

    & > * {
      position: sticky;
      top: 0;
    }

    header {
      border-bottom: ${theme.borders.secondary};
      padding: 15px 0 15px 25px;
      place-self: flex-start;
      width: 100%;

      ${SiteTitle} {
        color: hsla(0, 0%, 100%, 100%);
        margin-bottom: 0;
        text-align: left;
      }
    }
  `
);

const items = [
  {
    heading: 'Projects',
    items: [
      {
        href: '/dashboard/projects',
        value: 'All Projects',
      },
    ],
  },
  {
    heading: 'Organizations',
    items: [
      {
        href: '/dashboard/orgs',
        value: 'Content Board',
      },
    ],
  },
  {
    heading: 'Account',
    items: [
      {
        href: '/dashboard/account',
        value: 'Edit Profile',
      },
      {
        href: '#',
        value: 'Logout',
      },
    ],
  },
  {
    heading: 'Documentation',
    items: [
      {
        href: '/docs/guides',
        value: 'Guides',
      },
      {
        href: '/docs/api',
        value: 'API Reference',
      },
    ],
  },
];

export default function Sidebar({ siteTitle, ...rest }) {
  return (
    <Aside className={rest.className}>
      <InnerWrap direction="column" vAlign="flex-start">
        <Flex as="header">
          <SkipNavLink />
          <SiteTitle level={4}>{siteTitle}</SiteTitle>
        </Flex>

        <NavWrap>
          {items.map(item => (
            <NavSection key={item.heading}>
              <NavHeading>{item.heading}</NavHeading>
              <Menu items={item.items} />
            </NavSection>
          ))}
        </NavWrap>
      </InnerWrap>
    </Aside>
  );
}

Sidebar.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};
