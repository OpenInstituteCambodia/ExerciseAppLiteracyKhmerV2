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

  // The following Variable can be editable
  // --------------------------------------
  /* Main Menu Title */ public menuTitle = 'ជីវវិទ្យា​ ថ្នាក់​ទី​១២';
  // --------------------------------------
  // Please don't do stupid stuff out side of this area ;)

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    typeof this.navParams.get('menuID') == 'undefined' ? this.menuID = 'root' : this.menuID = this.navParams.get('menuID');
    typeof this.navParams.get('title') != 'undefined' ? this.menuTitle = this.navParams.get('title') : true;

    console.log('%cMenu ID: ' + this.menuID ,'font-size: 18px;');
  }

  ionViewDidLoad() {

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
