import PropTypes from 'prop-types';
import { Global, css, useTheme } from '@emotion/react';
import normalize from 'normalize.css';

export default function GlobalCss() {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        ${normalize}

        * {
          box-sizing: border-box;
          letter-spacing: 0.01em;
        }

        :root {
          --base-primary: 158, 67%;
          --base-error: 339, 100%;
          --base-text: 0, 0%;

          --text-color: hsla(var(--base-text), 87%, 100%);
          --text-color-light: hsla(var(--base-text), 53%, 100%);
          --text-color-disabled: hsla(var(--base-text), 30%, 100%);

          --white: hsla(var(--base-text), 100%, 100%);

          --primary: hsla(var(--base-primary), 42%, 100%);
          --primary-hover: hsla(var(--base-primary), 37%, 100%);
          --primary-focus: hsla(var(--base-primary), 32%, 100%);

          --error: hsla(var(--base-error), 50%, 100%);
          --error-hover: hsla(var(--base-error), 40%, 100%);
          --error-focus: hsla(var(--base-error), 30%, 100%);

          --disabled: hsla(var(--base-text), 17%, 100%);
          --disabled-text: hsla(var(--base-text), 100%, 30%);

          --border: hsla(158, 67%, 42%, 100%);
        }

        :focus {
          outline-color: ${theme.colors.border.primary};
        }

        ::selection {
          background-color: ${theme.colors.brand.focus};
          color: ${theme.colors.white};
        }

        html,
        body,
        button {
          font-family: ${theme.fonts.normal};
        }

        html,
        body,
        #__next {
          height: 100%;
        }

        body {
          background: ${theme.colors.black[300]};
          margin: 0;
          padding: 0;
        }

        a,
        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        span {
          color: ${theme.colors.text};
          margin: 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${theme.fonts.heading};
          font-weight: bold;
        }

        h1 {
          font-size: ${theme.fontSizes[7]};
          line-height: ${theme.lineHeights.default};
          margin-bottom: ${theme.space[5]};
        }

        h2 {
          margin-bottom: 24px;
        }

        h3 {
          margin-bottom: 20px;
        }

        h4 {
          margin-bottom: ${theme.space[4]};
        }

        h5 {
          color: ${theme.colors.black[900]};
          font-size: 11px;
          line-height: 17px;
          margin-bottom: ${theme.space[3]};
          text-transform: uppercase;
        }

        h6 {
          margin-bottom: ${theme.space[2]};
        }

        a {
          color: ${theme.colors.brand.primary};
          font-style: normal;
          font-size: ${theme.fontSizes[2]};
          line-height: ${theme.lineHeights.condensed};
          text-decoration: none;

          &:hover {
            color: ${theme.colors.brand.hover};
          }

          &:focus {
            color: ${theme.colors.brand.focus};
          }
        }

        small {
          color: ${theme.colors.disabled.text};
          font-size: 10px;
          line-height: ${theme.lineHeights.condensedUltra};
        }

        p {
          color: ${theme.colors.textlight};
          font-weight: ${theme.fontWeights.normal};
          font-size: ${theme.fontSizes[2]};
          line-height: ${theme.lineHeights.default};
          margin-bottom: ${theme.space[4]};
        }

        label {
          color: ${theme.colors.textlight};
          font-size: ${theme.fontSizes[3]};
          line-height: ${theme.lineHeights.default};
          margin-bottom: 5px;

          .required {
            color: ${theme.colors.error.primary};
          }
        }

        ::placeholder,
        select,
        input,
        textarea,
        .wysiwyg,
        input + span,
        span + input {
          color: ${theme.colors.text};
          font-size: ${theme.fontSizes[2]};
          line-height: 20px;
        }

        ::placeholder {
          opacity: 0.5;
        }

        input,
        select,
        textarea {
          background: transparent;
          border: ${theme.borders.secondary};
          border-radius: ${theme.radii[2]};
          color: ${theme.colors.text};
          font-size: ${theme.fontSizes[4]};
          padding: ${theme.space[3]} 8px;
          width: 100%;
        }

        .react-toast-notifications__toast {
          background-color: ${theme.colors.black[400]} !important;
          color: ${theme.colors.text} !important;
          font-size: ${theme.fontSizes[0]};
          line-height: ${theme.lineHeights.default};
        }
      `}
    />
  );
}

GlobalCss.propTypes = {
  theme: PropTypes.object,
};
