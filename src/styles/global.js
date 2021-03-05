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
          --base-primary: 174, 100%;
          --base-error: 339, 100%;
          --base-text: 0, 0%;

          --text-color: hsla(var(--base-text), 100%, 80%);
          --text-color-disabled: hsla(var(--base-text), 100%, 30%);

          --primary: hsla(var(--base-primary), 29%, 100%);
          --primary-hover: hsla(var(--base-primary), 19%, 100%);
          --primary-focus: hsla(var(--base-primary), 9%, 100%);

          --error: hsla(var(--base-error), 50%, 100%);
          --error-hover: hsla(var(--base-error), 40%, 100%);
          --error-focus: hsla(var(--base-error), 30%, 100%);

          --disabled: hsla(var(--base-text), 17%, 100%);
          --disabled-text: hsla(var(--base-text), 100%, 30%);
        }

        :focus {
          outline-color: ${theme.colors.brand.focus};
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

        h1 {
          font-size: ${theme.fontSizes[5]};
          font-weight: ${theme.fontWeights.normal};
          line-height: ${theme.lineHeights.default};
        }

        a {
          color: ${theme.colors.brand.primary};
          font-style: normal;
          font-weight: ${theme.fontWeights.bold};
          font-size: ${theme.fontSizes[2]};
          line-height: ${theme.lineHeights.condensed};
          text-decoration: none;

          &:hover {
            color: ${theme.colors.brand.hover};
          }

          &:focus,
          &:visited {
            color: ${theme.colors.brand.focus};
          }
        }

        small {
          color: ${theme.colors.disabled.text};
          font-size: 10px;
          line-height: ${theme.lineHeights.condensedUltra};
        }

        p {
          color: ${theme.colors.text};
          font-weight: ${theme.fontWeights.normal};
          font-size: ${theme.fontSizes[2]};
          line-height: ${theme.lineHeights.default};
        }

        label {
          color: ${theme.colors.text};
          font-size: ${theme.fontSizes[0]};
          line-height: ${theme.lineHeights.default};

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
          background: ${theme.colors.text};
          border: 1px solid ${theme.colors.text};
          border-radius: ${theme.radii[2]};
          color: ${theme.colors.disabled.text};
          padding: ${theme.space[1]} 8px;
          width: 100%;
        }
      `}
    />
  );
}

GlobalCss.propTypes = {
  theme: PropTypes.object,
};
