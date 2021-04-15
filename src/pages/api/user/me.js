import { getUser } from '@lib/db/service/user';
import { validateCookie, setSessionCookies } from '@lib/firebase/auth/server';

export default async function getCurrentUser(req, res) {
  if (req.method !== 'GET') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to GET',
      },
    });
  }

  if (!req.cookies.session) {
    return res.status(501).json({
      error: {
        code: 'server/unauthorized',
        message: 'Unauthorized',
      },
    });
  }

  await validateCookie(req.cookies.session)
    .then(({ uid }) => getUser(uid))
    .then(response => res.status(200).json({ data: { ...response.user } }))
    .catch(error => {
      console.error(`validateCookie error:`, JSON.stringify(error));

      res.setHeader('Set-Cookie', setSessionCookies('', '', 0));
      res.status(403).json(error);
    });
}
