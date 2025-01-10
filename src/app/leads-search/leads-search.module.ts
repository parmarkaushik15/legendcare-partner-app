import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { LeadsSearchPageRoutingModule } from './leads-search-routing.module';
import {SharedModule} from '../module/shared/shared.module'

import { LeadsSearchPage } from './leads-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LeadsSearchPageRoutingModule,
    SharedModule
  ],
  declarations: [LeadsSearchPage]
})
export class LeadsSearchPageModule {}
