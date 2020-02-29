import { readFile, unlink } from '../src/utils';
import * as path from 'path';
import { generateTestForEntity } from '../src';

async function checkGeneratedSpecFor(entityPath: string,
                                     specPath: string): Promise<void> {
  const pathFile = path.join(__dirname, entityPath);
  const expectedSpecPathFile = path.join(__dirname, `./snapshots/${specPath}`);
  const expectedSpecContent = await readFile(expectedSpecPathFile, 'utf8');

  await generateTestForEntity(pathFile);
  const specPathFile = path.join(__dirname, specPath);
  const specContent = await readFile(specPathFile, 'utf8');

  expect(specContent).toBe(expectedSpecContent);
  try {
    await unlink(specPathFile);
  } catch (error) {
    console.log('error during deleting file', error);
  }
}

describe('angular-unit-test-generator', () => {
  it('should generate proper file test for flow service', (done) => {
    checkGeneratedSpecFor(
      './flows.service.ts',
      './flows.service.spec.ts'
    ).then(() => {
      done();
    });
  });

  it('should generate proper file test for edit flow form component', (done) => {
    checkGeneratedSpecFor(
      './edit-flow-form.component.ts',
      './edit-flow-form.component.spec.ts'
    ).then(() => {
      done();
    });
  });

  it('should generate proper file test for effect with case catch error', (done) => {
    checkGeneratedSpecFor(
      './task.effects.ts',
      './task.effects.spec.ts'
    ).then(() => {
      done();
    });
  });
});
