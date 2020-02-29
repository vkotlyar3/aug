import { createSpyObj, SpyObj } from 'angular-unit-test-generator/testing-utils/jest';
import { FlowsService } from './flows.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app-state';
import { FlowFiltersService } from './flow-filters.service';
import { FlowSortingService } from './flow-sorting.service';
import { Whttp } from '../../shared/services/whttp.service';

describe('FlowsService', () => {
  let service: FlowsService;
  let store$Spy: SpyObj<Store<AppState>>;
  let flowFiltersServiceSpy: SpyObj<FlowFiltersService>;
  let flowSortingServiceSpy: SpyObj<FlowSortingService>;
  let whttpSpy: SpyObj<Whttp>;

  beforeEach(() => {
    store$Spy = createSpyObj<Store<AppState>>('Store', [
      'select',
      'dispatch',
    ]);
    flowFiltersServiceSpy = createSpyObj<FlowFiltersService>('FlowFiltersService', [
      'getFilters',
    ]);
    flowSortingServiceSpy = createSpyObj<FlowSortingService>('FlowSortingService', [
      'getSorting',
    ]);
    whttpSpy = createSpyObj<Whttp>('Whttp', [
      'get',
      'post',
      'delete',
      'put',
    ]);

    service = new FlowsService(
      store$Spy,
      flowFiltersServiceSpy,
      flowSortingServiceSpy,
      whttpSpy,
    );
  });

  it('should create service', () => {
    expect(service).toBeDefined();
  });

  describe('#getFlows', () => {
    it('should do smth', () => {
      service.getFlows();
    });
  });

  describe('#loadFlows', () => {
    it('should do smth', () => {
      service.loadFlows();
    });
  });

  describe('#getFlowById', () => {
    it('should do smth', () => {
      service.getFlowById();
    });
  });

  describe('#addFlow', () => {
    it('should do smth', () => {
      service.addFlow();
    });
  });

  describe('#removeFlow', () => {
    it('should do smth', () => {
      service.removeFlow();
    });
  });

  describe('#updateFlow', () => {
    it('should do smth', () => {
      service.updateFlow();
    });
  });
});
