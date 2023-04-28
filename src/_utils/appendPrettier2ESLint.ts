import { BaseGenerator } from '../_base';

export async function appendPrettier2ESLint(generator: BaseGenerator) {
  generator.mergeDestinationJSON(
    '.eslintrc',
    {
      plugins: ['prettier'],
      extends: ['prettier'],
    },
    {
      primitiveKeepLast: {
        arrayPath: 'extends',
        primitive: 'prettier',
      },
    },
  );

  await generator.addPackages([
    'eslint-config-prettier',
    'eslint-plugin-prettier',
  ]);
}
