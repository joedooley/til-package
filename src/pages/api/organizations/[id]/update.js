import { updateOrganization } from '@lib/db/service/organization';

export default async function updateOrgHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to POST',
      },
    });
  }

  if (!req.cookies.uid || !req.cookies.session) {
    return res.status(402).json({
      error: {
        code: 'server/unauthenticated_request',
        message: 'Unauthenticated user',
      },
    });
  }

  const uid = req.cookies.uid;
  const id = req.query.id;
  const data = req.body.data;

  await updateOrganization(uid, id, data)
    .then(response => res.status(200).json({ data: response }))
    .catch(error => {
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          code: 'api/validation_error',
          message: error.message,
        });
      }

      return res.status(502).json({
        code: error.code || 'api/request_error',
        message: error.message || 'Bad request',
        ...error,
      });
    });
}
