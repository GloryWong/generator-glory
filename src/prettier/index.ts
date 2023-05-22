import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { appendPrettier2ESLint } from '../_utils';
import { ESLINT_CONFIG, PRETTIER_CONFIG } from '../_constants';

export default class extends BaseGenerator {
  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(...params);
  }

  configuring() {
    this.renderTemplateJSON('prettierrc', PRETTIER_CONFIG);
  }

  async writting() {
    this.addScripts({
      pretty: 'prettier --write --ignore-path .gitignore .',
    });
    await this.addPackages('prettier');

    // append prettier rules to eslint
    if (this.existsDestination(ESLINT_CONFIG)) {
      await appendPrettier2ESLint(this);
    }
  }
}
