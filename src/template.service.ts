import * as path from "path";
import { readFile } from './utils';

export class TemplateService {
  template: string;

  constructor(private templatePath: string) {
  }

  async read() {
    const pathTemplate = path.join(__dirname, this.templatePath);
    this.template = await readFile(pathTemplate, 'utf8');
    return this.template;
  }

  fillPlaceholders(variables: object) {
    Object.entries(variables)
      .forEach(([key, value]) => {
        const searchString = `\\$${key}\\$`;
        const regExp = new RegExp(searchString, 'g');
        this.template = this.template.replace(regExp, value);
      })
  }
}
