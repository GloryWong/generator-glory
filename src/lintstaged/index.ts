import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';

export default class extends BaseGenerator {
  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(...params);
  }

  initializing() {
    if (!this.existsDestination('.gitignore')) {
      this.composeWith(require.resolve('../git'));
    }

    if (!this.existsDestination('.eslintrc')) {
      this.composeWith(require.resolve('../eslint'));
    }

    if (!this.existsDestination('.prettierrc')) {
      this.composeWith(require.resolve('../prettier'));
    }
  }

  configuring() {
    this.addPackages(['lint-staged', 'husky'], true);
  }

  writing() {
    this.renderTemplateJSON('lintstagedrc', '.lintstagedrc');
    this.addScripts({
      prepare: 'husky install',
    });
  }

  async insall() {
    await this.installPackages();
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
