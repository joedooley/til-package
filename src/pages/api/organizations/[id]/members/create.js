import { createOrganization } from '@lib/db/service/organization';

export default async function createMemberHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to POST',
      },
    });
  }

  const uid = req.cookies.uid;
  const data = req.body.data;

  await createOrganization(data, uid)
    .then(response => res.status(200).json({ data: response }))
    .catch(error => {
      console.log(`createOrganization error`, JSON.stringify(error));

      return res.status(405).json({
        code: error.code || 'server/unknown_error',
        message: error.message,
      });
    });
}
