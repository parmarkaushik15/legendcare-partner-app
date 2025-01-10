import { DataService } from '../service/data.service';

import { Component,ViewChild,OnInit, Injectable } from '@angular/core';

import { Router,ActivatedRoute } from '@angular/router';
 
 
import {ToastController } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';

import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-training-videos',
  templateUrl: './training-videos.page.html',
  styleUrls: ['./training-videos.page.scss'],
})

export class TrainingVideosPage implements OnInit {

 

tid=null;
api_token=null;
training_videos=null;
 

   slideOpts = {
 		 	loop:true,
 	 		loopedSlides:1,
 	 	 	autoplay:true,  	 		
	      slidesPerView: 2,
	      freeMode: true,
	      coverflowEffect: {
	        rotate: 50,
	        stretch: 0,
	        depth: 100,
	        modifier: 1,
	        slideShadows: true,
	      }
	    }


 slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

constructor(
        public toastController: ToastController,
        private activatedRoute: ActivatedRoute,
        private dataService : DataService,
        private router: Router,
         public loadingController: LoadingController
        ) { 

		 
	      this.tid=localStorage.getItem('tid');
	      this.api_token=localStorage.getItem('api_token');


		 this.presentLoading();

        
   
	   }


 async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 600
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }



 


  ngOnInit() {

 
      var segment = document.querySelector('ion-segment');
	  var slides = document.querySelector('ion-slides');

	  segment.addEventListener('ionChange', (ev) => onSegmentChange(ev));
	  slides.addEventListener('ionSlideDidChange', (ev) => onSlideDidChange(ev));

	  
	  // On Segment change slide to the matching slide
	  function onSegmentChange(ev) {
	    slideTo(ev.detail.value);
	  }

	  function slideTo(index) {
	    slides.slideTo(index);
	  }

	  // On Slide change update segment to the matching value
	  async function onSlideDidChange(ev) {
	    var index = await slides.getActiveIndex();
	    clickSegment(index);
	  }

	  function clickSegment(index) {
	    segment.value = index;
	  }

  }


	ionViewWillEnter(){

		  this.get_training_videos(this.tid,this.api_token);

	}
	   

 


   get_training_videos(tid,api_token) {
 
 
      this.dataService.get_training_videos(tid,api_token).subscribe(result => {
      this.training_videos=result;

      
     

        //console.log(this.payment_options);

    });
	 


  }


 

}
