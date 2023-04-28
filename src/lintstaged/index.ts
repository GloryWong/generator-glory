import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';

export default class extends BaseGenerator {
  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(params[0], params[1], {
      useYesOption: true,
    });
  }

  initializing() {
    if (!this.existsDestination('.gitignore')) {
      this.composeWith(require.resolve('../git'), { yes: this.options.yes });
    }

    if (!this.existsDestination('.eslintrc')) {
      this.composeWith(require.resolve('../eslint'), { yes: this.options.yes });
    }

    if (!this.existsDestination('.prettierrc')) {
      this.composeWith(require.resolve('../prettier'), {
        yes: this.options.yes,
      });
    }
  }

  configuring() {
    this.renderTemplateJSON('lintstagedrc', '.lintstagedrc');
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
