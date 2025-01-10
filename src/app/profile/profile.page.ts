import { DataService } from '../service/data.service';

import { Component, ViewChild, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ToastController } from '@ionic/angular';


import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';

import { File } from '@ionic-native/file/ngx'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  tid = null;
  api_token = null;
  profile_data = null;

  choose_primary_business = null;
  primary_business_result = null;

  update_response = null;
  upload_photo_response = null;

  checkDisabled = true;

  public myForm: FormGroup;


  fileTransfer: FileTransferObject;


  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions: ImagePickerOptions = {
    maximumImagesCount: 1,
    quality: 100,
  };

  cropOptions: CropOptions = {
    quality: 60
  }


  constructor(
    public toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    public formBuilder: FormBuilder,
    private transfer: FileTransfer,
    private crop: Crop,
    private imagePicker: ImagePicker,
    private file: File,
    private filePath: FilePath,
    private fileChooser: FileChooser,

  ) {


    this.tid = localStorage.getItem('tid');
    this.api_token = localStorage.getItem('api_token');


    this.myForm = this.formBuilder.group({
      name: [this.profile_data?.technician.name, Validators.required],
      phone: [this.profile_data?.technician.phone, Validators.required],
      email: [this.profile_data?.technician.email, Validators.required],
      city_id: [this.profile_data?.technician.city_id, Validators.required],
      accept_order: [this.profile_data?.technician.accept_order, Validators.required],
      terms_accepted: [this.profile_data?.technician.terms_accepted, Validators.required]

    });

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





  }




  ionViewDidEnter() {
    this.get_technician_profile(this.tid, this.api_token);

  }






  get_technician_profile(tid, api_token) {


    this.dataService.get_technician_profile(tid, api_token).subscribe(result => {
      this.profile_data = result;

      if (this.profile_data.technician.badge > 0) {
        this.checkDisabled = true;
      } else {
        this.checkDisabled = false;
      }

      this.myForm = this.formBuilder.group({
        name: [this.profile_data.technician.name, Validators.required],
        phone: [this.profile_data?.technician.phone, Validators.required],
        email: [this.profile_data?.technician.email, Validators.required],
        city_id: [this.profile_data?.technician.city_id, Validators.required],
        accept_order: [this.profile_data?.technician.accept_order, Validators.required],

        terms_accepted: [this.profile_data.technician.terms_accepted, Validators.required]

      });


      //console.log(this.profile_data.technician.name);

    });



  }





  updateProfile() {
    console.log(this.myForm.value);


    var terms_accepted = this.myForm.controls['terms_accepted'].value

    if (this.profile_data.technician.terms_accepted == 0) {


      if (!terms_accepted) {
        this.presentToast('Please accept our terms & condition !', 'danger');
        return false;
      }

    }


    if (!this.myForm.valid) {
      this.presentToast('Please enter all required information', 'danger');
      return false;
    }




    this.myForm.value['tid'] = this.tid;
    this.myForm.value['api_token'] = this.api_token;

    //to read single field
    //var name= this.myForm.controls['name'].value

    //for all submitted myForm 
    //var all=this.myForm.value;




    this.dataService.update_technician_profile(this.myForm.value).subscribe((res) => {

      this.update_response = res;
      var status = this.update_response.status;
      var message = this.update_response.message;

      if (status == 1) {
        this.presentToast(message, 'success');

        if (this.profile_data.technician.is_new_member == 1) {

          this.router.navigate(['/documents-index']);
        }

      } else {
        this.presentToast(message, 'danger');
      }


    });



  }







  profilePhotoUpload() {
    
      this.fileChooser.open().then((uri) => {

        (<HTMLElement>document.querySelector('.photo_upload_loader')).style.display = "block";


        this.crop.crop(uri, this.cropOptions)
          .then(
            newPath => {

              //this.showCroppedImage(newPath.split('?')[0]);




              this.filePath.resolveNativePath(newPath).then((nativePath) => {

                // alert(nativePath);

                this.fileTransfer = this.transfer.create();

                let options: FileUploadOptions = {
                  fileKey: 'file',
                  fileName: 'profile_photo.png',
                  chunkedMode: false,
                  //mimeType: "image/jpeg",
                }


                this.fileTransfer.upload(nativePath, this.dataService.api_url + 'upload_technician_profile_photo?tid=' + this.tid + "&api_token=" + this.api_token, options)
                  .then((data) => {


                    //alert("Uploaded Successfully"+JSON.stringify(data));

                    let res = JSON.parse(data.response);
                    if (res.status == 1) {
                      var uploaded_path = res.uploaded;

                      document.querySelector('.photo_container').innerHTML = "<img src='" + uploaded_path + "'>";

                    }


                  }, (err) => {

                    alert(JSON.stringify(err));

                  });



              }).catch((err) => {
                alert(JSON.stringify(err));
              });


              (<HTMLElement>document.querySelector('.photo_upload_loader')).style.display = "none";


            },
            error => {
              alert('Error cropping image' + error);
            }
          );


      })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
 






  }










}
