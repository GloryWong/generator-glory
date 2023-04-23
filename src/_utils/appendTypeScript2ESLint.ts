import { BaseGenerator } from '../_base';

export function appendTypeScript2ESLint(generator: BaseGenerator) {
  generator.mergeDestinationJSON(
    '.eslintrc',
    {
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      primitiveKeepLast: {
        arrayPath: 'extends',
        primitive: 'prettier',
      },
    },
  );
  generator.addPackages(
    ['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser'],
    true,
  );
}