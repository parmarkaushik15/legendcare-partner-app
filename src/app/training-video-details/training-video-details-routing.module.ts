import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingVideoDetailsPage } from './training-video-details.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingVideoDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingVideoDetailsPageRoutingModule {}
