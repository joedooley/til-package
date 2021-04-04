import * as React from 'react';
import { useRouter } from 'next/router';
import useDialog from '@hooks/useDialog';
import LoginDialog from '@components/auth/dialogs/login';

export default function Login(props) {
  const router = useRouter();
  const [isOpen, toggleDialog] = useDialog(router.pathname === '/login');

  return isOpen ? <LoginDialog {...props} isOpen={isOpen} onClose={toggleDialog} router={router} /> : null;
}

Login.propTypes = {};
