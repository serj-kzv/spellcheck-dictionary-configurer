import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatFormFieldModule} from "@angular/material";
import {MatInputModule} from "@angular/material";
import {MatSelectModule} from "@angular/material";

@NgModule({
    declarations: [],
    imports: [
        // modules
        CommonModule,
        ReactiveFormsModule,
        FormsModule,

        // material modules
        MatGridListModule,
        MatButtonModule,
        TextFieldModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    exports: [
        // modules
        CommonModule,
        ReactiveFormsModule,
        FormsModule,

        // material modules
        MatGridListModule,
        MatButtonModule,
        TextFieldModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ]
})
export class SharedModule {
}
