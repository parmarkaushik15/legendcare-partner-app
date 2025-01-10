import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingVideoDetailsPageRoutingModule } from './training-video-details-routing.module';

import { TrainingVideoDetailsPage } from './training-video-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingVideoDetailsPageRoutingModule
  ],
  declarations: [TrainingVideoDetailsPage]
})
export class TrainingVideoDetailsPageModule {}
