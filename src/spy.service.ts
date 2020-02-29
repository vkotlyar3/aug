import { Dependency } from './constants/dependency';
import { escapeRegExpChar, matchAllEntities } from './utils';

export class SpyService {
  declarations: string;
  arguments: string;
  initializations: string;
  imports: string;

  constructor(
    private fileContent: string,
    private deps: Dependency[]
  ) {
    this.initSpies();
  }

  initSpies() {
    this.declarations = this.generateSpyDeclarations();
    this.arguments = this.generateSpyArguments();
    this.initializations = this.generateSpyInitializations();
    this.imports = this.generateSpyImports();
  }

  private generateSpyArguments() {
    return this.deps.reduce((result, dep, index) => {
      const isLast = index === this.deps.length - 1;
      result = result + `      ${dep.name}Spy,${isLast ? '' : '\n'}`;

      return result;
    }, '');
  }

  private generateSpyDeclarations() {
    return this.deps.reduce((result, dep, index) => {
      const isLast = index === this.deps.length - 1;
      result = result + `  let ${dep.name}Spy: SpyObj<${dep.type}>;${isLast ? '' : '\n'}`;
      return result;
    }, '');
  }

  private generateSpyInitializations() {
    return this.deps.reduce((result, dep, index) => {
      const isLast = index === this.deps.length - 1;
      const spyMethodsTemplate = this.generateSpyMethodsTemplate(dep.name);
      const spyName = dep.generic
        ? dep.typeWithoutGeneric
        : dep.type;
      result = result + `    ${dep.name}Spy = createSpyObj<${dep.type}>('${spyName}', [\n${spyMethodsTemplate}\n    ]);${isLast ? '' : '\n'}`;
      return result;
    }, '');
  }

  private generateSpyImports() {
    return this.deps.reduce((result, dep, index) => {
      const isLast = index === this.deps.length - 1;
      if (!!dep.generic) {
        result = result + this.generateSpyImport(dep.typeWithoutGeneric, isLast);
        result = result + this.generateSpyImport(dep.generic, isLast);
      } else {
        result = result + this.generateSpyImport(dep.type, isLast);
      }
      return result;
    }, '');
  }

  private generateSpyImport(depImportType: string, isLast: boolean): string {
    const pathForGeneric = this.getPathForSpy(depImportType);
    return `import { ${depImportType} } from '${pathForGeneric}';${isLast ? '' : '\n'}`;
  }

  private getPathForSpy(spyType: string) {
    const encapsulatedSpyType = escapeRegExpChar(spyType);
    const searchString = `${encapsulatedSpyType}[,\\s\\w}]*from\\W*'(.*)'`;
    const regExp = new RegExp(searchString);
    const result = regExp.exec(this.fileContent);
    if (result) {
      return result[1];
    } else {
      return null;
    }
  }

  private generateSpyMethodsTemplate(spyName: string): string {
    const uniqueSpies = this.getSpyMethods(spyName);

    return uniqueSpies.reduce((result, spy, index) => {
      const isLast = index === uniqueSpies.length - 1;
      result = result + `      '${spy}',${isLast ? '' : '\n'}`;
      return result;
    }, '');
  }


  private getSpyMethods(spyName: string): string[] {
    const encapsulatedSpyName = escapeRegExpChar(spyName);
    const regExp = new RegExp(`${encapsulatedSpyName}\\.(?<method>[A-Za-z0-9]*)\\(`, 'g');
    const spyMethodsMatch = matchAllEntities(this.fileContent, regExp);

    const spies = spyMethodsMatch.reduce((result, spyMethodMatch) => {
      result.push(spyMethodMatch.groups.method);
      return result;
    }, []);

    return Array.from(new Set(spies));
  }
}
