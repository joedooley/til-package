const breakpoints = ['320px', '480px', '768px', '1024px', '1140px', '1600px'];

const colors = {
  text: 'var(--text-color)',
  white: 'var(--white)',
  brand: {
    primary: 'var(--primary)',
    hover: 'var(--primary-hover)',
    focus: 'var(--primary-focus)',
  },
  error: {
    primary: 'var(--error)',
    hover: 'var(--error-hover)',
    focus: 'var(--error-focus)',
  },
  disabled: {
    bg: 'var(--disabled)',
    text: 'var(--disabled-text)',
  },
  border: {
    primary: 'var(--primary)',
    secondary: 'hsla(var(--base-text), 27%, 100%)',
    dark: 'var(--text-color)',
  },
  black: {
    primary: 'hsla(var(--base-text), 0%, 100%)',
    100: 'hsla(var(--base-text), 5%, 100%)',
    200: 'hsla(var(--base-text), 7%, 100%)',
    300: 'hsla(var(--base-text), 12%, 100%)',
    400: 'hsla(var(--base-text), 16%, 100%)',
    500: 'hsla(var(--base-text), 20%, 100%)',
    600: 'hsla(var(--base-text), 27%, 100%)',
    700: 'hsla(var(--base-text), 40%, 100%)',
    800: 'hsla(var(--base-text), 88%, 100%)',
    900: 'hsla(var(--base-text), 100%, 100%)',
  },
};

const borders = ['0', '1px solid', '2px solid', '3px solid'];
borders.primary = `${borders[1]} ${colors.border.primary}`;
borders.secondary = `${borders[1]} ${colors.border.secondary}`;
borders.dark = `${borders[1]} ${colors.border.dark}`;

borders.transparent = `${borders[1]} transparent`;

const fonts = {
  normal: '"Roboto", sans-serif',
  heading: '"Raleway", sans-serif',
};

const fontSizes = ['12px', '13px', '14px', '15px', '16px', '20px', '28px', '32px'];

const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  heavy: 900,
};

const lineHeights = {
  condensedUltra: 1,
  condensed: 1.25,
  default: 1.5,
  expanded: 2.0,
  expandedUltra: 2.5,
};

const maxWidths = {
  menu: 256,
  xsmall: 350,
  small: 544,
  medium: 768,
  large: 1000,
  xlarge: 1280,
  xxlarge: 1600,
};

const radii = ['0', '2px', '4px', '8px', '12px', '20px', '30px'];

const shadows = {
  small: '-1px -1px 3px rgba(0, 0, 0, 0.1), 1px 1px 3px rgba(0, 0, 0, 0.1)',
  large: '0 0.25px 1px rgb(0 0 0 / 4%), 0 0.85px 3px rgb(0 0 0 / 19%)',
  menu: '0 0.5px 1.75px rgba(0, 0, 0, 0.039), 0 1.85px 6.25px rgba(0, 0, 0, 0.19)',
  thead: '5px -3px 4px rgba(255, 255, 255, 0.75), -5px -3px 0 rgba(255, 255, 255, 0.75), 0 2px 5px rgba(0, 0, 0, 0.1)',
  modal:
    '0 0 transparent, 0 0 transparent, 0 0 transparent, 0 0 transparent, 0 7px 14px 0 rgba(0,0,0,0.5),0 3px 6px 0 rgba(0,0,0,0.5), 0 0 transparent, 0 7px 14px 0 rgba(0,0,0,0.5),0 3px 6px 0 rgba(0,0,0,0.5)',
};

const gutters = ['0', '4px', '8px', '16px', '24px', '32px'];

const space = ['0', '6px', '8px', '12px', '16px', '32px', '64px', '128px'];

export default {
  borders,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  gutters,
  lineHeights,
  maxWidths,
  radii,
  shadows,
  space,
};
