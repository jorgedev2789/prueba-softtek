module.exports = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '@functions/(.*)': '<rootDir>/src/functions/$1',
    '@infraestructure/(.*)': '<rootDir>/src/infraestructure/$1',
    '@libs/(.*)': '<rootDir>/src/libs/$1',
    '@mock/(.*)': '<rootDir>/src/mock/$1',
  },
}
