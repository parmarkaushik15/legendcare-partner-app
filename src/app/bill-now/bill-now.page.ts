import { DataService } from '../service/data.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular'; 
import * as $ from "jquery";



@Component({
  selector: 'app-bill-now',
  templateUrl: './bill-now.page.html',
  styleUrls: ['./bill-now.page.scss'],
})
export class BillNowPage implements OnInit {

  tl_id = null;
  oid = null;

  lead_details_data = null;

  tid = null;
  api_token = null;

  selectedFile: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    public loadingController: LoadingController,
    public toastController: ToastController) {

    this.tid = localStorage.getItem('tid');
    this.api_token = localStorage.getItem('api_token');



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



  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


  ngOnInit() {
    // this.presentLoading();
    this.tl_id = this.activatedRoute.snapshot.paramMap.get('tl_id');

    this.order_details(this.tl_id, this.tid, this.api_token);

  }





  order_details(tl_id, tid, api_token) {


    this.dataService.order_details(tl_id, tid, api_token).subscribe(result => {
      this.lead_details_data = result;
      this.oid = this.lead_details_data.order.oid;

      if (this.lead_details_data?.OrderCompleted) {

        // this.router.navigate(['/lead-details/'+this.tl_id]);

        //to reload properly
        window.location.href = 'lead-details/' + this.tl_id;

      }




    });



  }





  async handleFileInput(event: Event) {

    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.selectedFile = input.files[0];
      console.log('File selected:', this.selectedFile);
      let case_image_type = $('.case_image_type:checked').val();
      let other_data = "oid=" + this.oid + "&tl_id=" + this.tl_id + "&case_image_type=" + case_image_type;
      console.log(other_data);
      const url = this.dataService.api_url + 'upload_order_case_picture?tid=' + this.tid + "&api_token=" + this.api_token + "&" + other_data
      this.dataService.upload_data(url, this.selectedFile).subscribe((res: any) => {
        console.log(res);
        (<HTMLElement>document.querySelector('.photo_upload_loader')).style.display = "none";
        if (res.status == 1) {
          var uploaded_path = res.uploaded;
          (<HTMLElement>document.querySelector('.photo_container')).innerHTML = "<img src='" + uploaded_path + "'>";
        }
      }, (err) => {
        (<HTMLElement>document.querySelector('.photo_upload_loader')).style.display = "none";
        alert(err.message);

      })
    }
  }

  upload_order_case_picture() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    (<HTMLElement>document.querySelector('.photo_upload_loader')).style.display = "block";
    fileInput.click(); 
  }







  ngAfterViewInit() {


    $(document).on("blur", '.more_billing_item_container .order_items_amount', function () {

      var gtxx: any = $('input[name=grand_total]').val();

      var grand_total = parseInt(gtxx);


      var s = $('.more_billing_item_container .order_items_amount');
      var t = 0;
      var final_total: any = 0;

      $.each(s, function () {
        if ($(this).val()) {

          var poiuxx: any = $(this).val();

          t = t + parseInt(poiuxx);
        }

      });


      // alert(t);

      final_total = grand_total + t;
      $('input[name=net_grand_total]').val(final_total);

      $('.total_display').html(final_total);

      return false;

    });






    //$(document).ready(function(){

    //alert(this.dataService.api_url);



    $('.is_warrenty').on('click', function () {
      $('.warrenty_msg').fadeToggle();


    });




    $('.add_more_billing_item').on('click', function () {
      var data = $('.data_billing_item').html();
      $('.more_billing_item_container').append(data);

      return false;

    });










    //});



  }














  order_complete() {
    debugger

    let photo_container = $('.photo_container').html();

    if (photo_container == '') {
      this.presentToast('Please Upload Image', 'danger');


    }
    let allFilled = true;

    $('.more_billing_item_container input[name="order_items_amount[]"]').each(function () {
      let data: any = $(this).val();
      if ($.trim(data) === '') {
        allFilled = false;
        $(this).addClass('is-invalid'); // Add a class to highlight invalid fields
      } else {
        $(this).removeClass('is-invalid'); // Remove the class if valid
      }
    });

    // If any field is empty, prevent form submission
    if (!allFilled) {
      this.presentToast('Please enter all bill amount', 'danger');
      return false;
    }

    if (allFilled) {

      $('.loader_submit_btn').show();

      this.presentLoading();


      $('#order_complete').attr('disabled', 'disabled');

      var formdata = $('#bill_customer_form').serialize();
      console.log(formdata);
      var action = this.dataService.api_url + "order_bill_now_submit"

      $('#order_complete').attr('disabled', 'true');

      $.ajax({
        url: action,
        type: "POST",
        data: formdata,
        success: function (output) {

          let status = output.status;
          let msg = output.msg;
          let tl_id = output.tl_id;

          if (status == 1) {
            $('.msg_order').html("Successfully Completed !").removeClass('alert-danger').addClass('alert-success');
            setTimeout(function () {

              $('#bill_customer_form').fadeOut();
              $('.bill_customer_form_other_hide_section').fadeOut();

              $('.loader_submit_btn').hide();

              //this.router.navigate(['/lead-details/'+this.tl_id]);
              window.location.href = '/lead-details/' + tl_id;

            }, 1500);

          } else {
            $('.loader_submit_btn').hide();
            $('.msg_order').html(msg).removeClass('alert-success').addClass('alert-danger');
            $('#order_complete').removeAttr('disabled');
          }
        }

      });

    }
    return false;

  }










}
