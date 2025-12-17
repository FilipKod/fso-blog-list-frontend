import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { fileURLToPath } from "url";
import path from "path";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: ["eslint.config.js", "*.config.js"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
  },
  ...compat.extends("airbnb", "airbnb/hooks"),
  {
    rules: {
      "no-unused-vars": [
        "error",
        {
          caughtErrors: "none",
        },
      ],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.{js,jsx}",
            "**/*.spec.{js,jsx}",
            "**/__tests__/**",
            "**/*.config.js",
            "**/setupTests.js",
            "**/testSetup.js",
          ],
        },
      ],
      "prettier/prettier": [
        "error",
        {
          trailingComma: "es5",
        },
      ],
    },
  },
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  eslintPluginPrettier,
];
