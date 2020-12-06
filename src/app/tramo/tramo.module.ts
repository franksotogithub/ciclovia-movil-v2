import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TramoPageRoutingModule } from './tramo-routing.module';

import { TramoPage } from './tramo.page';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    IonicModule,
    TramoPageRoutingModule,
    IonicSelectableModule,
  ],
  declarations: [TramoPage]
})
export class TramoPageModule {}
