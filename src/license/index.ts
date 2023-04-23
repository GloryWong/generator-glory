import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';

export default class extends BaseGenerator {
  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(...params);
  }

  init() {
    this.composeWith(require.resolve('generator-license'), {
      defaultLicense: 'MIT',
    });
  }
}
