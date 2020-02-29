import { Dependency } from './constants/dependency';

export class DependenciesService {
  list: Dependency[];

  constructor(private fileContent: string) {
    this.list = this.getDependencies();
  }

  getDependencies(): Dependency[] {
    const constructor = this.getConstructor();
    const lineDepsMatch = constructor.match(/private (.*):\s([\w|<|>]*)/gm);

    return lineDepsMatch.reduce((result: Dependency[], lineDepMatchItem: string) => {
      result.push(
        this.generateDependency(lineDepMatchItem)
      );
      return result;
    }, []);
  }

  private getConstructor(): string {
    return this.fileContent.match(/constructor\s*\([\s\S]*\)\s*{\s*}/gm)[0];
  }

  private generateDependency(lineDepMatchItem): Dependency {
    const depMatchItem = lineDepMatchItem.match(/private\s(.*):\s(.*),?/);
    const depName = depMatchItem[1];
    const depType = depMatchItem[2];
    const genericMatch = depType.match(/<(.*?)>/);
    const typeWithoutGenericMatch = depType.match(/(.*)<|(.*)/);
    return new Dependency({
      name: depName,
      type: depType,
      generic: genericMatch ? genericMatch[1] : undefined,
      typeWithoutGeneric: typeWithoutGenericMatch ? typeWithoutGenericMatch[1] : depType
    });
  }
}
