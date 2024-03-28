// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@assets/(.*)$': '<rootDir>/src/assets/$1',
    '@core/(.*)$': '<rootDir>/src/core/$1',
    '@pages/(.*)$': '<rootDir>/src/pages/$1',
    '@style/(.*)$': '<rootDir>/src/style/$1',
    '@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '@services/(.*)$': '<rootDir>/src/services/$1',
    '@utils/(.*)$': '<rootDir>/src/utils/$1',
    '@mechanics/(.*)$': '<rootDir>/src/mechanics/$1',
    '@store/(.*)$': '<rootDir>/src/store/$1',
    '@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '@routes': '<rootDir>/src/routes',
  },
  setupFiles: ['jest-canvas-mock'],
}
