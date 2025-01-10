import { DataService } from '../../service/data.service';

import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
 
 import {Validators, FormBuilder,FormControl, FormGroup } from '@angular/forms';

import {ToastController } from '@ionic/angular';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.page.html',
  styleUrls: ['./personal-details.page.scss'],
})




export class PersonalDetailsPage implements OnInit {

 public myForm : FormGroup;

 
tid=null;
api_token=null;
technician_personal_details=null;

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
		    father_mother_name: ['',Validators.required],
		    gender: ['',Validators.required],
		     dob: ['',Validators.required],
		    permanent_address_house_no: ['',Validators.required],
		     permanent_address_locality: ['',Validators.required],
		    permanent_address_pincode: ['',Validators.required],
         city: ['',Validators.required],
        state: ['',Validators.required],

	      
		});
  

	      this.get_technician_personal_details(this.tid,this.api_token);


        
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





   


   get_technician_personal_details(tid,api_token) {
 
 
      this.dataService.get_technician_personal_details(tid,api_token).subscribe(result => {
      this.technician_personal_details=result;

  	//console.log(this.technician_personal_details);

       this.myForm = this.formBuilder.group({
		    father_mother_name: [this.technician_personal_details.father_mother_name,Validators.required],
		   gender: [this.technician_personal_details.gender,Validators.required],
	        dob: [this.technician_personal_details.dob,Validators.required],
		    permanent_address_house_no: [this.technician_personal_details.permanent_address_house_no,Validators.required],
		     permanent_address_locality: [this.technician_personal_details.permanent_address_locality,Validators.required],
		    permanent_address_pincode: [this.technician_personal_details.permanent_address_pincode,Validators.required],
         city: [this.technician_personal_details.permanent_address_locality,Validators.required],
        state: [this.technician_personal_details.permanent_address_pincode,Validators.required],

		     
		    
		});
 
 			 
       //console.log(this.technician_personal_details.data.tip_id);

    });
	 


  }





	personalDetailsFormSubmit( ){
		 

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

 

 
    this.dataService.technician_personal_details_submit(this.myForm.value).subscribe((res) => {
 
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
