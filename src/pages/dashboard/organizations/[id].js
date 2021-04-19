import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { useOrganizations } from '@hooks/useOrganizations';
import { useOrgMembers } from '@hooks/useOrgMembers';
import { Flex, Heading, Spacer } from '@components/core/html';
import EditOrganization from '@components/dashboard/organizations/edit';
import DeleteOrganization from '@components/dashboard/organizations/delete';
import OrganizationTabs from '@components/dashboard/organizations/tabs';
import OrgMembersTable from '@components/dashboard/organizations/members';

export default function OrganizationPage(props) {
  const router = useRouter();
  const { data: organization, loading, error } = useOrganizations(router.query?.id);
  const { members } = useOrgMembers(organization?.id);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <pre>
        <code>{JSON.stringify(error)}</code>
      </pre>
    );
  }

  return (
    <Flex
      direction="column"
      vAlign="flex-start"
      className={props.className}
      css={css`
        width: 100%;
      `}
    >
      <Heading
        level={1}
        css={theme => css`
          color: ${theme.colors.white};
          font-size: 25px;
          font-weight: ${theme.fontWeights.semiBold};
        `}
      >
        {`${organization.name} settings`}
      </Heading>

      <OrganizationTabs
        tab1={
          <Flex
            css={css`
              align-items: flex-start;
              flex-direction: column;
              justify-content: flex-start;
            `}
          >
            <EditOrganization />

            <Spacer y="20px" />

            <DeleteOrganization />
          </Flex>
        }
        tab2={<OrgMembersTable id={organization?.id} data={members} />}
      />
    </Flex>
  );
}

OrganizationPage.propTypes = {
  className: PropTypes.string,
};
