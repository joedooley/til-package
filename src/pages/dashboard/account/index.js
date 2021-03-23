import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import { Flex } from '@components/core/html';
import useForm from '@components/dashboard/forms/account/profile/useForm';
import EditProfileForm from '@components/dashboard/forms/account/profile';

export async function getServerSideProps(context) {
  if (!context.req.cookies.session) {
    console.log('Missing session cookie. Redirecting to the login page');

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default function AccountPage({ user, ...rest }) {
  const { methods, handleSubmit, handleReset, isDirty } = useForm(user);

  return (
    <Flex
      className={rest.className}
      direction="column"
      vAlign="flex-start"
      css={css`
        width: 100%;
      `}
    >
      <FormProvider {...methods}>
        <EditProfileForm onSubmit={handleSubmit} onReset={handleReset} isDirty={isDirty} />
      </FormProvider>
    </Flex>
  );
}

AccountPage.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
  }),
  errorCode: PropTypes.number,
};
