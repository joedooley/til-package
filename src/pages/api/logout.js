export default async function logout(req, res) {
  res.setHeader('Set-Cookie', 'session=; Path=/; Max-Age=0; HttpOnly');
  res.setHeader('Location', '/');
  res.status(302).end();
}
