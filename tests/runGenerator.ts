import * as path from 'path';
import { mockGetLatestVersions } from './mockGetLatestVersions';

function getGeneratorPath(name: string) {
  return path.join(__dirname, `../src/${name}`);
}

export function runGenerator(
  done: Mocha.Done,
  generatorName: string,
  options: Record<string, any> = {},
  answers: Record<string, any> = {},
  depGeneratorNames: string[] = [],
) {
  import('yeoman-test').then((helpers) =>
    helpers.default
      .run(getGeneratorPath(generatorName))
      .withOptions({
        skipInstall: true,
        ...options,
      })
      .withAnswers(answers)
      .withGenerators(depGeneratorNames.map((v) => getGeneratorPath(v)))
      .on('ready', mockGetLatestVersions)
      .on('end', done),
  );
}
