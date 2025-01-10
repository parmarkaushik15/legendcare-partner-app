import { DataService } from './service/data.service';

import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';
 
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,

  Token,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent implements OnInit {
  tid = null;
  api_token = null;
  fcm_token = null;


  currentPageTitle = 'Dashboard';

  appPages = [
    {
      title: 'My Leads',
      url: '/dashboard',
      icon: 'list'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person-circle'
    },
    {
      title: 'Document Verification',
      url: '/documents-index',
      icon: 'document-text'
    },
    {
      title: 'Wallet',
      url: '/wallet',
      icon: 'wallet'
    },
    {
      title: 'Recharge History',
      url: '/recharge-history',
      icon: 'arrow-forward-circle'
    },
    {
      title: 'Training Videos',
      url: '/training-videos',
      icon: 'videocam'
    },
    {
      title: 'Message',
      url: '/message',
      icon: 'mail'
    },
    {
      title: 'ID Card',
      url: '/id-card',
      icon: 'card'
    },
    /*{
     title: 'How it Works',
     url: '/basic-pages/how-it-works',
     icon: 'arrow-forward-circle'
   },     
    {
     title: 'Terms of Use',
     url: '/basic-pages/terms-of-use',
     icon: 'arrow-forward-circle'
   },
    {
     title: 'Privacy Policy',
     url: '/basic-pages/privacy-policy',
     icon: 'arrow-forward-circle'
   },*/
    {
      title: 'Contact Us',
      url: '/contact-us',
      icon: 'call'
    }, 
    {
      title: 'Logout',
      url: '/logout',
      icon: 'log-out'
    }

  ];





  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    public alertController: AlertController,
    private router: Router

  ) {
    this.tid = localStorage.getItem('tid');
    this.initializeApp();
  }

  ngOnInit() {

  }


  initializeApp() {




    this.platform.ready().then(() => {
      document.body.setAttribute('data-theme', 'light');
      document.body.classList.toggle('dark', false);
      this.statusBar.styleDefault();
      this.splashScreen.hide();




      this.pushInit();








    });
  }


  pushInit() {
    console.log('Perm granted');


    if (this.platform.is('android')) {
      PushNotifications.requestPermissions().then(result => {


        if (result.receive === 'granted') {
          PushNotifications.register();
        } else {

        }
      });


      PushNotifications.addListener('registration', (token: Token) => {
        console.log('Push registration success, token: ' + token.value);

        this.fcm_token = token.value;


        this.addFCMToken(this.tid, this.fcm_token);

        console.log('Push registration success, token: ' + token.value);

        //alert('Push registration success, token: ' + token.value);
      });


      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          console.log('Push received: ' + JSON.stringify(notification));

          let audio = new Audio();
          audio.src = "src/assets/service-bell-ring-14610.mp3";
          audio.load();
          audio.play();

          //https://forum.ionicframework.com/t/how-to-receive-additional-data-for-push-notification-in-ionic2/60795/15
          let json = JSON.parse(JSON.stringify(notification));
          let data = json.data;



          this.showAlert(data.title, data.body, data.url);

        },
      );


      PushNotifications.addListener('registrationError', (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      });


      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          console.log('Push action performed: ' + JSON.stringify(notification));

          let json = JSON.parse(JSON.stringify(notification));
          console.log(json);


          let url = json.notification.data.url;
          this.router.navigate([url]);
        },
      );


    }
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

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: "Alert",
      subHeader: "Are you sure you want to delete your account?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.router.navigate(['/logout']);
          }
        }
      ]
    })
    alert.present();
  }



  addFCMToken(tid, token) {

    this.dataService.registerFCMToken(tid, token).subscribe((res) => {

    });

  }




}
