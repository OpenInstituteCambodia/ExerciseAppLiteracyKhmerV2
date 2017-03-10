import { Component } from '@angular/core';
import { Platform, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { IsDebug } from 'ionic-native';

import { UnitPage } from '../unit/unit';
import { DebugController } from '../../components/debug';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  // The following Variable can be editable
  // --------------------------------------
  /* Main Menu Title */ public menuTitle = 'Exercise App Literacy Khmer';
  // --------------------------------------
  // Please don't do stupid stuff out side of this area ;)

  public menuID;
  private debugState = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private platform: Platform, public toastCtrl: ToastController, public modalCtrl: ModalController) {
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

  private playButtonClick() {
    let toast = this.toastCtrl.create({
      message: 'This application is demo version.',
      duration: 3000
    });
    toast.present();
  }

  private exitButtonClick() {
    let alert = this.alertCtrl.create({
      title: 'ចាកចេញ',
      message: 'តើ​អ្នក​ពិត​ជា​ចង់​ចាក​ចេញ​ពី​កម្មវិធី​នេះ?​',
      buttons: [
        {
          text: "ទេ",
          role: 'cancel'
        },
        {
          text: "បាទ​ / ចាស",
          handler: () => {
            this.platform.exitApp();
          }
        },
      ]
    });
    alert.present();
  }

  private toggleDebug() {
    this.debugState = true;
    let debugModal = this.modalCtrl.create(DebugController, {
      debugInterface: 'menu'
    });
    IsDebug.getIsDebug().then((isDebug) => {
      if (isDebug) {
        debugModal.present();
      }
    }).catch((err) => {
      if (err == 'cordova_not_available') {
        debugModal.present();
      }else {
        console.log('toggleDebug(): Something went wrong,', err);
      }
    });
  }
}
