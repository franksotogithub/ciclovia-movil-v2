import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElementTramoUpdatePageRoutingModule } from './element-tramo-update-routing.module';

import { ElementTramoUpdatePage } from './element-tramo-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  

    ElementTramoUpdatePageRoutingModule
  ],
  declarations: [ElementTramoUpdatePage]
})
export class ElementTramoUpdatePageModule {}
