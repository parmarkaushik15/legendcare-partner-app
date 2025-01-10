import { DataService } from '../../service/data.service';

import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
 
 import {Validators, FormBuilder,FormControl, FormGroup } from '@angular/forms';

import {ToastController } from '@ionic/angular';


@Component({
  selector: 'app-current-address',
  templateUrl: './current-address.page.html',
  styleUrls: ['./current-address.page.scss'],
})
export class CurrentAddressPage implements OnInit {


 public myForm : FormGroup;

 
tid=null;
api_token=null;
current_current_address=null;

update_res=null;

 

  
   
     

constructor(
        public toastController: ToastController,
        private activatedRoute: ActivatedRoute,
        private dataService : DataService,
        private router: Router,
         private formBuilder: FormBuilder,
   
        ) { 

	  	 this.tid=localStorage.getItem('tid');
	      this.api_token=localStorage.getItem('api_token');

  		  this.myForm = this.formBuilder.group({
		   
		    permanent_address_house_no: ['',Validators.required],
		     permanent_address_locality: ['',Validators.required],
		    permanent_address_pincode: ['',Validators.required],
         city: ['',Validators.required],
        state: ['',Validators.required],

	      
		});
  

	      this.get_technician_current_address(this.tid,this.api_token);


        
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





   


   get_technician_current_address(tid,api_token) {
 
 
      this.dataService.get_technician_current_address(tid,api_token).subscribe(result => {
      this.current_current_address=result;

  	//console.log(this.current_current_address);

       this.myForm = this.formBuilder.group({
		   
		    permanent_address_house_no: [this.current_current_address.permanent_address_house_no,Validators.required],
		     permanent_address_locality: [this.current_current_address.permanent_address_locality,Validators.required],
			  permanent_address_pincode: [this.current_current_address.permanent_address_pincode,Validators.required],
	         city: [this.current_current_address.permanent_address_locality,Validators.required],
	        state: [this.current_current_address.permanent_address_pincode,Validators.required],

		     
		    
		});
 
 			 
       //console.log(this.current_current_address.data.tip_id);

    });
	 


  }





	currentAddressFormSubmit( ){
		 

     //console.log(this.myForm.value)
     //return false;

   if(!this.myForm.valid){
 		 this.presentToast('Please enter all required details !','danger');
         return false;
     }



      this.myForm.value['tid']=this.tid;
     this.myForm.value['api_token']=this.api_token;

     //to read single field
      //var name= this.myForm.controls['name'].value

      //for all submitted myForm 
      //var all=this.myForm.value;

 

 
    this.dataService.technician_current_address_submit(this.myForm.value).subscribe((res) => {
 
      this.update_res=res;
      var status=this.update_res.status;
      var message=this.update_res.message;
      var url=this.update_res.url;

      if(status==1){
        this.presentToast(message,'success');

 
             this.router.navigate([url]);
          

      }else{
        this.presentToast(message,'danger');
      }


    });
	 



	}













}
