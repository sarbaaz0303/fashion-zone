/** @type {import("prettier").Config} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
  tailwindConfig: 'tailwind.config.ts',

  // Prettier Config
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  singleAttributePerLine: false,
  htmlWhitespaceSensitivity: 'css',
  vueIndentScriptAndStyle: false,
  proseWrap: 'preserve',
  insertPragma: false,
  requirePragma: false,
  useTabs: false,
  embeddedLanguageFormatting: 'auto',
  printWidth: 80,
  tabWidth: 2,
};

export default config;
