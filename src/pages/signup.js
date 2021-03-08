import { useRouter } from 'next/router';
import useDialog from '@hooks/useDialog';
import AuthDialog from '@components/auth/dialog';

export default function Signup(props) {
  const router = useRouter();
  const [isOpen, toggleDialog] = useDialog(router.pathname === '/signup');

  return isOpen ? <AuthDialog {...props} isOpen={isOpen} onClose={toggleDialog} router={router} /> : null;
}

Signup.propTypes = {};
