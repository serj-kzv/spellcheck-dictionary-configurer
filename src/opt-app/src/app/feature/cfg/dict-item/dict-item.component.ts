import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CfgService} from "../../../core/service/cfg.service";
import {NgForm} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

@Component({
    selector: 'app-dict-item',
    templateUrl: './dict-item.component.html',
    styleUrls: ['./dict-item.component.scss']
})
export class DictItemComponent implements OnInit {
    @Input() specificCfg: SpecificElementMutatorCfg;
    @Input() idx;
    @ViewChild('ruleForm', {static: false}) ruleForm: NgForm;

    constructor(public cfgService: CfgService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        console.debug('ngAfterViewInit');
        console.debug('ngAfterViewInit, ruleForm', this.ruleForm);
        this.ruleForm.form.valueChanges
            .pipe(
                debounceTime(500)
            )
            .subscribe(formChange => {
                console.debug('formChange', formChange);
                this.cfgService.updCfgTxtFromCfg();
                this.cfgService.saveCfg();
            });
    }

    deleteRuleBtnAction(idx) {
        this.cfgService.cfg.specificElementMutatorCfgs.splice(idx, 1);
        this.cfgService.updCfgTxtFromCfg();
        this.cfgService.saveCfg();
    }

}
