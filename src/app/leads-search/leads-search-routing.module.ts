import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadsSearchPage } from './leads-search.page';

const routes: Routes = [
  {
    path: '',
    component: LeadsSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadsSearchPageRoutingModule {}
