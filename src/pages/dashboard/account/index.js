import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Flex } from '@components/core/html';
import EditUsernameForm from '@components/dashboard/account/username';
import EditDisplayNameForm from '@components/dashboard/account/displayName';
import EditPhoneForm from '@components/dashboard/account/email';
import DeleteUser from '@components/dashboard/account/deleteUser';

export default function AccountPage(props) {
  return (
    <Flex
      className={props.className}
      direction="column"
      vAlign="flex-start"
      css={theme => css`
        width: 100%;
        & > section {
          margin-bottom: ${theme.space[5]};
        }
      `}
    >
      <EditUsernameForm />
      <EditDisplayNameForm />
      <EditPhoneForm />
      <DeleteUser />
    </Flex>
  );
}

AccountPage.propTypes = {
  className: PropTypes.string,
};
