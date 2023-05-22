import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { isGitManaged } from '../_utils';

interface Value {
  initialBranch: string;
}

export default class extends BaseGenerator {
  value: Value = {
    initialBranch: 'master',
  };

  gitManaged = false;

  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(params[0], params[1], { useYesOption: true });
  }

  async initializing() {
    Object.assign(this.value, this.options);
    this.gitManaged = await isGitManaged(this.destinationRoot());

    if (this.gitManaged) {
      this.log('!Current directory is already managed by git');
    }
  }

  async prompting() {
    if (!this.options.yes && !this.gitManaged) {
      const answers = await this.prompt([
        {
          name: 'initialBranch',
          message: 'Initial branch',
          default: this.value.initialBranch,
        },
      ]);

      this.value.initialBranch = answers.initialBranch;
    }
  }

  configuring() {
    // gitignore
    this.copyTemplate('gitignore', '.gitignore');
  }

  async writing() {
    // Git init
    if (!this.gitManaged) {
      await this.spawnCommand('git', [
        'init',
        '--quiet',
        '-b',
        this.value.initialBranch,
      ]);
    }
  }
}
