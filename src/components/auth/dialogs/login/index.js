import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { FormProvider } from 'react-hook-form';
import useLoginForm from '../../forms/login/useForm';
import LoginForm from '../../forms/login';
import Dialog from '@components/core/dialog';
import Sidebar from './sidebar';
import Logo from '@components/core/logo';

export default function LoginDialog({ isOpen, onClose, router, ...rest }) {
  const type = router.pathname.replace('/', '');
  const [formType, setFormType] = React.useState(type);
  const isLogin = formType === 'login';

  const { methods, handleSubmit, errors, verificationId } = useLoginForm(formType);

  const handleSwitch = React.useCallback(() => {
    const nextFormType = formType === 'login' ? 'signup' : 'login';

    setFormType(nextFormType);

    router.replace(
      {
        pathname: router.pathname,
        query: { type: formType },
      },
      undefined,
      { shallow: false }
    );
  }, [router, formType]);

  React.useEffect(() => {
    if (verificationId !== null) {
      router.push(
        {
          pathname: '/login-verification',
          query: { verificationId: encodeURIComponent(verificationId) },
        },
        undefined,
        { shallow: false }
      );
    }
  }, [verificationId, router]);

  return (
    isOpen && (
      <Dialog {...rest} onClose={onClose} ariaLabel="Dialog with login options" width="700px">
        <Logo
          css={css`
            position: absolute;
          `}
        />

        <AnimatePresence initial={false}>
          <div
            css={css`
              display: grid;
              grid-template-columns: 220px 1fr;
              position: relative;
            `}
          >
            <Sidebar
              type={formType}
              onSwitch={handleSwitch}
              css={css`
                padding-left: ${!isLogin && '20px'};
                padding-right: ${isLogin && '20px'};
              `}
            />

            <FormProvider {...methods}>
              <LoginForm
                type={formType}
                errors={errors}
                onSubmit={handleSubmit}
                css={css`
                  padding-left: ${isLogin && '20px'};
                  padding-right: ${!isLogin && '20px'};
                `}
              />
            </FormProvider>
          </div>
        </AnimatePresence>
      </Dialog>
    )
  );
}

LoginDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};
