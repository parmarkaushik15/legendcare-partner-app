import { DataService } from '../service/data.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

 
 
@Component({
  selector: 'app-new-leads',
  templateUrl: './new-leads.page.html',
  styleUrls: ['./new-leads.page.scss'],
})
export class NewLeadsPage implements OnInit {


page=1;
leads=[];
leads_loaded=false;

tid=null;
api_token=null;
total_unread_new_leads=null;

wallet_balance=null;
skelton_list_items=null;

 constructor( 
      	  	public menuCtrl : MenuController,
        		private dataService : DataService,
            private router: Router,
            public loadingController: LoadingController,
            public alertController: AlertController
           ){

    	  	 this.tid=localStorage.getItem('tid');

    	     this.api_token=localStorage.getItem('api_token');

           this.get_technician_leads_by_type(this.tid,this.api_token,this.page,"");

           this.skelton_list_items=[0,1,2,3,4,5,6,7,8,9];


  }


ionViewDidEnter(){
          this.get_wallet_balance(this.tid,this.api_token);
          this.get_technician_unread_new_leads(this.tid,this.api_token);

}


async presentAlertConfirm(message) {
    const alert = await this.alertController.create({
      cssClass: 'bg_red',
      //header: 'Confirm!',
      message: message,
      backdropDismiss:false,
      buttons:[{
          text: 'Recharge Now',
          handler: () => {

           this.router.navigate(['wallet']);
          
          }
        }
      ]
    });

    await alert.present();
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



  toggleMenu(){
    this.menuCtrl.toggle();
  }





   get_technician_leads_by_type(tid,api_token,page,event) {
 
    	var lead_type="new";
      var per_page=500; // per page more than 500 because if less per_page , it shoes only 1,2 results

      this.dataService.get_technician_leads_by_type(tid,api_token,lead_type,page,per_page).subscribe((result:any) => {
     

      for (let i = 0; i < result.data.length; i++) {
          
           
          this.leads.push(result.data[i]);
     
     }
       
       this.leads_loaded=true;

        //console.log(this.leads);

       if(event){
           event.target.complete();
  

      }




    });
	 


  }





 doInfinite(event) {
     this.page++;
 
     this.get_technician_leads_by_type(this.tid,this.api_token,this.page,event);
  
  }



   get_wallet_balance(tid,api_token) {
 
 
      this.dataService.get_wallet_balance(tid,api_token).subscribe(result => {
      this.wallet_balance=result;
      
      if(this.wallet_balance.total_balance<=0){
        this.presentAlertConfirm(this.wallet_balance.message);
      }

      //console.log(this.profile_data.technician.name);

    });
   


  }






     get_technician_unread_new_leads(tid,api_token) {
 
 
      this.dataService.get_technician_unread_new_leads(tid,api_token).subscribe(result => {
      this.total_unread_new_leads=result;
 
      setTimeout(()=>{
        this.get_technician_unread_new_leads(this.tid,this.api_token);
      },60*1000);  // call/check in each 1 min

  
    });
   


  }




}
