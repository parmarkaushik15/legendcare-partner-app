import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewLeadsPage } from './new-leads.page';

const routes: Routes = [
  {
    path: '',
    component: NewLeadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewLeadsPageRoutingModule {}
