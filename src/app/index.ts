import * as Generator from 'yeoman-generator';

export default class extends Generator {
  constructor(...params: ConstructorParameters<typeof Generator>) {
    super(...params);
  }

  async prompting() {
    await this.prompt([
      {
        name: 'projectName',
        message: 'What do you want to name your project?',
      },
    ]);
  }
}
