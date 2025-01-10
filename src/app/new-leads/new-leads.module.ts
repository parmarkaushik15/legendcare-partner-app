import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewLeadsPageRoutingModule } from './new-leads-routing.module';

import { NewLeadsPage } from './new-leads.page';
import {SharedModule} from '../module/shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewLeadsPageRoutingModule,
    SharedModule
  ],
  declarations: [NewLeadsPage]
})
export class NewLeadsPageModule {}
