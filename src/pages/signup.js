import { useRouter } from 'next/router';
import useDialog from '@hooks/useDialog';
import LoginDialog from '@components/auth/dialogs/login';

export default function Signup(props) {
  const router = useRouter();
  const [isOpen, toggleDialog] = useDialog(router.pathname === '/signup');

  return isOpen ? <LoginDialog {...props} isOpen={isOpen} onClose={toggleDialog} router={router} /> : null;
}

Signup.propTypes = {};
