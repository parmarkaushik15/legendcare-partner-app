import { DataService } from '../service/data.service';

import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  authInfo=false;
  check_if_authenticated:any;


  constructor(private dataService : DataService, private router: Router, public alertController: AlertController) {}





async presentAlertConfirm(message) {
    const alert = await this.alertController.create({
      cssClass: 'bg_red',
      //header: 'Confirm!',
      message: message,
      backdropDismiss:false,
        buttons:[{
          text: 'Contact Us',
          handler: () => {

           this.router.navigate(['contact-us']);
          
          }
        }
      ]
     
    });

    await alert.present();
  }







  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>{  
      
      return new Promise(resolve=>{

         let tid=localStorage.getItem('tid');
        let api_token=localStorage.getItem('api_token');

        if(api_token){
        

        this.dataService.check_if_authenticated(tid,api_token).subscribe(result => {
           this.check_if_authenticated=result;
           if(!this.check_if_authenticated.status){
             
             this.presentAlertConfirm(this.check_if_authenticated.message);

               return resolve(false); 
           }


          //console.log(this.profile_data.technician.name);

        });
       

        
        
          return resolve(true);
        



        }else{
          this.router.navigate(['/home']);
          return resolve(false);
        }
        

      });



    }

   
 

  
}
