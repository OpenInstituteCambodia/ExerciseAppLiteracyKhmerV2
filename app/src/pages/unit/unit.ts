import { Component } from '@angular/core';
import { Platform, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { NativeAudio,IsDebug } from 'ionic-native';
import { HelperPage } from '../helper/helper';

import { BaseController } from '../../components/base';
import { DebugController } from '../../components/debug';

@Component({
  selector: 'page-unit',
  templateUrl: 'unit.html'
})
export class UnitPage {
  // The following Variable can be editable
  // --------------------------------------
  /* Delay in milliseconds */ private delay = 500;
  /* Enable Animation Mode */ private isAnimateAllow = false;
  /* Delay Animation in milliseconds*/ private AnimateDelay = 500;
  /* Enable Helper Display Mode */ private isHelperAllow = false;
  // --------------------------------------
  // Please don't do stupid stuff out side of this area ;)

  public unitID;
  public unitTitle = '';
  private content;
  public triggerState = "help";
  private triggerEnable = false;
  private debugState = false;
  private imagePath: string;

  private animateOn;
  private hideAllExcept;
  private isNextButtonVisible;

  private MediaPlayer = new BaseController();
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private platform: Platform, public modalCtrl: ModalController) {
    this.unitID = this.navParams.get('unitID');
    typeof this.navParams.get('unitTitle') != 'undefined' ? this.unitTitle = this.navParams.get('unitTitle') : '';

    let storage = window.localStorage;
    this.imagePath = storage.getItem('imagePath');
  }

  // The following Function can be editable
  // --------------------------------------

    private unit(id) {
      this.navCtrl.push(
        UnitPage, {
          unitID: id
        }
      );
    }

    private replayButtonClick() {
      if(this.MediaPlayer.isSoundPlaying == true){
        return false;
      }
      if (this.triggerEnable == false) {
        return false;
      }
      if (this.isNextButtonVisible == true) {
        return false;
      }

      this.triggerAnimate('reset', 0);
      this.startUnitIntro();
    }

    private trigger(correct, choice) {
      if(this.MediaPlayer.isSoundPlaying == true){
        return false;
      }
      if (this.triggerEnable == false) {
        return false;
      }
      if (this.isNextButtonVisible == true) {
        return false;
      }

      this.triggerEnable = false;

      let playbackURL = this.content['choice_'+choice+'_audio'];
      let statusURL;
      let UnitNextAllow

      correct == choice ? statusURL = this.content['answer_correct_audio'] : statusURL = this.content['answer_wrong_audio'];
      correct == choice ? UnitNextAllow  = true : UnitNextAllow  = false;

      this.triggerAnimate('stage1', choice);

      setTimeout(() => {
        correct == choice ? this.triggerState = "happy" : this.triggerState = "sad";
      }, this.isHelperAllow == true ? this.AnimateDelay : 0);

      this.MediaPlayer.playSound('choice', playbackURL).then((stage1) => {
        console.log(stage1);
        this.triggerAnimate('stage2', choice);
        return new Promise((h, n) => {
          setTimeout(() => {
            h('HelperPage: Is Enabled, navigating...');
          }, this.isHelperAllow == true ? this.AnimateDelay*1.25 : 0);
        });
      }).then((stage2) => {
        if (this.isHelperAllow) {
          return new Promise((h, n) => {
            h('HelperPage: Is Enabled, navigating...');
          });
        }else{
          return this.MediaPlayer.playSound('choice', statusURL);
        }
      }).then((stage3) => {
        console.log(stage3);
        setTimeout(() => {
          correct == choice ? this.triggerAnimate('stage3', choice) : this.triggerAnimate('reset', choice);
        }, 1000);
        this.triggerEnable = true;
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

    private startUnitIntro() {
      setTimeout(() => {
        this.MediaPlayer.playSound('player1', this.content['audio_1'])
          .then((player1) => {
            console.log(player1);
            this.triggerEnable = true;
            return this.MediaPlayer.playSound('player1', this.content['audio_2']);
          }).then((player2) => {
            console.log(player2);
          })
        .catch((err) => { this.triggerEnable = true; console.log(err); });
      }, this.delay);
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

    this.startUnitIntro();
  }

  ionViewWillLeave() {
    if (this.debugState == false) {
      console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.");
      this.MediaPlayer.stopSoundComplex();
    }
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

  private triggerAnimate(property, option) {
    switch(property) {
      case 'stage1': // hide other options
        this.hideAllExcept = option;
        break;

      case 'stage2': // expand current option
        this.animateOn = option;
        break;

      case 'stage3': // Show next button on correct
        this.isNextButtonVisible = true;
        break;

      case 'stage4':

        break;

      case 'reset':
        this.hideAllExcept = null;
        this.animateOn = null;
        this.isNextButtonVisible = null;
        break;

    }
    console.log("private triggerAnimate("+property+", "+option+") {}");
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
      debugInterface: 'unit',
      unitContent: this.content
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
