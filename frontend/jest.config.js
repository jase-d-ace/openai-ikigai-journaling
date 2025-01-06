export default {
    testEnvironment: "jest-fixed-jsdom",
    moduleFileExtensions: ["jsx", "js"],
    setupFilesAfterEnv: ["./src/setupTests.js"],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
  };