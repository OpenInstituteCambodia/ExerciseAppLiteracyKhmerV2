import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { UnitPage } from '../unit/unit';

@Component({
  selector: 'page-helper',
  templateUrl: 'helper.html'
})
export class HelperPage {
  public unitID;
  public unitNextID;
  private isUnitNextAllow = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('Modal Params: ', this.navParams.get('unitID'))
    this.unitID = this.navParams.get('unitID');
    this.unitNextID = this.navParams.get('unitNextID');
    this.isUnitNextAllow = this.navParams.get('isUnitNextAllow');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelperPage');
  }

  private unit() {
    if (this.unitNextID == 'root' ){
      this.navCtrl.popToRoot();
      return false;
    }else{
      this.navCtrl.push(
        UnitPage, {
          unitID: this.unitNextID
        }
      );
    }
  }

}
