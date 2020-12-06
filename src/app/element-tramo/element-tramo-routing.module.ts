import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementTramoPage } from './element-tramo.page';

const routes: Routes = [
  {
    path: '',
    component: ElementTramoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementTramoPageRoutingModule {}
