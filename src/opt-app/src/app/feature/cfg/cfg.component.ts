import {Component, OnInit} from '@angular/core';
import {CfgService} from "../../core/service/cfg.service";

@Component({
    selector: 'app-cfg',
    templateUrl: './cfg.component.html',
    styleUrls: ['./cfg.component.scss']
})
export class CfgComponent implements OnInit {
    aInitFn = async () => {
        await this.cfgService.initCfg();
        this.cfgService.updCfgTxtFromCfg();
        console.debug('cfgService', this.cfgService);
    };

    constructor(public cfgService: CfgService) {
    }

    ngOnInit(): void {
        this.aInitFn();
    }
}