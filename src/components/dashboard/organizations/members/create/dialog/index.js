import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Box, Flex, Text, Button, Heading, Spacer } from '@components/core/html';
import Dialog from '@components/core/dialog';
import Typeahead from '@components/core/typeahead';

export default function CreateOrgMemberDialog({ id, isOpen, onClose, ...rest }) {
  return (
    isOpen && (
      <Dialog {...rest} onClose={onClose} ariaLabel="Dialog with form to create an organization" width="475px">
        <Box as="header">
          <Heading
            level={3}
            css={css`
              margin-bottom: 25px;
            `}
          >
            New Organization Member
          </Heading>

          <Text>Invite users to create an account and join your organization.</Text>
        </Box>

        <Typeahead placeholder="Search by username" />

        <Flex
          as="footer"
          css={css`
            justify-content: center;
            margin-top: 30px;
            width: 100%;
          `}
        >
          <Button onClick={onClose} variant="warning" ariaLabel="Click button to cancel">
            Cancel
          </Button>

          <Spacer x={4} />

          <Button onClick={() => {}} ariaLabel="Click button to invite a member to your organization">
            Save
          </Button>
        </Flex>
      </Dialog>
    )
  );
}

CreateOrgMemberDialog.propTypes = {
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
