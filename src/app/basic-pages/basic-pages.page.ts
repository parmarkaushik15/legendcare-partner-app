import { DataService } from '../service/data.service';

import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as $ from "jquery";



@Component({
  selector: 'app-basic-pages',
  templateUrl: './basic-pages.page.html',
  styleUrls: ['./basic-pages.page.scss'],
})
export class BasicPagesPage implements OnInit {

 page_name=null;
oid=null;

page=null;

tid=null;
api_token=null;


  constructor( 
  	    private activatedRoute: ActivatedRoute,
   		private dataService : DataService,
        private router: Router,
         public loadingController: LoadingController
          ) { 

	  	 this.tid=localStorage.getItem('tid');
	      this.api_token=localStorage.getItem('api_token');




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


  ngOnInit() {
      // this.presentLoading();
  	    this.page_name = this.activatedRoute.snapshot.paramMap.get('page_name');

  	   	this.get_basic_page(this.page_name);

  }





   get_basic_page(page_name) {
 
 
      this.dataService.get_basic_page(page_name).subscribe(result => {
      this.page=result;
 
 
    });
	 


  }







 ngAfterViewInit(){

   $('.btn_customer_cancel').on('click',function(){
    $('.msg_order_status').html('');
    $('.order_status_reschedule_container').hide();
     
    $('.customer_cancel_pop_up').fadeToggle();
  
  
  });
  
   
  

}











 


}
