import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { client } from '@util/api-client';
import { Flex, Text, Button, Heading } from '@components/core/html';
import Dialog from '@components/core/dialog';
import Typeahead from '@components/core/typeahead';
import KeyIcon from 'public/assets/icons/key.svg';
import ClearIcon from 'public/assets/icons/clear-icon.svg';

export default function CreateOrgMemberDialog({ isOpen, onClose, currentMembers, organization, mutate, ...rest }) {
  const [activeItem, setActiveItem] = React.useState(null);

  const handleMemberInvite = React.useCallback(() => {
    const orgId = organization.id;

    return client(`/api/organizations/${orgId}/members/create`, {
      body: { org: organization, user: activeItem },
    })
      .then(() => {
        mutate();
        onClose();
      })
      .catch(error => console.error(error));
  }, [organization, activeItem, mutate, onClose]);

  return (
    isOpen && (
      <Dialog {...rest} onClose={onClose} ariaLabel="Dialog with form to create an organization" width="475px">
        <Flex
          as="header"
          css={theme => css`
            color: ${theme.colors.white};
            flex-direction: column;

            h3 {
              font-size: 18px;
              font-weight: ${theme.fontWeights.medium};
              line-height: 25px;
              margin-bottom: ${theme.space[3]};
              margin-top: 25px;
            }
          `}
        >
          <KeyIcon height="42" width="42" />
          <Heading level={3}>Invite a member to organization</Heading>
        </Flex>

        {activeItem === null ? (
          <Typeahead placeholder="search by username" onChange={setActiveItem} currentMembers={currentMembers} />
        ) : (
          <Flex
            css={theme => css`
              align-items: center;
              background-color: rgb(197, 241, 221);
              border-radius: 6px;
              justify-content: space-between;
              padding: ${theme.space[1]} ${theme.space[3]};

              & > div {
                align-items: flex-start;
                flex-direction: column;
              }

              p {
                margin-bottom: 0;

                &:first-of-type {
                  font-weight: ${theme.fontWeights.semiBold};
                }

                &:last-of-type {
                  font-weight: ${theme.fontWeights.light};
                }
              }

              p,
              span {
                color: rgb(16, 99, 62);
              }

              button {
                padding: 6px 10px;

                &:hover {
                  background-color: rgba(44, 156, 106, 0.25);
                }
              }

              svg {
                stroke: rgb(36, 180, 126);
                stroke-width: 2;
              }
            `}
          >
            <Flex>
              <Text>{activeItem?.username}</Text>
              <Text>
                {activeItem.displayName && <span>{`${activeItem.displayName} • `}</span>}
                <span>Invite member</span>
              </Text>
            </Flex>

            <Button type="button" ariaLabel="Clear selection" variant="unstyled" onClick={() => setActiveItem(null)}>
              <ClearIcon height="24" width="24" />
            </Button>
          </Flex>
        )}

        <Flex
          as="footer"
          css={css`
            justify-content: center;
            margin-top: 20px;
            width: 100%;

            button {
              font-size: 13px;
              padding: 6px 10px;
              width: 100%;
            }
          `}
        >
          <Button
            disabled={activeItem === null}
            onClick={handleMemberInvite}
            ariaLabel="Click button to invite a member to your organization"
          >
            {activeItem === null ? 'Select a member above' : `Add ${activeItem.username} to organization`}
          </Button>
        </Flex>
      </Dialog>
    )
  );
}

CreateOrgMemberDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  currentMembers: PropTypes.array,
  organization: PropTypes.object,
  mutate: PropTypes.func,
};
