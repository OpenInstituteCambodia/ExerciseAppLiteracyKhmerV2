import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from 'ionic-native';
import { MenuPage } from '../menu/menu';
import { UnitPage } from '../unit/unit';

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
      this.playSound('player1', this.playURI)
      .then((player1) => {
        console.log(player1);
      }).catch((err) => { console.log(err); });
    }, 500);
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.");
    this.stopSoundComplex();
  }

  private unit() {
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

  private playSound(id, filename):Promise<any> {
    if (location.protocol == 'http:') {
      return new Promise((gg, ff) => {
        gg('playSound(id, filename):Promise<any> {}: Playback is not allow on Desktop Browser at the moment.');
      });
    }

    if (filename == '') {
      return new Promise((pass, skip) => {
        skip('playSound(id, filename):Promise<any> {}: No Parameter Passing throught, skipping...');
      });
    }

    if (this.isSoundPlaying == true) {
      return new Promise((pass, skip) => {
        skip('playSound(id, filename):Promise<any> {}: Playback is in progress, please wait until it finished before playing...');
      });
    }

    return new Promise((resolve, reject) => {
      console.log('%cplaySound(' + id + ', ' + filename + '):Promise<any>', 'font-size: 14px;');
      this.playbackURI.push(id);
      this.isSoundPlaying = true;
      NativeAudio.preloadComplex(id, this.soundPath+filename, 1, 1, 0)
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
          this.isSoundPlaying = false;
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
