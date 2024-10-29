import { defineConfig } from "eslint-define-config";

export default defineConfig({
  env: {
    node: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "import/extensions": ["error", "always", { js: "never" }],
    // Ajoutez d'autres règles personnalisées ici
  },
});
