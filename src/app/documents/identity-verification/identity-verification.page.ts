import { DataService } from '../../service/data.service';

import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
 
 import {Validators, FormBuilder,FormControl, FormGroup } from '@angular/forms';

import {ToastController } from '@ionic/angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-identity-verification',
  templateUrl: './identity-verification.page.html',
  styleUrls: ['./identity-verification.page.scss'],
})


export class IdentityVerificationPage implements OnInit {

  public myForm : FormGroup;

leads=null;

tid=null;
api_token=null;
technician_id_proofs=null;

is_aadhar_card_image_front_uploaded=false;

update_res=null;

uploadText:any;

fileTransfer:FileTransferObject;



     

constructor(
        public toastController: ToastController,
        private activatedRoute: ActivatedRoute,
        private dataService : DataService,
        private router: Router,
         private formBuilder: FormBuilder,
  		private transfer: FileTransfer,
  		private file: File,
  		private filePath: FilePath,
  		private fileChooser: FileChooser
        ) { 

	  	 this.tid=localStorage.getItem('tid');
	      this.api_token=localStorage.getItem('api_token');

	      this.uploadText="";


  			


	      this.get_technician_id_proofs(this.tid,this.api_token);


        
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

  	 var segment2 = document.querySelector('ion-segment');
	  var slides2 = document.querySelector('ion-slides');

	  segment2.addEventListener('ionChange', (ev) => onSegmentChange(ev));
	  slides2.addEventListener('ionSlideDidChange', (ev) => onSlideDidChange(ev));

	  
	  // On Segment change slide to the matching slide
	  function onSegmentChange(ev) {
	    slideTo(ev.detail.value);
	  }

	  function slideTo(index) {
	    slides2.slideTo(index);
	  }

	  // On Slide change update segment to the matching value
	  async function onSlideDidChange(ev) {
	    var index = await slides2.getActiveIndex();
	    clickSegment(index);
	  }

	  function clickSegment(index) {
	    segment2.value = index;
	  }
  }





   


   get_technician_id_proofs(tid,api_token) {
 
 
      this.dataService.get_technician_id_proofs(tid,api_token).subscribe(result => {
      this.technician_id_proofs=result;

//      alert(this.technician_id_proofs.data[0]?.image_front);

      if(this.technician_id_proofs.data[0]?.image_front!=null){
      	this.is_aadhar_card_image_front_uploaded=true;
      }
  
           this.myForm = this.formBuilder.group({
		    name_0: [this.technician_id_proofs.data[0]?.name,Validators.required],
		    number_0: [this.technician_id_proofs.data[0]?.number,Validators.required],

		    name_1: [this.technician_id_proofs.data[1]?.name],
		    number_1: [this.technician_id_proofs.data[1]?.number],

		     name_2: [this.technician_id_proofs.data[2]?.name],
		    number_2: [this.technician_id_proofs.data[2]?.number],

		     name_3: [this.technician_id_proofs.data[3]?.name],
		    number_3: [this.technician_id_proofs.data[3]?.number],

		     
		    
		});
 
 
 			 
       //console.log(this.technician_id_proofs.data.tip_id);

    });
	 


  }





	identityFormSubmit(ipt_id){
	 
     console.log(this.myForm.value)
     //return false;


	if(!this.myForm.valid){
       this.presentToast('Please enter all required information','danger');
        return false;
     }

     if(!this.is_aadhar_card_image_front_uploaded){
       this.presentToast('Required front side image of aadhar card','danger');
        return false;
     }



     this.myForm.value['ipt_id']=ipt_id;
     this.myForm.value['tid']=this.tid;
     this.myForm.value['api_token']=this.api_token;

     //to read single field
      //var name= this.myForm.controls['name'].value

      //for all submitted myForm 
      //var all=this.myForm.value;

 

 
    this.dataService.update_identity_form(this.myForm.value).subscribe((res) => {
 
      this.update_res=res;
      var status=this.update_res.status;
      var message=this.update_res.message;
      var url=this.update_res.url;
   
      if(status==1){
        this.presentToast(message,'success');

 
            // this.router.navigate([url]);
          

      }else{
        this.presentToast(message,'danger');
      }


    });
	 



	}






continueNextStep(ipt_id){
	 
	 this.identityFormSubmit(ipt_id);

	if(!this.myForm.valid){
       this.presentToast('Please enter all required information','danger');
        return false;
     }

     if(!this.is_aadhar_card_image_front_uploaded){
       this.presentToast('Required front side image of aadhar card','danger');
        return false;
     }



       this.router.navigate(['personal-details']);
     



	}
















  imageUpload(image_type,ipt_id) {

 this.fileChooser.open().then((uri)=>{
 	    (<HTMLElement>document.querySelector('.loader_'+ipt_id)).style.display="block";


 	this.filePath.resolveNativePath(uri).then((nativePath)=>{

 			//alert(nativePath);

 			  this.fileTransfer= this.transfer.create();
  
			  let options: FileUploadOptions = {
			      fileKey: 'file',
			      fileName: 'image.png',
			      chunkedMode: false,
			      //mimeType: "image/jpeg",
			    }


			    this.fileTransfer.upload(nativePath, this.dataService.api_url+'upload_technician_id_proof_document?tid='+this.tid+"&api_token="+this.api_token+"&image_type="+image_type+"&ipt_id="+ipt_id, options)
			      .then((data) => {
			      
			      //alert("Uploaded Successfully"+JSON.stringify(data));

			      if((image_type=='image_front') && (ipt_id==2)){
			      	this.is_aadhar_card_image_front_uploaded=true;
			      }

  	    
		  	    (<HTMLElement>document.querySelector('.loader_'+ipt_id)).style.display="none";

			      let res = JSON.parse(data.response);
			      if (res.status == 1) {
			          var uploaded_path=res.uploaded;

			          document.querySelector('.'+image_type+'_'+ipt_id).innerHTML="<img src='"+uploaded_path+"'>";

			      }


			    }, (err) => {
			     // alert(JSON.stringify(err));
		  	    (<HTMLElement>document.querySelector('.loader_'+ipt_id)).style.display="none";

			    });



 	}).catch((err) => {
 		//alert(JSON.stringify(err));
 	});


 })
  .catch((err)=>{
    //alert(JSON.stringify(err));
  });


 

  (<HTMLElement>document.querySelector('.loader_'+ipt_id)).style.display="none";




}






}