import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingVideosPage } from './training-videos.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingVideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingVideosPageRoutingModule {}
