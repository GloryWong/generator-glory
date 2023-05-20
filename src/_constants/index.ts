// configuration file names
export const ESLINT_CONFIG = '.eslintrc';
export const PRETTIER_CONFIG = '.prettierrc';
export const TYPESCRIPT_CONFIG = 'tsconfig.json';
export const EDITOR_CONFIG = '.editorconfig';
export const PACKAGE_JSON = 'package.json';
export const LINTSTAGED_CONFIG = '.lintstagedrc';

// vscode extension ids
export const EXTENSION_IDS = {
  editorConfig: 'editorconfig.editorconfig',
  eslint: 'dbaeumer.vscode-eslint',
  prettier: 'esbenp.prettier-vscode',
} as const;
