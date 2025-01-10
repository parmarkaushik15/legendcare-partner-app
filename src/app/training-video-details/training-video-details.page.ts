import { DataService } from '../service/data.service';

import { Component,ViewChild,OnInit, Injectable } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
 
 
import {ToastController } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-training-video-details',
  templateUrl: './training-video-details.page.html',
  styleUrls: ['./training-video-details.page.scss'],
})
export class TrainingVideoDetailsPage implements OnInit {

  
tid=null;
api_token=null;
tv_id=null;

training_video_data=null;
related_training_videos=null;


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

        this.tv_id = this.activatedRoute.snapshot.paramMap.get('tv_id');

        this.get_training_video_details(this.tid,this.api_token,this.tv_id);

}



 async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }



 




  ngOnInit() {

  	
   	      


  }


	ionViewDidEnter(){
		 
		

	}
	   

 


   get_training_video_details(tid,api_token,tv_id) {
 	
 
      this.dataService.get_training_video_details(tid,api_token,tv_id).subscribe(result => {
      
      this.training_video_data=result;

      this.related_training_videos=this.training_video_data?.related_training_videos;

		
      if(this.training_video_data?.training_video?.embed_url){

        let embed_video = this.training_video_data?.training_video?.embed_url;
        
        console.log(embed_video);

			  var embed_iframe=(document.querySelector('#embed_iframe'));

			     (embed_iframe as HTMLElement).innerHTML = embed_video;
 
	    	}

       

    });
	 


  }


videoDetail(tv_id){
  window.location.href="training-video-details/"+tv_id;
}


 

}
