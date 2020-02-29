import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';

import { Flow } from '../../models/flow';
import { AppState } from '../../models/app-state';
import { Whttp } from '../../shared/services/whttp.service';
import { FlowFiltersService } from './flow-filters.service';
import { FlowSortingService } from './flow-sorting.service';

export const ENDPOINT_FLOWS = '/api/flows';

@Injectable()
export class FlowsService {
  private flows: Flow[] = [];
  tasks$ = this.store$.select((store: any) => store.tasks);

  constructor(private store$: Store<AppState>,
              private flowFiltersService: FlowFiltersService,
              private flowSortingService: FlowSortingService,
              private whttp: Whttp) {
  }

  getFlows(): Promise<Flow[]> {
    return this.loadFlows();
  }

  loadFlows(): Promise<Flow[]> {
    const filters = this.flowFiltersService.getFilters();
    const sorting = this.flowSortingService.getSorting();
    return this.whttp.get(ENDPOINT_FLOWS, filters, sorting)
      .toPromise()
      .then(this.handleData)
      .then(this.saveFlowsInStore)
      .catch(this.handleError);
  }

  getFlowById(id: String): Promise<Flow> {
    return this.whttp.get(`${ENDPOINT_FLOWS}/${id}`)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }

  addFlow(flow: Flow) {
    delete flow._id;
    return this.whttp.post(ENDPOINT_FLOWS, flow)
      .toPromise()
      .then(this.handleData)
      .then(this.addFlowInStore)
      .catch(this.handleError);
  }

  removeFlow(id: number) {
    return this.whttp.delete(`${ENDPOINT_FLOWS}/${id}`)
      .toPromise()
      .then(() => {
        this.removeFlowFromStore(id);
      })
      .catch(this.handleError);
  }

  updateFlow(id: number, flow: Flow) {
    return this.whttp.put(`${ENDPOINT_FLOWS}/${id}`, flow)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }

  private findFlowById(id: number): Flow {
    return this.flows.find(flow => id === flow._id);
  }

  private saveFlowsInStore(flows: Flow[]): Flow[] {
    this.flows = flows;
    this.store$.dispatch('Save Flow');
    return this.flows;
  }

  private addFlowInStore(flow: Flow) {
    this.flows.push(flow);
  }

  private removeFlowFromStore(id: number) {
    const flow = this.findFlowById(id);
    const index = this.flows.indexOf(flow);
    if (index > -1) {
      this.flows.splice(index, 1);
    }
  }

  private handleData(response: Response) {
    return response.json();
  }

  private handleError(error: any) {
    let errMsg = (error.message)
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';

    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
