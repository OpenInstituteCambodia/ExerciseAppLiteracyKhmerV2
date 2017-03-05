import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitPage } from '../unit/unit';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  // The following Variable can be editable
  // --------------------------------------
  /* Main Menu Title */ public menuTitle = 'ជីវវិទ្យា​ ថ្នាក់​ទី​១២';
  // --------------------------------------
  // Please don't do stupid stuff out side of this area ;)

  public menuID;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    typeof this.navParams.get('menuID') == 'undefined' ? this.menuID = 'root' : this.menuID = this.navParams.get('menuID');
    typeof this.navParams.get('title') != 'undefined' ? this.menuTitle = this.navParams.get('title') : true;
  }

  ionViewDidLoad() {
    console.log('%cMenu ID: ' + this.menuID ,'font-size: 18px;');
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
