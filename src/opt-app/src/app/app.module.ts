import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CfgModule} from "./feature/cfg/cfg.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CoreModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CfgModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
