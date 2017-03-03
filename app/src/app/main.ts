import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// Angular 2 is running in the development mode. Call enableProdMode() to enable the production mode.
// enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
