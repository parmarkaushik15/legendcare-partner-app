import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadDetailsPageRoutingModule } from './lead-details-routing.module';

import { LeadDetailsPage } from './lead-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadDetailsPageRoutingModule
  ],
  declarations: [LeadDetailsPage]
})
export class LeadDetailsPageModule {}
