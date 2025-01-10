import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillNowPageRoutingModule } from './bill-now-routing.module';

import { BillNowPage } from './bill-now.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillNowPageRoutingModule
  ],
  declarations: [BillNowPage]
})
export class BillNowPageModule {}
