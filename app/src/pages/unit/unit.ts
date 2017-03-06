import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeAudio } from 'ionic-native';
import { HelperPage } from '../helper/helper';

import { BaseController } from '../../components/base';

@Component({
  selector: 'page-unit',
  templateUrl: 'unit.html'
})
export class UnitPage {
  // The following Variable can be editable
  // --------------------------------------
  /* Delay in milliseconds */ private delay = 500;
  /* Enable Helper Display Mode */ private isHelperAllow = true;
  // --------------------------------------
  // Please don't do stupid stuff out side of this area ;)

  public unitID;
  public unitTitle = '';
  private content;

  private MediaPlayer = new BaseController();
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.unitID = this.navParams.get('unitID');
    typeof this.navParams.get('unitTitle') != 'undefined' ? this.unitTitle = this.navParams.get('unitTitle') : '';
  }

  // The following Function can be editable
  // --------------------------------------
    private replaySound():Promise<any> {
      return new Promise((resolve, reject) => {

      });
    }

    private trigger(correct, choice) {
      let playbackURL = this.content['choice_'+choice+'_audio'];
      let statusURL;

      correct == choice ? statusURL = this.content['answer_correct_audio'] : statusURL = this.content['answer_wrong_audio'];
      let UnitNextAllow
      correct == choice ? UnitNextAllow  = true : UnitNextAllow  = false;

      this.MediaPlayer.playSound('choice', playbackURL).then((stage1) => {
        console.log(stage1);

        if (this.isHelperAllow) {
          return new Promise((h, n) => {
            h('HelperPage: Is Enabled, navigating...');
          });
        }else{
          return this.MediaPlayer.playSound('choice', statusURL);
        }
      }).then((stage2) => {
        console.log(stage2);
        if (this.isHelperAllow) {
          this.navCtrl.push(
            HelperPage, {
              unitID: this.content['unit_id'],
              unitNextID: this.content['unit_next_id'],
              isUnitNextAllow: UnitNextAllow,
              playURI: statusURL
            }
          );
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  // --------------------------------------
  // Please don't do stupid stuff out side of this area ;)

  ionViewDidLoad() {
    console.log('%cUnit ID: ' + this.unitID, 'font-size: 18px;');

    // Parsing data from HTML View
    // --------------------------------------------------------------------
    /* Getting Main Unit element*/ let unit = 'unit[id="'+this.unitID+'"]';
    // --------------------------------------------------------------------
    // Children Element within that Unit element
    this.content = {
      'unit_id': this.unitID,
      'unit_next_id': this.Q(unit, 'unit-next'),
      'audio_1': this.Q(unit, 'audio-1'),
      'audio_2': this.Q(unit, 'audio-2'),
      'answer_correct_audio': this.Q(unit+' [choice-correct-answer]', 'choice-correct-answer'),
      'answer_wrong_audio': this.Q(unit+' [choice-wrong-answer]', 'choice-wrong-answer'),
      'choice_1_audio': this.Q(unit+' [choice-1-audio]', 'choice-1-audio'),
      'choice_2_audio': this.Q(unit+' [choice-2-audio]', 'choice-2-audio'),
      'choice_3_audio': this.Q(unit+' [choice-3-audio]', 'choice-3-audio'),
      'choice_4_audio': this.Q(unit+' [choice-4-audio]', 'choice-4-audio'),
    };
    // Done parsing!!!

    // Logging the Unit Content
    console.group('Initialized UNIT DATA');
      console.log( "%cDisplaying UNIT: "+this.content['unit_id'], 'font-size: 20px;' );
      console.log( "%cUnit Next ID: "+this.content['unit_next_id'], 'font-size: 16px;' );

      console.log( "%cAudio 1: "+this.content['audio_1'], 'font-size: 16px;' );
      console.log( "%cAudio 2: "+this.content['audio_2'], 'font-size: 16px;', );

      console.log( "%cCorrect Audio: "+this.content['answer_correct_audio'], 'font-size: 16px;' );
      console.log( "%cWrong Audio: "+this.content['answer_wrong_audio'], 'font-size: 16px;' );

      console.log( "%cChoice 1: "+this.content['choice_1_audio'], 'font-size: 16px;' );
      console.log( "%cChoice 2: "+this.content['choice_2_audio'], 'font-size: 16px;' );
      console.log( "%cChoice 3: "+this.content['choice_3_audio'], 'font-size: 16px;' );
      console.log( "%cChoice 4: "+this.content['choice_4_audio'], 'font-size: 16px;' );
    console.groupEnd();

    setTimeout(() => {
      this.MediaPlayer.playSound('player1', this.content['audio_1'])
        .then((player1) => {
          console.log(player1);
          return this.MediaPlayer.playSound('player1', this.content['audio_2']);
        }).then((player2) => {
          console.log(player2);
        })
      .catch((err) => { console.log(err); });
    }, this.delay);
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.");
    this.MediaPlayer.stopSoundComplex();
  }

  private Q(parent, attr) {
    let dom = document;
    let parentData = dom.querySelector(parent);
    let arrtData = '';
    if (parentData != null) {
      arrtData = parentData.getAttribute(attr);
    }
    return arrtData;
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

}
