module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  moduleNameMapper: {
    '\\.(scss|sass)$': 'identity-obj-proxy',
    '\\.svg': '<rootDir>/__mocks__/svg.js',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '.+\\.(png|jpg|jpeg|gif)$': 'jest-transform-stub',
  },
}
