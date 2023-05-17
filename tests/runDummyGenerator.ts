import * as path from 'path';
import { BaseGenerator } from '../src/_base';

export function runDummyGenerator(
  done: Mocha.Done,
  onReady: (generator: BaseGenerator) => any,
) {
  let _generator: BaseGenerator;
  import('yeoman-test').then((helpers) =>
    helpers.default
      .run(path.join(__dirname, 'dummy'))
      .withOptions({
        skipInstall: true,
      })
      .on('ready', async (generator) => {
        _generator = generator;
        await onReady(_generator);
      })
      .on('end', () => {
        _generator.fs.commit(() => done());
      }),
  );
}
