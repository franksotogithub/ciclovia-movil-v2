import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementTramoUpdatePage } from './element-tramo-update.page';

const routes: Routes = [
  {
    path: ':id',
    component: ElementTramoUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementTramoUpdatePageRoutingModule {}
