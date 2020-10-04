module.exports = {
  verbose: true,
  roots: ["<rootDir>/specs/"],
  moduleFileExtensions: ["js", "json", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+.js$": "babel-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
};
