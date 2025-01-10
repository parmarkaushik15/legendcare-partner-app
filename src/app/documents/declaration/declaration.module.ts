import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeclarationPageRoutingModule } from './declaration-routing.module';

import { DeclarationPage } from './declaration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DeclarationPageRoutingModule
  ],
  declarations: [DeclarationPage]
})
export class DeclarationPageModule {}
