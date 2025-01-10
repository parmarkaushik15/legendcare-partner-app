import { DataService } from '../service/data.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent, LoadingController } from '@ionic/angular';
import { ToastController, AlertController } from '@ionic/angular';


import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { PushNotifications } from '@capacitor/push-notifications';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {



  messages = null;

  tid = null;
  api_token = null;

  wallet_balance = null;
  form_response = null;

  unread_messages = null;
  total_unread_messages = 0;
  response_update_unread_message = null;


  public sendMessageForm: FormGroup;

  @ViewChild(IonContent) ionContent: IonContent;

  constructor(
    public toastController: ToastController,
    public menuCtrl: MenuController,
    private dataService: DataService,
    private router: Router,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
  ) {

    this.tid = localStorage.getItem('tid');
    this.api_token = localStorage.getItem('api_token');

    this.get_technician_messages(this.tid, this.api_token);


    this.sendMessageForm = this.formBuilder.group({
      message: ['', Validators.required],


    });

  }



  resetBadgeCount() {
    PushNotifications.removeAllDeliveredNotifications();
  }


  ionViewDidEnter() {

    this.ionContent.scrollToBottom(300);

    this.get_wallet_balance(this.tid, this.api_token);
    this.get_unread_messages(this.tid, this.api_token);
    this.update_unread_messages(this.tid, this.api_token);



  }



  async presentToast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      // position: 'bottom',
      color: color
    });
    toast.present();
  }



  ngOnInit() {
    this.presentLoading();




  }




  async presentAlertConfirm(message) {
    const alert = await this.alertController.create({
      cssClass: 'bg_red',
      //header: 'Confirm!',
      message: message,
      backdropDismiss: false,
      buttons: [{
        text: 'Recharge Now',
        handler: () => {

          this.router.navigate(['wallet']);

        }
      }
      ]
    });

    await alert.present();
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



  toggleMenu() {
    this.menuCtrl.toggle();
  }





  get_technician_messages(tid, api_token) {

    this.dataService.get_technician_messages(tid, api_token).subscribe(result => {

      this.ionContent.scrollToBottom(300);

      this.messages = result;

      setTimeout(() => {
        this.get_technician_messages(this.tid, this.api_token);


      }, 2000);



    });



  }







  get_wallet_balance(tid, api_token) {


    this.dataService.get_wallet_balance(tid, api_token).subscribe(result => {
      this.wallet_balance = result;

      if (this.wallet_balance.total_balance <= 0) {
        this.presentAlertConfirm(this.wallet_balance.message);
      }

      //console.log(this.profile_data.technician.name);

    });



  }








  sendMessage() {

    //     console.log(this.sendMessageForm.value);


    let new_message = this.sendMessageForm.controls['message'].value



    if (!new_message) {
      this.presentToast('Please write some message !', 'danger');
      return false;
    }




    if (!this.sendMessageForm.valid) {
      // this.presentToast('Please enter valid information','danger');
      // return false;
    }




    this.sendMessageForm.value['tid'] = this.tid;
    this.sendMessageForm.value['api_token'] = this.api_token;

    //to read single field
    //var name= this.sendMessageForm.controls['name'].value

    //for all submitted sendMessageForm 
    //var all=this.sendMessageForm.value;




    this.dataService.technician_send_message(this.sendMessageForm.value).subscribe((res) => {

      this.form_response = res;
      var status = this.form_response.status;
      var message_response = this.form_response.message;

      if (status == 1) {
        (<HTMLInputElement>document.querySelector('.message_textarea')).value = "";


        // if enable below, chat message not being update when new received from admin
        //	(<HTMLElement>document.querySelector('.chat')).innerHTML +="<div class='message me'>"+new_message+"</div>";

        this.ionContent.scrollToBottom(300);



        this.presentToast(message_response, 'success');


      } else {
        this.presentToast(message_response, 'danger');
      }


    });



  }


  get_unread_messages(tid, api_token) {


    this.dataService.get_unread_messages('technician', tid, api_token).subscribe(result => {
      this.unread_messages = result;
      this.total_unread_messages = this.unread_messages.total_unread_messages

    });



  }





  update_unread_messages(tid, api_token) {

    this.dataService.update_unread_messages('technician', tid, api_token).subscribe(result => {
      this.response_update_unread_message = result;
      if (this.response_update_unread_message.status == 1) {
        this.total_unread_messages = 0;
      }

    });



  }





}
