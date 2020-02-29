import { generateTestForEntity } from '../src';
import * as path from 'path';

// const filePath = './flows.service.ts';
const filePath = './edit-flow-form.component.ts';

const resolvedPath = path.join(__dirname, filePath);

generateTestForEntity(resolvedPath)
  .then(() => {
    console.log('Test has been successfully generated!');
  });
