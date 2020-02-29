#!/usr/bin/env node

import * as path from 'path';
import { generateTestForEntity } from './index';

const [, , filename] = process.argv;

if (!filename) {
  throw new Error('Filename was not provided! \nExample: aug task-details.component.ts')
}

const filePath = path.join(process.cwd(), filename);

generateTestForEntity(filePath)
  .then(() => {
    console.log('Test has been successfully generated!');
  });


