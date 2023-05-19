import { ESLINT_CONFIG } from '../_constants';
import { BaseGenerator } from '../_base';

export async function appendTypeScript2ESLint(generator: BaseGenerator) {
  generator.mergeDestinationJSON(
    ESLINT_CONFIG,
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
  await generator.addPackages([
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
  ]);
}
