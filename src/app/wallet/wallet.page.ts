import { DataService } from '../service/data.service';

import { Component,ViewChild,OnInit, Injectable } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
 import { MenuController } from '@ionic/angular';

 import {Validators, FormBuilder,FormControl, FormGroup } from '@angular/forms';

import {ToastController } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {




tid=null;
api_token=null;
update_response=null;
payment_options=null;
is_wallet_recharged=null;
wallet_recharges_message=null;

 page_name=null;
 page=null;

  public myForm : FormGroup;


constructor(
        public menuCtrl : MenuController,
        public toastController: ToastController,
        private activatedRoute: ActivatedRoute,
        private dataService : DataService,
        private router: Router,
        public formBuilder: FormBuilder,
        public loadingController: LoadingController
        ) { 

		 
	      this.tid=localStorage.getItem('tid');
	      this.api_token=localStorage.getItem('api_token');

 		 this.get_payment_options(this.tid,this.api_token);


         this.myForm = this.formBuilder.group({
            amount: ['', Validators.required],
             payment_method: ['', Validators.required],
             transaction_id_1: ['', null],
             transaction_id_2: ['', null],
             transaction_id_3: ['', null],  
            
         
          });
   
	   }


 async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 600
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }



  async presentToast(msg,color) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 1000,
       // position: 'bottom',
       color:color
      });
      toast.present();
      }





  toggleMenu(){
    this.menuCtrl.toggle();
  }




  ngOnInit() {


 if(this.payment_options==null){
 	  this.presentLoading();
 }


this.page_name ="recharge-page-info";

 this.get_basic_page(this.page_name);



  }



  get_basic_page(page_name) {
 
 
      this.dataService.get_basic_page(page_name).subscribe(result => {
      this.page=result;
 
 
    });
   


  }






	IonViewDidLoad(){

	}
	   

 


   get_payment_options(tid,api_token) {
 
 
      this.dataService.get_payment_options(tid,api_token).subscribe(result => {
      this.payment_options=result;

      
     

        //console.log(this.payment_options);

    });
	 


  }




   walletRecharge() {
     //console.log(this.myForm.value);


     var amount= this.myForm.controls['amount'].value

 
       
       if(!amount){
         this.presentToast('Please enter amount !','danger');
          return false;
       }

    


     if(!this.myForm.valid){
       this.presentToast('Please enter all required details ','danger');
       return false;
     }


      this.presentLoading();


     this.myForm.value['tid']=this.tid;
     this.myForm.value['api_token']=this.api_token;


     this.myForm.value['transaction_id']=[
     									this.myForm.controls['transaction_id_1'].value,
     									this.myForm.controls['transaction_id_2'].value,
     									this.myForm.controls['transaction_id_3'].value];
 
 

 
    this.dataService.wallet_recharge(this.myForm.value).subscribe((res) => {
 
      this.update_response=res;
      var status=this.update_response.status;
      var message=this.update_response.message;
     
      if(status==1){
       this.is_wallet_recharged=true;
       //alert(message);

       this.wallet_recharges_message=message;
        //this.presentToast(message,'success');

 
           //this.router.navigate(['/documents-index']);
            

      }else{
       this.is_wallet_recharged=false;
        this.presentToast(message,'danger');
      }


    });
	 


  }


}
