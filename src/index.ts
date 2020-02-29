import { readFile } from './utils';
import { UnitTestService } from './unit-test.service';

export async function generateTestForEntity(entityPath: string) {
  const entityContent = await readFile(entityPath, 'utf8');
  const unitTestService = new UnitTestService(
    entityPath,
    entityContent
  );

  await unitTestService.readInfoFromSUT();
  await unitTestService.saveToFile();
}
