import * as path from 'path';
import { mockGetLatestVersions } from './mockGetLatestVersions';
import Environment from 'yeoman-environment';

function getGeneratorPath(name: string) {
  return path.join(__dirname, `../src/${name}`);
}

export interface RunGeneratorSettings {
  options?: Record<string, any>;
  answers?: Record<string, any>;
  withGeneratorNames?: string[];
  cwd?: string;
  nextGenerator?: [generatorName: string, settings?: RunGeneratorSettings];
  onEnvironment?: (env: Environment) => void;
}

export function runGenerator(
  done: Mocha.Done,
  generatorName: string,
  settings: RunGeneratorSettings = {},
) {
  const {
    options = {},
    answers = {},
    withGeneratorNames = [],
    cwd,
    nextGenerator,
    onEnvironment,
  } = settings;

  let _cwd: string;

  import('yeoman-test').then((helpers) => {
    helpers.default
      .run(getGeneratorPath(generatorName), {
        forwardCwd: cwd ? true : undefined,
        cwd,
        autoCleanup: false,
      })
      .withOptions({
        skipInstall: true,
        ...options,
      })
      .withAnswers(answers)
      .withGenerators(withGeneratorNames.map((v) => getGeneratorPath(v)))
      .onEnvironment((env) => {
        _cwd = env.cwd;
        onEnvironment?.(env);
      })
      .on('ready', mockGetLatestVersions)
      .on('end', () => {
        if (nextGenerator) {
          runGenerator(done, nextGenerator[0], {
            ...nextGenerator[1],
            cwd: _cwd,
          });
        } else {
          process.chdir(_cwd);
          done();
        }
      })
      .on('error', (error) => done(error));
  });
}
