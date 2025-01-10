import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillNowPage } from './bill-now.page';

const routes: Routes = [
  {
    path: '',
    component: BillNowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillNowPageRoutingModule {}
