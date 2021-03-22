import { getUser } from '@lib/firebase/db-admin';
import { validateCookie } from '@lib/firebase/auth/server';

export default async function getCurrentUser(req, res) {
  if (req.method !== 'GET') {
    res.status(401).json({ data: 'Invalid HTTP method' });
  }

  await validateCookie(req.cookies.session)
    .then(({ uid }) => getUser(uid))
    .then(response => {
      const { user } = response;

      res.status(200).json({ data: { user } });
    })
    .catch(error => {
      console.error(`validateCookie error:`, JSON.stringify(error));
      res.status(401).json({ data: 'validateCookie error' });
    });
}
