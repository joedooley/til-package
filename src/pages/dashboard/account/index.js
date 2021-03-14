import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import { isAuthenticated } from '@lib/firebase/db-admin.js';
import { Flex, Button } from '@components/core/html';
import useForm from '@components/dashboard/forms/account/profile/useForm';
import EditProfileForm from '@components/dashboard/forms/account/profile';

export default function AccountPage({ user, ...rest }) {
  const { methods, handleSubmit } = useForm(user);

  return (
    <Flex
      direction="column"
      vAlign="flex-start"
      className={rest.className}
      css={css`
        width: 100%;
      `}
    >
      <FormProvider {...methods}>
        <EditProfileForm />
      </FormProvider>

      <Button onClick={() => {}} ariaLabel="Click button to update your profile">
        Cancel
      </Button>

      <Button onClick={handleSubmit} ariaLabel="Click button to update your profile">
        Save
      </Button>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const user = await isAuthenticated(context);

  return {
    props: {
      user,
    },
  };
}

AccountPage.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    authTime: PropTypes.number.isRequired,
    photoUrl: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
  }),
};
