import * as React from 'react';
import { useRouter } from 'next/router';
import { FormProvider } from 'react-hook-form';
import { Flex, Text, Heading, Link } from '@components/core/html';
import Form from '@components/core/form';
import LoginConfirmationForm from '@components/auth/forms/confirmation';

export default function LoginConfirmation(props) {
  const router = useRouter();

  return <LoginConfirmationForm />;
}

LoginConfirmation.propTypes = {};
