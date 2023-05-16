import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { appendPrettier2ESLint, appendTypeScript2ESLint } from '../_utils';
import {
  ESLINT_CONFIG,
  TYPESCRIPT_CONFIG,
  PRETTIER_CONFIG,
} from '../constants';

export default class extends BaseGenerator {
  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(...params);
  }

  configuring() {
    this.copyTemplate('eslintrc', ESLINT_CONFIG);
    this.copyTemplate('eslintignore', '.eslintignore');
  }

  async writting() {
    this.addScripts({
      lint: 'eslint --ext ".js,.ts" .',
      fix: 'npm run lint -- --fix',
    });

    await this.addPackages(['eslint', 'eslint-plugin-unused-imports']);

    if (this.existsDestination(TYPESCRIPT_CONFIG)) {
      await appendTypeScript2ESLint(this);
    }

    if (this.existsDestination(PRETTIER_CONFIG)) {
      await appendPrettier2ESLint(this);
    }
  }
}
