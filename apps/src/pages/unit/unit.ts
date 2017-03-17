import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { DatabaseController } from '../../app/database';
import { PlaybackController } from '../../app/playback';

@Component({
  selector: 'page-unit',
  templateUrl: 'unit.html'
})
export class UnitPage {
  public unit;

  private _path_images: string;
  private _path_sounds: string;
  private _disableTrigger: boolean = false;
  private _isCorrect: boolean = false;
  private _selectedTriggerIndex: number;
  private _mediaplayer = new PlaybackController();
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private _db: DatabaseController, private alertCtrl: AlertController, private platform: Platform) {
    this.unit = this.navParams.get('data');

    this._path_images = window.localStorage.getItem('path_images');
    this._path_sounds = window.localStorage.getItem('path_sounds');
  }

  ionViewDidLoad() {
    this.init();
  }

  private init() {
    this._disableTrigger = true;
    this._mediaplayer.playSound(this.unit.unit_audio_1)
      .then((audio_primary) => {
        console.log(audio_primary);
        if (this.unit.unit_audio_2 != '') {
          return this._mediaplayer.playSound(this.unit.unit_audio_2);
        }else{
          return new Promise((resolve, reject) => resolve('Nothing else to play... lolz'));
        }
      }).then((audio_secondary) => {
        console.log(audio_secondary);
        this._disableTrigger = false;
      }).catch( err => console.log(err));
  }

  private trigger(index) {
    if (this._disableTrigger) { return false; }
    if (this._isCorrect) { return false; }
    this._disableTrigger = true;
    this._selectedTriggerIndex = index;
    this._mediaplayer.playSound(this.unit['choice_'+index+'_audio'])
      .then((audio_primary) => {
        return this._mediaplayer.playSound(this.unit.choice_correct_id == index ? this.unit.choice_correct_audio : this.unit.choice_wrong_audio);
      }).then((audio_secondary) => {
        this.unit.choice_correct_id == index ? this._isCorrect = true : this._isCorrect = false;
        this.unit.choice_correct_id == index ? this._selectedTriggerIndex = index : this._selectedTriggerIndex = null;
        this._disableTrigger = false;
      }).catch( err => console.log(err) );
  }

  private navigate(uri) {
    let pending = this.loadingCtrl.create({
      spinner: 'dots'
    });
    pending.present();
    this._db.executeSQL("SELECT * FROM units WHERE unit_id == '"+uri+"'", []).then((unitData) => {
      console.log(unitData.rows.item(0));
      this.navCtrl.push(
        UnitPage, {
          data: unitData.rows.item(0)
        }
      );
      pending.dismiss();
    });

  }

  private backButtonClick(){
    let confirm = this.alertCtrl.create({
      title: 'ចាកចេញ​ពីទំព័រនេះ?​',
      subTitle: '',
      buttons: [
        {
          text: 'បន្តសំនួរ',
          role: 'calcel'
        }, {
          text: 'ចាកចេញ',
          handler: () => {
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    confirm.present();

  }

  private replayButtonClick() {
    if (this._disableTrigger) { return false; }

    // Replaying Unit
    this.init();

    // reseting button
    this._selectedTriggerIndex = null;
    this._isCorrect = false;
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

}
