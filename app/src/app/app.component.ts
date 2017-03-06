import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, BackgroundMode } from 'ionic-native';

import { MenuPage } from '../pages/menu/menu';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = MenuPage;
  config: Array<any> = [{ // Don't forget its index [0]
    sounds: 'assets/files/sounds/',
    images: 'assets/files/images/'
  }];

  constructor(platform: Platform) {
    platform.ready().then(() => {
      if (location.protocol != 'http:') {
        StatusBar.styleDefault();
        Splashscreen.hide();
        BackgroundMode.enable();
      }
    });
    // Storage Configuration
    let storage = window.localStorage;

    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.

    storage.setItem('soundPath', this.config[0].sounds);
    storage.setItem('imagePath', this.config[0].images);
  }
}
