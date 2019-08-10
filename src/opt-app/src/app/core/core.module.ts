import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [],
    imports: [
        // modules
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule
    ],
    exports: [
        // modules
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule
    ]
})
export class CoreModule {
}
