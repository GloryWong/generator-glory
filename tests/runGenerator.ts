import * as path from 'path';
import { mockGetLatestVersions } from './mockGetLatestVersions';

function getGeneratorPath(name: string) {
  return path.join(__dirname, `../src/${name}`);
}

export interface RunGeneratorSettings {
  options?: Record<string, any>;
  answers?: Record<string, any>;
  withGeneratorNames?: string[];
  cwd?: string;
  nextGenerator?: [generatorName: string, settings?: RunGeneratorSettings];
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
  } = settings;

  let _cwd: string;

  import('yeoman-test').then((helpers) => {
    const ctx = helpers.default
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
      });

    ctx.on('ready', mockGetLatestVersions).on('end', () => {
      if (nextGenerator) {
        runGenerator(done, nextGenerator[0], {
          ...nextGenerator[1],
          cwd: _cwd,
        });
      } else {
        process.chdir(_cwd);
        done();
      }
    });
  });
}
