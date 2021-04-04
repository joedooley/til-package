import { setSessionCookies } from '@lib/firebase/auth/server';

export default async function logout(req, res) {
  if (req.method !== 'POST') {
    res.status(401).json({ data: 'Invalid HTTP method' });
  }

  const sessionCookies = setSessionCookies('', '', 0);

  res.setHeader('Set-Cookie', sessionCookies);
  res.status(201).json({ data: 'success' });
}