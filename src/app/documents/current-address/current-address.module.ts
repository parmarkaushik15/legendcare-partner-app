import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentAddressPageRoutingModule } from './current-address-routing.module';

import { CurrentAddressPage } from './current-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CurrentAddressPageRoutingModule
  ],
  declarations: [CurrentAddressPage]
})
export class CurrentAddressPageModule {}
