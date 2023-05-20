import * as path from 'path';
import Environment from 'yeoman-environment';
import { BaseGenerator } from '../src/_base';

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
  onReady?: (generator: BaseGenerator) => void;
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
    onReady,
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
      .withGenerators(
        withGeneratorNames.map((v) => [
          helpers.default.createDummyGenerator(),
          getGeneratorPath(v),
        ]),
      )
      .onEnvironment((env) => {
        _cwd = env.cwd;
        onEnvironment?.(env);
      })
      .on('ready', (g) => onReady?.(g))
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
