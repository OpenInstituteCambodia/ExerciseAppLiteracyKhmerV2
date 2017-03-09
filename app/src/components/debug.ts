import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Debug page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-debug',
  template: `
    <ion-header>
      <ion-navbar hideBackButton color="danger">
        <button ion-button icon-only menuToggle navPop>
          <ion-icon name="close"></ion-icon>
        </button>
        <ion-title>Debugging</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <div *ngIf="debugInterface == 'menu'">
        <ion-item-group>
          <ion-item-divider color="light">Route</ion-item-divider>
          <ion-item>
            <ion-label floating>Unit ID</ion-label>
            <ion-input #routeID type="text"></ion-input>
          </ion-item>
          <div padding>
            <button ion-button block (click)="route(routeID)">Go</button>
          </div>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider color="light">History</ion-item-divider>
          <ion-item (click)="route('C1L1Q1')">
            C1L1Q1
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebugPage');
  }

  private route(id){
    console.log(id);
  }

}
