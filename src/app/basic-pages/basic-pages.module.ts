import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasicPagesPageRoutingModule } from './basic-pages-routing.module';

import { BasicPagesPage } from './basic-pages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasicPagesPageRoutingModule
  ],
  declarations: [BasicPagesPage]
})
export class BasicPagesPageModule {}
