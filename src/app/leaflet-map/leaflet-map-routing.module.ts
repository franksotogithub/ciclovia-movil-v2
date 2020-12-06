import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeafletMapPage } from './leaflet-map.page';

const routes: Routes = [
  {
    path: '',
    component: LeafletMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeafletMapPageRoutingModule {}
