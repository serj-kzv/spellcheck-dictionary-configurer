import {Component, OnInit} from '@angular/core';
import {CfgService} from "../../../core/service/cfg.service";

@Component({
    selector: 'app-dict-list',
    templateUrl: './dict-list.component.html',
    styleUrls: ['./dict-list.component.scss']
})
export class DictListComponent implements OnInit {
    constructor(public cfgService: CfgService) {
    }

    ngOnInit() {
    }
}
