import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  LoadTaskError, LoadTaskSuccess, TaskActions,
  TaskActionTypes
} from '@app/task/store/task.actions';
import { TaskService } from '@app/task/services/task-aggregation.service';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/internal/operators';
import { TaskListDto } from '@app/task/models/tasks-list-dto.model';

@Injectable()
export class TaskEffects {
  @Effect()
  loadTask$ = this.actions$.pipe(
    ofType(TaskActionTypes.LoadTask),
    switchMap(() => this.taskService.loadTask()
      .pipe(
        map((tasks: TaskListDto) => LoadTaskSuccess({ payload: tasks })),
        catchError((error: Error) => {
          console.error(error);
          return of(LoadTaskError());
        })
      )),
  );

  constructor(
    private actions$: Actions<TaskActions>,
    private taskService: TaskService,
  ) {
  }
}
