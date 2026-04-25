module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
