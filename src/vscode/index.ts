import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { EXTENSION_IDS } from '../_constants';
import { TupleToUnion } from 'type-fest';

const formatters = ['editorconfig', 'eslint', 'prettier'] as const;

interface Value {
  formatters: TupleToUnion<typeof formatters>[];
  extensions: {
    name: string;
    value: string;
  }[];
  prettierAsDefaultFormatter: boolean;
}

export default class extends BaseGenerator {
  value: Value = {
    formatters: ['editorconfig', 'eslint', 'prettier'],
    extensions: (
      Object.keys(EXTENSION_IDS) as (keyof typeof EXTENSION_IDS)[]
    ).map((name) => ({
      name,
      value: EXTENSION_IDS[name],
    })),
    prettierAsDefaultFormatter: true,
  };

  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(params[0], params[1], {
      useYesOption: true,
    });
  }

  initializing() {
    Object.assign(this.value, this.options);
  }

  async prompting() {
    if (!this.options.yes) {
      const answers = await this.prompt([
        {
          type: 'checkbox',
          name: 'formatters',
          message: 'What formatters do you want to setup?',
          choices: this.value.formatters,
          default: this.value.formatters,
        },
        {
          type: 'checkbox',
          name: 'extensionIds',
          message: 'What formatter vscode extensions do you want to add?',
          choices: this.value.extensions,
          default: this.value.extensions.map(({ value }) => value),
        },
        {
          type: 'confirm',
          name: 'prettierAsDefaultFormatter',
          message:
            'Do you want to use prettier as the default vscode formatter?',
          when: (answers) =>
            answers.extensionIds.includes(EXTENSION_IDS.prettier),
          default: (answers: any) =>
            answers.extensionIds.includes(EXTENSION_IDS.prettier),
        },
      ]);

      this.value.formatters = answers.formatters;
      this.value.extensions = this.value.extensions.filter((v) =>
        answers.extensionIds.includes(v.value),
      );
      this.value.prettierAsDefaultFormatter =
        answers.prettierAsDefaultFormatter;
    }
  }

  configuring() {
    this.renderTemplateJSON('extensions.ejs', '.vscode/extensions.json', {
      extensionIds: this.value.extensions.map((v) => v.value),
    });
    this.renderTemplateJSON('settings.ejs', '.vscode/settings.json', {
      prettierAsDefaultFormatter: this.value.prettierAsDefaultFormatter,
      prettierExtensionId: EXTENSION_IDS.prettier,
    });
  }

  compose() {
    this.value.formatters.forEach((v) => {
      this.composeWith(require.resolve(`../${v}`), { yes: true });
    });
  }
}
