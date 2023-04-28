import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { appendPrettier2ESLint } from '../_utils';

export default class extends BaseGenerator {
  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(...params);
  }

  configuring() {
    this.copyTemplate('prettierrc', '.prettierrc');
  }

  async writting() {
    this.addScripts({
      format: 'prettier --write --ignore-path .gitignore .',
    });
    await this.addPackages('prettier');

    // append prettier rules to eslint
    if (this.existsDestination('.eslintrc')) {
      await appendPrettier2ESLint(this);
    }
  }
}
