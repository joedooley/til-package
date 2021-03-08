import * as React from 'react';
import { useRouter } from 'next/router';
import useDialog from '@hooks/useDialog';
import AuthDialog from '@components/auth/dialog';

export default function Login(props) {
  const router = useRouter();
  const [isOpen, toggleDialog] = useDialog(router.pathname === '/login');
  const handleClose = React.useCallback(() => {
    toggleDialog();
    router.push('/');
  }, [router, toggleDialog]);

  return isOpen ? <AuthDialog {...props} isOpen={isOpen} onClose={handleClose} router={router} /> : null;
}

Login.propTypes = {};
