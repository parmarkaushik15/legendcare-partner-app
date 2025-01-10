import { DataService } from '../service/data.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {ToastController, AlertController } from '@ionic/angular';
 import {Validators, FormBuilder,FormControl, FormGroup } from '@angular/forms';

 
@Component({
  selector: 'app-leads-search',
  templateUrl: './leads-search.page.html',
  styleUrls: ['./leads-search.page.scss'],
})
export class LeadsSearchPage implements OnInit {

  

 leads=[];
leads_loaded=true;
response_message=null;

tid=null;
api_token=null;
 
 skelton_list_items=null;

 public filteOrderForm : FormGroup;

 constructor( 
      	  	public menuCtrl : MenuController,
        	private dataService : DataService,
            private router: Router,
            public toastController: ToastController,
            public loadingController: LoadingController,
            public alertController: AlertController,
            public formBuilder: FormBuilder,

           ){

    	  	 this.tid=localStorage.getItem('tid');

    	     this.api_token=localStorage.getItem('api_token');

 
           this.skelton_list_items=[0,1,2,3,4,5,6,7,8,9];


           	this.filteOrderForm = this.formBuilder.group({
			           
			            oid: [''],
			            phone: [''],
			          
			          });


  }


ionViewDidEnter(){
 
}


 


  ngOnInit() {
  

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



  toggleMenu(){
    this.menuCtrl.toggle();
  }



	filteOrder(){
		this.leads=[];

		this.leads_loaded=false;

	 
		
		// console.log(this.filteOrderForm.value);


	     var oid= this.filteOrderForm.controls['oid'].value;
		 var phone= this.filteOrderForm.controls['phone'].value;

	 
	       
	       if(oid=='' && phone==''){
	         this.presentToast('Type any one field','danger');
	         
	         this.leads_loaded=true;

	          return false;

	       }

	 

	     if(!this.filteOrderForm.valid){
	      // this.presentToast('Please enter valid information','danger');
	       // return false;
	     }




	     this.filteOrderForm.value['tid']=this.tid;
	     this.filteOrderForm.value['api_token']=this.api_token;


	 
			  this.dataService.search_technician_leads( this.filteOrderForm.value).subscribe((result:any) => {
		   		  
		   		  this.response_message=result.message;

			      for (let i = 0; i < result.data.length; i++) {		          
			           
			          this.leads.push(result.data[i]);
			     
			     }
			       
			       this.leads_loaded=true;



			 });


	}




 



 



 

}
