import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentsIndexPageRoutingModule } from './documents-index-routing.module';

import { DocumentsIndexPage } from './documents-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentsIndexPageRoutingModule
  ],
  declarations: [DocumentsIndexPage]
})
export class DocumentsIndexPageModule {}
