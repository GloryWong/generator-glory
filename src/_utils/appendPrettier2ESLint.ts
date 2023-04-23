import { BaseGenerator } from '../_base';

export function appendPrettier2ESLint(generator: BaseGenerator) {
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
  generator.addPackages(
    ['eslint-config-prettier', 'eslint-plugin-prettier'],
    true,
  );
}
