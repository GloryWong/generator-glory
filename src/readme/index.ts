import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { slugify } from 'underscore.string';

interface Value {
  projectName: string;
  projectDescription: string;
  projectVersion: string;
  projectPrerequisites: { name: string; value: string }[];
  projectDocumentationUrl: string;
  projectHomepage: string;
  projectDemoUrl: string;
  isProjectOnNpm: boolean;
  isGithubRepos: boolean;
  repositoryUrl: string;
  licenseName: string;
  licenseUrl: string;
  installCommand: string;
  usage: string;
  testCommand: string;
  issuesUrl: string;
  contributingUrl: string;
  authorName: string;
  authorWebsite: string;
  authorGithubUsername: string;
  authorPatreonUsername: string;
  authorTwitterUsername: string;
  authorLinkedInUsername: string;
}

export default class extends BaseGenerator {
  value: Value = {
    projectName: slugify(this.appname),
    projectDescription: '',
    projectVersion: '',
    projectPrerequisites: [],
    projectDocumentationUrl: '',
    projectHomepage: '',
    projectDemoUrl: '',
    isProjectOnNpm: false,
    isGithubRepos: false,
    repositoryUrl: '',
    licenseName: 'MIT',
    licenseUrl: '',
    installCommand: '',
    usage: '',
    testCommand: '',
    issuesUrl: '',
    contributingUrl: '',
    authorName: this.user.git.name() ?? '',
    authorWebsite: '',
    authorGithubUsername: this.user.git.name() ?? '',
    authorPatreonUsername: '',
    authorTwitterUsername: '',
    authorLinkedInUsername: '',
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
          name: 'projectName',
          message: 'Project name:',
          default: this.value.projectName,
          filter: (val) => slugify(val),
          validate: (val) =>
            val.length > 0 ? true : 'You have to provide the project name',
        },
        {
          name: 'projectDescription',
          message: 'Project description:',
          default: this.value.projectDescription,
        },
        {
          type: 'confirm',
          name: 'isProjectOnNpm',
          message: 'Is project on npm?',
          default: this.value.isProjectOnNpm,
        },
        {
          name: 'licenseName',
          message: 'License name:',
          default: this.value.licenseName,
        },
        {
          name: 'authorName',
          message: 'Author name:',
          default: this.value.authorName,
        },
        {
          name: 'authorWebsite',
          message: 'Author website:',
          default: this.value.authorWebsite,
        },
        {
          name: 'authorGithubUsername',
          message: 'GitHub user name:',
          default: this.value.authorGithubUsername,
        },
      ]);

      Object.assign(this.value, answers);
    }

    if (this.value.authorGithubUsername) {
      this.value.repositoryUrl = `https://github.com/${this.value.authorGithubUsername}/${this.value.projectName}`;
    }
    this.value.isGithubRepos = !!this.value.repositoryUrl;
  }

  configuring() {
    this.renderTemplate('README', 'README.md', this.value);
  }
}
