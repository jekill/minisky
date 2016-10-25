// import './polyfills.ts';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppModule} from './app/';
import {bootloader} from '@angularclass/hmr';

if (__IS_PROD_MODE__) {
    enableProdMode();
}

function startApplication() {
    const platform = platformBrowserDynamic();
    platform.bootstrapModule(AppModule);
}


bootloader(startApplication);
