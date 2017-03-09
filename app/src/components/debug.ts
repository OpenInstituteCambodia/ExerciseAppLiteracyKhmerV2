import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

import { UnitPage } from '../pages/unit/unit';

@Component({
  selector: 'page-debug',
  template: `
    <ion-header>
      <ion-navbar hideBackButton color="danger">
        <button ion-button icon-only menuToggle navPop>
          <ion-icon name="close"></ion-icon>
        </button>
        <ion-title>Debugging</ion-title>
        <ion-buttons end>
          <button ion-button icon-only (click)="clearHistory()">
            <ion-icon name="refresh"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <div *ngIf="debugInterface == 'menu'">
        <ion-item-group>
          <ion-item-divider color="light">Route</ion-item-divider>
          <ion-item>
            <ion-label floating>Unit ID</ion-label>
            <ion-input #routeID type="text" id="routeID"></ion-input>
          </ion-item>
          <div padding>
            <button ion-button block (click)="go(routeID.value)">Go</button>
          </div>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider color="light">History</ion-item-divider>
          <ion-item *ngFor="let item of debugHistory; let i = index" (click)="route(item)">
            {{item}}
          </ion-item>
          <ion-item *ngIf="debugHistory.length == 0">
            No History Log Available
          </ion-item>
        </ion-item-group>
      </div>

      <ion-item-group *ngIf="debugInterface == 'unit'">
        <ion-item-divider color="light">
          <h1>Unit ID: {{content['unit_id']}}</h1>
        </ion-item-divider>
          <ion-item>
            Audio 1: {{content['audio_1']}}
          </ion-item>
          <ion-item>
            Audio 2: {{content['audio_2']}}
          </ion-item>

        <ion-item-divider color="light">
          <h2>Correct/Wrong Audio:</h2>
        </ion-item-divider>
          <ion-item>
            Correct Audio: {{content['answer_correct_audio']}}
          </ion-item>
          <ion-item>
            Wrong Audio: {{content['answer_wrong_audio']}}
          </ion-item>

        <ion-item-divider color="light">
          <h2>Choices Audio:</h2>
        </ion-item-divider>
          <ion-item>
            Choice 1: {{content['choice_1_audio']}}
          </ion-item>
          <ion-item>
            Choice 2: {{content['choice_2_audio']}}
          </ion-item>
          <ion-item>
            Choice 3: {{content['choice_3_audio']}}
          </ion-item>
          <ion-item>
            Choice 4: {{content['choice_4_audio']}}
          </ion-item>
      </ion-item-group>

    </ion-content>
  `
})
export class DebugController {

  private debugInterface = 'menu';
  private debugHistory: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initDebugData();
  }

  ionViewDidLoad() {
    console.log('%c!! Debugging Mode Triggered !!', 'font-size: 18px; color: red;');
  }

  private initDebugData() {
    let storage = window.localStorage;
    if (storage.getItem('debugHistory') != '') {
      this.debugHistory = storage.getItem('debugHistory').split(',');
    }else{
      this.debugHistory = [];
    }
  }

  private go(id){
    this.saveHistory(id);
    this.route(id);
  }

  private route(id){
    console.log('Render new debugHistory', this.debugHistory);
    this.navCtrl.push(
      UnitPage, {
        unitID: id
      }
    );
  }

  private saveHistory(id) {

    if (id == '') {
      return false;
    }

    let storage = window.localStorage;
    if(this.debugHistory.indexOf(id) == -1) {
      this.debugHistory.push(id);
      storage.setItem('debugHistory', this.debugHistory.toString());
    }

    console.log('index of this id', this.debugHistory.indexOf(id));
  }

  private removeHistory(id) {

  }

  private clearHistory() {
    let storage = window.localStorage;
    this.debugHistory = [];
    storage.setItem('debugHistory', '');
    this.initDebugData();
  }

}
