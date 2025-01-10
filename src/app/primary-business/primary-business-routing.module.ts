import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrimaryBusinessPage } from './primary-business.page';

const routes: Routes = [
  {
    path: '',
    component: PrimaryBusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrimaryBusinessPageRoutingModule {}
