import * as Generator from 'yeoman-generator';
import { JsonObject, JsonValue, Primitive } from 'type-fest';
import { mergeWith, uniq, PropertyPath, pull, get } from 'lodash';
import * as ejs from 'ejs';

type GCP = ConstructorParameters<typeof Generator>;

type Args = GCP[0];
type Options = GCP[1];
type Features = GCP[2] & {
  useYesOption?: boolean;
};

interface MergeDestinationJSONOptions {
  primitiveDuplicatable?: boolean;
  primitiveKeepLast?: {
    arrayPath: PropertyPath;
    primitive: Primitive;
  };
}

export abstract class BaseGenerator extends Generator {
  private readonly packages: { deps: Set<string>; devDeps: Set<string> } = {
    deps: new Set(),
    devDeps: new Set(),
  };

  constructor(args: Args, options: Options, features?: Features) {
    super(args, options, {
      ...features,
      customInstallTask: true,
    });

    if (features?.useYesOption) {
      this.option('yes', {
        type: Boolean,
        alias: 'y',
        default: false,
        description: 'Use default',
      });
    }
  }

  createPackageJsonIfNecessary() {
    if (!this.existsDestination('package.json')) {
      this.spawnCommandSync('npm', ['init', '--yes']);
      this.log('Created package.json');
    }
  }

  addScripts(scripts: Record<string, string>) {
    const names = Object.keys(scripts).join(', ');
    this.packageJson.merge({
      scripts,
    });
    this.log(`Added scripts: ${names}`);
  }

  addPackages(packageSpecs: string | string[], dev = false) {
    if (typeof packageSpecs === 'string') {
      packageSpecs = [packageSpecs];
    }

    const deps = dev ? this.packages.devDeps : this.packages.deps;
    packageSpecs.forEach((v) => deps.add(v));
  }

  async installPackages() {
    const install = async (packageSpecs: Set<string>, dev = false) => {
      await this.spawnCommand('npm', [
        'install',
        '--silent',
        dev ? '--save-dev' : '--save',
        ...packageSpecs,
      ]);
      this.log(
        'Installed %sependencies: %s',
        dev ? 'devD' : 'd',
        Array.from(packageSpecs).join(', '),
      );
    };

    if (this.packages.deps.size > 0) await install(this.packages.deps);
    if (this.packages.devDeps.size > 0)
      await install(this.packages.devDeps, true);
  }

  appendDestination(filePath: string, content: string) {
    this.fs.append(this.destinationPath(filePath), content);
  }

  mergeDestinationJSON(
    filePath: string,
    content: JsonValue,
    options: MergeDestinationJSONOptions = {},
  ) {
    const { primitiveDuplicatable = false, primitiveKeepLast } = options;
    const destinationJSON = this.readDestinationJSON(filePath);

    const mergedDestinationJSON = mergeWith(
      {},
      destinationJSON,
      content,
      (objValue, srcValue) => {
        if (Array.isArray(objValue)) {
          let _objValue = objValue.concat(srcValue);
          if (!primitiveDuplicatable) {
            _objValue = uniq(_objValue);
          }
          return _objValue;
        }
      },
    ) as JsonObject;

    if (primitiveKeepLast) {
      const { arrayPath, primitive } = primitiveKeepLast;
      const arr = get(mergedDestinationJSON, arrayPath);
      pull(arr, primitive).push(primitive);
    }

    this.writeDestinationJSON(filePath, mergedDestinationJSON);
  }

  renderTemplateJSON(
    source: string,
    destination: string,
    templateData?: Record<any, any>,
    mergeDestinationJSONOptions?: MergeDestinationJSONOptions,
  ): void {
    let templateStr = this.readTemplate(source);

    if (templateData) {
      templateStr = ejs.render(templateStr, templateData);
    }

    try {
      const templateJSON = JSON.parse(templateStr);
      this.mergeDestinationJSON(
        destination,
        templateJSON,
        mergeDestinationJSONOptions,
      );
    } catch (error) {
      this.log('!template is not valid JSON or cannot rendered as JSON');
    }
  }
}