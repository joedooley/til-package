import { auth } from '@lib/firebase/firebase-admin';
import { normalizePhone } from '@util/string.js';

export default async function validateAccount(req, res) {
  if (req.method === 'POST') {
    const normalizedPhone = normalizePhone(req.body.phone);
    console.log(`normalizedPhone`, normalizedPhone);

    await auth
      .getUserByPhoneNumber(normalizedPhone)
      .then(userRecord => {
        // A user with the phone number already exists.
        // You can also get other information related to the user from the
        // userRecord.

        console.log(`validateAccount userRecord`, userRecord);
        res.status(200).json({
          data: {
            uid: userRecord.uid,
          },
        });
      })
      .catch(function (error) {
        console.log('Error fetching user data:', JSON.stringify(error));
        console.log(`validateAccount error:`, JSON.stringify(error));

        res.status(401).json({ data: 'Invalid authentication' });
      });
  }
}
