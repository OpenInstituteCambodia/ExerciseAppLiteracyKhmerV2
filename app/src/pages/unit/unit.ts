import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

/*
  Generated class for the Unit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-unit',
  templateUrl: 'unit.html'
})
export class UnitPage {
  public unitID;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.unitID = this.navParams.get('unitID');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnitPage');
    console.log('Unit ID: ', this.unitID);
  }

  private playSound(array):Promise<any> {
    return new Promise((resolve, reject) => {
      if (array > 0) {
        resolve(array);
      } else {
        reject("Jected");
      }
    });
  }

}
