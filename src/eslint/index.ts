import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import os from 'os';
import { appendPrettier2ESLint, appendTypeScript2ESLint } from '../_utils';

export default class extends BaseGenerator {
  ignores = '';

  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(params[0], params[1], { useYesOption: true });
  }

  async promting() {
    if (!this.options.yes) {
      this.log(
        `Default eslintignore:${os.EOL}%s`,
        this.readTemplate('eslintignore'),
      );
      const answers = await this.prompt([
        {
          name: 'ignores',
          message:
            'Append ignored files and directoris (separated with space) (optional):',
          default: this.ignores,
        },
      ]);

      this.ignores = answers.ignores?.trim() ?? '';
    }
  }

  configuring() {
    this.copyTemplate('eslintrc', '.eslintrc');
    this.copyTemplate('eslintignore', '.eslintignore');
    this.addPackages(['eslint', 'eslint-plugin-unused-imports'], true);
  }

  writting() {
    if (this.ignores) {
      this.appendDestination(
        '.eslintignore',
        this.ignores.replace(/\s+/g, os.EOL),
      );
    }

    this.addScripts({
      lint: 'eslint --ext ".js,.ts" .',
      fix: 'npm run lint -- --fix',
    });

    if (this.existsDestination('tsconfig.json')) {
      appendTypeScript2ESLint(this);
    }

    if (this.existsDestination('.prettierrc')) {
      appendPrettier2ESLint(this);
    }
  }

  install() {
    this.installPackages();
  }
}
