module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'svg', 'png', 'gif'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  collectCoverageFrom: ['/src/*'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: '.coverage/',
  moduleDirectories: ['./src/', 'node_modules'],
  moduleNameMapper: {
    '.(css)$': 'identity-obj-proxy',
    '^@components(.*)$': '<rootDir>/src/components$1',
  },
  testMatch: ['**/__tests__/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  snapshotSerializers: ['@emotion/jest/serializer'],
};
