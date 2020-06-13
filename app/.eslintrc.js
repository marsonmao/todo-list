module.exports = {
  // ignorePatterns: ["./**/snippet.js"], // need v6.7.0
  rules: {
    'no-unused-vars': ["error", {
      "args": "none",
      "varsIgnorePattern": "_|classes",
    }],
  },
};
