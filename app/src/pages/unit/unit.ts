import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

/*
  Generated class for the Unit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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
      this.playSound(this.soundPath+'/Msg Question 1.mp3').then(
        (suc) => {
          console.log(suc);
        }
      ).catch(
        (err) => {
          console.log(err);
        }
      );
    }, this.delay);
  }

  private playSound(array):Promise<any> {
    console.group('private playSound(array):Promise<any>');
      let deferred = new Promise((resolve, reject) => {
        if (location.protocol != 'http:') {
          let media = new MediaPlugin(array);
            media.init.then((suc) => {
              let msg = 'playSound(): -> Playback Success, ' + suc;

              console.log(msg);
              resolve(msg);
            }).catch((err) => {
              let msg = 'playSound(): -> Playback Error: ' + err;

              console.log(msg);
              reject(msg);
            });
        }else {
          let msg = 'playSound(): -> Playback is not support on browswer.';

          console.log(msg);
          reject(msg);
        }
      });
      console.log('playSound(): -> Promise Status', deferred);
    console.groupEnd();
    return deferred;
  }

}
