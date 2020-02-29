import * as findConfig from 'find-config';
import * as path from 'path';
import { readFile } from './utils';

export class ConfigService {
  configPath: string;
  private configFileName = 'aug.json';
  private content: string;
  private defaultConfigFileName = 'aug.json';

  async read() {
    const configPath = findConfig(this.configFileName);
    this.configPath = configPath
      ? configPath
      : path.join(__dirname, this.defaultConfigFileName);
    this.content = await readFile(this.configPath, 'utf8');
  }

  getSpyUtilsPath(): string {
    const regExp = /"spyUtilsPath"\W?:\W?"(.*)"/;
    const match = regExp.exec(this.content);
    return match && match[1];
  }
}