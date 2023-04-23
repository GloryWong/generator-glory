import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import os from 'os';

export default class extends BaseGenerator {
  initialBranch = 'master';
  ignores = '';

  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(...params);
  }

  async prompting() {
    if (!this.options.yes) {
      const answers = await this.prompt([
        {
          name: 'initialBranch',
          message: 'Initial branch',
          default: this.initialBranch,
        },
        {
          name: 'ignores',
          message:
            'Append ignored files and directoris (separated with space) (optional):',
          default: this.ignores,
        },
      ]);

      this.initialBranch = answers.initialBranch;
      this.ignores = answers.ignores?.trim() ?? '';
    }
  }

  configuring() {
    // gitignore
    this.copyTemplate('gitignore', '.gitignore');
  }

  writing() {
    if (this.ignores) {
      this.appendDestination(
        '.gitignore',
        this.ignores.replace(/\s+/g, os.EOL),
      );
    }

    // Git init
    this.spawnCommand('git', ['init', '-b', this.initialBranch]);
  }
}
