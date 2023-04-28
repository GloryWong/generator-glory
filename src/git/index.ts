import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { EOL } from 'os';

interface Value {
  initialBranch: string;
  ignores: string;
}

export default class extends BaseGenerator {
  value: Value = {
    initialBranch: 'master',
    ignores: '',
  };

  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(...params);
  }

  initializing() {
    Object.assign(this.value, this.options);
  }

  async prompting() {
    if (!this.options.yes) {
      const answers = await this.prompt([
        {
          name: 'initialBranch',
          message: 'Initial branch',
          default: this.value.initialBranch,
        },
        {
          name: 'ignores',
          message:
            'Append ignored files and directoris (divided with space) (optional):',
          default: this.value.ignores,
        },
      ]);

      this.value.initialBranch = answers.initialBranch;
      this.value.ignores = answers.ignores?.trim() ?? '';
    }
  }

  configuring() {
    // gitignore
    this.copyTemplate('gitignore', '.gitignore');
  }

  writing() {
    if (this.value.ignores) {
      this.appendDestination(
        '.gitignore',
        this.value.ignores.replace(/\s+/g, EOL),
      );
    }

    // Git init
    this.spawnCommand('git', [
      'init',
      '--quiet',
      '-b',
      this.value.initialBranch,
    ]);
  }
}
