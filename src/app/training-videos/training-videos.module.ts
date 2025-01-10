import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TrainingVideosPageRoutingModule } from './training-videos-routing.module';

import { TrainingVideosPage } from './training-videos.page';

@NgModule({
  imports: [
    CommonModule,
     IonicModule,
    TrainingVideosPageRoutingModule
  ],
  declarations: [TrainingVideosPage]
})
export class TrainingVideosPageModule {}
