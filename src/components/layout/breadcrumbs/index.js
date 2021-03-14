import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Flex, Text, Link, Heading } from '@components/core/html';
import RightArrow from 'public/assets/icons/arrows/right.svg';

const BreadcrumbsWrap = styled(Flex)(
  ({ theme }) => css`
    place-self: flex-start;

    svg {
      color: ${theme.colors.black[700]};
    }
  `
);

const Crumb = styled(Link)(
  ({ theme }) => css`
    color: ${theme.colors.black[700]};
    font-size: ${theme.fontSizes[1]};
    line-height: 1.25rem;
    padding: ${theme.space[1]} ${theme.space[2]};
  `
);

const LastCrumb = styled.p(
  ({ theme }) => css`
    color: ${theme.colors.black[700]};
    font-size: ${theme.fontSizes[1]};
    line-height: 1.25rem;
    margin-bottom: 0;
  `
);

export default function Breadcrumbs({ siteTitle, ...rest }) {
  return (
    <BreadcrumbsWrap className={rest.className}>
      <Crumb href="/dashboard/projects">{siteTitle}</Crumb>
      <RightArrow />
      <LastCrumb>Projects</LastCrumb>
    </BreadcrumbsWrap>
  );
}

Breadcrumbs.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};
