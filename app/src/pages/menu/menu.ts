import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitPage } from '../unit/unit';

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
  public menuTitle = 'ជីវវិទ្យា​ ថ្នាក់​ទី​១២';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (typeof this.navParams.get('menuID') == 'undefined') {
      this.menuID = 'root';
    } else {
      this.menuID = this.navParams.get('menuID');
    }

    if (typeof this.navParams.get('title') != 'undefined') {
      this.menuTitle = this.navParams.get('title');
    }
    console.log('Menu ID: ', this.menuID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  public menu(id, title) {
    this.navCtrl.push(
      MenuPage, {
        menuID: id,
        title: title
    });
  }

  public unit(id) {
    this.navCtrl.push(
      UnitPage, {
        unitID: id
      }
    );
  }
}
