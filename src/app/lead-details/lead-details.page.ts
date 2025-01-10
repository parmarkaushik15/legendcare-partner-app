import { DataService } from '../service/data.service';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
//import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { HTTP } from '@ionic-native/http/ngx';
import { File } from '@ionic-native/file/ngx';
import { Browser } from '@capacitor/browser';
import * as $ from "jquery";




@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.page.html',
  styleUrls: ['./lead-details.page.scss'],
})
export class LeadDetailsPage implements OnInit {
  tl_id = null;
  oid = null;

  lead_details_data = null;

  tid = null;
  api_token = null;

  fileTransfer: FileTransferObject;


  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    public loadingController: LoadingController,
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    private fileOpener: FileOpener,

  ) {

    this.tid = localStorage.getItem('tid');
    this.api_token = localStorage.getItem('api_token');




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
    this.presentLoading();
    this.tl_id = this.activatedRoute.snapshot.paramMap.get('tl_id');

    this.lead_details(this.tl_id, this.tid, this.api_token);

  }

  async openDialer(phoneNumber) {
    console.log("phoneNumber=",phoneNumber);
    window.open(`tel:${phoneNumber}`, '_system');
  }




  lead_details(tl_id, tid, api_token) {


    this.dataService.lead_details(tl_id, tid, api_token).subscribe(result => {
      this.lead_details_data = result;
      this.oid = this.lead_details_data.order.oid;
      console.log(this.lead_details_data)


    });



  }







  ngAfterViewInit() {

    $('.btn_customer_cancel').on('click', function () {
      $('.msg_order_status').html('');
      $('.order_status_reschedule_container').hide();

      $('.customer_cancel_pop_up').fadeToggle();


    });




    $('.order_sc').on('change', function () {
      let value = $(this).val();

      let reason_box = $('.reason_box').html();
      let private_complaint = $('.private_complaint').html();

      $('.msg_order_status').html('');

      $('.submit_btn_container').fadeIn();

      if (value == 8) {
        $('.order_status_reschedule_container').show();
      } else {
        $('.order_status_reschedule_container').hide();

      }

      if (value == 9) {
        $('.order_status_cancel_container_9').html(reason_box).show();
        $('.reason_box').find('textarea').attr('required', 'true');
      } else {
        $('.order_status_cancel_container_9').html('').hide();
        $('.reason_box').find('textarea').removeAttr('required');

      }


      if (value == 12) {
        $('.order_status_cancel_container_12').html(reason_box).show();
      } else {
        $('.order_status_cancel_container_12').html('').hide();
      }


      if (value == 14) {
        $('.order_status_private_complaint_container').html(private_complaint).show();
      } else {
        $('.order_status_private_complaint_container').html('').hide();
      }


    });







  }












  order_status_change() {
    let reason_box = $('.reason_box').html();


    $('.loader_submit_btn').show();


    let formdata = $('#order_status_change').serialize();

    let action = this.dataService.api_url + "order_status_change"

    let order_sc = $('.order_sc:checked').val();

    if (order_sc == 8) {
      let order_status_reschedule = $('.order_status_reschedule').val();

      if (order_status_reschedule == '') {
        $('.msg_order_status').html("Please enter Re-schedule date!").removeClass('text-success').addClass('text-danger');
        $('.loader_submit_btn').hide();
        return false;


      }
    }


    if (order_sc == 9) {
      let cancel_reason = $('textarea[name=cancel_reason]').val();

      if (cancel_reason == '') {
        $('.msg_order_status').html("Please enter cancel reason !").removeClass('text-success').addClass('text-danger');
        $('.loader_submit_btn').hide();
        return false;


      }
    }




    if (order_sc == 14) {
      let private_complaint_parts_name = $('textarea[name=private_complaint_parts_name]').val();
      let private_complaint_added_cost = $('input[name=private_complaint_added_cost]').val();

      if (private_complaint_parts_name == '') {
        $('.msg_order_status').html("Please enter parts name !").removeClass('text-success').addClass('text-danger');
        $('.loader_submit_btn').hide();
        return false;
      }



      if (private_complaint_added_cost == '') {
        $('.msg_order_status').html("Please enter added cost !").removeClass('text-success').addClass('text-danger');
        $('.loader_submit_btn').hide();
        return false;
      }


    }



    $('.btn_order_status_change').attr('disabled', 'true');

    $.ajax({
      url: action,
      type: "POST",
      data: formdata,
      success: function (output) {
        var status = output.status;
        var message = output.message;

        if (status == 1) {
          $('.msg_order_status').html(message).removeClass('text-danger').addClass('text-success');
          setTimeout(function () {

            $('#order_status_change').trigger('reset');
            $('.customer_cancel_pop_up').fadeOut();
            $('.loader_submit_btn').hide();

            window.location.reload();

          }, 2000);

        } else {
          $('.msg_order_status').html("Error Submitting !").removeClass('text-success').addClass('text-danger');
        }
      }

    });

    return false;
  }


  downloadPDFInvoice() {

    (<HTMLElement>document.querySelector('.download_pdf_loader')).style.display = "block";

    var file1 = this.file;

    var fileOpener1 = this.fileOpener;

    let file_name = "Invoice_RSI_Order_No_" + this.oid + ".pdf";



    let download_url = this.dataService.api_url + "technician_download_invoice?oid=" + this.oid + "&tid=" + this.tid + "&api_token=" + this.api_token;

    //REQUEST CREATION
    let oReq = new XMLHttpRequest();

    //SENDING REQUEST
    oReq.open("GET", download_url, true);
    oReq.responseType = "blob"; // blob pls



    //IF DATA RECEIVED THEN  WRITE FILE
    oReq.onload = function (oEvent) {

      //SAVE TEMP FILE IN APP FOLDER
      file1.writeFile(file1.dataDirectory, file_name, oReq.response, { replace: true }).then(data => {

        (<HTMLElement>document.querySelector('.download_pdf_loader')).style.display = "none";

        fileOpener1.showOpenWithDialog(file1.dataDirectory + file_name, 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e));




      });
    };
    oReq.send();//this is useless right?

  }



  downloadPDFInvoice123() {


    (<HTMLElement>document.querySelector('.download_pdf_loader')).style.display = "block";


    let file_name = "Invoice_RSI_Order_No_" + this.oid + ".pdf";

    this.fileTransfer = this.transfer.create();

    let download_url = this.dataService.api_url + "technician_download_invoice?oid=" + this.oid + "&tid=" + this.tid + "&api_token=" + this.api_token;




    //there was 401 error , so to fix added below inside capacitor.config.JSON and also installed plugin "cordova-plugin-whitelist"
    /*   "server": {
        "hostname": "app",    
       "iosScheme": "ionic",
       "androidScheme": "http",  
       "allowNavigation": [
         "repairservicesindia.com"  
       ]
     }
     }*/

    // console.log(download_url);





    this.fileTransfer.download(download_url, this.file.dataDirectory + file_name).then((entry) => {
      console.log('download complete: ' + entry.toURL());



      (<HTMLElement>document.querySelector('.download_pdf_loader')).style.display = "none";

      this.fileOpener.showOpenWithDialog(this.file.dataDirectory + file_name, 'application/pdf')
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error opening file', e));


    }, (error) => {
      // handle error
      (<HTMLElement>document.querySelector('.download_pdf_loader')).style.display = "none";

      console.log(JSON.stringify(error));
      alert(JSON.stringify(error));

    });





  }


  async goToMap(order) {
    console.log(order);
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Latitude:', coordinates.coords.latitude);
    console.log('Longitude:', coordinates.coords.longitude);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${coordinates.coords.latitude},${coordinates.coords.longitude}&destination=${order.lat},${order.lng}`;

    try {
      await Browser.open({ url: googleMapsUrl });
    } catch (error) {
      console.error('Error opening Google Maps:', error);
    }
  }



}
