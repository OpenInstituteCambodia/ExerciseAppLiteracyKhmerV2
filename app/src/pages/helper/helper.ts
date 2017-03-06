import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitPage } from '../unit/unit';

@Component({
  selector: 'page-helper',
  templateUrl: 'helper.html'
})
export class HelperPage {
  public unitID;
  private isUnitNextAllow = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('Modal Params: ', this.navParams.get('unitID'))
    this.unitID = this.navParams.get('unitID');
    this.isUnitNextAllow = this.navParams.get('isUnitNextAllow');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelperPage');
  }

  private unit(id) {
    this.navCtrl.push(
      UnitPage, {
        unitID: id
      }
    );
  }

}
