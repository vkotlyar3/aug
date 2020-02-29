import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Flow } from './../../models/flow';
import { FlowsService } from './../flows-service/flows.service';

@Component({
    selector: 'edit-flow-form',
    template: require('./edit-flow-form.html')
})
export class EditFlowComponent implements OnInit {
    flow: Flow;

    constructor(private flowsService: FlowsService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit() {
        this.flow = this.route.snapshot.data['flow'];
    }

    submit() {
        const id = this.route.snapshot.params['id'];
        this.flow.state = '57fe2bd1b0d5530dc8457d69';
        this.flowsService.updateFlow(id, this.flow)
            .then(() => this.back());

    }

    cancel() {
        this.back();
    }

    private back() {
        this.location.back();
    }
}
