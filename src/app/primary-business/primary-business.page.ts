import { DataService } from '../service/data.service';

import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ToastController } from '@ionic/angular';
import * as $ from "jquery";



@Component({
  selector: 'app-primary-business',
  templateUrl: './primary-business.page.html',
  styleUrls: ['./primary-business.page.scss'],
})
export class PrimaryBusinessPage implements OnInit {

  tid=null;
  api_token=null;

  primary_business_result=null;


choose_primary_business:any=[];


	constructor(public toastController: ToastController,private activatedRoute: ActivatedRoute,private dataService : DataService, private router: Router) {

    this.api();

  
    
     }



     api(){
       
      this.tid=localStorage.getItem('tid');
      this.api_token=localStorage.getItem('api_token');

      this.dataService.choose_primary_business(this.tid).subscribe(result => {
        this.choose_primary_business = result;   

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

 console.log('loading on ngonit');


  }

 


search(ev){

  
  
    var val = ev.target.value;

    //console.log(val);


    if (val && val.trim() != '') {
  

       for(let i=0; i<this.choose_primary_business?.sub_categories.length; i++ ){
          
        let item=this.choose_primary_business?.sub_categories[i];
        let cid=item.cid;
        let title=item.title.toLowerCase();

        val=val.toLowerCase();
         
          
       //console.log("before matchig "+title+" | "+val);
        
          //check if title matched 
        if(title.includes(val)){  
          
        //console.log("matchig "+item.title+" | "+val);
        
         // console.log(item.title);
           (<HTMLElement>document.querySelector('.item_list_'+cid)).style.display="block";


        }else{
          (<HTMLElement>document.querySelector('.item_list_'+cid)).style.display="none";

        } 


       } 

 

    }
    else {
       $('.item_list').show();
       
    }

  }



  primary_business_update(ev){
    var choose_primary_business_form=$('#choose_primary_business_form').serialize();
      
        
    this.dataService.primary_business_update(this.tid,choose_primary_business_form).subscribe(result => {
       
      this.primary_business_result=result;
     
      var status=this.primary_business_result.status;
      var message=this.primary_business_result.message;
     
     if(status==1){
       //
       this.presentToast(message,'success');
      this.router.navigate(['/profile']);

          
     }else{
       this.presentToast(message,'danger');

       } 

     console.log(result);
    
     });
   

  }


}
