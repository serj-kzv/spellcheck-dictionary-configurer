import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {TextFieldModule} from '@angular/cdk/text-field';
import {
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule,
    MatTreeModule
} from "@angular/material";

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
        MatCardModule,
        MatSlideToggleModule,
        MatExpansionModule,
        MatIconModule,
        MatRadioModule,
        MatToolbarModule,
        MatTableModule,
        MatListModule,
        MatTreeModule,
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
        MatCardModule,
        MatSlideToggleModule,
        MatExpansionModule,
        MatIconModule,
        MatRadioModule,
        MatToolbarModule,
        MatTableModule,
        MatListModule,
        MatTreeModule,

        // directives
    ]
})
export class SharedModule {
}
