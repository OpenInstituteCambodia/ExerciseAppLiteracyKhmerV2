import { NgModule, ErrorHandler, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { SplachController } from './splash';
import { MenuPage } from '../pages/menu/menu';
import { UnitPage } from '../pages/unit/unit';
import { HelperPage } from '../pages/helper/helper';

// DatabaseService
import { DatabaseController } from './database';

// Debug Modules
import { DebugController } from '../debug/debug';
import { PlugableNavigate, PlugableDatabase } from '../debug/plugable/plugable';

@NgModule({
  declarations: [
    MyApp,
    SplachController,
    MenuPage,
    UnitPage,
    HelperPage,
    DebugController,
    PlugableNavigate,
    PlugableDatabase
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SplachController,
    MenuPage,
    UnitPage,
    HelperPage,
    DebugController,
    PlugableNavigate,
    PlugableDatabase
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, DatabaseController],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {}
