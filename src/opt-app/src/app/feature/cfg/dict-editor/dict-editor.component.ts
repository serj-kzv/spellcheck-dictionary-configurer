import {Component, OnInit} from '@angular/core';
import {CfgService} from "../../../core/service/cfg.service";

@Component({
    selector: 'app-dict-editor',
    templateUrl: './dict-editor.component.html',
    styleUrls: ['./dict-editor.component.scss']
})
export class DictEditorComponent implements OnInit {

    constructor(public cfgService: CfgService) {
    }

    ngOnInit() {
    }
}
