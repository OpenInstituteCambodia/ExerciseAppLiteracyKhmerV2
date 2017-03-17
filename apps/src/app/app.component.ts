
import { Component, enableProdMode } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite, File, IsDebug } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { SplachController } from './splash';

enableProdMode();

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage = SplachController;
  constructor(private platform: Platform, private loadingCtrl: LoadingController) {
    this.init();
  }

  private init() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

    }).catch( err => console.log(err) );
  }
}
