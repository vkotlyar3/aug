import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';

export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const unlink = promisify(fs.unlink);

export function escapeRegExpChar(text: string): string {
  return text.replace(/\$/g, '\\$');
}

export function removeExtension(filename: string): string {
  const pointExtensionIndex = filename.lastIndexOf('.');
  return filename.slice(0, pointExtensionIndex);
}

export function getBaseFilePath(filePath: string): string {
  return `./${path.basename(filePath)}`;
}

export function getClassName(fileContent: string): string {
  return fileContent.match(/export\s*class\s*(\S*)\s*.*{/m)[1];
}

export function matchAllEntities(inputString: string, regExp: RegExp): RegExpExecArray[] {
  let tmp: RegExpExecArray;
  let result: RegExpExecArray[] = [];

  while ((tmp = regExp.exec(inputString)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (tmp.index === regExp.lastIndex) {
      regExp.lastIndex++;
    }

    result.push(tmp);
  }

  return result;
}