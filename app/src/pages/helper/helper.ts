import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Helper page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-helper',
  templateUrl: 'helper.html'
})
export class HelperPage {
  public unitID;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('Modal Params: ', this.navParams.get('unitID'))
    this.unitID = this.navParams.get('unitID');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelperPage');
  }

}
