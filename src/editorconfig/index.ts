import * as Generator from 'yeoman-generator';
import { BaseGenerator } from '../_base';
import { EDITOR_CONFIG } from '../constants';

export default class extends BaseGenerator {
  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(...params);
  }

  configuring() {
    this.renderTemplate('editorconfig', EDITOR_CONFIG);
  }
}
