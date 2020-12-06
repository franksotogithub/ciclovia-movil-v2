import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TramoPage } from './tramo.page';

const routes: Routes = [
  {
    path: ':id',
    component: TramoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TramoPageRoutingModule {}
