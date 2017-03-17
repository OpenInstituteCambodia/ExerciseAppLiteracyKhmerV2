import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from 'ionic-native';

import { MenuPage } from '../pages/menu/menu';

@Component({
  selector: 'page-splash',
  template: `
    <ion-content padding Splashscreen>
      <ion-grid middle>
        <ion-row wrap>
          <ion-col width-20>
            <ion-icon name="ionic" color="primary"></ion-icon>
          </ion-col>
          <ion-col width-80 text>
            សូម​រង់​ចាំ​...
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `
})
export class SplachController {
  private fadeOut: boolean = false;
  private delay: boolean = true;
  private alwayUpdateDatabase: boolean = true;

  private platformStorage;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.init();
  }

  private init() {
    this.setup();
    this.databaseCheck();
  }

  private setup() {
    let storage = window.localStorage;
    storage.setItem('path_sounds', 'assets/files/sounds/');
    storage.setItem('path_images', 'assets/files/images/');
    this.checkStorage();
  }

  private checkStorage() {
    switch(cordova.platformId) {
      case 'browser':
        this.platformStorage = cordova.file.dataDirectory;
        break;
      case 'android':
        this.platformStorage = cordova.file.applicationStorageDirectory;
        break;
    }
  }

  private databaseCheck() {
    // Create Database folder
    File.createDir(
      this.platformStorage,
      'databases',
      false
    ).then( suc => console.log(suc) ).catch( err => console.log(err));

    // Checking for existing database, or copying new database over
    File.listDir(
      this.platformStorage,
      'databases'
    ).then((checkSuc) => {
      console.log("Database Check: Success!, ", checkSuc);
      let file = checkSuc;

      if (file.length == 0) {
        console.log("Database Check: No Database found, Copying...");
        return File.copyFile(
          cordova.file.applicationDirectory+'www',
          'appdata.db',
          this.platformStorage+'databases',
          'appdata.db'
        );
      } else {
        return new Promise((resolve, reject) => {
          this.delay = false;
          resolve("Database Check: Database already exist!!!");
        });
      }
    }).then((databaseReady) => {
      this.fadeOut = true;
      console.log("Database Check: Completed, Navigating page...");
      setTimeout(() => {
        this.navCtrl.setRoot(
          MenuPage
        );
      }, this.delay ? 500 : 0);
    }).catch( err => console.log("Database Check: Error, ", err) );
  }
}
