import { DataService } from '../service/data.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { Platform } from '@ionic/angular';

import { IonSlides } from '@ionic/angular';
import * as $ from "jquery";

// import {
//   Plugins,
//   PushNotification,
//   PushNotificationToken,
//   PushNotificationActionPerformed,
//   Capacitor
// } from '@capacitor/core';





// const { PushNotifications } = Plugins;

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,

  Token,
} from '@capacitor/push-notifications';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  leads_heading = null;
  leads = [];

  page = 1;
  tid = null;
  api_token = null;
  fcm_token = null;

  wallet_balance = null;

  unread_messages = null;
  total_unread_new_leads = null;

  total_unread_messages = 0;

  skelton_list_items = null;


  segment = null;
  slides = null;

  addListeners = async () => {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }




  slidesDidLoad(slides: IonSlides) {

    //slides.startAutoplay();

  }

  constructor(
    public menuCtrl: MenuController,
    private dataService: DataService,
    private router: Router,
    public loadingController: LoadingController,
    public platform: Platform,
    public alertController: AlertController,
  ) {

    this.tid = localStorage.getItem('tid');
    this.api_token = localStorage.getItem('api_token');

    //this.ionViewDidEnter();



    this.platform.ready().then(() => {

      //this.registerPush();

    });

    this.skelton_list_items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


  }





  ionViewDidEnter() {

    this.get_wallet_balance(this.tid, this.api_token);
    this.get_technician_leads(this.tid, this.api_token, this.page, "");
    this.get_unread_messages(this.tid, this.api_token);
    this.get_technician_unread_new_leads(this.tid, this.api_token);


  }




  get_technician_leads(tid, api_token, page, event) {


    this.dataService.get_technician_leads(tid, api_token, page).subscribe((result: any) => {
      this.leads_heading = result.headings;

      for (let i = 0; i < result.data.length; i++) {

        if (this.page == 1) {

          this.leads.push(result.data[i]);

        } else {

          for (let a = 0; a < result.data[i].length; a++) {

            this.leads[i].push(result.data[i][a]);
          }

        }


      }


      //console.log(this.leads);

      if (event) {
        // event.target.complete();


      }

      //console.log(this.leads);

    });



  }



  doInfinite(event) {
    this.page++;

    $('.load_more_spinner').show();

    this.get_technician_leads(this.tid, this.api_token, this.page, event);

    setTimeout(() => {
      $('.load_more_spinner').hide();

    }, 2000);


  }



  setupPush() {

    if (this.platform.is('android')) {


      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });



      // Register with Apple / Google to receive push via APNS/FCM

      // On success, we should be able to receive notifications


      PushNotifications.addListener('registration', (token: Token) => {
        alert('Push registration success, token: ' + token.value);

        this.fcm_token = token.value;


        this.addFCMToken(this.tid, this.fcm_token);

        console.log('Push registration success, token: ' + token.value);

        //alert('Push registration success, token: ' + token.value);
      });





      PushNotifications.addListener('registrationError', (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      });




    }



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



  ngOnInit() {


    // this.pushInit();
    // this.registerNotifications();
    this.addListeners();
    this.presentLoading();

    this.segment = document.querySelector('.ion_segment_dashboard');
    this.slides = document.querySelector('.ion_slides_dashboard');

    this.segment.addEventListener('ionChange', (ev) => this.onSegmentChange(ev));
    this.slides.addEventListener('ionSlideDidChange', (ev) => this.onSlideDidChange(ev));





  }

  registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
  }

  pushInit() {
    console.log('Perm granted');


    if (this.platform.is('android')) {
      PushNotifications.requestPermissions().then(result => {


        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM


          PushNotifications.register();
        } else {

        }
      });


      PushNotifications.addListener('registration', (token: Token) => {
        alert('Push registration success, token: ' + token.value);

        this.fcm_token = token.value;


        this.addFCMToken(this.tid, this.fcm_token);

        console.log('Push registration success, token: ' + token.value);

        //alert('Push registration success, token: ' + token.value);
      });


      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          alert('Push received: ' + JSON.stringify(notification));

          //https://forum.ionicframework.com/t/how-to-receive-additional-data-for-push-notification-in-ionic2/60795/15
          let json = JSON.parse(JSON.stringify(notification));
          let data = json.data;



          this.showAlert(data.title, data.body, data.url);

        },
      );


      PushNotifications.addListener('registrationError', (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      });


      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));

          let json = JSON.parse(JSON.stringify(notification));
          console.log(json);


          let url = json.notification.data.url;
          this.router.navigate([url]);
        },
      );


    }
  }



  // On Segment change slide to the matching slide
  onSegmentChange(ev) {
    this.slideTo(ev.detail.value);
  }

  slideTo(index) {
    this.slides.slideTo(index);
  }

  // On Slide change update segment to the matching value
  async onSlideDidChange(ev) {
    var index = await this.slides.getActiveIndex();
    this.clickSegment(index);
  }

  clickSegment(index) {
    this.segment.value = index;
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 300
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }



  toggleMenu() {
    this.menuCtrl.toggle();
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





  get_unread_messages(tid, api_token) {


    this.dataService.get_unread_messages('technician', tid, api_token).subscribe(result => {
      this.unread_messages = result;
      this.total_unread_messages = this.unread_messages.total_unread_messages;

      setTimeout(() => {
        this.get_unread_messages(this.tid, this.api_token);
      }, 30 * 1000);  // call/check in each 30 sec


    });



  }





  get_technician_unread_new_leads(tid, api_token) {


    this.dataService.get_technician_unread_new_leads(tid, api_token).subscribe(result => {
      this.total_unread_new_leads = result;

      setTimeout(() => {
        this.get_technician_unread_new_leads(this.tid, this.api_token);
      }, 60 * 1000);  // call/check in each 1 min


    });



  }



  addFCMToken(tid, token) {

    this.dataService.registerFCMToken(tid, token).subscribe((res) => {

    });

  }


  async showAlert(title, msg, url) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: 'Open',
          handler: () => {
            this.router.navigate([url]);
          }
        }
      ]
    })
    alert.present();
  }



}




