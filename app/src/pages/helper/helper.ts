import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  public soundPath;
  private content;
  private playbackURI = [];
  private isUnitNextAllow = false;
  private isSoundPlaying = false;
  private playURI;

  private MediaPlayer = new BaseController();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('Modal Params: ', this.navParams.get('unitID'))
    this.unitID = this.navParams.get('unitID');
    this.unitNextID = this.navParams.get('unitNextID');
    this.isUnitNextAllow = this.navParams.get('isUnitNextAllow');
    this.playURI = this.navParams.get('playURI');

    let storage = window.localStorage;
    this.soundPath = storage.getItem('soundPath');
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.MediaPlayer.playSound('helper1', this.playURI)
      .then((player1) => {
        console.log(player1);
      }).catch((err) => { console.log(err); });
    }, 500);
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.");
    this.MediaPlayer.stopSoundComplex();
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

}
