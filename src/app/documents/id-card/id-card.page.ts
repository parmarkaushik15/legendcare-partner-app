import { DataService } from '../../service/data.service';

import { Component, ViewChild, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { ToastController } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';

import { DomSanitizer } from '@angular/platform-browser';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-id-card',
  templateUrl: './id-card.page.html',
  styleUrls: ['./id-card.page.scss'],
})
export class IdCardPage implements OnInit {


  tid = null;
  api_token = null;
  id_card_url = null;

  constructor(public toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    public loadingController: LoadingController,
    public sanitizer: DomSanitizer,
  ) {


    this.tid = localStorage.getItem('tid');
    this.api_token = localStorage.getItem('api_token');

    this.get_technician_id_card(this.tid, this.api_token);


  }

  ngOnInit() {
    this.presentLoading();
  }






  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1800
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


 async get_technician_id_card(tid, api_token) {

    var mode = "view";

    this.id_card_url = this.dataService.api_url + "get_technician_id_card/?mode=" + mode + "&tid=" + this.tid + "&api_token=" + this.api_token;

    try {
      await Browser.open({ url: this.id_card_url });
    } catch (error) {
      console.error('Error opening Google Maps:', error);
    }



  }


}
