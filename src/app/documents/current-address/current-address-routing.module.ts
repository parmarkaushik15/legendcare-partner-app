import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentAddressPage } from './current-address.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentAddressPageRoutingModule {}
