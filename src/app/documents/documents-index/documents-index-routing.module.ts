import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsIndexPage } from './documents-index.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentsIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsIndexPageRoutingModule {}
