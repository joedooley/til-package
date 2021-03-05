import * as React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import { css } from '@emotion/react';
import { useAuth } from '@lib/firebase/auth';
import Flex from '@components/core/html/flex';
import Dialog from '@components/core/dialog';
import LoginButtons from './login-buttons';

export default function AuthDialog({ isOpen, onClose, heading, ...rest }) {
  const auth = useAuth();

  return (
    isOpen && (
      <Dialog {...rest} onClose={onClose} ariaLabel="Dialog with login options" hasCloseButton={false}>
        <Flex direction="column">
          <Link href="/" passHref>
            <a href="/" title="Go to the homepage">
              <Image src="/assets/icons/logo/small.svg" height="56" width="56" />
            </a>
          </Link>

          <h1
            css={theme => css`
              margin-bottom: ${theme.space[5]};
              margin-top: ${theme.space[5]};
            `}
          >
            {heading}
          </h1>

          <LoginButtons auth={auth} />
        </Flex>
      </Dialog>
    )
  );
}

AuthDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  heading: PropTypes.string,
};
