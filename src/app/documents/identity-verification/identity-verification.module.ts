import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { IdentityVerificationPageRoutingModule } from './identity-verification-routing.module';

import { IdentityVerificationPage } from './identity-verification.page';


@NgModule({
  imports: [
     CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
     IonicModule,
     IdentityVerificationPageRoutingModule,
   ],
  declarations: [IdentityVerificationPage]
})
export class IdentityVerificationPageModule {}
