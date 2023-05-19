import { ESLINT_CONFIG } from '../_constants';
import { BaseGenerator } from '../_base';

export async function appendPrettier2ESLint(generator: BaseGenerator) {
  generator.mergeDestinationJSON(
    ESLINT_CONFIG,
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
