import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Debug page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-debug',
  template: `
    <ion-header>
      <ion-navbar hideBackButton>
        <button ion-button icon-only menuToggle navPop>
          <ion-icon name="close"></ion-icon>
        </button>
        <ion-title>Debugging</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content padding>
    
    </ion-content>
  `
})
export class DebugController {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebugPage');
  }

}
