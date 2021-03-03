import { useAuth } from '@lib/firebase/auth';
import LoginButtons from '@components/auth/login-buttons';

export default function Index() {
  const auth = useAuth();

  return auth.user ? (
    <div>
      <p>Testing deploy</p>
      <p>Email: {auth.user.email}</p>
      <button onClick={e => auth.signout()}>Sign Out</button>
    </div>
  ) : (
    <LoginButtons />
  );
}
