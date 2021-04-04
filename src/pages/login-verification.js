import * as React from 'react';
import { useRouter } from 'next/router';
import useDialog from '@hooks/useDialog';
import VerificationDialog from '@components/auth/dialogs/verification';

export default function LoginVerification() {
  const router = useRouter();
  const verificationId = router.query?.verificationId;
  const hasVerificationId = typeof verificationId === 'string' && verificationId.length !== 0;
  const [isOpen, toggleDialog] = useDialog(hasVerificationId);

  React.useEffect(() => {
    if (!hasVerificationId) {
      router.push('/login');
    }
  }, [hasVerificationId, router]);

  return isOpen ? (
    <VerificationDialog
      isOpen={isOpen}
      onClose={toggleDialog}
      verificationId={verificationId}
      ariaLabel="Dialog for phone number verification code"
    />
  ) : null;
}
