 


  

$(document).ready(function(){

  var tid=localStorage.getItem('tid');
  
  //alert(tid);
	
	$('input[name=otp_for_login_partner]').on('keyup',function(){
		//alert('ok');		
		$('.btn_login_otp_for_phone_partner').removeAttr('disabled');
		
	
	});
	 
	
	
	

});




 function otp_sent_for_login_partner(){
	//alert('ok');
	 if(otp_send_now3()==false){
		 return false;
	 }
	  
	 var phone=$('input[name=phone_partner]').val();
	 
	$('.otp_sent_phone_no_partner').html(phone);
	
	$('.phone_partner_container').hide(); 
	$('.otp_partner_container').show();
	
	return false
}


function otp_sent_for_login_partner_back(){
	$('.phone_partner_container').show();
 	$('.otp_partner_container').hide();

}
 







function otp_send_now3(){
		
	var phone=$('input[name=phone_partner]').val();
		
		
		var count_digit=phone.length;
		 //alert(count_digit);
		
		if(count_digit!=10){
			show_error3('Please enter 10 digit phone number !');
 			return false;
		}
		
		
		if(phone==''){
			show_error3('Phone number is required !');
			return false;
		}
		 
		 
		 
		$('.otp_sent_msg3').html('');	 
	
		 

 		
  		var str='phone='+phone;
		
		//$('.content').html(str);
		
 		
		$.ajax({
			url:url+'/ajax/ajax_otp_send_for_login_partner',
			type:'GET',
			data:str,
			success:function(output){
						var status=output.status;
						var message=output.message;
						
 						
 						if(status==1){
							//
							$('.otp_sent_msg3').html('<div class="alert alert-success">'+message+'</div>').fadeIn('slow');
							  
						}else{
 							show_error3('Some error sending OTP !')
						 } 
				
					}
		
		});
	
	
		return true;
		 
	
	
	}





	function btn_login_with_phone_partner(){
		var otp=$("input[name=otp_for_login_partner]" ).val();	
		
		var phone=$( "input[name=phone_partner]" ).val();	
		 check_otp_for_login_with_phone_partner(phone,otp);
		 return false;

	}
	
	
	
	
	
	function check_otp_for_login_with_phone_partner(phone,otp){
		
		
	 

		
	
	var str='phone='+phone+'&otp='+otp;
	$.ajax({
			url:url+'/ajax/check_otp_for_login_with_phone_partner',
			type:'GET',
			data:str,
			success:function(output){
						var status=output.status;
						var message=output.message;
						var tid=output.tid;
 						
						if(status==1){
						 $('.otp_sent_msg3').html('<div class="alert alert-success">'+message+'</div>').fadeIn('slow');
 						   $('.btn_login_otp_for_phone_partner').prop('disabled',false);
						   
 							//jump to final next step
						 	$('.otp_sent_msg3').html('<div class="alert alert-success">'+message+'</div>').fadeIn('slow');
							
							//for use in partner's app for FCM notification send 
							localStorage.setItem('tid',tid);
							
							//jump to final next step
							setTimeout(function(){
								
								window.location.href = url+"/partner/profile";	
								
							},1000);
							

						 
						  
						 }else{
						 	$('.otp_sent_msg3').html('<div class="alert alert-danger">'+message+'</div>').fadeIn('slow');
 							  $('.btn_login_otp_for_phone_partner').prop('disabled',false);
 
						 } 
				
					}
		
		});
	}
	
	
	



function show_error3(msg){
	
	$('.error_message3').html(msg).show();
	
}


 