import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { TupleToUnion } from 'type-fest';
import { appendTypeScript2ESLint } from '../_utils';
import * as emptyDir from 'empty-dir';

const _module = ['CommonJS', 'ESNext'] as const;
type Module = TupleToUnion<typeof _module>;

interface Value {
  module: Module;
  noEmit: boolean;
  declaration: boolean;
  outDir: string;
  include: string;
}

export default class extends BaseGenerator {
  value: Value = {
    module: 'CommonJS',
    noEmit: false,
    declaration: true,
    outDir: 'dist',
    include: 'src',
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
          type: 'list',
          name: 'module',
          message: 'What module code is generated?',
          choices: _module,
          default: this.value.module,
        },
        {
          type: 'confirm',
          name: 'noEmit',
          message: 'Disable emitting file from a compilation?',
          default: this.value.noEmit,
        },
        {
          type: 'confirm',
          name: 'declaration',
          message: 'Generate .d.ts files from TypeScript and JavaScript files?',
          default: this.value.declaration,
        },
        {
          name: 'outDir',
          message: 'What is output folder for all emitted files',
          default: this.value.outDir,
        },
        {
          name: 'include',
          message: 'Files to be included in compilation:',
          default: this.value.include,
        },
      ]);

      Object.assign(this.value, answers);
    }
  }

  async configuring() {
    if (
      !this.existsDestination(this.value.include) ||
      (await emptyDir(this.destinationPath(this.value.include)))
    ) {
      this.renderTemplate('index', `${this.value.include}/index.ts`);
    }
    this.renderTemplateJSON('tsconfig.ejs', 'tsconfig.json', this.value);
  }

  async writing() {
    await this.addPackages(['typescript', 'type-fest']);

    // eslint
    if (this.existsDestination('.eslintrc')) {
      await appendTypeScript2ESLint(this);
    }

    // package.json
    this.mergeDestinationJSON('package.json', {
      main: 'dist/index.js',
    });
  }
}
