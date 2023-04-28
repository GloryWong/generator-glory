import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { EOL } from 'os';
import { appendPrettier2ESLint, appendTypeScript2ESLint } from '../_utils';

interface Value {
  ignores: string;
}

export default class extends BaseGenerator {
  value: Value = {
    ignores: '',
  };

  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(params[0], params[1], {
      useYesOption: true,
    });
  }

  initializing() {
    Object.assign(this.value, this.options);
  }

  async promting() {
    if (!this.options.yes) {
      this.log(
        `Default eslintignore:${EOL}%s`,
        this.readTemplate('eslintignore'),
      );
      const answers = await this.prompt([
        {
          name: 'ignores',
          message:
            'Append ignored files and directoris (divided with space) (optional):',
          default: this.value.ignores,
        },
      ]);

      this.value.ignores = answers.ignores?.trim() ?? '';
    }
  }

  configuring() {
    this.copyTemplate('eslintrc', '.eslintrc');
    this.copyTemplate('eslintignore', '.eslintignore');
  }

  async writting() {
    if (this.value.ignores) {
      this.appendDestination(
        '.eslintignore',
        this.value.ignores.replace(/\s+/g, EOL),
      );
    }

    this.addScripts({
      lint: 'eslint --ext ".js,.ts" .',
      fix: 'npm run lint -- --fix',
    });

    await this.addPackages(['eslint', 'eslint-plugin-unused-imports']);

    if (this.existsDestination('tsconfig.json')) {
      await appendTypeScript2ESLint(this);
    }

    if (this.existsDestination('.prettierrc')) {
      await appendPrettier2ESLint(this);
    }
  }
}
