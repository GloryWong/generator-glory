import normalizeUrl from '@esm2cjs/normalize-url';
import * as underscoreString from 'underscore.string';
import * as Generator from 'yeoman-generator';
import * as EmailValidator from 'email-validator';
import { BaseGenerator } from '../_base';
import { getDefaultGithubRepoName, isScoped } from '../_utils';
import { PACKAGE_JSON } from '../_constants';

const { slugify } = underscoreString;

interface Value {
  moduleName: string;
  moduleDescription: string;
  authorName: string;
  authorEmail: string;
  authorWebsite: string;
  githubUsername: string;
  githubRepoName: string;
}

export default class extends BaseGenerator {
  value: Value = {
    moduleName: slugify(this.appname),
    moduleDescription: '',
    authorName: this.user.git.name() ?? '',
    authorEmail: this.user.git.email() ?? '',
    authorWebsite: '',
    githubUsername: this.user.git.name() ?? '',
    githubRepoName: getDefaultGithubRepoName(slugify(this.appname)),
  };

  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(params[0], params[1], { useYesOption: true });
  }

  initializing() {
    Object.assign(this.value, this.options);
  }

  async prompting() {
    if (!this.options.yes) {
      const answers = await this.prompt<Value>([
        {
          name: 'moduleName',
          message: 'What do you want to name your module?',
          default: this.value.moduleName,
          filter: (val) => {
            if (isScoped(val)) {
              const [scope, name] = val.split('/');
              return scope + '/' + slugify(name);
            }
            return slugify(val);
          },
          validate: (val) =>
            val.length > 0 ? true : 'You have to provide the module name',
        },
        {
          name: 'moduleDescription',
          message: 'What is your module description?',
          default: this.value.moduleDescription,
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
          default: ({ moduleName }: Value) =>
            getDefaultGithubRepoName(moduleName),
        },
      ]);

      Object.assign(this.value, answers);
    }
  }

  configuring() {
    this.renderTemplateJSON('_package.json', PACKAGE_JSON, this.value);
  }
}
