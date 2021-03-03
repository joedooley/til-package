import { useAuth } from '@lib/firebase/auth';

export default function Index() {
  const auth = useAuth();

  console.log(`auth`, auth);

  return auth.user ? (
    <div>
      <p>Testing deploy</p>
      <p>Email: {auth.user.email}</p>
      <button onClick={e => auth.signout()}>Sign Out</button>
    </div>
  ) : (
    <button onClick={e => auth.signinWithGitHub()}>Sign In</button>
  );
}
