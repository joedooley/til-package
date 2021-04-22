import { searchUsers } from '@lib/db/service/user';

export default async function searchUsersHandler(req, res) {
  if (req.method !== 'GET') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to GET',
      },
    });
  }

  const query = req.query?.s || '';

  if (query === '') {
    return res.json({ data: [] });
  }

  await searchUsers(query)
    .then(response => res.json({ data: response }))
    .catch(error => {
      console.log(`searchUsers error`, JSON.stringify(error));

      return res.status(404).json({
        code: error.code || 'api/not_found',
        message: error.message || 'Resource not found',
      });
    });
}
