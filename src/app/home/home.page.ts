import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../service/data.service';

import { ToastController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

import * as $ from "jquery";



@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})


export class HomePage implements OnDestroy{

	tid = null;
 
	api_url = "https://dashboard.legendcompany.in";

	phone="";
	otp_send_result = null;
	check_otp_result = null;

	otp_partner_container = false;

	otp: string[] = ['', '', '', ''];
	otpArray = Array(4);
  
	countdown: number = 60; // Timer starts at 60 seconds
	timer: any; // Reference to the countdown timer
  
	onKeyUp(event: KeyboardEvent, index: number): void {
	  const input = event.target as HTMLInputElement;
	  const value = input.value;
	  if (value && index < 3) {
		const nextInput = document.getElementById(`otp${index + 1}`) as HTMLInputElement;
		nextInput?.focus();
	  }
	}
  
	onKeyDown(event: KeyboardEvent): void {
	  if (event.key === 'Backspace') {
		const input = event.target as HTMLInputElement;
		input.value = '';
	  }
	}
  
	onInput(event: Event, index: number): void {
	  const input = event.target as HTMLInputElement;
	  this.otp[index] = input.value;
	}

	constructor(public toastController: ToastController, private dataService: DataService,
		public router: Router) {

		this.tid = localStorage.getItem('tid');

		if (this.tid) {  
			window.location.href = 'dashboard';
		}
	}

	maskPhone(phone) {
		const lastTwoDigits = phone.slice(-2);
		const maskedPhone = phone.slice(0, -2).replace(/\d/g, '*') + lastTwoDigits;
		return maskedPhone;
	}



	async presentToast(msg, color) {
		const toast = await this.toastController.create({
			message: msg,
			duration: 1000, 
			color: color
		});
		toast.present();
	}

	ngOnInit() {

	}


	ngOnDestroy() {
		if (this.timer) {
		  clearInterval(this.timer);
		}
	  }

	hello() {
		alert(this.api_url);
	}















	otp_send_now3() {

	

		var phone: any = $('.phone_partner').val();


		var count_digit = phone.length;
		this.phone = phone;
		//alert(count_digit);

		if (count_digit != 10) {

			this.presentToast('Please enter 10 digit phone number !', 'danger');

			return false;
		}


		if (phone == '') {
			this.presentToast('Phone number is required !', 'danger');

			return false;
		}

		




		this.dataService.otp_send_for_login_partner(phone).subscribe(result => {
			this.otp_send_result = result;

			if (this.otp_send_result.status == 1) {
				this.otp_partner_container = true;
				var message = this.otp_send_result.message;
				this.startCountdown();
				this.presentToast(message, 'success');


			} else {
				this.presentToast('Some error sending OTP !', 'danger');

			}

			console.log(this.otp_send_result);

		});

 


		return true;



	}

	resendOtp() {
		this.countdown = 60;
		this.dataService.otp_send_for_login_partner(this.phone).subscribe(result => {
			this.otp_send_result = result;
			if (this.otp_send_result.status == 1) {
				var message = this.otp_send_result.message;
				this.startCountdown();
				this.presentToast(message, 'success');
			} else {
				this.presentToast('Some error sending OTP !', 'danger');
			}
		});

 
	}

	startCountdown() {
		if (this.timer) {
		  clearInterval(this.timer); // Clear any existing timers
		}
	
		this.timer = setInterval(() => {
		  if (this.countdown > 0) {
			this.countdown--;
		  } else {
			clearInterval(this.timer); // Stop the timer when it reaches 0
		  }
		}, 1000);
	  }



	btn_login_with_phone_partner() {
		var otp = this.otp.join('');
		var phone = this.phone;
		if(!otp) {
			this.presentToast('Please enter OTP!', 'danger');
		}else{
			this.check_otp_for_login_with_phone_partner(phone, otp);
		return false;
		}
		

	}





	check_otp_for_login_with_phone_partner(phone, otp) {
		this.dataService.check_otp_for_login_with_phone_partner(phone, otp).subscribe(result => {
			this.check_otp_result = result;
			var status = this.check_otp_result.status;
			var message = this.check_otp_result.message;
			var api_token = this.check_otp_result.api_token;
			var tid = this.check_otp_result.tid;
			var is_new_user = this.check_otp_result.is_new_user;
			if (status == 1) {
				this.presentToast(message, 'success');
				localStorage.setItem('tid', tid);
				localStorage.setItem('api_token', api_token);
				if (is_new_user == 1) {
					this.phone = "";
					this.otp_sent_for_login_partner_back();
					this.router.navigate(['/primary-business']) 
				} else { 
					window.location.href = 'dashboard';
				}
			} else {
				this.presentToast(message, 'danger');
			}

		});





		var str = 'phone=' + phone + '&otp=' + otp;
		$.ajax({
			url: this.api_url + '/ajax/check_otp_for_login_with_phone_partner',
			type: 'GET',
			data: str,
			success: function (output) {
			}

		});
	}






	show_error3(msg) {

		$('.error_message3').html(msg).show();

	}








	otp_sent_for_login_partner() {
		if (this.otp_send_now3() == false) {
			return false;
		}		return false
	}


	otp_sent_for_login_partner_back() {
		 this.otp_partner_container = false;

	}







}
