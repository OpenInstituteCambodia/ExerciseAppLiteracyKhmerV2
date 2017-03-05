import { NgModule, ErrorHandler, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MenuPage } from '../pages/menu/menu';
import { UnitPage } from '../pages/unit/unit';

@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    UnitPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage,
    UnitPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {}
