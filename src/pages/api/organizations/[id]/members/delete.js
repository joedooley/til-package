import { deleteMembers } from '@lib/db/service/member';

export default async function deleteOrgMembersHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to POST',
      },
    });
  }

  const orgId = req.body.orgId;
  const ids = req.body.ids;

  await deleteMembers(orgId, ids)
    .then(response => res.status(200).json({ data: response }))
    .catch(error => {
      console.log(`deleteMembers error`, JSON.stringify(error));

      return res.status(405).json({
        code: error.code || 'server/unknown_error',
        message: error.message,
      });
    });
}
