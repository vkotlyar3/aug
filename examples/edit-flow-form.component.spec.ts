import { createSpyObj, SpyObj } from 'angular-unit-test-generator/testing-utils/jest';
import { EditFlowComponent } from './edit-flow-form.component';
import { FlowsService } from './../flows-service/flows.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

describe('EditFlowComponent', () => {
  let component: EditFlowComponent;
  let flowsServiceSpy: SpyObj<FlowsService>;
  let routeSpy: SpyObj<ActivatedRoute>;
  let locationSpy: SpyObj<Location>;

  beforeEach(() => {
    flowsServiceSpy = createSpyObj<FlowsService>('FlowsService', [
      'updateFlow',
    ]);
    routeSpy = createSpyObj<ActivatedRoute>('ActivatedRoute', [

    ]);
    locationSpy = createSpyObj<Location>('Location', [
      'back',
    ]);

    component = new EditFlowComponent(
      flowsServiceSpy,
      routeSpy,
      locationSpy,
    );
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  describe('#ngOnInit', () => {
    it('should do smth', () => {
      component.ngOnInit();
    });
  });

  describe('#submit', () => {
    it('should do smth', () => {
      component.submit();
    });
  });

  describe('#cancel', () => {
    it('should do smth', () => {
      component.cancel();
    });
  });
});
