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
