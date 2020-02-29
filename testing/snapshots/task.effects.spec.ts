import { createSpyObj, SpyObj } from 'angular-unit-test-generator/testing-utils/jest';
import { TaskEffects } from './task.effects';
import { Actions } from '@ngrx/effects';
import { TaskActions } from '@app/task/store/task.actions';
import { TaskService } from '@app/task/services/task-aggregation.service';

describe('TaskEffects', () => {
  let effects: TaskEffects;
  let actions$Spy: SpyObj<Actions<TaskActions>>;
  let taskServiceSpy: SpyObj<TaskService>;

  beforeEach(() => {
    actions$Spy = createSpyObj<Actions<TaskActions>>('Actions', [
      'pipe',
    ]);
    taskServiceSpy = createSpyObj<TaskService>('TaskService', [
      'loadTask',
    ]);

    effects = new TaskEffects(
      actions$Spy,
      taskServiceSpy,
    );
  });

  it('should create effects', () => {
    expect(effects).toBeDefined();
  });
});
