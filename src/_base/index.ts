import * as Generator from 'yeoman-generator';
import { JsonObject, JsonValue, Primitive } from 'type-fest';
import { mergeWith, uniq, PropertyPath, pull, get, has } from 'lodash';
import * as ejs from 'ejs';
import { getLatestVersions } from '../_utils';
import { Spinner } from 'cli-spinner';

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

const spinner = new Spinner();
spinner.setSpinnerString(19).setSpinnerTitle('Adding dependencies... ');

export abstract class BaseGenerator extends Generator {
  constructor(args: Args, options: Options, features?: Features) {
    super(args, options, features);

    if (features?.useYesOption) {
      this.option('yes', {
        type: Boolean,
        alias: 'y',
        default: false,
        description: 'Skip prompts and use default values',
      });
    }
  }

  printStart(generatorName: string) {
    this.log('=== start', generatorName, '===');
  }

  getLatestVersions(...args: Parameters<typeof getLatestVersions>) {
    return getLatestVersions(...args);
  }

  addScripts(scripts: Record<string, string>) {
    this.packageJson.merge({
      scripts,
    });
  }

  private existsDependency(dependency: string, dev: boolean) {
    return Boolean(
      this.packageJson.getPath(
        dev ? `devDependencies.${dependency}` : `dependencies.${dependency}`,
      ),
    );
  }

  private filterDependencis(
    dependencies: string | string[] | Record<string, string>,
    dev: boolean,
  ) {
    if (typeof dependencies === 'string') {
      return this.existsDependency(dependencies, dev)
        ? undefined
        : dependencies;
    }

    if (Array.isArray(dependencies)) {
      return dependencies.filter((v) => !this.existsDependency(v, dev));
    }

    return dependencies;
  }

  async addPackages(
    dependencies: string | string[] | Record<string, string>,
    dev = true,
  ) {
    const addDeps = dev
      ? this.addDevDependencies.bind(this)
      : this.addDependencies.bind(this);

    const _dependencies = this.filterDependencis(dependencies, dev);
    if (!_dependencies) {
      return;
    }

    spinner.start();
    if (typeof _dependencies === 'string' || Array.isArray(_dependencies)) {
      const versions = await this.getLatestVersions(_dependencies);
      await addDeps(versions);
    } else {
      await addDeps(_dependencies);
    }
    spinner.stop(true);
  }

  appendDestination(filePath: string, content: string) {
    this.fs.append(this.destinationPath(filePath), content);
  }

  existsDestinationProperty(filePath: string, propPath: PropertyPath) {
    const content = this.readDestinationJSON(filePath);
    return has(content, propPath);
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
      if (Array.isArray(arr) && arr.includes(primitive)) {
        pull(arr, primitive).push(primitive);
      }
    }

    this.writeDestinationJSON(filePath, mergedDestinationJSON);
  }

  renderTemplateJSON(
    sourceTmplPath: string,
    destinationPath: string,
    templateData?: Record<any, any>,
    mergeDestinationJSONOptions?: MergeDestinationJSONOptions,
  ): void {
    let templateStr = this.readTemplate(sourceTmplPath);

    if (templateData) {
      templateStr = ejs.render(templateStr, templateData);
    }

    try {
      const templateJSON = JSON.parse(templateStr);
      this.mergeDestinationJSON(
        destinationPath,
        templateJSON,
        mergeDestinationJSONOptions,
      );
    } catch (error) {
      throw new Error(
        `template ${sourceTmplPath} is not valid JSON or cannot rendered as JSON`,
      );
    }
  }
}
