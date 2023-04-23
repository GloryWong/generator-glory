import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';

export default class extends BaseGenerator {
  private formatters = ['eslint', 'prettier'];

  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(params[0], params[1], { useYesOption: true });
  }

  async prompting() {
    if (!this.options.yes) {
      const answers = await this.prompt([
        {
          type: 'checkbox',
          name: 'formatters',
          message: 'What formatters do you want to setup?',
          choices: ['eslint', 'prettier'],
          default: this.formatters,
        },
      ]);

      this.formatters = answers.formatters;
    }
  }

  configuring() {
    this.renderTemplateJSON('extensions.json', '.vscode/extensions.json');
    this.renderTemplateJSON('settings.json', '.vscode/settings.json');
  }

  setupFormatters() {
    this.formatters.forEach((v) => {
      this.composeWith(require.resolve(`../${v}`), { yes: true });
    });
  }
}
