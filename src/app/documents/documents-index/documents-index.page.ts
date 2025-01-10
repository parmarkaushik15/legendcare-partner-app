import { DataService } from '../../service/data.service';

import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
 
 import {Validators, FormBuilder,FormControl, FormGroup } from '@angular/forms';
 
import {AlertController,ToastController } from '@ionic/angular';


@Component({
  selector: 'app-documents-index',
  templateUrl: './documents-index.page.html',
  styleUrls: ['./documents-index.page.scss'],
})
export class DocumentsIndexPage implements OnInit {

 public myForm : FormGroup;

 
tid=null;
api_token=null;
 profile_data=null;

technician_document_submitted=null;
is_document_submitted_and_waiting_for_approval=false;
 
page=null;
  
   
     

constructor(
        public toastController: ToastController,
        public alertController: AlertController,
        private activatedRoute: ActivatedRoute,
        private dataService : DataService,
        private router: Router,

    
        ) { 

	  	 this.tid=localStorage.getItem('tid');
	      this.api_token=localStorage.getItem('api_token');


            //this.ionViewDidEnter();


  		 



        
  }





async presentAlertConfirm(message) {
    const alert = await this.alertController.create({
      cssClass: 'bg_red',
      //header: title,
      message: message,
      backdropDismiss:true,
    
/*
      buttons:[{
          text: 'Recharge Now',
          handler: () => {

           this.router.navigate(['wallet']);
          
          }
        }
      ]
*/

    });

    await alert.present();
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





  ngOnInit() {

  	 
  }


ionViewDidEnter(){
          this.get_technician_profile(this.tid,this.api_token);
          this.check_technician_document_submitted(this.tid,this.api_token);

}
 
   


   check_technician_document_submitted(tid,api_token) {
 
 
      this.dataService.check_technician_document_submitted(tid,api_token).subscribe(result => {
     	 this.technician_document_submitted=result;

        if(
          this.technician_document_submitted.identity_proof==1 &&
          this.technician_document_submitted.personal_details==1 &&
          this.technician_document_submitted.current_address==1 &&
          this.technician_document_submitted.declaration==1  
          ){
          this.is_document_submitted_and_waiting_for_approval=true;

            console.log(this.is_document_submitted_and_waiting_for_approval);

          if(this.is_document_submitted_and_waiting_for_approval){
            

             if(this.profile_data?.technician?.badge==0){
               this.get_basic_page('new_account_pending_approval');

             }
             

          }

        }

     	 console.log(this.technician_document_submitted);
  
	  });
	 


  }



 









   get_technician_profile(tid,api_token) {
 
 
      this.dataService.get_technician_profile(tid,api_token).subscribe(result => {
      this.profile_data=result;

      

    });
   


  }








    get_basic_page(page_name) {
 
 
      this.dataService.get_basic_page(page_name).subscribe(result => {
      this.page=result;

      this.presentAlertConfirm(this.page.body);

 
 
    });
   


  }




}
