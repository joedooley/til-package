import { auth } from '@lib/firebase/firebase-admin';
import { normalizePhone } from '@util/string';

export default async function updateUserProfile(req, res) {
  if (req.method === 'POST') {
    const normalizedPhone = normalizePhone(req.body.phone);
    console.log(`normalizedPhone`, normalizedPhone);

    await auth
      .getUserByPhoneNumber(normalizedPhone)
      .then(userRecord => {
        // A user with the phone number already exists.
        // You can also get other information related to the user from the
        // userRecord.

        console.log(`validateAccount userRecord`, userRecord.toJSON);
        res.status(200).json({ data: userRecord.toJSON });
      })
      .catch(function (error) {
        console.log('Error fetching user data:', JSON.stringify(error));
        console.log(`validateAccount error:`, JSON.stringify(error));

        res.status(401).json({ data: 'Invalid authentication' });
      });
  }
}
