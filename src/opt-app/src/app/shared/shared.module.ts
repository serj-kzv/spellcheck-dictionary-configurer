import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
    declarations: [],
    imports: [
        // modules
        CommonModule,
        ReactiveFormsModule,
        FormsModule,

        // material modules
        MatGridListModule,
    ],
    exports: [
        // modules
        CommonModule,
        ReactiveFormsModule,
        FormsModule,

        // material modules
        MatGridListModule,
    ]
})
export class SharedModule {
}
