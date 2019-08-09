import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        BrowserModule,
        HttpClientModule,
        RouterModule
    ],
    exports: [
        // modules
        SharedModule,
        BrowserModule,
        HttpClientModule,
        RouterModule
    ]
})
export class CoreModule {
}
