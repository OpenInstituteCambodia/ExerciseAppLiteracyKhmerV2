import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from 'ionic-native';

@Component({
  selector: 'page-unit',
  templateUrl: 'unit.html'
})
export class UnitPage {
  public unitID;
  public soundPath;
  private delay = 500; // Delay in milliseconds

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let storage = window.localStorage;

    this.unitID = this.navParams.get('unitID');
    this.soundPath = storage.getItem('soundPath');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnitPage');
    console.log('Unit ID: ', this.unitID);
    console.log('soundPath: ', this.soundPath);

    setTimeout(() => {
      this.playSound('player1', this.soundPath+'/Msg Question 1.mp3').then((player1) => {
        console.log(player1);
        return this.playSound('player2', this.soundPath+'/Msg Question 2.mp3');
      }).then((player2) => {
        console.log(player2);
      })
      .catch((err) => { console.log(err); });
    }, this.delay);
  }

  private playSound(id, filename):Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('%cplaySound(' + id + ', ' + filename + '):Promise<any>', 'font-size: 14px;');
      NativeAudio.preloadComplex(id, filename, 1, 1, 0)
        .then((initialized) => {
          console.log('playSound(id, filename):Promise<any> {}: Playback initialized: ', initialized);
          // return NativeAudio.play(id, (done) => {return done});
          let d = new Promise((rs, re) => {
            NativeAudio.play(id, (done) => {
              rs(done);
            });
          });
          return d;
        })
        .then((finished) => {
          console.log('playSound(id, filename):Promise<any> {}: Playback finished: ', finished);
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

}
