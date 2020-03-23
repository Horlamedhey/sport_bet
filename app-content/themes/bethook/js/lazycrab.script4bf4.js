var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(a,k,f){a instanceof String&&(a=String(a));for(var g=a.length,c=0;c<g;c++){var d=a[c];if(k.call(f,d,c,a))return{i:c,v:d}}return{i:-1,v:void 0}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,k,f){a!=Array.prototype&&a!=Object.prototype&&(a[k]=f.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};
$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(a,k,f,g){if(k){f=$jscomp.global;a=a.split(".");for(g=0;g<a.length-1;g++){var c=a[g];c in f||(f[c]={});f=f[c]}a=a[a.length-1];g=f[a];k=k(g);k!=g&&null!=k&&$jscomp.defineProperty(f,a,{configurable:!0,writable:!0,value:k})}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,f){return $jscomp.findInternal(this,a,f).v}},"es6-impl","es3");
var FixedHeader={},LazycrabEqualHeight={},LazycrabTabs={},LazycrabShortest={},LazycrabSlider={},LazycrabVideo={},LazycrabParallax={};
(function(a){function k(){a("body").on("click",".track-title",function(c){c.preventDefault();a(this).closest(".track").find(".mejs__playpause-button").trigger("click")})}function f(){var c=70*a(window).height()/100;a("body").find(".album-lightbox .album-container").css({maxHeight:c});a("body").find(".album-lightbox .album-playlist").css({maxHeight:c})}FixedHeader={init:function(){if(""!=lazycrabScript.fixedHeader){var c=a("body").hasClass("istouch")?10:parseInt(lazycrabScript.fixedHeaderHeightCons);
FixedHeader.headerHeight=a("#headerwrap").height()-c;this.activate();a(window).on("scroll touchstart.touchScroll touchmove.touchScroll",this.activate)}},activate:function(){a(window).scrollTop()>FixedHeader.headerHeight?FixedHeader.scrollEnabled():FixedHeader.scrollDisabled()},scrollDisabled:function(){a("#headerwrap").removeClass("fixed-header");a("#header").removeClass("header-on-scroll");a("body").removeClass("fixed-header-on")},scrollEnabled:function(){a("#headerwrap").addClass("fixed-header");
a("#header").addClass("header-on-scroll");a("body").addClass("fixed-header-on")}};LazycrabEqualHeight={$content:a("#content"),$sidebar:a("#sidebar"),contentMarginTop:10,smallScreen:0,resizeRefresh:0,init:function(c,d){if(0<this.$sidebar.length&&(this.smallScreen=parseInt(c,10),this.resizeRefresh=parseInt(d,10),this.contentMarginTop=parseInt(this.$content.css("margin-top").replace(/-/,"").replace(/px/,""),10),this.isSmallScreen()||this.setHeights(),!("orientation"in window))){var b=!1;a(window).resize(function(){b=
!0});setInterval(function(){b&&(b=!1,LazycrabEqualHeight.isSmallScreen()?(LazycrabEqualHeight.$content.css("height","auto"),LazycrabEqualHeight.$sidebar.css("height","auto")):LazycrabEqualHeight.setHeights())},LazycrabEqualHeight.resizeRefresh)}},isSmallScreen:function(){return a(window).width()<=this.smallScreen},setHeights:function(){Math.floor(this.$content.innerHeight())-this.contentMarginTop>Math.floor(this.$sidebar.innerHeight())?this.$sidebar.innerHeight(Math.floor(this.$content.innerHeight())):
this.$content.innerHeight(Math.floor(this.$sidebar.innerHeight())+this.contentMarginTop)}};LazycrabTabs={init:function(c,d){a(c).each(function(){var b=a(this);a(".htab-link:first",b).addClass("current");a(".btab-panel:first",b).show();a(b).on("click",".htab-link",function(c){c.preventDefault();c=a(this);var h="."+c.data("tab")+d,h=a(h,b);a(".htab-link",b).removeClass("current");c.addClass("current");a(".btab-panel",b).hide();h.show();a(document.body).trigger("lazycrab-tab-switched",h)})})}};LazycrabShortest=
{init:function(c,d){this.setShortest(c,d);a(window).on("resize",function(){LazycrabShortest.setShortest(c,d)})},setShortest:function(c,d){var b=a(".post-image img",c),e=999999;b.imagesLoaded().always(function(){b.each(function(){var b=a(this),c=b.outerHeight();e=e<=c?e:c;b.css("marginTop",-Math.abs(c-e)/2)});600>=a(window).width()?c.css("height",""):c.height(e);"video"==d?a(".slideshow, .caroufredsel_wrapper, .carousel-prev, .carousel-next",c).height(e):a(".post-image",c).height(e)})}};LazycrabSlider=
{recalcHeight:function(c,d){var b=[];a.each(c,function(){b.push(a(this).outerHeight(!0))});var e=Math.max.apply(Math,b);d.closest(".carousel-wrap").find(".caroufredsel_wrapper, .slideshow").each(function(){a(this).outerHeight(e)})},didResize:!1,create:function(c){var d=this;c.each(function(){var b=a(this),c=b.closest(".loops-wrapper.slider");b.carouFredSel({responsive:!0,prev:b.data("slidernav")&&"yes"==b.data("slidernav")?"#"+b.data("id")+" .carousel-prev":"",next:b.data("slidernav")&&"yes"==b.data("slidernav")?
"#"+b.data("id")+" .carousel-next":"",pagination:{container:b.data("pager")&&"yes"==b.data("pager")?"#"+b.data("id")+" .carousel-pager":""},circular:!0,infinite:!0,swipe:!0,scroll:{items:b.data("scroll")?parseInt(b.data("scroll"),10):1,fx:b.data("effect"),duration:parseInt(b.data("speed")),onBefore:function(){var h=a(this).triggerHandler("currentPosition");a("#"+b.data("thumbsid")+" a").removeClass("selected");a("#"+b.data("thumbsid")+" a.itm"+h).addClass("selected");h=Math.floor(h/3);a("#"+b.data("thumbsid")).trigger("slideToPage",
h)}},auto:{play:"off"!=b.data("autoplay"),timeoutDuration:"off"!=b.data("autoplay")?parseInt(b.data("autoplay")):0},items:{visible:{min:1,max:b.data("visible")?parseInt(b.data("visible"),10):1},width:222,height:"variable"},onCreate:function(h){a(window).resize(function(){d.didResize=!0});setInterval(function(){d.didResize&&(d.didResize=!1,d.recalcHeight(h.items,b))},250);b.closest(".slideshow-wrap").css({visibility:"visible",height:"auto"});b.closest(".loops-wrapper.slider").css({visibility:"visible",
height:"auto"});c.hasClass("video")&&LazycrabShortest.init(b);b.data("slidernav")&&"yes"!=b.data("slidernav")&&(a("#"+b.data("id")+" .carousel-next").remove(),a("#"+b.data("id")+" .carousel-prev").remove());a(window).resize();a(".slideshow-slider-loader",b.closest(".slider")).remove()}})})},isSmallScreen:function(){return 905>=a(window).width()},createGallery:function(c){var d=function(){var a={};return function(b,h,c){a[c]&&clearTimeout(a[c]);a[c]=setTimeout(b,h)}}();a(window).resize(function(){d(function(){c.each(function(){LazycrabSlider.isSmallScreen()?
(a(this).trigger("configuration",{items:{visible:{min:1,max:1},width:400,height:"variable"}},null,!0),a(".type-gallery",a(this)).css({opacity:1,margin:0,left:"auto"}),a(this).trigger("prev")):(a(this).trigger("configuration",{items:{visible:{min:3,max:3},width:400,height:"variable"}},null,!0),a(this).trigger("next"),a(this).delay(500).trigger("next"))})},1E3,"lazycrabuniqueidresize")});c.each(function(){var b=a(this),c=b.closest(".loops-wrapper.slider"),h=b.closest(".lazycrab_builder_row"),d=1,f=parseInt(b.data("speed"),
10),l=c.width(),g={width:Math.floor(l/1.5),marginLeft:0,marginRight:-Math.floor(l/2.6),opacity:.5},k={width:Math.floor(l/1.2),marginLeft:-Math.floor(l/5),marginRight:-Math.floor(l/5),opacity:1},n={width:Math.floor(l/1.5),marginLeft:0,marginRight:0,opacity:.5},m={queue:!1,duration:f/1.5},p={queue:!1,duration:f};b.carouFredSel({responsive:!0,prev:"#"+b.data("id")+" .carousel-prev",next:"#"+b.data("id")+" .carousel-next",pagination:{container:"#"+b.data("id")+" .carousel-pager"},circular:!0,infinite:!0,
swipe:!0,scroll:{items:1,fx:"scroll",duration:f,onBefore:function(a){a=a.items.visible;LazycrabSlider.isSmallScreen()||(l=c.width(),g={width:Math.floor(l/1.5),marginLeft:0,marginRight:-Math.floor(l/3),opacity:.5},k={width:Math.floor(l/1.2),marginLeft:-Math.floor(l/4.5),marginRight:-Math.floor(l/5),left:-Math.floor(l/32),opacity:1},n={width:Math.floor(l/1.5),marginLeft:0,marginRight:0,opacity:.5},a.eq(0).addClass("gallerySlide").removeClass("galleryBigSlide").animate(g,m),a.eq(1).addClass("galleryBigSlide").removeClass("gallerySlide").animate(k,
p),a.eq(2).addClass("gallerySlide").removeClass("galleryBigSlide").animate(n,m))},onAfter:function(b){b=a(".post-image img",b.items.visible.filter(":visible").eq(1));c.css("background-color",b.data("color"));h.css("background-color",b.data("color"))}},auto:{play:"off"!=b.data("autoplay"),timeoutDuration:"off"!=b.data("autoplay")?parseInt(b.data("autoplay")):0},items:{visible:{min:LazycrabSlider.isSmallScreen()?1:3,max:LazycrabSlider.isSmallScreen()?1:3},width:400,height:"variable"},onCreate:function(e){e=
e.items;LazycrabSlider.isSmallScreen()||(e.addClass("gallerySlide").removeClass("galleryBigSlide").css({width:"",marginLeft:"",marginRight:""}),e.eq(0).animate(g,m),e.eq(1).addClass("galleryBigSlide").removeClass("gallerySlide").animate(k,p),e.eq(2).animate(n,m));a(".post-image img",b).each(function(){var b=a(this),e=b.attr("src"),f="";e.match(/(img\.php)/)?(e=e.split("?src="),e=e[1].split("&"),f=e[0]):f=e;RGBaster.colors(f,function(a){b.attr("data-color",a.dominant);0==d&&"undefined"!=typeof a.dominant&&
(d=!1,c.css("background-color",a.dominant),h.css("background-color",a.dominant));d--})});b.closest(".slideshow-wrap").css({visibility:"visible",height:"auto"});b.closest(".loops-wrapper.slider").css({visibility:"visible",height:"auto"});a(".carousel-next, .carousel-prev",b.closest(".slideshow-wrap")).empty().show();a(".carousel-pager",b.closest(".slideshow-wrap")).remove();a(".slideshow-slider-loader",b.closest(".slider")).remove()}})})}};LazycrabVideo={video:[],didResize:!1,ratio:lazycrabScript.videoRatio,
init:function(c){c.on("loadeddata",function(c){c=a(this);var b=Math.floor(c.width()/LazycrabVideo.ratio),d="width: 100%; height: "+b+"px !important;";c.css("cssText",d);c.closest(".mejs__container").css("cssText",d);a(".mejs__layer",c.closest(".mejs__inner")).each(function(){var c=a(this);c.attr("style",c.attr("style").replace(/height:(.*?);/,"height:"+b+"px !important;"))});LazycrabVideo.video["#"+c.attr("id")]=c});this.setHeight()},onResize:function(a,d){onresize=function(){clearTimeout(d);d=setTimeout(a,
100)};return a},setHeight:function(){this.onResize(function(){for(var c in LazycrabVideo.video){var d=LazycrabVideo.video[c],b=Math.floor(d.width()/LazycrabVideo.ratio),e="width: 100%; height: "+b+"px !important;";d.css("cssText",e);d.closest(".mejs__container").css("cssText",e);a(".mejs__layer",d.closest(".mejs__inner")).each(function(){var c=a(this);c.attr("style",c.attr("style").replace(/height:(.*?);/,"height:"+b+"px !important;"))})}})}};LazycrabParallax={init:function(){this.sliderWrapper=[".single #pagewrap .featured-area"];
this.lastScrollPoint=0;if(lazycrabScript.parallaxHeader)this.onLoaded()},onLoaded:function(){var c=LazycrabParallax,d;a("body").addClass("parallax-header");a.each(c.sliderWrapper,function(b,e){if(0<a(e).length){var h=a("#layout");h.css("marginTop",a(e).height());a(e).css("top",a("#headerwrap").height());a(window).on("scroll",function(){c.transition(e)}).on("touchmove.touchScroll",function(){c.transition(e)}).on("resize",function(){clearTimeout(d);d=setTimeout(function(){h.css("marginTop",a(e).height());
a(e).css("top",a("#headerwrap").height())},500)}).on("orientationchange",function(){c.transition(e)})}});setTimeout(function(){a(window).resize()},500)},transition:function(c){var d=LazycrabParallax;c=a(c);var b=a(window),e=b.scrollTop(),b=Math.ceil(b.height()/2);e>b?b=Math.ceil(e+(d.lastScrollPoint-e)/2):(b=Math.ceil(e),d.lastScrollPoint=e);c.css({"-webkit-transform":"translateY(-"+b+"px)","-moz-transform":"translateY(-"+b+"px)","-o-transform":"translateY(-"+b+"px)","-ms-transform":"translateY(-"+
b+"px)",transform:"translateY(-"+b+"px)"})}};var g={didResize:!1,selector:"",init:function(c){this.selector=c;a(window).resize(function(){g.didResize=!0});setInterval(function(){g.didResize&&(g.didResize=!1,g.resize())},250)},resize:function(){a(this.selector).each(function(){a(this).css({height:a(window).height()})})}};a(document).ready(function(){var c=a("body");navigator.userAgent.match(/(iPad)/g)&&g.init(".lazycrab_builder_row.full-height");"undefined"!==typeof a.fn.lazycrabScrollHighlight&&c.lazycrabScrollHighlight();
a(".loops-wrapper.video:not(.slider)").not(".list-post, .list-thumb-image, .list-large-image").each(function(){LazycrabShortest.init(a(this),"grids")});a(".back-top a").click(function(){a("body,html").animate({scrollTop:0},800);return!1});a("#menu-icon").lazycrabSideMenu({close:"#menu-icon-close"});var d=a(".body-overlay");c.on("sidemenushow.lazycrab",function(){d.addClass("body-overlay-on")}).on("sidemenuhide.lazycrab",function(){d.removeClass("body-overlay-on")}).on("click.lazycrab touchend.lazycrab",
".body-overlay",function(){a("#menu-icon").lazycrabSideMenu("hide")});780>a(window).width()&&a("#main-nav").addClass("scroll-nav");a(window).resize(function(){780<a(window).width()?(a("body").removeAttr("style"),a("#main-nav").removeClass("scroll-nav")):a("#main-nav").addClass("scroll-nav");a("#menu-icon").is(":visible")&&a("#mobile-menu").hasClass("sidemenu-on")?d.addClass("body-overlay-on"):d.removeClass("body-overlay-on")});LazycrabTabs.init(".event-posts","-events");LazycrabVideo.init(a("video.wp-video-shortcode"))});
a(window).load(function(){var c=a("body"),d="undefined"!==typeof LazycrabAjax&&LazycrabAjax.trigger,b=function(b){b=b||c;LazycrabSlider.create(a(".loops-wrapper.album .slideshow",b));LazycrabSlider.create(a(".loops-wrapper.press .slideshow",b));LazycrabSlider.create(a(".loops-wrapper.event .slideshow",b));LazycrabSlider.create(a(".loops-wrapper.video .slideshow",b));LazycrabSlider.createGallery(a(".loops-wrapper.gallery .slideshow",b))},e=function(c){a.fn.carouFredSel?b(c):Lazycrab.LoadAsync(lazycrab_vars.url+
"/js/carousel.min.js",function(){b(c)},null,null,function(){return"undefined"!==typeof a.fn.carouFredSel})};0<a(".loops-wrapper .slideshow").length&&e();c.on("builder_toggle_frontend",function(b,c){mejs&&mejs.players&&mejs.players.mep_0&&a(".button-switch-player").trigger("click");e(a(this))}).on("builder_load_module_partial",function(a,b){e(b)});0<a("body.single-gallery").length&&"undefined"!==typeof a.fn.masonry&&a(".masonry").each(function(){var b=a(this);a(this).imagesLoaded().always(function(a){b.masonry({itemSelector:".item"})})});
a(document).on("click",".likeit",function(b){b.preventDefault();var c=a(this);b=c.data("postid");a.post(lazycrabScript.ajax_url,{action:"lazycrab_likeit",nonce:lazycrabScript.ajax_nonce,post_id:b},function(b){data=a.parseJSON(b);"new"==data.status&&(a(".count",c).fadeOut("slow",function(){a(this).text(data.likers).fadeIn("slow")}),a(this).addClass("likeit_done"))})});LazycrabEqualHeight.init(lazycrabScript.smallScreen,lazycrabScript.resizeRefresh);"undefined"!==typeof LazycrabParallax&&LazycrabParallax.init();
FixedHeader.init();k();c.on("click",".loops-wrapper.grid4.gallery .post-image + .post-content, .loops-wrapper.grid3.gallery .post-image + .post-content, .loops-wrapper.grid2.gallery .post-image + .post-content",function(b){a(b.target).is("a")||a(b.target).parent().is("a")||(b=a(this).find(".post-title a"),0<b.length&&!b.hasClass("lazycrab_lightbox")&&!b.hasClass("lazycrab-lightbox")&&(lazycrabScript.is_ajax?b.trigger("click"):window.location=b.attr("href")))});a(".loops-wrapper.video.grid4, .loops-wrapper.video.grid3, .loops-wrapper.video.grid2, .loops-wrapper.video.slider").each(function(){var b=
a(this);b.find(".post-content").prepend('<div class="js-click"></div>');b.find(".js-click").each(function(){a(this).on("click",function(b){b.preventDefault();a(this).closest("article").find(".lazycrab_lightbox").trigger("click")})})});if(0<a(".wp-audio-shortcode").length)a(".wp-audio-shortcode").on("play playing",function(b){a(this).closest(".mejs__inner").find(".mejs__currenttime").addClass("visible-currenttime")});a(".loops-wrapper.album.grid4, .loops-wrapper.album.grid3, .loops-wrapper.album.grid2, .loops-wrapper.album.slider").each(function(){a(this).find(".post-content").each(function(){a(this).on("click",
function(b){a(b.target).hasClass("album-title-link")||(lazycrabScript.albumLightbox&&"true"==lazycrabScript.albumLightbox?a(this).prev().find(".lazycrab-lightbox").trigger("click"):(b=a(this).closest(".post").find(".post-title a"),lazycrabScript.is_ajax?b.trigger("click"):window.location=b.attr("href")))})})});lazycrabScript.albumLightbox&&"true"==lazycrabScript.albumLightbox&&"undefined"!==typeof Themibox&&(c.hasClass("single-album")||Themibox.init(),c.on("themiboxloaded",function(){if("undefined"!=typeof mejs){var b=
{};if(a(document.body).hasClass("mce-content-body"))return;"undefined"!==typeof _wpmejsSettings&&(b.pluginPath=_wpmejsSettings.pluginPath);b.success=function(a){var b=a.attributes.autoplay&&"false"!==a.attributes.autoplay;"flash"===a.pluginType&&b&&a.addEventListener("canplay",function(){a.play()},!1)};a(".wp-audio-shortcode, .wp-video-shortcode").filter(function(){return 0>=a(this).closest(".module-audio").length}).mediaelementplayer(b)}f();var c;a(window).on("resize.playlistScrollable",function(){clearTimeout(c);
c=setTimeout(f,500)})}).on("themiboxclosed",function(){a(window).off("resize.playlistScrollable")}));if(!d&&(d=a("#footer-player"),0<d.length&&(d.on("click",".button-switch-player",function(b){b.preventDefault();a(this).closest("#footer-player").toggleClass("collapsed")}),d.find(".mejs__volume-button, .mejs__horizontal-volume-slider").wrapAll('<div class="lazycrab-player-volume" />'),lazycrabScript.autoplay&&"autoplay"==lazycrabScript.autoplay)))d.find("audio").on("canplay",function(){a(this).trigger("play")});
a(function(a){a("#main-nav li").on("mouseenter mouseleave dropdown_open",function(b){if(a("ul",this).length){var c=a("ul:first",this);b=c.offset().left;var c=c.width(),d=a(window).width();b+c<=d?a(this).removeClass("edge"):a(this).addClass("edge")}})})})})(jQuery);

function toggleFullScreen(elem) {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

jQuery('a[target^="_new"]').click(function() {
    var width = window.innerWidth * 0.66 ;
    // define the height in
    var height = width * window.innerHeight / window.innerWidth ;
    // Ratio the hight to the width as the user screen ratio
    window.open(this.href , 'newwindow', 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));

});

jQuery(document).ready(function($) {
    $(".profile-pic").click( function(e) {
       $(".usr-ctl").show("slow");
    e.stopPropagation();
 });
    $('.usr-ctl').click(function(e) {
        e.stopPropagation();
   });

$("body").click( function(e) {
    $(".usr-ctl").hide("slow");
 
  });
});


jQuery(document).ready(function($) {

    // Show the login dialog box on click
    $('a#show_login').on('click', function(e){
        $('body').prepend('<div class="login_overlay"></div>');
        $('form#login').fadeIn(500);
        $('div.login_overlay, form#login a.close').on('click', function(){
            $('div.login_overlay').remove();
            $('form#login').hide();
        });
        e.preventDefault();
    });

    // Perform AJAX login on form submit
    $('form#login').on('submit', function(e){
        $('form#login p.status').show().text(ajax_login_object.loadingmessage);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            cache: false,
            url: ajax_login_object.ajaxurl,
            data: { 
                'action': 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
                'username': $('form#login #username').val(), 
                'password': $('form#login #password').val(), 
                'security': $('form#login #security').val() },
            success: function(data){
                $('form#login p.status').text(data.message);
                if (data.loggedin == true){
                    document.location.href = ajax_login_object.redirecturl;
                }
            }
        });
        e.preventDefault();
    });

});

jQuery(document).ready(function($) {
    $(".retrieve_pwd").click( function(e) {
       $("#preset-pwd").show("slow");
    e.stopPropagation();
 });
    $('#preset-pwd').click(function(e) {
        e.stopPropagation();
   });

$("body").click( function(e) {
    $("#preset-pwd").hide("slow");
 
  });
});


jQuery(document).ready(function($) {
    $(".login-credential").click( function(e) {
       $(".usr-ctl").show("slow");
    e.stopPropagation();
 });
    $('.usr-ctl').click(function(e) {
        e.stopPropagation();
   });
$("body").click( function(e) {
    $(".usr-ctl").hide("slow");
 
  });
});

jQuery(window).on("load", function($){		
jQuery('.scrollers').jScrollPane();
});

//jQuery(window).on("load", function($){		
//jQuery('.column').jScrollPane();
//});


	
	
// For remembering input values
// Get Object literal from LocalStorage
let memory = JSON.parse(localStorage.memory || "{}");

// Loop input elements on page
[...document.querySelectorAll('input, textarea')].forEach( el => {

    // prepopulate from memory
    if ( el.name in memory ) {
        el.value = memory[el.name]
    }

    // save to memory
    el.addEventListener("input", () => {
        memory[el.name] = el.value;
        localStorage.memory = JSON.stringify(memory);
    });
});


     //custom code starts
    //FOR HIDING ON CLICKING LOGIN OR REGISTER FORM MODAL
    jQuery(document).ready(function($) {
        $(".profile-pic").click( function(e) {
           $(".usr-ctl").show("slow");
        e.stopPropagation();
     });
        $('.usr-ctl').click(function(e) {
            e.stopPropagation();
       });
	   
    $("body").click( function(e) {
        $(".usr-ctl").hide("slow"); 
      });
      $("a#opener-4").click( function(e) {
        $(".usr-ctl").hide("slow");
     
      });
      $("a#opener-6").click( function(e) {
        $(".usr-ctl").hide("slow");
     
      });
	   //for buy now button
	  
	  $(".ubuy").click( function(e) {
           $(".viewbuy").show("slow");
        e.stopPropagation();
     });
        $('.ubuy').click(function(e) {
            e.stopPropagation();
       });
    
    $("body").click( function(e) {
        $(".viewbuy").hide("slow");
      });
    });
	
	
jQuery(document).ready(function(){
jQuery(".hf").click(function(){
   $("#body").hide();
   $("#content").attr("style", "display: none !important");
   $(".one").hide();
   $('body').addClass('change');
});
});


//scores updates

  setInterval(function() {
   jQuery('#scupdates').load(' #scupdates');
   jQuery('#sctopupdates').load(' #sctopupdates');
   }, 50000);




function openCity(evt, cityName) {
  var i, tabcontents, tablinks;
  tabcontents = document.getElementsByClassName("tabcontents");
  for (i = 0; i < tabcontents.length; i++) {
    tabcontents[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
var tabpro = document.getElementsByClassName('tablinks');
if (tabpro.length > 0) {
document.getElementById("defaultOpen").click();
}

//var idf = jQuery('#tsearch').text();
jQuery(document).ready(function() {
jQuery(body).ready(function() {
jQuery("body").on('keyup', '#esearch', function() {
    var es = jQuery("#esearch").val(); 
	//jQuery(".gf").text(ts);
	jQuery('#ebutton').click(function() {
   window.location = "/en/sports/search-events/?equery=" + es;
   });
 });
});
});



jQuery(body).ready(function() {
jQuery("body").on('keyup', '#msearch', function() {
    var es = jQuery("#msearch").val(); 
	//jQuery(".gf").text(ts);
	
 jQuery('button#mbutton').click(function() {
   window.location = "/en/sports/search-events/?equery=" + es;
   });
 });
});