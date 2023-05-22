import { getDefaultGithubRepoName, isScoped } from '../_utils';
import { slugify } from 'underscore.string';
import * as EmailValidator from 'email-validator';
import { BaseGenerator } from '../_base';
import * as Generator from 'yeoman-generator';
import normalizeUrl from '@esm2cjs/normalize-url';
import * as emptyDir from 'empty-dir';

interface Value {
  appName: string;
  appDescription: string;
  nodePkgName: string;
  authorName: string;
  authorEmail: string;
  authorWebsite: string;
  githubUsername: string;
  githubRepoName: string;
}

export default class extends BaseGenerator {
  value: Value = {
    appName: slugify(this.appname),
    appDescription: '',
    nodePkgName: slugify(this.appname),
    authorName: this.user.git.name() ?? '',
    authorEmail: this.user.git.email() ?? '',
    authorWebsite: '',
    githubUsername: this.user.git.name() ?? '',
    githubRepoName: getDefaultGithubRepoName(slugify(this.appname)),
  };

  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(params[0], params[1], { useYesOption: true });

    const empty = emptyDir.sync(this.destinationRoot());
    if (!empty) {
      throw new Error('Current directory is not empty.');
    }
  }

  async initializing() {
    Object.assign(this.value, this.options);
  }

  async prompting() {
    if (!this.options.yes) {
      const answers = await this.prompt<Value>([
        {
          name: 'appName',
          message: 'What do you want to name your app?',
          default: this.value.appName,
          filter: (val) => slugify(val),
          validate: (val) =>
            val.length > 0 ? true : 'You have to provide the app name',
        },
        {
          name: 'appDescription',
          message: 'What is your app description?',
          default: this.value.appDescription,
        },
        {
          name: 'nodePkgName',
          message: 'What is the Node Package name?',
          default: (answers: any) => answers.appName,
          filter: (val) => {
            if (isScoped(val)) {
              const [scope, name] = val.split('/');
              return scope + '/' + slugify(name);
            }
            return slugify(val);
          },
          validate: (val) =>
            val.length > 0 ? true : 'You have to provide the Node Package name',
        },
        {
          name: 'authorName',
          message: 'What is the author name?',
          default: this.value.authorName,
        },
        {
          name: 'authorEmail',
          message: 'What is the author email?',
          default: this.value.authorEmail,
          validate: (val) =>
            val.length === 0
              ? true
              : EmailValidator.validate(val)
              ? true
              : 'Please input valid email',
        },
        {
          name: 'authorWebsite',
          message: 'What is the author website?',
          default: this.value.authorWebsite,
          save: true,
          filter: (val) =>
            val.length > 0
              ? normalizeUrl(val, {
                  forceHttps: true,
                })
              : val,
        },
        {
          name: 'githubUsername',
          message: 'What is your GitHub user name?',
          default: this.value.githubUsername,
        },
        {
          name: 'githubRepoName',
          message: 'What github repository name do you want to use?',
          default: ({ appName }: Value) => getDefaultGithubRepoName(appName),
        },
      ]);

      Object.assign(this.value, answers);
    }
  }

  _composeWith(generatorName: string, options: Record<string, any> = {}) {
    this.composeWith(require.resolve(`../${generatorName}`), {
      yes: true,
      ...options,
    });
    return this;
  }

  compose() {
    this._composeWith('npm', {
      moduleName: this.value.appName,
      moduleDescription: this.value.appDescription,
      authorName: this.value.authorName,
      authorEmail: this.value.authorEmail,
      authorWebsite: this.value.authorWebsite,
      githubUsername: this.value.githubUsername,
      githubRepoName: this.value.githubRepoName,
    })
      ._composeWith('git')
      ._composeWith('typescript')
      ._composeWith('eslint')
      ._composeWith('prettier')
      ._composeWith('editorconfig')
      ._composeWith('license', {
        name: this.value.authorName,
        email: this.value.authorEmail,
        website: this.value.authorWebsite,
        license: 'MIT',
      })
      ._composeWith('readme', {
        projectName: this.value.appName,
        projectDescription: this.value.appDescription,
        licenseName: 'MIT',
        authorName: this.value.authorName,
        authorWebsite: this.value.authorWebsite,
        authorGithubUsername: this.value.githubUsername,
      })
      ._composeWith('lintstaged')
      ._composeWith('vscode');
  }

  end() {
    this.log('Finished setup project', this.value.appName);
    this.log(
      'If any setting does not satisfy your demands, feel free to run the respective command',
    );
  }
}
