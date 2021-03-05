import { useRouter } from 'next/router';
import useDialog from '@hooks/useDialog';
import AuthDialog from '@components/auth/dialog.js';

export default function Login(props) {
  const router = useRouter();
  const [isOpen, toggleDialog] = useDialog(router.pathname === '/login');

  return isOpen ? (
    <AuthDialog {...props} isOpen={isOpen} onClose={toggleDialog} heading="Login to your account" />
  ) : null;
}

Login.propTypes = {};
