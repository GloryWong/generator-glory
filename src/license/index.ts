import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';

interface Value {
  name: string;
  email: string;
  website: string;
  year: string;
  defaultLicense: string;
  license?: string;
}

export default class extends BaseGenerator {
  value: Value = {
    name: this.user.git.name() ?? '',
    email: this.user.git.email() ?? '',
    website: '',
    year: new Date().getFullYear().toString(),
    defaultLicense: 'MIT',
  };

  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(...params);
  }

  initializing() {
    Object.assign(this.value, this.options);
  }

  compose() {
    this.composeWith(require.resolve('generator-license'), this.value);
  }
}
