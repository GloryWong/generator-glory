import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { ESLINT_CONFIG, PRETTIER_CONFIG } from '../constants';

export default class extends BaseGenerator {
  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(params[0], params[1], {
      useYesOption: true,
    });
  }

  configuring() {
    this.renderTemplateJSON('lintstagedrc', '.lintstagedrc');
  }

  compose() {
    if (!this.existsDestination('.gitignore')) {
      this.composeWith(require.resolve('../git'), { yes: this.options.yes });
    }

    if (!this.existsDestination(ESLINT_CONFIG)) {
      this.composeWith(require.resolve('../eslint'), { yes: this.options.yes });
    }

    if (!this.existsDestination(PRETTIER_CONFIG)) {
      this.composeWith(require.resolve('../prettier'), {
        yes: this.options.yes,
      });
    }
  }

  async writing() {
    this.addScripts({
      prepare: 'husky install',
    });
    await this.addPackages(['lint-staged', 'husky']);
  }

  end() {
    this.spawnCommandSync('npm', ['run', 'prepare']);
    this.spawnCommandSync('npx', [
      'husky',
      'set',
      '.husky/pre-commit',
      '"npx lint-staged"',
    ]);
  }
}
