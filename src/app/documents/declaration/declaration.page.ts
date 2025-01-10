import { DataService } from '../../service/data.service';

import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
 
 import {Validators, FormBuilder,FormControl, FormGroup } from '@angular/forms';

import {ToastController } from '@ionic/angular';


@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.page.html',
  styleUrls: ['./declaration.page.scss'],
})
export class DeclarationPage implements OnInit {

 
 public myForm : FormGroup;

 
tid=null;
api_token=null;
declaration=null;

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
		    terms_accepted: ['',Validators.required],
		  

	      
		});
  

	      this.get_technician_declaration(this.tid,this.api_token);


        
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





   


   get_technician_declaration(tid,api_token) {
 
 
      this.dataService.get_technician_declaration(tid,api_token).subscribe(result => {
      this.declaration=result;

   
 
 			 
 
    });
	 


  }





	declarationFormSubmit( ){
		 

    

 
 
       
  


      this.myForm.value['tid']=this.tid;
     this.myForm.value['api_token']=this.api_token;

     //to read single field
      //var name= this.myForm.controls['name'].value

      //for all submitted myForm 
      //var all=this.myForm.value;

 

 
    this.dataService.technician_declaration_submit(this.myForm.value).subscribe((res) => {
 
      this.update_res=res;
      var status=this.update_res.status;
      var message=this.update_res.message;
     
      if(status==1){
        this.presentToast(message,'success');

 
             this.router.navigate(['/documents-index']);
          

      }else{
        this.presentToast(message,'danger');
      }


    });
	 



	}







}
