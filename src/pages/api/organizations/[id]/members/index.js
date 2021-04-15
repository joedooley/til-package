import { getOrgMembers } from '@lib/db/service/organization';

export default async function getOrgMembersHandler(req, res) {
  if (req.method !== 'GET') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to GET',
      },
    });
  }

  console.log(`req.query`, req.query);

  const id = req.query.id;

  await getOrgMembers(id)
    .then(response => res.status(200).json({ data: response.entries }))
    .catch(error => {
      console.log(`getOrgMembers error`, JSON.stringify(error));

      return res.status(404).json({
        code: error.code || 'api/not_found',
        message: error.message || 'Resource not found',
      });
    });
}
