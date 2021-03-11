import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Flex } from '@components/core/html';
import { Button } from '@components/core/html';
import GitHubIcon from 'public/assets/icons/login/github.svg';
import GoogleIcon from 'public/assets/icons/login/google.svg';

const ButtonContainer = styled(Flex)(
  ({ theme }) => css`
    button {
      background-color: transparent;
      border: ${theme.borders.dark};
      border-radius: 100%;
      margin-right: ${theme.space[3]};
      padding: ${theme.space[4]};

      &:last-of-type {
        margin-right: 0;
      }

      &:hover,
      &:focus {
        border: ${theme.borders.transparent};
        border-radius: 100%;
        outline: none;

        svg {
          &[title='github'] {
            path {
              stroke: ${theme.colors.primary};
            }
          }

          &[title='google'] {
            path {
              stroke: ${theme.colors.primary};
            }
          }
        }
      }
    }

    svg {
      height: ${theme.gutters[4]};
      width: ${theme.gutters[4]};

      &[title='github'] {
        path {
          stroke: ${theme.colors.text};
        }
      }

      &[title='google'] {
        path {
          fill: ${theme.colors.text};
        }
      }
    }
  `
);

export default function LoginButtons({ auth, ...rest }) {
  return (
    <ButtonContainer className={rest.className} hAlign="space-between">
      <Button type="button" ariaLabel="Click button to login with a GitHub account" onClick={auth.signinWithGitHub}>
        <GitHubIcon title="github" />
      </Button>

      <Button type="button" ariaLabel="Click button to login with a Google account" onClick={auth.signinWithGoogle}>
        <GoogleIcon title="google" />
      </Button>
    </ButtonContainer>
  );
}

LoginButtons.propTypes = {
  auth: PropTypes.object.isRequired,
};
