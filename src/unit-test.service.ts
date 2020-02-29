import { writeFile } from './utils';
import { TemplateService } from './template.service';
import { SpyService } from './spy.service';
import { DependenciesService } from './dependencies.service';
import { IndexTemplateVariables } from './constants/index-template-variables';
import { EntityService } from './entity.service';
import { MethodTestTemplateVariables } from './constants/method-test-template-variables';
import { ConfigService } from './config.service';

export class UnitTestService {
  entity: EntityService;
  dependencies: DependenciesService;
  spies: SpyService;
  config: ConfigService;

  constructor(entityPath: string,
              private fileContent: string) {
    this.entity = new EntityService(
      entityPath,
      fileContent
    );
    this.dependencies = new DependenciesService(
      fileContent
    );
    this.spies = new SpyService(
      fileContent,
      this.dependencies.list
    )
  }


  async readInfoFromSUT() {
    this.config = new ConfigService();
    await this.config.read();
    this.logInfo();
  }

  async saveToFile() {
    const testContent = await this.generateTestContent();

    await this.createSpecFile(testContent);
  }

  private async generateTestContent(): Promise<string> {
    const indexTemplate = new TemplateService(
      './templates/index.template'
    );

    await indexTemplate.read();

    indexTemplate.fillPlaceholders(
      new IndexTemplateVariables({
        entityName: this.entity.name,
        entityType: this.entity.type,
        entityPath: this.entity.baseFilePathWithoutExt,
        spyDeclarations: this.spies.declarations,
        spyArguments: this.spies.arguments,
        spyInitializations: this.spies.initializations,
        spyImports: this.spies.imports,
        methodsTests: await this.generateMethodsTests(),
        spyUtilsPath: this.config.getSpyUtilsPath()
      })
    );

    return indexTemplate.template;
  }

  private async generateMethodsTests(): Promise<string> {
    const methodTestTemplate = new TemplateService(
      './templates/method-test.template'
    );

    await methodTestTemplate.read();

    const publicMethods = this.entity.methods
      .filter((method) => method.modifier === 'public');

    if (!publicMethods.length) {
      return;
    }

    const startingSpace = '\n\n';

    const testsTemplate = publicMethods.reduce((result, method, index) => {
      const isLast = index === publicMethods.length - 1;
      // TODO refactor it
      const newMethodTestTemplate = new TemplateService('');
      newMethodTestTemplate.template = methodTestTemplate.template;

      newMethodTestTemplate.fillPlaceholders(
        new MethodTestTemplateVariables({
          methodName: method.name,
          entityType: this.entity.type,
        })
      );

      result = result + `${newMethodTestTemplate.template}${isLast ? '' : '\n\n'}`;
      return result;
    }, '');

    return startingSpace + testsTemplate;
  }

  private logInfo() {
    console.log('config path is', this.config.configPath);
    console.log('entity path is', this.entity.path);
    console.log('entity spec path is', this.entity.specPath);
    console.log('entity type is', this.entity.type);
    console.log('entity has dependencies:', this.dependencies.list.map(dep => dep.type)); // TODO add toString
    console.log('entity has methods:', this.entity.methods.map(dep => dep.name)); // TODO add toString
  }

  private async createSpecFile(content: string) {
    return writeFile(this.entity.specPath, content);
  }
}
