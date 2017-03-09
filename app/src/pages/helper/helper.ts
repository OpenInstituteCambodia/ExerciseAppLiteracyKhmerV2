import { Component } from '@angular/core';
import { Platform, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { NativeAudio } from 'ionic-native';
import { MenuPage } from '../menu/menu';
import { UnitPage } from '../unit/unit';

import { BaseController } from '../../components/base';

@Component({
  selector: 'page-helper',
  templateUrl: 'helper.html'
})
export class HelperPage {
  public unitID;
  public unitNextID;
  private content;
  private isUnitNextAllow = false;
  private playURI;

  private MediaPlayer = new BaseController();
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private platform: Platform, public toastCtrl: ToastController) {
    this.unitID = this.navParams.get('unitID');
    this.unitNextID = this.navParams.get('unitNextID');
    this.isUnitNextAllow = this.navParams.get('isUnitNextAllow');
    this.playURI = this.navParams.get('playURI');
  }

  ionViewDidLoad() {
    this.startUnitIntro();
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.");
    this.MediaPlayer.stopSoundComplex();
  }

  private startUnitIntro() {
    setTimeout(() => {
      this.MediaPlayer.playSound('helper1', this.playURI)
      .then((player1) => {
        console.log(player1);
      }).catch((err) => { console.log(err); });
    }, 500);
  }

  private unit() {
    this.MediaPlayer.stopSoundComplex();
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

  private backButtonClick(){
    this.navCtrl.push(
      UnitPage, {
        unitID: this.unitID
      }
    );
  }

  private replayButtonClick() {
    this.startUnitIntro();
  }

  // private backButtonClick(){
  //   let confirm = this.alertCtrl.create({
  //     title: 'ចាកចេញ​ពីទំព័រនេះ?​',
  //     subTitle: '',
  //     buttons: [
  //       {
  //         text: 'បន្តសំនួរ',
  //         role: 'calcel'
  //       }, {
  //         text: 'ចាកចេញ',
  //         handler: () => {
  //           this.navCtrl.popToRoot();
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  //
  // }

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
    let toast = this.toastCtrl.create({
      message: 'Debugging is not available for this page!',
      duration: 3000
    });
    toast.present();
  }

}
