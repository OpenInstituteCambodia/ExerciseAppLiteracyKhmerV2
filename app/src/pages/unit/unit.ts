import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from 'ionic-native';

@Component({
  selector: 'page-unit',
  templateUrl: 'unit.html'
})
export class UnitPage {

  // The following Variable can be editable
  // --------------------------------------
  /* Delay in milliseconds */ private delay = 500;
  // --------------------------------------
  // Please don't do stupid stuff out side of this area ;)

  public unitID;
  public soundPath;
  private content;
  private playbackURI = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let storage = window.localStorage;

    this.unitID = this.navParams.get('unitID');
    this.soundPath = storage.getItem('soundPath');
  }

  // The following Function can be editable
  // --------------------------------------
  /* Delay in milliseconds */
  private replaySound():Promise<any> {
    return new Promise((resolve, reject) => {

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
      this.playSound('player1', this.soundPath+'/Msg Question 1.mp3')
        .then((player1) => {
          console.log(player1);
          return this.playSound('player2', this.soundPath+'/Msg Question 2.mp3');
        }).then((player2) => {
          console.log(player2);
        })
      .catch((err) => { console.log(err); });
    }, this.delay);
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.");
    this.stopSoundComplex();
  }

  private Q(parent, attr) {
    let data = document.querySelector(
      parent
    ).getAttribute(attr);
    typeof data != 'string' ? data = '' : data = data;

    return data;
  }

  private playSound(id, filename):Promise<any> {
    if (location.protocol == 'http:') {
      return new Promise((gg, ff) => {
        ff('playSound(id, filename):Promise<any> {}: Playback is not allow on Desktop Browser at the moment.');
      });
    }

    return new Promise((resolve, reject) => {
      console.log('%cplaySound(' + id + ', ' + filename + '):Promise<any>', 'font-size: 14px;');
      this.playbackURI.push(id);
      NativeAudio.preloadComplex(id, filename, 1, 1, 0)
        .then((initialized) => {
          console.log('playSound(id, filename):Promise<any> {}: Playback initialized: ', initialized);
          return new Promise((rs, re) => {
            NativeAudio.play(id, (done) => {
              rs(done);
            });
          });
        })
        .then((finished) => {
          console.log('playSound(id, filename):Promise<any> {}: Playback finished: ', finished);
          let index = this.playbackURI.indexOf(id);
          this.playbackURI.splice(index, 1);
          return NativeAudio.unload(id);
        })
        .then((completed) => {
          resolve('playSound(id, filename):Promise<any> {}: Promise Resolved: ' + completed);
        })
      .catch((error) => {
        reject(new Error('playSound(id, filename):Promise<any> {}: Promise Rejected: ' + error));
      });
    });
  }

  private stopSound(uri):Promise<any> {
    return new Promise((resolve, reject) => {
      NativeAudio.stop(uri).then((suc) => {
        return NativeAudio.unload(uri);
      }).then((unloaded) => {
        resolve('stopSound(): Stopped and Unloaded' + unloaded);
      }).catch((err) => {
        reject(new Error("stopSound(): Something went wrong: " + err));
      });
    });
  }

  private stopSoundComplex() {
    if (location.protocol == 'http:') {
      return 'playSound(id, filename):Promise<any> {}: Playback is not allow on Desktop Browser at the moment.';
    }

    this.playbackURI.forEach((item) => {
      NativeAudio.stop(item).then((suc) => {
        let index = this.playbackURI.indexOf(item);
        this.playbackURI.splice(index, 1);
        NativeAudio.unload(item);
        console.log("stopSoundComplex(): Stopped and Unloaded: ", suc);
      }).catch((err) => {
        console.log("stopSoundComplex(): Something went wrong: ", err);
      });
    });
  }

}
