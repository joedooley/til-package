import { getOrganization } from '@lib/firebase/db-admin';

export default async function getHandler(req, res) {
  if (req.method !== 'GET') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to GET',
      },
    });
  }

  const id = req.query.id;

  await getOrganization(id)
    .then(response => res.status(200).json({ ...response }))
    .catch(error => {
      console.log(`getOrganization error`, JSON.stringify(error));

      return res.status(404).json({
        code: error.code || 'api/not_found',
        message: error.message || 'Resource not found',
      });
    });
}