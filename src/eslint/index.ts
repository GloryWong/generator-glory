import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { appendPrettier2ESLint, appendTypeScript2ESLint } from '../_utils';
import {
  ESLINT_CONFIG,
  TYPESCRIPT_CONFIG,
  PRETTIER_CONFIG,
} from '../_constants';

interface Value {
  integratePrettier: boolean;
}

export default class extends BaseGenerator {
  value: Value = {
    integratePrettier: false,
  };

  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(params[0], params[1], { useYesOption: true });
  }

  initializing() {
    Object.assign(this.value, this.options);
  }

  async prompting() {
    if (!this.options.yes) {
      const answers = await this.prompt([
        {
          type: 'confirm',
          name: 'integratePrettier',
          message: 'Do you want to install and integrate prettier?',
          default: this.value.integratePrettier,
        },
      ]);

      this.value.integratePrettier = answers.integratePrettier;
    }
  }

  configuring() {
    if (this.value.integratePrettier) {
      this.composeWith(require.resolve('../prettier'));
    }

    this.copyTemplate('eslintrc', ESLINT_CONFIG);
    this.copyTemplate('eslintignore', '.eslintignore');
  }

  async writting() {
    this.addScripts({
      lint: 'eslint --ext ".js,.ts" .',
      fix: 'npm run lint -- --fix',
    });

    await this.addPackages(['eslint', 'eslint-plugin-unused-imports']);

    if (this.existsDestination(TYPESCRIPT_CONFIG)) {
      await appendTypeScript2ESLint(this);
    }

    if (this.existsDestination(PRETTIER_CONFIG)) {
      await appendPrettier2ESLint(this);
    }
  }
}
