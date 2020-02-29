import { getBaseFilePath, getClassName, matchAllEntities, removeExtension } from './utils';
import { Method } from './constants/method';

export class EntityService {
  name: string;
  type: string;
  baseFilePath: string;
  baseFilePathWithoutExt: string;
  methods: Method[];
  specPath: string;

  constructor(public path: string,
              public fileContent: string) {
    this.initEntityInfo();
  }

  private initEntityInfo() {
    this.name = getClassName(this.fileContent);
    this.baseFilePath = getBaseFilePath(this.path);
    this.baseFilePathWithoutExt = removeExtension(this.baseFilePath);
    this.type = this.getEntityType(this.baseFilePathWithoutExt);
    this.methods = this.getMethods();
    this.specPath = this.generateSpecPath();
  }

  private getEntityType(filename: string): string {
    const pointEntityIndex = filename.lastIndexOf('.');
    const entityType = filename.slice(pointEntityIndex + 1, filename.length);

    return entityType;
  }

  private getMethods(): Method[] {
    const regExp = /}\s*(private|public)?(.*)\(.*\)(\W*:(.*))?\W*{/gm;
    const methodsMatch = matchAllEntities(this.fileContent, regExp);
    return methodsMatch.reduce((result, methodMatch) => {
      result.push(new Method({
        name: methodMatch[2] && methodMatch[2].trim(),
        modifier: methodMatch[1] as 'private',
        returnType: methodMatch[4] && methodMatch[4].trim()
      }));
      return result;
    }, []);
  }

  private generateSpecPath(): string {
    const pointExtensionIndex = this.path.lastIndexOf('.');
    const extension = this.path.slice(pointExtensionIndex + 1, this.path.length);
    const filePathWithoutExtension = removeExtension(this.path);
    return `${filePathWithoutExtension}.spec.${extension}`;
  }
}
