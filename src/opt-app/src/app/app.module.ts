import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatRadioModule} from "@angular/material";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CoreModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatRadioModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
