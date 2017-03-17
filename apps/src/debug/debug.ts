import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlugableNavigate, PlugableDatabase } from './plugable/plugable';

@Component({
  selector: 'page-debug',
  template: `
    <ion-header>
      <ion-navbar color="danger">
        <ion-title>Application Debugging</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-item-group>
        <ion-item-divider color="danger">Tools</ion-item-divider>
        <ion-item (click)="debugNavigate()">Navigate</ion-item>
        <ion-item (click)="debugDatabase()">Database</ion-item>
        <ion-item (click)="debugUnitTesting()">Unit Testing</ion-item>
        <ion-item (click)="debugLogs()">Logs</ion-item>
      </ion-item-group>
    </ion-content>
  `
})
export class DebugController {
  private platformStorage;

  constructor(public navCtrl: NavController) {

  }

  private debugNavigate() {
    this.navCtrl.push(PlugableNavigate);
  }
  private debugDatabase() {
    this.navCtrl.push(PlugableDatabase);
  }
  private debugUnitTesting() {}
  private debugLogs() {}


}
