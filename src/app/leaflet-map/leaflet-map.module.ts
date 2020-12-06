import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeafletMapPageRoutingModule } from './leaflet-map-routing.module';

import { LeafletMapPage } from './leaflet-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeafletMapPageRoutingModule
  ],
  declarations: [LeafletMapPage]
})
export class LeafletMapPageModule {}
