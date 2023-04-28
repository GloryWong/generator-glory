import * as Generator from 'yeoman-generator';
import { JsonObject, JsonValue, Primitive } from 'type-fest';
import { mergeWith, uniq, PropertyPath, pull, get } from 'lodash';
import * as ejs from 'ejs';
import { getLatestVersions } from '../_utils';

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
  constructor(args: Args, options: Options, features?: Features) {
    super(args, options, features);

    if (features?.useYesOption) {
      this.option('yes', {
        type: Boolean,
        alias: 'y',
        default: false,
        description: 'Use default',
      });
    }
  }

  addScripts(scripts: Record<string, string>) {
    this.packageJson.merge({
      scripts,
    });
  }

  async addPackages(
    dependencies: string | string[] | Record<string, string>,
    dev = true,
  ) {
    const addDeps = dev
      ? this.addDevDependencies.bind(this)
      : this.addDependencies.bind(this);

    if (typeof dependencies === 'string' || Array.isArray(dependencies)) {
      const versions = await getLatestVersions(dependencies);
      return addDeps(versions);
    } else {
      return addDeps(dependencies);
    }
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
