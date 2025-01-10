import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrimaryBusinessPageRoutingModule } from './primary-business-routing.module';

import { PrimaryBusinessPage } from './primary-business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrimaryBusinessPageRoutingModule
  ],
  declarations: [PrimaryBusinessPage]
})
export class PrimaryBusinessPageModule {}
