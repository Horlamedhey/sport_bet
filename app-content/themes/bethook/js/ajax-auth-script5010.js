jQuery(document).ready(function ($) {


	// Perform AJAX login/register on form submit
	$('form#register').on('submit', function (e) {
        if (!$(this).valid()) return false;
        $('p.status', this).show().text(ajax_auth_object.loadingmessage);
		action = 'ajaxlogin';
		username = 	$('form#login #username').val();
		password = $('form#login #password').val();
		email = '';
		security = $('form#login #security').val();
		recaptcha= '';
		ctrl = $(this).attr('id');
		if (ctrl == 'register') {
			action = 'ajaxregister';
			username = $('#signonname').val();
			password = $('#signonpassword').val();
        	email = $('.email').val();
        	security = $('#signonsecurity').val();
			recaptcha = $('#g-recaptcha-response').val();	
		}  
		$.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_auth_object.ajaxurl,
            data: {
                'action': action,
                'username': username,
                'password': password,
				'email': email, 
                'security': security,
				'recaptcha': recaptcha
            },
            success: function (data) {
				$('p.status').hide();
				if (data.loggedin == true){
                    document.location.href = ajax_auth_object.redirecturl;
                }else if (ctrl == 'register'){
					$('p.status').show().text(data.message);
					grecaptcha.reset();	
                }				
            }
        });
        e.preventDefault();
    });
	
	// Client side form validation
    if (jQuery("#register").length) {
		jQuery("#register").validate({
			rules:{
				password2:{ equalTo:'#signonpassword' }	
			}	
		});	
	}		
    else if (jQuery("#login").length) 
		jQuery("#login").validate();
});