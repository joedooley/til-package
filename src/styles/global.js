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

        :focus {
          outline-color: ${theme.colors.grey.border};
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
          margin: 0;
        }

        h1 {
          color: ${theme.colors.black.secondary};
          font-size: ${theme.fontSizes[5]};
          font-weight: ${theme.fontWeights.normal};
          line-height: ${theme.lineHeights.default};
        }

        a {
          color: ${theme.colors.green.primary};
          font-style: normal;
          font-weight: bold;
          font-size: ${theme.fontSizes[2]};
          line-height: ${theme.lineHeights.condensed};
          text-decoration: none;
        }

        small {
          color: ${theme.colors.grey.inactive};
          font-size: 10px;
          line-height: ${theme.lineHeights.condensedUltra};
          line-height: ${theme.lineHeights.condensedUltra};
        }

        p {
          color: ${theme.colors.black.secondary};
          font-weight: ${theme.fontWeights.normal};
          font-size: ${theme.fontSizes[2]};
          line-height: ${theme.lineHeights.default};
        }

        label {
          color: ${theme.colors.grey.inactive};
          font-size: ${theme.fontSizes[0]};
          line-height: ${theme.lineHeights.default};

          .required {
            color: ${theme.colors.red.primary};
          }
        }

        ::placeholder,
        select,
        input,
        textarea,
        .wysiwyg,
        input + span,
        span + input {
          color: ${theme.colors.grey.secondary};
          font-size: ${theme.fontSizes[2]};
          line-height: 20px;
        }

        ::placeholder {
          opacity: 0.5;
        }

        input,
        select,
        textarea {
          background: ${theme.colors.white.primary};
          border: 1px solid ${theme.colors.grey.border};
          border-radius: ${theme.radii[2]};
          color: ${theme.colors.grey.secondary};
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
