const borders = ['0', '1px solid', '2px solid', '3px solid'];
borders.primary = `${borders[1]} #ced4da`;
borders.secondary = `${borders[2]} #ced4da`;
borders.green = `${borders[2]} #01683a`;

const breakpoints = ['320px', '480px', '768px', '1024px', '1140px', '1600px'];
[
  breakpoints.xsmall,
  breakpoints.small,
  breakpoints.medium,
  breakpoints.large,
  breakpoints.xlarge,
  breakpoints.xxlarge,
] = breakpoints;

const colors = {
  green: {
    primary: '#01683a',
    secondary: '#00683b',
    light: '#80bb00',
    gradient: 'linear-gradient(90.17deg, #00683b 0%, #005530 100%)',
    gradients: {
      light: 'linear-gradient(0deg, rgba(0, 85, 48, 0.1), rgba(0, 85, 48, 0.1)), #ffffff',
      dark: 'linear-gradient(90.17deg, #00683b 0%, #005530 100%)',
    },
  },
  grey: {
    primary: '#eef0f2',
    secondary: '#424c55',
    inactive: '#6c757d',
    border: '#ced4da',
    disabledText: '#606060',
  },
  black: {
    primary: '#414142',
    secondary: '#343a40',
    backdrop: 'rgb(61 69 75 / 50%)',
  },
  white: {
    primary: '#fff',
  },
  blue: {
    primary: '#42a2dc',
    secondary: '#17a2b8',
  },
  purple: {
    primary: '#6610f2',
    secondary: '#6f42c1',
  },
  pink: {
    primary: '#e83e8c',
  },
  red: {
    primary: '#dc3545',
    secondary: '#ca0200',
  },
  orange: {
    primary: '#fb8539',
  },
  yellow: {
    primary: '#ffc107',
  },
};

const fonts = {
  normal: '"Lato", sans-serif',
};

const fontSizes = ['12px', '13px', '14px', '15px', '16px', '20px', '28px', '32px'];
[
  fontSizes.xsmall,
  fontSizes.small,
  fontSizes.medium,
  fontSizes.large,
  fontSizes.xlarge,
  fontSizes.xxlarge,
  fontSizes.xxxlarge,
] = fontSizes;

const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  heavy: 900,
};

const gutters = ['0px', '4px', '8px', '16px', '24px', '32px'];
[gutters.none, gutters.xsmall, gutters.small, gutters.medium, gutters.large, gutters.xlarge] = gutters;

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
[space.none, space.xsmall, space.ss, space.small, space.medium, space.large, space.xlarge, space.xxlarge] = space;

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
