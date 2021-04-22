import { createMember } from '@lib/db/service/member';

export default async function createOrgMemberHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to POST',
      },
    });
  }

  const org = req.body.org;
  const user = req.body.user;

  await createMember(org, user)
    .then(response => res.status(200).json({ data: response }))
    .catch(error => {
      console.log(`createMember error`, JSON.stringify(error));

      return res.status(405).json({
        code: error.code || 'server/unknown_error',
        message: error.message,
      });
    });
}
