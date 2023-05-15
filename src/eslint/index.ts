import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { appendPrettier2ESLint, appendTypeScript2ESLint } from '../_utils';

export default class extends BaseGenerator {
  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(...params);
  }

  configuring() {
    this.copyTemplate('eslintrc', '.eslintrc');
    this.copyTemplate('eslintignore', '.eslintignore');
  }

  async writting() {
    this.addScripts({
      lint: 'eslint --ext ".js,.ts" .',
      fix: 'npm run lint -- --fix',
    });

    await this.addPackages(['eslint', 'eslint-plugin-unused-imports']);

    if (this.existsDestination('tsconfig.json')) {
      await appendTypeScript2ESLint(this);
    }

    if (this.existsDestination('.prettierrc')) {
      await appendPrettier2ESLint(this);
    }
  }
}
