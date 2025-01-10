import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})

export class DataService {


  //  public api_url = "http://localhost/repairservicesindia.com/api/";
  //  public api_url2 = "http://localhost/repairservicesindia.com/";



  public api_url = "https://dashboard.legendcompany.in/api/";
  public api_url2 = "https://dashboard.legendcompany.in/";



  authState = new BehaviorSubject(false);


  constructor(private http: HttpClient) { }


  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }




  check_if_authenticated(tid, api_token) {
    return this.http.get(this.api_url + "check_if_authenticated?tid=" + tid + "&api_token=" + api_token);
  }


  otp_send_for_login_partner(phone) {
    return this.http.get(this.api_url2 + "ajax/ajax_otp_send_for_login_partner?phone=" + phone);
  }


  check_otp_for_login_with_phone_partner(phone, otp) {
    return this.http.get(this.api_url2 + "ajax/check_otp_for_login_with_phone_partner?phone=" + phone + "&otp=" + otp);
  }






  choose_primary_business(tid) {
    return this.http.get(this.api_url + "choose_primary_business?tid=" + tid);
  }


  primary_business_update(tid, choose_primary_business_form) {
    return this.http.post(this.api_url + "primary_business_update?tid=" + tid + "&" + choose_primary_business_form, null, this.httpOptions);
  }











  get_technician_profile(tid, api_token) {
    return this.http.get(this.api_url + "get_technician_profile?tid=" + tid + "&api_token=" + api_token);
  }


  upload_technician_profile_photo(value) {


    return this.http.post(this.api_url + "upload_technician_profile_photo", value, this.httpOptions);
  }


  update_technician_profile(value) {


    return this.http.post(this.api_url + "update_technician_profile", value, this.httpOptions);
  }


  get_technician_unread_new_leads(tid, api_token) {
    return this.http.get(this.api_url + "get_technician_unread_new_leads?tid=" + tid + "&api_token=" + api_token);
  }


  get_technician_leads(tid, api_token, page) {
    return this.http.get(this.api_url + "leads?page=" + page + "&tid=" + tid + "&api_token=" + api_token);
  }


  get_technician_leads_by_type(tid, api_token, lead_type, page, per_page) {
    return this.http.get(this.api_url + "leads?page=" + page + "&per_page=" + per_page + "&lead_type=" + lead_type + "&tid=" + tid + "&api_token=" + api_token);
  }


  search_technician_leads(value) {
    return this.http.post(this.api_url + "search_technician_leads", value, this.httpOptions);
  }



  lead_details(tl_id, tid, api_token) {
    return this.http.get(this.api_url + "lead-details/" + tl_id + "?tid=" + tid + "&api_token=" + api_token);
  }


  order_details(tl_id, tid, api_token) {
    return this.http.get(this.api_url + "order-details/" + tl_id + "?tid=" + tid + "&api_token=" + api_token);
  }


  upload_data(url, filedata) {
    const formData = new FormData();
    formData.append('file', filedata);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(url, formData, {
      headers
    });
  }






  check_technician_document_submitted(tid, api_token) {
    return this.http.get(this.api_url + "check_technician_document_submitted?tid=" + tid + "&api_token=" + api_token);
  }



  get_technician_id_proofs(tid, api_token) {
    return this.http.get(this.api_url + "get_technician_id_proofs?tid=" + tid + "&api_token=" + api_token);
  }




  update_identity_form(value) {


    return this.http.post(this.api_url + "update_identity_form", value, this.httpOptions);
  }



  get_technician_personal_details(tid, api_token) {
    return this.http.get(this.api_url + "get_technician_personal_details?tid=" + tid + "&api_token=" + api_token);
  }

  technician_personal_details_submit(value) {

    return this.http.post(this.api_url + "technician_personal_details_submit", value, this.httpOptions);
  }



  get_technician_current_address(tid, api_token) {
    return this.http.get(this.api_url + "get_technician_current_address?tid=" + tid + "&api_token=" + api_token);
  }

  technician_current_address_submit(value) {

    return this.http.post(this.api_url + "technician_current_address_submit", value, this.httpOptions);
  }




  get_technician_declaration(tid, api_token) {
    return this.http.get(this.api_url + "get_technician_declaration?tid=" + tid + "&api_token=" + api_token);
  }

  technician_declaration_submit(value) {

    return this.http.post(this.api_url + "technician_declaration_submit", value, this.httpOptions);
  }




  get_payment_options(tid, api_token) {
    return this.http.get(this.api_url + "get_payment_options?tid=" + tid + "&api_token=" + api_token);
  }


  wallet_recharge(value) {

    return this.http.post(this.api_url + "wallet_recharge", value, this.httpOptions);
  }


  get_recharge_history(tid, api_token, page) {
    return this.http.get(this.api_url + "get_recharge_history?page=" + page + "&tid=" + tid + "&api_token=" + api_token);
  }


  get_wallet_balance(tid, api_token) {
    return this.http.get(this.api_url + "get_wallet_balance?tid=" + tid + "&api_token=" + api_token);
  }


  get_unread_messages(member_type, tid, api_token) {
    return this.http.get(this.api_url + "get_unread_messages?member_type=" + member_type + "&tid=" + tid + "&api_token=" + api_token);
  }


  update_unread_messages(member_type, tid, api_token) {
    return this.http.get(this.api_url + "update_unread_messages?member_type=" + member_type + "&tid=" + tid + "&api_token=" + api_token);
  }

  get_training_videos(tid, api_token) {
    return this.http.get(this.api_url + "get_training_videos?tid=" + tid + "&api_token=" + api_token);
  }


  get_training_video_details(tid, api_token, tv_id) {
    return this.http.get(this.api_url + "get_training_video_details/" + tv_id + "?tid=" + tid + "&api_token=" + api_token);
  }



  get_technician_id_card(tid, api_token, mode) {
    return this.http.get(this.api_url + "get_technician_id_card?mode=" + mode + "&tid=" + tid + "&api_token=" + api_token);
  }


  get_technician_messages(tid, api_token) {
    return this.http.get(this.api_url + "get_technician_messages?tid=" + tid + "&api_token=" + api_token);
  }


  technician_send_message(value) {


    return this.http.post(this.api_url + "technician_send_message", value, this.httpOptions);
  }



  registerFCMToken(tid, token) {
    var value = {
      tid: tid,
      token: token
    };


    return this.http.post(this.api_url + "register_fcm_token", value, this.httpOptions);
  }



  get_basic_page(page_name) {
    return this.http.get(this.api_url + "get_basic_page?page_name=" + page_name);
  }


  submit_contact_form(value) {

    return this.http.post(this.api_url + "submit_contact_form", value, this.httpOptions);
  }




}
