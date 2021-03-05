const borders = ['0', '1px solid', '2px solid', '3px solid'];
borders.primary = `${borders[1]} #ced4da`;

const breakpoints = ['320px', '480px', '768px', '1024px', '1140px', '1600px'];

const colors = {
  text: 'var(--text-color)',
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
  black: {
    primary: 'hsla(var(--base-text), 0%, 100%)',
  },
};

const fonts = {
  normal: '"Lato", sans-serif',
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

const gutters = ['0px', '4px', '8px', '16px', '24px', '32px'];

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

const radii = ['0', '2px', '4px', '8px', '12px', '20px'];

const shadows = {
  small: '-1px -1px 3px rgba(0, 0, 0, 0.1), 1px 1px 3px rgba(0, 0, 0, 0.1)',
  large: '0 0.25px 1px rgb(0 0 0 / 4%), 0 0.85px 3px rgb(0 0 0 / 19%)',
  menu: '0 0.5px 1.75px rgba(0, 0, 0, 0.039), 0 1.85px 6.25px rgba(0, 0, 0, 0.19)',
  modal: '0 0.5px 5px rgba(0, 0, 0, 0.039), 0 3.75px 11px rgba(0, 0, 0, 0.19)',
  thead: '5px -3px 4px rgba(255, 255, 255, 0.75), -5px -3px 0 rgba(255, 255, 255, 0.75), 0 2px 5px rgba(0, 0, 0, 0.1)',
};

const space = ['0', '6px', '8px', '12px', '16px', '32px', '64px', '128px'];

const timings = [250, 400, 600, 1000, 4000];

const zIndices = {
  contentMask: 500,
  header: 1000,
  modal: 2000,
  googleMapsAutocomplete: 2100,
};

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
  timings,
  zIndices,
};
