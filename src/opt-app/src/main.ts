import 'hammerjs';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

// TODO: it's a dirty hack to disable console.debug in a prod mode, use angular-builders to customize webpack and terser configs
// see example: https://github.com/just-jeb/angular-builders
// see about angular-builders:
//    https://angular.io/guide/cli-builder
//    https://blog.angular.io/introducing-cli-builders-d012d4489f1b
//    https://blog.angularindepth.com/angular-cli-under-the-hood-builders-demystified-v2-e73ee0f2d811
if (environment.production && window) {
    window.console.debug = () => {
    };
}

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
