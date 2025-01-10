import {NgModule, Component, OnInit, Input } from '@angular/core';
import {Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';

 
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
 
import { LeadItemComponent } from '../../components/lead-item/lead-item.component';



@NgModule({
  declarations: [LeadItemComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    LeadItemComponent
  ]
})
export class SharedModule { }
