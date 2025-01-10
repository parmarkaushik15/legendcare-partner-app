import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicPagesPage } from './basic-pages.page';

const routes: Routes = [
  {
    path: '',
    component: BasicPagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicPagesPageRoutingModule {}
