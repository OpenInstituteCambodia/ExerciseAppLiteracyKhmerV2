import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

import { MenuPage} from '../../pages/menu/menu.ts';
import { UnitPage } from '../../pages/unit/unit.ts';
import { HelperPage } from '../../pages/helper/helper.ts';

import { DatabaseController } from '../../app/database';

@Component({
  selector: 'debug-navigate',
  template: `
    <ion-header>
      <ion-navbar color="danger">
        <ion-title>Debugging: Navigator</ion-title>
        <ion-buttons end *ngIf="this._mode == 'basic'">
          <button ion-button icon-only (click)="switchMode()">
            <ion-icon name="list"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>
    </ion-header>
    <ion-content *ngIf="_mode == 'basic'">
      <ion-item-group>
        <ion-item-divider color="light">Navigate</ion-item-divider>
        <ion-item>
          <ion-label floating>Page:</ion-label>
          <ion-select [(ngModel)]="page">
            <ion-option value="menu" selected="true">Menu</ion-option>
            <ion-option value="unit">Unit</ion-option>
            <ion-option value="helper">Helper</ion-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label floating>Navigate to:</ion-label>
          <ion-input #uri type="text" id="uri"></ion-input>
        </ion-item>
        <div padding>
          <button ion-button block (click)="navigate(page, uri.value)">Go</button>
        </div>
      </ion-item-group>
      <ion-item-group>
        <ion-item-divider color="light">History</ion-item-divider>
        <ion-item>
          No History Log Available
        </ion-item>
      </ion-item-group>
    </ion-content>
    <ion-content *ngIf="_mode == 'complex'">
      <ion-item-group>
        <ion-item-divider color="light">Available units</ion-item-divider>
        <ion-item *ngFor="let item of units; let i = index;" (click)="navigate('unit', item.unit_id)">
          {{item.unit_id}}
        </ion-item>
      </ion-item-group>
    </ion-content>
  `
})
export class PlugableNavigate {
  public units: Array<any> = [];
  private _mode = 'basic';
  constructor(private _db: DatabaseController, public navCtrl: NavController, public navParams: NavParams) {
    if (typeof this.navParams.get('mode') != 'undefined') {
      this._mode = this.navParams.get('mode');
    }
  }

  ionViewDidLoad() {
    if (this._mode == 'complex') {
      this.prepopulateUnit();
    }
  }

  private switchMode() {
    this.navCtrl.push(PlugableNavigate, { mode: 'complex'});
  }

  private prepopulateUnit() {
    this._db.executeSQL(
      'SELECT unit_id FROM units',
      []
    ).then((unitData) => {
      for (let i = 0; i < unitData.rows.length; i++) {
        this.units.push(unitData.rows.item(i));
      }
    }).catch(err => console.log(err) );
  }

  private navigate(page, uri) {
    switch(page) {
      case 'menu':

        break;
      case 'unit':
        this._db.executeSQL("SELECT * FROM units WHERE unit_id == '"+uri+"'", []).then((unitData) => {
          this.navCtrl.push(UnitPage, {
            data: unitData.rows.item(0)
          });
        }).catch( err => { console.log(err) });
        break;
      case 'helper':

        break;
    }
  }
}
