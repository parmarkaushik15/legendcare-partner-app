function otp_send_now(){
 	var phone=$('input[name=phone]').val();
		
		
		var count_digit=phone.length;
		
		
		if(count_digit!=10){
			show_error_modal('Please enter 10 digit phone number !');
 			return false;
		}
		
		
		if(phone==''){
			show_error_modal('Phone number is required !');
			return false;
		}
		 
		 
		 
		$('.otp_sent_msg').html('');	 
	
		 

 		
  		var str='phone='+phone;
		
		//$('.content').html(str);
		
 		
		$.ajax({
			url:url+'/ajax/otp_send',
			type:'GET',
			data:str,
			success:function(output){
						var status=output.status;
						var message=output.message;
						
						$('.phone-invalid-feedback').fadeOut();
						
						//check is already varified 
						if(status==2){
							 $('.otp_sent_msg').html('<div class="alert alert-success">'+message+'</div>').fadeIn('slow');
							 
							  //$('.btn_login_otp').prop('disabled',false);
							  
							  //to disable this mobile no. enter phase when user go back on modal pphase
							  
							  $('.is_phone_step_completd').val(1);
							  
							  
							  ///
							  
							  //jump to final next step
							
							  setTimeout(function(){
								modal_step('next');	
 								
							  },1000);
							  
							   
							  
							  
 							  
						}  						


						if(status==1){
					 	 
						 
 						  
						 }else if(status==0){
						 	//$('.otp_sent_msg').html('<div class="alert alert-danger">'+message+'</div>').fadeIn('slow');
							show_error_modal(message)
						 } 
				
					}
		
		});
	
	
		return true;
		 
	
	
	}





	function btn_login(){
		var otp=$("input[name=otp]" ).val();	
		
		var phone=$( "input[name=phone]" ).val();	
		 check_is_valid_otp(phone,otp);
		 return false;

	}
	
	
	
	
	
	function check_is_valid_otp(phone,otp){
	
	var str='phone='+phone+'&otp='+otp;
	$.ajax({
			url:url+'/ajax/check_is_valid_otp',
			type:'GET',
			data:str,
			success:function(output){
						var status=output.status;
						var message=output.message;
 						
						if(status==1){
						 $('.otp_sent_msg').html('<div class="alert alert-success">'+message+'</div>').fadeIn('slow');
 						   $('.btn_login_otp').prop('disabled',false);
						   
 							//jump to final next step
							   $('.is_phone_step_completd').val(1);
							   
							 setTimeout(function(){
								modal_step('next');
								
							  },1000);

						 
						  
						 }else{
						 	//$('.otp_sent_msg').html('<div class="alert alert-danger">'+message+'</div>').fadeIn('slow');
							show_error_modal(message)
							  $('.btn_login_otp').prop('disabled',false);
 
						 } 
				
					}
		
		});
	}
	
	
	

$(document).ready(function(){
 
  
 	
	  
	
	
	$('input[name=otp]').on('blur',function(){
				
		$('.btn_login_otp').removeAttr('disabled');
		
	
	});
	
	
 	
 	

	
	
	
	
 
	
	
	
	

});


