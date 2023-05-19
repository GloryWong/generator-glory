import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { ESLINT_CONFIG, LINTSTAGED_CONFIG } from '../_constants';
import { isGitManaged } from '../_utils';

export default class extends BaseGenerator {
  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(...params);
  }

  configuring() {
    this.copyTemplate('lintstagedrc', LINTSTAGED_CONFIG);
  }

  async compose() {
    if (!(await isGitManaged(this.destinationRoot()))) {
      this.composeWith(require.resolve('../git'), { yes: true });
    }

    if (!this.existsDestination(ESLINT_CONFIG)) {
      this.composeWith(require.resolve('../eslint'), { yes: true });
    }
  }

  async writing() {
    this.addScripts({
      prepare: 'husky install',
    });
    await this.addPackages(['lint-staged', 'husky']);
  }

  end() {
    if (!this.options.skipInstall) {
      this.spawnCommandSync('npm', ['run', 'prepare']);
      this.spawnCommandSync('npx', [
        'husky',
        'set',
        '.husky/pre-commit',
        '"npx lint-staged"',
      ]);
    } else {
      this.log(
        'You should set lint-staged in husky manually: after install husky, run `npx husky set .husky/pre-commit "npx lint-staged"`',
      );
    }
  }
}
