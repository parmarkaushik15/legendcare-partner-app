import { DataService } from '../service/data.service';

import { Component,ViewChild,OnInit, Injectable } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
 
 import {Validators, FormBuilder,FormControl, FormGroup } from '@angular/forms';

import {ToastController } from '@ionic/angular';


 
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

 page_name=null;
 page=null;
 
tid=null;
api_token=null;
profile_data=null;
 update_response=null;

 
  public myForm : FormGroup;


  

constructor(
        public toastController: ToastController,
        private activatedRoute: ActivatedRoute,
        private dataService : DataService,
        private router: Router,
        public formBuilder: FormBuilder,
     
        ) { 

		 
	      this.tid=localStorage.getItem('tid');
	      this.api_token=localStorage.getItem('api_token');

 	      this.get_technician_profile(this.tid,this.api_token);


         this.myForm = this.formBuilder.group({
            name: [this.profile_data?.technician.name, Validators.required],
            email: [this.profile_data?.technician.email, Validators.required],
            phone: [this.profile_data?.technician.phone, Validators.required],
             subject: [""],
             message: [""], 
          
          });
   
	   }



   get_technician_profile(tid,api_token) {
 
 
      this.dataService.get_technician_profile(tid,api_token).subscribe(result => {
      this.profile_data=result;

        this.myForm = this.formBuilder.group({
            name: [this.profile_data.technician.name, Validators.required],
            phone: [this.profile_data?.technician.phone, Validators.required],  
            email: [this.profile_data.technician.email, Validators.required],
             subject: [""],
             message: [""],
         
          });
     

       //console.log(this.profile_data.technician.name);

    });
	 


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


  	this.page_name ="contact-us";

  	 	this.get_basic_page(this.page_name);


  }

   
 
  get_basic_page(page_name) {
 
 
      this.dataService.get_basic_page(page_name).subscribe(result => {
      this.page=result;
 
 
    });
	 


  }





   submitContact() {
     //console.log(this.myForm.value);


    

     if(!this.myForm.valid){
       this.presentToast('Please enter all required  information','danger');
        return false;
     }

 

     this.myForm.value['tid']=this.tid;
     this.myForm.value['api_token']=this.api_token;

     //to read single field
      //var name= this.myForm.controls['name'].value

      //for all submitted myForm 
      //var all=this.myForm.value;

 

 
    this.dataService.submit_contact_form(this.myForm.value).subscribe((res) => {
 
      this.update_response=res;
      var status=this.update_response.status;
      var message=this.update_response.message;
     
      if(status==1){

      	    (<HTMLInputElement>document.querySelector('.subject')).value="";
      	    (<HTMLInputElement>document.querySelector('.message')).value="";

        this.presentToast(message,'success');

          //this.router.navigate(['/dashboard']);
          

      }else{
        this.presentToast(message,'danger');
      }


    });
	 


  }





 



}
