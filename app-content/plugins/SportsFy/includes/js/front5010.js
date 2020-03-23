jQuery(document).ready(function () {  
     //show sport number
	
	 var idk = jQuery('#pika').attr('class');
	 var cvalue = jQuery('.' + idk).text();

	 jQuery('.' + idk).text(cvalue);
	 
	 
    //make stake input height equals the submit button height
    jQuery('#stake-input').css('min-height', jQuery('#submit-slip-button').css('height'));
    
    //fix height bugs in featured page 
    jQuery('.table-col-featured-options').each(function() {
        var this_height = jQuery(this).css('height');
        var children = jQuery(this).children('.featured-bet-option-wrapper');
        
        jQuery(this).siblings('.table-col-featured-bet-event').css('height', this_height);
        
        jQuery.each(children, function (index, element) {
            jQuery(element).css('height', this_height);
        });
        
    });

    //odd changing redirection
    jQuery('#odd-type-switcher-dropdown').on('change', function () {
        
        var selected_option = jQuery(this).find('option:selected').val();
        var current_url = window.location.href;
        var query_params = window.location.search;
        var get_symbol = (query_params === '') ? '?' : '&';
        
        //change the desired odd
        window.location.replace(current_url + get_symbol + 'odd_type_changing=' + selected_option);
    });
    
    //toggle bettings
    jQuery('body').on('click', 'span[class=toggle-btn]', function () {
        var selected_id = this.id;
        var selected = selected_id.split('--');
        var type = selected[0];
        var id = selected[1];
       
        var container = jQuery('#' + type + '-container-' + id);
        
        this.innerHTML = container.css('display') === 'block' ? i18n_front.toggle_symbol_minus : i18n_front.toggle_symbol_plus;
        
        container.slideToggle();
        
    });
	
	jQuery('body').on('click', '.points-holder', function () {
        jQuery("#mb_betslip").css("display", "none");
	});
	

	//hide slip on mobile
    jQuery('body').on('click', 'li.tclose', function () {
        jQuery("#mb_betslip").css("display", "none");
		jQuery("#m_betslip").css("display", "none");
		localStorage.removeItem('chatWindowOpen');
	});
    //add bet option
    jQuery('body').on('click', 'div[id^=bet-option-btn]', function () {
        jQuery("#mb_betslip").css("display", "block");
		
		localStorage.setItem('chatWindowOpen', true);
				
        // jQuery('.bets-holder').html(i18n_front.loading);      
        jQuery('html, body').animate({
            scrollTop: jQuery("#betslip-wrapper").offset().top - 180
        }, 1000);
        
        // var selected_option_id = this.id;
        // var id = selected_option_id.split('-')[3];
        // var name = this.innerHTML;
        
        // jQuery.post(ajaxurl, {
        
        //     action: 'add_bet_option',
        //     bet_option_id: id,
        //     bet_option_name: name
            
        // }, function (response) {
 
        //     jQuery('.bets-holder').html(response);
            
        // });
    });   



 jQuery('body').on('click', 'div[id^=bet-option-btn]', function () {
         jQuery("#betslip-wrapper").show();
    });
	
jQuery(function() {
     jQuery('body').on('click', '.delete-bet-option', '.bets-holder', function (event) {
      setTimeout(function(){
         jQuery('input#stake-input').val('');
      },100);
      });
    });

jQuery(function() {
     jQuery('body').on('click', '.delete-bet-option', '.bets-holder', function (event) {
      setTimeout(function(){
         jQuery('#show').val('');
		 //jQuery("#showodds").val('');
      },110);
      });
    });


    //delete bet option
    jQuery('body').on('click', '.delete-bet-option', '.bets-holder', function (event) {
          
        event.preventDefault();
        
        jQuery('.bets-holder').html(i18n_front.loading);
        
        var id = this.id.split('-')[1];
        
        jQuery.post(ajaxurl, {
            
            action: 'delete_bet_option',
            bet_option_id: id
            
        }, function (response) {
            
            jQuery('.bets-holder').html(response);
           
        });
    });


    
    //submit bet slip
    jQuery('body').on('click', 'button[id=submit-slip-button]', function (event) {

        event.preventDefault();
       /*if (!jQuery('#confirmodd').is(':checked')) {
        alert('Please accept odds change terms');
        return false;
         }; */
	   
     jQuery(this).blur();		
		var counter = 5;
    setInterval(function() {
     counter--;
      if (counter >= 0) {
         jQuery('._showup').html(counter);
      }
      if (counter === 0) {
    jQuery('._showup').html('<div class="fte"><div class="plac">-</div>  Wait! placing your bet...</div>');
         clearInterval(counter);
       }
     }, 100);
	 		 
		var clearst = setTimeout(function () {		
        var bet_stake = jQuery('#stake-input').val();      
        jQuery.post(ajaxurl, {           
           action: 'submit_bet_slip',
            bet_stake: bet_stake            
        }, function (response) {            
            jQuery('.bets-holder').html(response);            
            jQuery('.points-holder').html(i18n_front.loading);          
            jQuery.post(ajaxurl, {        
                action: 'points_change'           
            }, function (response) {
                jQuery('.points-holder').html(response);           
            });
			 jQuery('#show').val('');
			 jQuery("#ct").hide();
			 
			 //jQuery("#showodds").css("display", "none");
			 jQuery('input#stake-input').val('');
			 jQuery("#submit-slip-button").show();
			 jQuery("._showup").hide();
             jQuery('#btslip').load(' #btslip');
        });
	 }, 2000);
	 
	  
	  if(jQuery.trim(jQuery('.stake').val()) == ''){
			 alert('Stake cannot be zero');
          }  
	 
	 jQuery('body').on('click', 'button#ct', function () {
        clearTimeout(clearst);
		jQuery('.fte').html('Your bet is canceled');
		jQuery("#submit-slip-button").show();
		jQuery("#ct").hide();
		
    });
	
	jQuery("body").on('DOMSubtreeModified', ".slip-bet-odd", function() {
	    clearTimeout(clearst);
        //jQuery('.fte').html('<div class="ssu">Suspended! Odds Changed</div>');
		jQuery("#submit-slip-button").show();
		jQuery("#ct").hide();
        setTimeout(function() {
        jQuery('.ssu').fadeOut('fast');
        }, 10000);
      });

    });

   //hide submit button onclick
   jQuery("#submit-slip-button").click(function(){
        jQuery("#submit-slip-button").hide();
		jQuery("#ct").show();
		
     });
	 

    //slips page, toggling a slip's bet options
    jQuery('body').on('click', '.toggle-bet-options', function () {
        
        jQuery(this).next().toggle();
        
    });
    
});


//if has 0 odd
if (jQuery(".slip-bet-odd").html() == 0) {
	jQuery(".slip-bet-odd").addClass("oslipsu");
	jQuery('.submit-slip').css('pointer-events','none');
}


//pop-up t&c on unchecked
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}


//For odds calculation on keyup
function part(){
	var totalOdd = 1;
jQuery('.slip-bet-odd').each(function(index){
	if(jQuery('.slip-bet-odd').eq(index).text().includes("/"))
	{				
		var fractionalOdd = jQuery('.slip-bet-odd').eq(index).html();
		var fractionalNumber = fractionalOdd.split("/");
		console.log(fractionalNumber);
		var numerator = fractionalNumber[0].match(/\b\d+(?:.\d+)?/).map(Number);
		var denominator = fractionalNumber[1].match(/\b\d+(?:.\d+)?/).map(Number);
		var odd = (parseFloat(numerator) / parseFloat(denominator)) + 1;
		//alert(odd);
		totalOdd = parseFloat(totalOdd) * parseFloat(odd);
		//alert(totalOdd);
		var inputs = Number(jQuery("#stake-input").val().trim());
        var result = (totalOdd * inputs);
        var OddResult = totalOdd;
        jQuery('#show').val("" + result.toFixed(2));
	    jQuery('#showodds').val("Total Odds: " + OddResult.toFixed(2));
	
	}
	else if(jQuery('.slip-bet-odd').eq(index).text().includes("-"))
	{
        var stringOdd = jQuery('.slip-bet-odd').eq(index).html();
		var odd = parseFloat(stringOdd.match(/\b\d+(?:.\d+)?/).map(Number));
		//totalOdd +=odd;
		totalOdd = parseFloat(totalOdd) * parseFloat(odd);
		
		var inputs = Number(jQuery("#stake-input").val().trim());
        var result = ((100 / totalOdd + 1) * inputs);
        var OddResult = totalOdd;
        jQuery('#show').val("" + result.toFixed(2));
	    jQuery('#showodds').val("Total Odds: " + OddResult.toFixed(2));		
	
	}
	else if(jQuery('.slip-bet-odd').eq(index).html().includes("+"))
	{
        var stringOdd = jQuery('.slip-bet-odd').eq(index).html();
		var odd = parseFloat(stringOdd.match(/\b\d+(?:.\d+)?/).map(Number));
		//totalOdd +=odd;
		totalOdd = parseFloat(totalOdd) * parseFloat(odd);
		
		var inputs = Number(jQuery("#stake-input").val().trim());
        var result = ((totalOdd / 100 + 1) * inputs);
        var OddResult = totalOdd;
        jQuery('#show').val("" + result.toFixed(2));
	    jQuery('#showodds').val("Total Odds: " + OddResult.toFixed(2));		
	
	}
	else
	{
		
		var stringOdd = jQuery('.slip-bet-odd').eq(index).html();
		var odd = parseFloat(stringOdd.match(/\b\d+(?:.\d+)?/).map(Number));
		//totalOdd *=odd;
		totalOdd = parseFloat(totalOdd) * parseFloat(odd);
		var inputs = Number(jQuery("#stake-input").val().trim());
        var result = (totalOdd * inputs);
        var OddResult = totalOdd;
        jQuery('#show').val("" + result.toFixed(2));
	    jQuery('#showodds').val("Total Odds: " + OddResult.toFixed(2));
		
	   }
   });

};

//For odds calculation on keyup
jQuery(body).ready(function() {
jQuery("body").on('keyup', '#stake-input', function() {

part();

  });
});

//detect change in odds

jQuery('.slip-bet-odd').bind('DOMSubtreeModified',function(event) {	
	part();
});

















 //submit ticket slip
    jQuery('body').on('click', 'button[id=submit-ticket-button]', function (event) {
		if($('input#show').val() == ''){
           alert('Stake Cannot be Empty');
		   jQuery("input#stake-input, input#show").val('');
         }
	   if (jQuery.trim(jQuery(".stake").val()) === "") {
        alert('Stake Cannot be Zero');
		jQuery("input#stake-input, input#show").val('');
        return false;
            }
		if ((jQuery(".cprice").text().length > 0) || jQuery(".bets-holder").text().length < 1)  {
          alert('Please add option');
		  jQuery("input#stake-input, input#show").val('');
		  return false;
            }    
        event.preventDefault();
		jQuery('._showup').show();
		jQuery(this).blur();
		jQuery(".actions-holder.xp").addClass("sus");
		
		var counter = 5;
    setInterval(function() {
     counter--;
      if (counter >= 0) {
         jQuery('._showup').html(counter);
      }
      if (counter === 0) {
    jQuery('._showup').html('<div id="fetc" class="fte"><div class="plac">-</div>  Wait! placing your bet...</div>');
         clearInterval(counter);
       }
     }, 100);
	 
	   var clearst = setTimeout(function () {
		var eid = jQuery(".slip-bet-event-name").attr("id");
		var oid = jQuery(".slip-bet-name").attr("id").replace("odid-", "");
		var odn = jQuery(".slip-bet-odd").val();
		
        var Odds=jQuery('.showodds').val();
        var Winning=jQuery('.preview').val();
        var Stake=jQuery('.stake').val();
        if(Odds!="" && Winning!="" && Stake!=""){
            jQuery.ajax({
                url: ajaxurl,
                type: 'post',
                data: {action: 'submit_bet',eventid:eid,oid:oid,odn:odn,total_odd:Odds,stake:Stake,winning:Winning},
                success: function(data) {
                    console.log(data);
					jQuery("input#stake-input, input#show").val('');
                    //alert(data);
					//jQuery('.points-holder').html(i18n_front.loading);
					//jQuery("#fetc").css("display", "none");				
                     jQuery('._showup').html(data);
					 jQuery("div#fetc").hide();
					 jQuery(".bet-option-slip-wrapper").html('Click option to add New');
					 jQuery(".actions-holder.xp").removeClass("sus");
					 //jQuery(".slip-widget").load(' .slip-widget');
					 
                         //jQuery('.actions-holder.xp').hide();
						 //jQuery(".actions-holder.xp").load(' .actions-holder.xp');
						 //jQuery('._showup').hide('fade',10000);
						 jQuery("._showup").show().delay(10000).fadeOut();
	 

                }
                });
        }else{
            alert("Unable to Process Request!");
			jQuery("div#fetc").hide();
          }
		}, 2000);
	});
	
    //hide slip on mobile
    jQuery('body').on('click', '.wrapodd', function () {
        jQuery("#m_betslip").css("display", "block");
	});
	
	
	//agent request
	jQuery('body').on('click', 'input#agent_request', function (event) { 
		var username = jQuery("input#username").val();	
        var fullname = jQuery('input#fullname').val();
        var email = jQuery('input#email').val();
        var pass = jQuery('input#pass').val();
		var country = jQuery('input#country').val();
		var currency = jQuery('select#currency').val();
		var ddate = jQuery('input#ddate').val();		
            jQuery.ajax({
                type: 'post',
				//dataType: 'json',
				url: ajaxurl,               
                data: {
				action: 'agent_request',
				username:username,
				fullname:fullname,
				email:email,
				pass:pass,
				country:country,
				currency:currency,
				ddate:ddate
				},
                success: function(data) {
                    jQuery('.repagent').text(data);
					jQuery(".repagent").attr("style", "display: block !important");
					jQuery("input#username,input#fullname,#email,#currency,#pass,#country").val('');
				 

                }
            });     
	});
	
	
	
	
	//submit 365 ticket slip
	
	jQuery('body').on('click', 'button[id=submit-ticket-button_365]', function (event) {
     if (jQuery.trim(jQuery(".stake").val()) === "") {
        alert('Stake Cannot be Zero');
        return false;
            }
    if ((jQuery(".cprice").text().length > 0) || jQuery(".bets-holder").text().length < 1)  {
          alert('Please add option');
      return false;
            }    
        event.preventDefault();
    jQuery('._showup').show();
    jQuery(this).blur();
    jQuery(".actions-holder.xp").addClass("sus");
    
    var counter = 3;
    setInterval(function() {
     counter--;
      if (counter >= 0) {
         jQuery('._showup').html(counter);
      }
      if (counter === 0) {
    jQuery('._showup').html('<div id="fetc" class="fte"><div class="plac">-</div>  Wait! placing your bet...</div>');
         clearInterval(counter);
       }
     }, 50);
   
     var clearst = setTimeout(function () {
    var eid = jQuery(".slip-bet-event-name").attr("id");
    var oid = jQuery(".slip-bet-name").attr("id").replace("odid-", "");
    var odn = jQuery(".slip-bet-odd").val();
    
        var Odds=jQuery('.showodds').val();
        var Winning=jQuery('.preview').val();
        var Stake=jQuery('.stake').val();
        if(Odds!="" && Winning!="" && Stake!=""){
            jQuery.ajax({
                url: ajaxurl,
                type: 'post',
                data: {action: 'submit_bet_365',eventid:eid,oid:oid,odn:odn,total_odd:Odds,stake:Stake,winning:Winning},
                success: function(data) {
					jQuery(".points-holders").load(' .points-holders');
					jQuery(".points-holders").load(' .points-holders');
					jQuery("input#stake-input, input#show").val('');
                    //console.log(data);
                    //alert(data);
          //jQuery('.points-holder').html(i18n_front.loading);
          //jQuery("#fetc").css("display", "none");       
                     jQuery('._showup').html(data);
           jQuery("div#fetc").hide();
           jQuery(".bet-option-slip-wrapper").html('Click option to add New');
           jQuery(".actions-holder.xp").removeClass("sus");
           //jQuery(".slip-widget").load(' .slip-widget');
           
                         //jQuery('.actions-holder.xp').hide();
             //jQuery(".actions-holder.xp").load(' .actions-holder.xp');
             //jQuery('._showup').hide('fade',10000);
             jQuery("._showup").show().delay(10000).fadeOut();

                }
                });
        }else{
            alert("change stake value!");
          }
    }, 2000);
  });