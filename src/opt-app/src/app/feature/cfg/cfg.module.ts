import {NgModule} from '@angular/core';
import {CfgComponent} from './cfg.component';
import {DictListComponent} from './dict-list/dict-list.component';
import {AddDictComponent} from './add-dict/add-dict.component';
import {DictEditorComponent} from './dict-editor/dict-editor.component';
import {DictItemComponent} from './dict-item/dict-item.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [CfgComponent, DictListComponent, AddDictComponent, DictEditorComponent, DictItemComponent],
    exports: [
        CfgComponent
    ],
    imports: [
        SharedModule,
    ]
})
export class CfgModule {
}
