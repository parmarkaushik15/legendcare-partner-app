import { DataService } from '../service/data.service';

import { Component,ViewChild,OnInit, Injectable } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
 
 
import {ToastController } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-recharge-history',
  templateUrl: './recharge-history.page.html',
  styleUrls: ['./recharge-history.page.scss'],
})
export class RechargeHistoryPage implements OnInit {


tid=null;
api_token=null;
items=null;
items_recharge=[];
page=1;

total_items=0;

  constructor(   public toastController: ToastController,
        private activatedRoute: ActivatedRoute,
        private dataService : DataService,
        private router: Router,
         public loadingController: LoadingController) {


          this.tid=localStorage.getItem('tid');
	      this.api_token=localStorage.getItem('api_token');

         	this.get_recharge_history(this.tid,this.api_token,this.page,"");


		 }

	  ngOnInit() {
        this.presentLoading();
	  }






 async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


   get_recharge_history(tid,api_token,page,event) {
 
 
      this.dataService.get_recharge_history(tid,api_token,page).subscribe((result:any) => {
          this.items=result;

       for (let i = 0; i < result.credit_history.length; i++) {
          
           
          this.items_recharge.push(result.credit_history[i]);
     
     }


     //console.log(this.items_recharge);


       if(event){
           event.target.complete();
  

      }
      
      
      
    });
	 


  }





 doInfinite(event) {
     this.page++;
 
     this.get_recharge_history(this.tid,this.api_token,this.page,event);
  
  }





}
