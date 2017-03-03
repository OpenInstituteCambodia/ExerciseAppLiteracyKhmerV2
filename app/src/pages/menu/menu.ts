import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Menu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  public menuID;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('menuID'));
    if (typeof this.navParams.get('menuID') == 'undefined') {
      this.menuID = 'root';
    } else {
      this.menuID = this.navParams.get('menuID');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  public menu(id) {
    this.navCtrl.push(
      MenuPage, {
        menuID: id
    });
  }

}
