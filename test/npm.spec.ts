import { PACKAGE_JSON } from '../src/_constants';
import { assertJsonFileContent } from './assertions';
import { runGenerator } from './runGenerator';
import { testNPMBasic } from './cases/testNPMBasic';

interface MockedAnswers {
  moduleName: string;
  moduleDescription: string;
  authorName: string;
  authorEmail: string;
  authorWebsite: string;
  githubUsername: string;
  githubRepoName?: string;
}

function createMockedAnswers(mockedAnswers?: Partial<MockedAnswers>) {
  const answers: MockedAnswers = {
    moduleName: 'hello-world',
    moduleDescription: 'test npm scaffold',
    authorName: 'Will Smith',
    authorEmail: 'will.smith@mail.com',
    authorWebsite: 'https://smith.org',
    githubUsername: 'willsmith',
    ...mockedAnswers,
  };

  return answers;
}

function makeGithubUserRepoPart({
  githubUsername,
  githubRepoName,
  moduleName,
}: MockedAnswers) {
  return `${githubUsername}/${githubRepoName ?? moduleName}`;
}

function assertPackageJson(mockedAnswers: MockedAnswers) {
  const githubUserRepoPart = makeGithubUserRepoPart(mockedAnswers);

  testNPMBasic();

  it('should add required properties and values in package.json file', () => {
    assertJsonFileContent(PACKAGE_JSON, [
      {
        path: 'name',
        value: mockedAnswers.moduleName,
      },
      {
        path: 'description',
        value: mockedAnswers.moduleDescription,
      },
      {
        path: 'author',
        value: {
          name: mockedAnswers.authorName,
          email: mockedAnswers.authorEmail,
          url: mockedAnswers.authorWebsite,
        },
        deepComparison: true,
      },
      {
        path: 'repository.url',
        value: new RegExp(`${githubUserRepoPart}\\.git$`),
      },
      {
        path: 'bugs.url',
        value: new RegExp(`${githubUserRepoPart}/issues$`),
      },
      {
        path: 'homepage',
        value: new RegExp(`${githubUserRepoPart}#readme$`),
      },
    ]);
  });
}

describe('glory:npm', () => {
  describe('Use default values', () => {
    before((done) => {
      runGenerator(done, 'npm', {
        options: { yes: true },
      });
    });

    testNPMBasic();
  });

  describe('Prompt to customize values', () => {
    describe('Do not provide github repo name', () => {
      const mockedAnswers = createMockedAnswers();

      before((done) => {
        runGenerator(done, 'npm', {
          answers: mockedAnswers,
        });
      });

      assertPackageJson(mockedAnswers);
    });

    describe('Provide github repo name', () => {
      const mockedAnswers = createMockedAnswers({ githubRepoName: 'hi-world' });

      before((done) => {
        runGenerator(done, 'npm', {
          answers: mockedAnswers,
        });
      });

      assertPackageJson(mockedAnswers);
    });
  });
});
