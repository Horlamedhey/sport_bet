/**
 * Plugin Name: Crelly Slider
 * Plugin URI: https://wordpress.org/plugins/crelly-slider/
 * Description: A free responsive slider that supports layers. Add texts, images, videos and beautify them with transitions and animations.
 * Version: 1.3.4
 * Author: Fabio Rinaldi
 * Author URI: https://github.com/fabiorino
 * License: MIT
 */

var crellyslider_youtube_api_ready=!1,crellyslider_vimeo_api_ready=!1;!function(e){var t,i,n;t=this,i=document,n=function(e,t,i,n){var a,o;(function(e,t,i,n){function a(e){for(;e&&void 0!==e.originalEvent;)e=e.originalEvent;return e}function o(t){for(var i,n,a={};t;){for(n in i=e.data(t,k))i[n]&&(a[n]=a.hasVirtualBinding=!0);t=t.parentNode}return a}function s(){M=!0}function r(){M=!1}function c(){l(),P=setTimeout(function(){P=0,C=0,Y.length=0,O=!1,s()},e.vmouse.resetTimerDuration)}function l(){P&&(clearTimeout(P),P=0)}function d(t,i,o){var s;return(o&&o[t]||!o&&function(t,i){for(var n;t;){if((n=e.data(t,k))&&(!i||n[i]))return t;t=t.parentNode}return null}(i.target,t))&&(s=function(t,i){var o,s,r,c,l,d,p,f,u,h=t.type;if((t=e.Event(t)).type=i,o=t.originalEvent,s=e.event.props,h.search(/^(mouse|click)/)>-1&&(s=E),o)for(p=s.length;p;)t[c=s[--p]]=o[c];if(h.search(/mouse(down|up)|click/)>-1&&!t.which&&(t.which=1),-1!==h.search(/^touch/)&&(h=(r=a(o)).touches,l=r.changedTouches,d=h&&h.length?h[0]:l&&l.length?l[0]:n))for(f=0,u=D.length;f<u;f++)t[c=D[f]]=d[c];return t}(i,t),e(i.target).trigger(s)),s}function p(t){var i,n=e.data(t.target,S);!O&&(!C||C!==n)&&((i=d("v"+t.type,t))&&(i.isDefaultPrevented()&&t.preventDefault(),i.isPropagationStopped()&&t.stopPropagation(),i.isImmediatePropagationStopped()&&t.stopImmediatePropagation()))}function f(t){var i,n,s,c=a(t).touches;c&&1===c.length&&((n=o(i=t.target)).hasVirtualBinding&&(C=z++,e.data(i,S,C),l(),r(),F=!1,s=a(t).touches[0],N=s.pageX,L=s.pageY,d("vmouseover",t,n),d("vmousedown",t,n)))}function u(e){M||(F||d("vmousecancel",e,o(e.target)),F=!0,c())}function h(t){if(!M){var i=a(t).touches[0],n=F,s=e.vmouse.moveDistanceThreshold,r=o(t.target);(F=F||Math.abs(i.pageX-N)>s||Math.abs(i.pageY-L)>s)&&!n&&d("vmousecancel",t,r),d("vmousemove",t,r),c()}}function v(e){if(!M){s();var t,i,n=o(e.target);d("vmouseup",e,n),F||(t=d("vclick",e,n))&&t.isDefaultPrevented()&&(i=a(e).changedTouches[0],Y.push({touchID:C,x:i.clientX,y:i.clientY}),O=!0),d("vmouseout",e,n),F=!1,c()}}function y(t){var i,n=e.data(t,k);if(n)for(i in n)if(n[i])return!0;return!1}function m(){}function g(t){var i=t.substr(1);return{setup:function(){y(this)||e.data(this,k,{}),e.data(this,k)[t]=!0,_[t]=(_[t]||0)+1,1===_[t]&&R.bind(i,p),e(this).bind(i,m),x&&(_.touchstart=(_.touchstart||0)+1,1===_.touchstart&&R.bind("touchstart",f).bind("touchend",v).bind("touchmove",h).bind("scroll",u))},teardown:function(){--_[t],_[t]||R.unbind(i,p),x&&(--_.touchstart,_.touchstart||R.unbind("touchstart",f).unbind("touchmove",h).unbind("touchend",v).unbind("scroll",u));var n=e(this),a=e.data(this,k);a&&(a[t]=!1),n.unbind(i,m),y(this)||n.removeData(k)}}}var b,w,k="virtualMouseBindings",S="virtualTouchID",T="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),D="clientX clientY pageX pageY screenX screenY".split(" "),I=e.event.mouseHooks?e.event.mouseHooks.props:[],E=e.event.props.concat(I),_={},P=0,N=0,L=0,F=!1,Y=[],O=!1,M=!1,x="addEventListener"in i,R=e(i),z=1,C=0;for(e.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500},w=0;w<T.length;w++)e.event.special[T[w]]=g(T[w]);x&&i.addEventListener("click",function(t){var i,n,a,o,s,r=Y.length,c=t.target;if(r)for(i=t.clientX,n=t.clientY,b=e.vmouse.clickDistanceThreshold,a=c;a;){for(o=0;o<r;o++)if(s=Y[o],0,a===c&&Math.abs(s.x-i)<b&&Math.abs(s.y-n)<b||e.data(a,S)===s.touchID)return t.preventDefault(),void t.stopPropagation();a=a.parentNode}},!0)})(e,0,i),e.mobile={},o={touch:"ontouchend"in i},(a=e).mobile.support=a.mobile.support||{},a.extend(a.support,o),a.extend(a.mobile.support,o),function(e,t,n){function a(t,i,a,o){var s=a.type;a.type=i,o?e.event.trigger(a,n,t):e.event.dispatch.call(t,a),a.type=s}var o=e(i),s=e.mobile.support.touch,r="touchmove scroll",c=s?"touchstart":"mousedown",l=s?"touchend":"mouseup",d=s?"touchmove":"mousemove";e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,i){e.fn[i]=function(e){return e?this.bind(i,e):this.trigger(i)},e.attrFn&&(e.attrFn[i]=!0)}),e.event.special.scrollstart={enabled:!0,setup:function(){function t(e,t){a(o,(i=t)?"scrollstart":"scrollstop",e)}var i,n,o=this;e(o).bind(r,function(a){e.event.special.scrollstart.enabled&&(i||t(a,!0),clearTimeout(n),n=setTimeout(function(){t(a,!1)},50))})},teardown:function(){e(this).unbind(r)}},e.event.special.tap={tapholdThreshold:750,emitTapOnTaphold:!0,setup:function(){var t=this,i=e(t),n=!1;i.bind("vmousedown",function(s){function r(){clearTimeout(d)}function c(){r(),i.unbind("vclick",l).unbind("vmouseup",r),o.unbind("vmousecancel",c)}function l(e){c(),n||p!==e.target?n&&e.preventDefault():a(t,"tap",e)}if(n=!1,s.which&&1!==s.which)return!1;var d,p=s.target;i.bind("vmouseup",r).bind("vclick",l),o.bind("vmousecancel",c),d=setTimeout(function(){e.event.special.tap.emitTapOnTaphold||(n=!0),a(t,"taphold",e.Event("taphold",{target:p}))},e.event.special.tap.tapholdThreshold)})},teardown:function(){e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),o.unbind("vmousecancel")}},e.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:30,getLocation:function(e){var i=t.pageXOffset,n=t.pageYOffset,a=e.clientX,o=e.clientY;return 0===e.pageY&&Math.floor(o)>Math.floor(e.pageY)||0===e.pageX&&Math.floor(a)>Math.floor(e.pageX)?(a-=i,o-=n):(o<e.pageY-n||a<e.pageX-i)&&(a=e.pageX-i,o=e.pageY-n),{x:a,y:o}},start:function(t){var i=t.originalEvent.touches?t.originalEvent.touches[0]:t,n=e.event.special.swipe.getLocation(i);return{time:(new Date).getTime(),coords:[n.x,n.y],origin:e(t.target)}},stop:function(t){var i=t.originalEvent.touches?t.originalEvent.touches[0]:t,n=e.event.special.swipe.getLocation(i);return{time:(new Date).getTime(),coords:[n.x,n.y]}},handleSwipe:function(t,i,n,o){if(i.time-t.time<e.event.special.swipe.durationThreshold&&Math.abs(t.coords[0]-i.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(t.coords[1]-i.coords[1])<e.event.special.swipe.verticalDistanceThreshold){var s=t.coords[0]>i.coords[0]?"swipeleft":"swiperight";return a(n,"swipe",e.Event("swipe",{target:o,swipestart:t,swipestop:i}),!0),a(n,s,e.Event(s,{target:o,swipestart:t,swipestop:i}),!0),!0}return!1},eventInProgress:!1,setup:function(){var t,i=this,n=e(i),a={};(t=e.data(this,"mobile-events"))||(t={length:0},e.data(this,"mobile-events",t)),t.length++,t.swipe=a,a.start=function(t){if(!e.event.special.swipe.eventInProgress){e.event.special.swipe.eventInProgress=!0;var n,s=e.event.special.swipe.start(t),r=t.target,c=!1;a.move=function(t){s&&!t.isDefaultPrevented()&&(n=e.event.special.swipe.stop(t),c||(c=e.event.special.swipe.handleSwipe(s,n,i,r))&&(e.event.special.swipe.eventInProgress=!1),Math.abs(s.coords[0]-n.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&t.preventDefault())},a.stop=function(){c=!0,e.event.special.swipe.eventInProgress=!1,o.off(d,a.move),a.move=null},o.on(d,a.move).one(l,a.stop)}},n.on(c,a.start)},teardown:function(){var t,i;(t=e.data(this,"mobile-events"))&&(i=t.swipe,delete t.swipe,t.length--,0===t.length&&e.removeData(this,"mobile-events")),i&&(i.start&&e(this).off(c,i.start),i.move&&o.off(d,i.move),i.stop&&o.off(l,i.stop))}},e.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe.left",swiperight:"swipe.right"},function(t,i){e.event.special[t]={setup:function(){e(this).bind(i,e.noop)},teardown:function(){e(this).unbind(i)}}})}(e,this)},"function"==typeof define&&define.amd?define(["jquery"],function(e){return n(e,0,i),e.mobile}):n(t.jQuery,0,i),e.CrellySlider=function(t,i){var n,a=e(t),o="div.crellyslider",s="ul.cs-slides",r="li.cs-slide",c="> *",l=0,d=!1,p=!1,f=!1,u=!0,h=new H(function(){},0),v=new Array,y=new Array,m={},g={},b=1,w=0;if(!crellyslider_youtube_api_ready&&S("youtube")&&function(){var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t),crellyslider_youtube_api_ready=!0}(),!crellyslider_vimeo_api_ready&&S("vimeo")&&(!function(){function e(t){return new e.fn.init(t)}function t(e,t,i){if(!i.contentWindow.postMessage)return!1;e=JSON.stringify({method:e,value:t}),i.contentWindow.postMessage(e,s)}function i(e){var t,i;try{i=(t=JSON.parse(e.data)).event||t.method}catch(e){}if("ready"!=i||o||(o=!0),!/^https?:\/\/player.vimeo.com/.test(e.origin))return!1;"*"===s&&(s=e.origin),e=t.value;var n=t.data,r=""===r?null:t.player_id;return t=r?a[r][i]:a[i],i=[],!!t&&(void 0!==e&&i.push(e),n&&i.push(n),r&&i.push(r),0<i.length?t.apply(null,i):t.call())}function n(e,t,i){i?(a[i]||(a[i]={}),a[i][e]=t):a[e]=t}var a={},o=!1,s="*";e.fn=e.prototype={element:null,init:function(e){return"string"==typeof e&&(e=document.getElementById(e)),this.element=e,this},api:function(e,i){if(!this.element||!e)return!1;var a=this.element,o=""!==a.id?a.id:null,s=i&&i.constructor&&i.call&&i.apply?null:i,r=i&&i.constructor&&i.call&&i.apply?i:null;return r&&n(e,r,o),t(e,s,a),this},addEvent:function(e,i){if(!this.element)return!1;var a=this.element,s=""!==a.id?a.id:null;return n(e,i,s),"ready"!=e?t("addEventListener",e,a):"ready"==e&&o&&i.call(null,s),this},removeEvent:function(e){if(!this.element)return!1;var i=this.element,n=""!==i.id?i.id:null;e:{if(n&&a[n]){if(!a[n][e]){n=!1;break e}a[n][e]=null}else{if(!a[e]){n=!1;break e}a[e]=null}n=!0}"ready"!=e&&n&&t("removeEventListener",e,i)}},e.fn.init.prototype=e.fn,window.addEventListener?window.addEventListener("message",i,!1):window.attachEvent("onmessage",i),window.Froogaloop=window.$f=e}(),crellyslider_vimeo_api_ready=!0),!crellyslider_youtube_api_ready||"undefined"!=typeof YT&&void 0!==YT.Player)T();else var k=setInterval(function(){"undefined"!=typeof YT&&void 0!==YT.Player&&(clearInterval(k),T())},100);function S(e){return"youtube"==e?a.find(".cs-yt-iframe").length>0:"vimeo"==e?a.find(".cs-vimeo-iframe").length>0:-1}function T(){if(a.wrapInner('<div class="crellyslider" />'),a.find(o+" > ul").addClass("cs-slides"),a.find(o+" "+s+" > li").addClass("cs-slide"),0==(n=A().length))return!1;if(1==n){var t=B(0),r=a.find(o).find(s);t.clone().prependTo(r),n++}if(function(){if(!i.randomOrder&&0==i.startFromSlide)return;var e=new Array,t=new Array;if(-1==i.startFromSlide){var r=Math.floor(Math.random()*n);e[0]=r,t[0]=B(r)}else e[0]=i.startFromSlide,t[0]=B(i.startFromSlide);for(var c=1;c<n;c++){if(i.randomOrder)do{r=Math.floor(Math.random()*n)}while(-1!=e.indexOf(r));else r=c+e[0]<n?c+e[0]:c+e[0]-n;e[c]=r,t[c]=B(r)}a.find(o).find(s).empty();for(var c=0;c<n;c++)a.find(o).find(s).append(t[c])}(),i.showControls&&a.find(o).append('<div class="cs-controls"><span class="cs-next"></span><span class="cs-previous"></span></div>'),i.showNavigation){for(var d='<div class="cs-navigation">',f=0;f<n;f++)d+='<span class="cs-slide-link"></span>';d+="</div>",a.find(o).append(d)}i.showProgressBar?a.find(o).append('<div class="cs-progress-bar"></div>'):a.find(o).append('<div class="cs-progress-bar cs-progress-bar-hidden"></div>'),a.css("display","block"),i.responsive&&N(),I(),A().find(".cs-background-link").html(" ").data({left:0,top:0,in:"none",out:"none",easeIn:0,easeOut:0,delay:0,time:"all"}),function(){a.find(o).find(s).css("visibility","hidden"),a.find(o).find(".cs-progress-bar").css("display","none"),a.find(o).find(".cs-navigation").css("display","none"),a.find(o).find(".cs-controls").css("display","none");var t=B(0).css("background-image");(t=t.replace(/^url\(["']?/,"").replace(/["']?\)$/,"")).match(/\.(jpeg|jpg|gif|png|bmp|tiff|tif)$/)?e("<img>").load(function(){i()}).attr("src",t).each(function(){this.complete&&e(this).load()}):i();function i(){a.find(o).append('<div class="cs-preloader"><div class="cs-bg"></div><div class="cs-loader"><div class="cs-spinner"></div></div></div>'),a.find(o).find(".cs-preloader").css({"background-color":B(l).css("background-color"),"background-image":B(l).css("background-image"),"background-position":B(l).css("background-position"),"background-repeat":B(l).css("background-repeat"),"background-size":B(l).css("background-size")}),a.find(o).find(".cs-preloader > .cs-bg").css({"background-color":B(l).css("background-color"),"background-image":B(l).css("background-image"),"background-position":B(l).css("background-position"),"background-repeat":B(l).css("background-repeat"),"background-size":B(l).css("background-size")})}}(),function(){var t=new e.Deferred,i=A().find(".cs-yt-iframe, .cs-vimeo-iframe").length,n=0;if(0==i)return t.resolve().promise();return A().find(".cs-yt-iframe, .cs-vimeo-iframe").each(function(){e(this).one("load",function(){var a,o,s,r,l;++n==i&&(o=new e.Deferred,s=A(),r=s.find(c+".cs-yt-iframe").length,l=0,0==r?o.resolve().promise():(s.each(function(){e(this).find(c+".cs-yt-iframe").each(function(){var t=e(this);t.uniqueId(),t.attr("id","cs-yt-iframe-"+t.attr("id"));var i=new YT.Player(t.attr("id"),{events:{onReady:function(){++l==r&&o.resolve()},onStateChange:function(e){e.data===YT.PlayerState.ENDED&&X(t,"loop")&&i.playVideo(),p&&(e.data===YT.PlayerState.PAUSED&&(m[t.attr("id")].manually_paused=!0),e.data===YT.PlayerState.PLAYING&&(m[t.attr("id")].manually_paused=!1))}}});a={player:i,played_once:!1,manually_paused:!1},m[t.attr("id")]=a})}),o.promise())).done(function(){var i,n,a,o,s;(n=new e.Deferred,a=A(),o=a.find(c+".cs-vimeo-iframe").length,s=0,0==o?n.resolve().promise():(a.each(function(){e(this).find(c+".cs-vimeo-iframe").each(function(){var t=e(this);t.uniqueId(),t.attr("id","cs-vimeo-iframe-"+t.attr("id")),t.attr("src",t.attr("src")+"&player_id="+t.attr("id"));var a=$f(t[0]);a.addEvent("ready",function(){a.addEvent("finish",function(){g[t.attr("id")].ended=!0}),a.addEvent("play",function(){g[t.attr("id")].played_once=!0,g[t.attr("id")].ended=!1,p&&(g[t.attr("id")].manually_paused=!1)}),a.addEvent("pause",function(){p&&(g[t.attr("id")].manually_paused=!0)}),X(t,"loop")&&a.api("setLoop",!0),++s==o&&n.resolve()}),i={player:a,played_once:!1,ended:!1,manually_paused:!1},g[t.attr("id")]=i})}),n.promise())).done(function(){t.resolve()})})})}),t.promise()}().done(function(){var t=setInterval(function(){"complete"==document.readyState&&a.find(o).find(".cs-preloader").length>0&&(clearInterval(t),function(){i.responsive&&N();I(),w=e(window).width(),A().each(function(){var t=e(this);t.find(c).each(function(){var t=e(this);t.find("*").each(function(){var t=e(this);D(t)}),D(t)}),t.css("display","none"),t.data("opacity",parseFloat(t.css("opacity")))}),i.responsive&&e(window).resize(function(){w!=e(window).width()&&("full-width"==i.layout&&x()!=e(a).width()||e(a).width()<x()||e(a).width()>x()&&x()<i.startWidth)&&_()}),a.find(o).find(".cs-controls > .cs-previous").click(function(){V(C())}),a.find(o).find(".cs-controls > .cs-next").click(function(){V(z())}),i.enableSwipe&&(a.find(o).on("swipeleft",function(){M(),V(z())}),a.find(o).on("swiperight",function(){M(),V(C())})),a.find(o).find(".cs-navigation > .cs-slide-link").click(function(){V(e(this).index())}),i.pauseOnHover&&(a.find(o).find(s).hover(function(){O()}),a.find(o).find(s).mouseleave(function(){M()})),a.find(o).find(s).css("visibility","visible"),a.find(o).find(".cs-progress-bar").css("display","block"),a.find(o).find(".cs-navigation").css("display","block"),a.find(o).find(".cs-controls").css("display","block"),ne(B(0)),B(0).finish(),a.find(o).find(".cs-preloader").animate({opacity:0},300,function(){a.find(o).find(".cs-preloader").remove()}),i.beforeStart(),i.responsive?_():F()}())},100)})}function D(e){e.data("width",parseFloat(e.width())),e.data("height",parseFloat(e.height())),e.data("letter-spacing",parseFloat(e.css("letter-spacing"))),e.data("font-size",parseFloat(e.css("font-size"))),"px"==e.css("line-height").slice(-2).toLowerCase()?e.data("line-height",parseFloat(e.css("line-height"))):"normal"==e.css("line-height")?e.data("line-height",1.15*X(e,"font-size")):e.data("line-height",parseFloat(e.css("line-height"))*X(e,"font-size")),e.data("padding-top",parseFloat(e.css("padding-top"))),e.data("padding-right",parseFloat(e.css("padding-right"))),e.data("padding-bottom",parseFloat(e.css("padding-bottom"))),e.data("padding-left",parseFloat(e.css("padding-left"))),e.data("opacity",parseFloat(e.css("opacity")))}function I(){var e,t;switch(i.layout){case"fixed":e=i.startWidth,t=i.startHeight,a.find(o).css({width:L(e),height:L(t)}),A().css({width:L(e),height:L(t)});break;case"full-width":e=a.width(),t=i.startHeight,a.find(o).css({width:e,height:L(t)}),A().css({width:e,height:L(t)});break;default:return!1}}function E(e){var t=(R()-i.startHeight)/2,n=(x()-i.startWidth)/2,a=0,o=0;return t>0&&(a=t),n>0&&(o=n),{top:a,left:o}}function _(){i.beforeSetResponsive();var t=A();Y(!0),t.each(function(){var t=e(this),i=t.find(c);t.finish(),ne(t),t.finish(),i.each(function(){var t=e(this);t.finish(),oe(t),t.finish(),$(t)&&Q(t)})}),N(),I(),t.each(function(){var t=e(this);t.find(c).each(function(){var t=e(this);t.find("*").each(function(){P(e(this))}),P(t),t.finish(),se(t),t.finish(),$(t)&&Q(t)}),t.finish(),ae(t),t.finish()}),w=e(window).width(),F()}function P(e){e.css({top:L(X(e,"top")+E().top),left:L(X(e,"left")+E().left),"padding-top":L(X(e,"padding-top")),"padding-right":L(X(e,"padding-right")),"padding-bottom":L(X(e,"padding-bottom")),"padding-left":L(X(e,"padding-left"))}),e.is("input")||e.is("button")||e.text().trim().length?e.css({"line-height":L(X(e,"line-height"))+"px","letter-spacing":L(X(e,"letter-spacing")),"font-size":L(X(e,"font-size"))}):e.css({width:L(X(e,"width")),height:L(X(e,"height"))})}function N(){var e=a.width(),t=i.startWidth;b=e>=t||!i.responsive?1:e/t}function L(e){return e*b}function F(){i.automaticSlide?function e(){j(l).done(function(){d||(l=z(),e())})}():j(l),u=!1}function Y(t){for(var i=0;i<v.length;i++)v[i].clear();for(i=0;i<y.length;i++)y[i].clear();h.clear(),A().each(function(){var i=e(this);t?i.finish():i.stop(!0,!0),i.find(c).each(function(){var i=e(this);t?i.finish():i.stop(!0,!0)})}),W()}function O(){!d&&p&&(i.beforePause(),a.find(o).find(".cs-progress-bar").stop(!0),h.pause(),d=!0)}function M(){if(d&&p){i.beforeResume();var e=a.find(o).find(".cs-progress-bar"),t=(X(B(l),"time"),h.getRemaining());e.animate({width:"100%"},t),h.resume(),d=!1}}function x(){return a.find(o).width()}function R(){return a.find(o).height()}function z(){return l+1==n?0:l+1}function C(){return l-1<0?n-1:l-1}function X(e,t){var n;switch(n=!!e.parent("ul").hasClass("cs-slides"),t){case"ease-in":return n?isNaN(parseInt(e.data(t)))?i.slidesEaseIn:parseInt(e.data(t)):isNaN(parseInt(e.data(t)))?i.elementsEaseIn:parseInt(e.data(t));case"ease-out":return n?isNaN(parseInt(e.data(t)))?i.slidesEaseOut:parseInt(e.data(t)):isNaN(parseInt(e.data(t)))?i.elementsEaseOut:parseInt(e.data(t));case"delay":return isNaN(parseInt(e.data(t)))?i.elementsDelay:parseInt(e.data(t));case"time":return n?isNaN(parseInt(e.data(t)))?i.slidesTime:parseInt(e.data(t)):"all"==e.data(t)?"all":isNaN(parseInt(e.data(t)))?i.itemsTime:parseInt(e.data(t));case"ignore-ease-out":return 1==parseInt(e.data(t))||0!=parseInt(e.data(t))&&i.ignoreElementsEaseOut;case"autoplay":return 1==parseInt(e.data(t))||0!=parseInt(e.data(t))&&i.videoAutoplay;case"loop":return 1==parseInt(e.data(t))||0!=parseInt(e.data(t))&&i.videoLoop;case"top":case"left":case"width":case"height":case"padding-top":case"padding-right":case"padding-bottom":case"padding-left":case"line-height":case"letter-spacing":case"font-size":return isNaN(parseFloat(e.data(t)))?0:parseFloat(e.data(t));case"in":case"out":case"opacity":return e.data(t);default:return!1}}function A(){return a.find(o).find(s).find(r)}function B(e){return A().eq(e)}function H(e,t){var i,n,a=t;this.pause=function(){clearTimeout(i),a-=new Date-n},this.resume=function(){n=new Date,clearTimeout(i),i=window.setTimeout(function(){e()},a)},this.clear=function(){clearTimeout(i)},this.getRemaining=function(){return a},this.resume()}function U(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}function W(){var e=a.find(o).find(".cs-progress-bar");e.stop(),e.css("width",0)}function V(e){e!=l&&(p||f)&&(Y(!1),q(l,!1,!0).done(function(){l=e,F()}))}function j(t){i.beforeSlideStart();var n,s,r,d,u,b=new e.Deferred;f=!1;for(var w=0;w<v.length;w++)v[w].clear();for(w=0;w<y.length;w++)y[w].clear();return h.clear(),B(t).finish(),ae(t),B(t).finish(),B(t).find(c).each(function(){var t=e(this);t.finish(),se(t),t.finish()}),a.find(o).find(".cs-navigation").find("> .cs-slide-link").each(function(){var t=e(this);t.index()==l?t.addClass("cs-active"):t.removeClass("cs-active")}),s=B(n=t).find(c),r=0,d=!1,u=new e.Deferred,p=!1,ne(n).done(function(){var e;e=a.find(o).find(".cs-progress-bar"),W(),e.animate({width:"100%"},X(B(l),"time")),p=!0,(d=!0)&&r==s.length&&u.resolve()}),s.each(function(){var t=e(this),i=X(t,"delay");y.push(new H(function(){oe(t).done(function(){var e,i,n;$(t)&&(G(n=t)?(!X(i=n,"autoplay")||m[i.attr("id")].played_once||U()||K(i).playVideo(),2!=Z(i)||m[i.attr("id")].manually_paused||K(i).playVideo(),m[i.attr("id")].played_once=!0):(!X(e=n,"autoplay")||g[e.attr("id")].played_once||U()||te(e).api("play"),te(e).api("paused")&&!g[e.attr("id")].ended&&g[e.attr("id")].played_once&&!g[e.attr("id")].manually_paused&&te(e).api("play"))),r++,d&&r==s.length&&u.resolve()})},i))}),u.promise(),i.automaticSlide?q(t,!0,!0).done(function(){f=!0,b.resolve()}):q(t,!0,!1).done(function(){f=!0,b.resolve()}),b.promise()}function q(t,i,n){var a=B(t),o=a.find(c),s=i?X(a,"time")+X(a,"ease-in"):0,r=0,l=!1,d=new e.Deferred;return o.each(function(){var a=e(this),s=X(a,"time");if("all"!=s){var c=i?s:0;X(a,"ignore-ease-out")&&(r++,o.length==r&&l&&n&&(J(t),ae(t),d.resolve())),v.push(new H(function(){se(a).done(function(){X(a,"ignore-ease-out")||(r++,o.length==r&&l&&n&&(J(t),ae(t),d.resolve()))})},c))}}),h=new H(function(){p=!1,W(),l=!0,o.length==r&&l&&n&&(J(t),ae(t),d.resolve()),n?o.each(function(){var i=e(this);"all"==X(i,"time")&&(X(i,"ignore-ease-out")&&(r++,o.length==r&&l&&n&&(J(t),ae(t),d.resolve())),se(i).done(function(){X(i,"ignore-ease-out")||(r++,o.length==r&&l&&n&&(J(t),ae(t),d.resolve()))}))}):d.resolve()},s),d.promise()}function $(e){return G(e)||e.hasClass("cs-vimeo-iframe")}function J(t){B(t).each(function(){var t=e(this);t.find(c+".cs-yt-iframe").each(function(){ee(e(this))})}),B(t).each(function(){var t=e(this);t.find(c+".cs-vimeo-iframe").each(function(){ie(e(this))})})}function Q(e){G(e)?ee(e):ie(e)}function G(e){return e.hasClass("cs-yt-iframe")}function K(e){return m[e.attr("id")].player}function Z(e){return K(e).getPlayerState()}function ee(e){1==Z(e)&&K(e).pauseVideo()}function te(e){return g[e.attr("id")].player}function ie(e){te(e).api("pause")}function ne(t){var i=B(t),n=X(i,"in"),a=X(i,"ease-in"),o=new e.Deferred;if("block"==i.css("display"))return o.resolve().promise();if(u)return i.css({display:"block",top:0,left:0,opacity:X(i,"opacity")}),o.resolve().promise();switch(n){case"fade":i.css({display:"block",top:0,left:0,opacity:0}),i.animate({opacity:X(i,"opacity")},a,function(){o.resolve()});break;case"fadeLeft":i.css({display:"block",top:0,left:x(),opacity:0}),i.animate({opacity:X(i,"opacity"),left:0},a,function(){o.resolve()});break;case"fadeRight":i.css({display:"block",top:0,left:-x(),opacity:0}),i.animate({opacity:X(i,"opacity"),left:0},a,function(){o.resolve()});break;case"slideLeft":i.css({display:"block",top:0,left:x(),opacity:X(i,"opacity")}),i.animate({left:0},a,function(){o.resolve()});break;case"slideRight":i.css({display:"block",top:0,left:-x(),opacity:X(i,"opacity")}),i.animate({left:0},a,function(){o.resolve()});break;case"slideUp":i.css({display:"block",top:R(),left:0,opacity:X(i,"opacity")}),i.animate({top:0},a,function(){o.resolve()});break;case"slideDown":i.css({display:"block",top:-R(),left:0,opacity:X(i,"opacity")}),i.animate({top:0},a,function(){o.resolve()});break;default:i.css({display:"block",top:0,left:0,opacity:X(i,"opacity")}),o.resolve()}return o.promise()}function ae(t){var i=B(t),n=X(i,"out"),a=X(i,"ease-out"),o=new e.Deferred;if("none"==i.css("display"))return o.resolve().promise();switch(n){case"fade":i.animate({opacity:0},a,function(){i.css({display:"none",opacity:X(i,"opacity")}),o.resolve()});break;case"fadeLeft":i.animate({opacity:0,left:-x()},a,function(){i.css({display:"none",opacity:X(i,"opacity"),left:0}),o.resolve()});break;case"fadeRight":i.animate({opacity:0,left:x()},a,function(){i.css({display:"none",opacity:X(i,"opacity"),left:0}),o.resolve()});break;case"slideLeft":i.animate({left:-x()},a,function(){i.css({display:"none",left:0}),o.resolve()});break;case"slideRight":i.animate({left:x()},a,function(){i.css({display:"none",left:0}),o.resolve()});break;case"slideUp":i.animate({top:-R()},a,function(){i.css({display:"none",top:0}),o.resolve()});break;case"slideDown":i.animate({top:R()},a,function(){i.css({display:"none",top:0}),o.resolve()});break;default:i.css({display:"none"}),o.resolve()}return o.promise()}function oe(t){var i=t.outerWidth(),n=t.outerHeight(),a=X(t,"in"),o=X(t,"ease-in"),s=X(t,"top"),r=X(t,"left"),c=new e.Deferred;if("block"==t.css("display"))return c.resolve().promise();switch(a){case"slideDown":t.css({display:"block",top:-n,left:L(r+E().left),opacity:X(t,"opacity")}).animate({top:L(s+E().top)},o,function(){c.resolve()});break;case"slideUp":t.css({display:"block",top:R(),left:L(r+E().left),opacity:X(t,"opacity")}).animate({top:L(s+E().top)},o,function(){c.resolve()});break;case"slideLeft":t.css({display:"block",top:L(s+E().top),left:x(),opacity:X(t,"opacity")}).animate({left:L(r+E().left)},o,function(){c.resolve()});break;case"slideRight":t.css({display:"block",top:L(s+E().top),left:-i,opacity:X(t,"opacity")}).animate({left:L(r+E().left)},o,function(){c.resolve()});break;case"fade":t.css({display:"block",top:L(s+E().top),left:L(r+E().left),opacity:0}).animate({opacity:X(t,"opacity")},o,function(){c.resolve()});break;case"fadeDown":t.css({display:"block",top:-n,left:L(r+E().left),opacity:0}).animate({top:L(s+E().top),opacity:X(t,"opacity")},o,function(){c.resolve()});break;case"fadeUp":t.css({display:"block",top:R(),left:L(r+E().left),opacity:0}).animate({top:L(s+E().top),opacity:X(t,"opacity")},o,function(){c.resolve()});break;case"fadeLeft":t.css({display:"block",top:L(s+E().top),left:x(),opacity:0}).animate({left:L(r+E().left),opacity:X(t,"opacity")},o,function(){c.resolve()});break;case"fadeRight":t.css({display:"block",top:L(s+E().top),left:-i,opacity:0}).animate({left:L(r+E().left),opacity:X(t,"opacity")},o,function(){c.resolve()});break;case"fadeSmallDown":t.css({display:"block",top:L(s+E().top-30),left:L(r+E().left),opacity:0}).animate({top:L(s+E().top),opacity:X(t,"opacity")},o,function(){c.resolve()});break;case"fadeSmallUp":t.css({display:"block",top:L(s+E().top+30),left:L(r+E().left),opacity:0}).animate({top:L(s+E().top),opacity:X(t,"opacity")},o,function(){c.resolve()});break;case"fadeSmallLeft":t.css({display:"block",top:L(s+E().top),left:L(r+E().left+30),opacity:0}).animate({left:L(r+E().left),opacity:X(t,"opacity")},o,function(){c.resolve()});break;case"fadeSmallRight":t.css({display:"block",top:L(s+E().top),left:L(r+E().left-30),opacity:0}).animate({left:L(r+E().left),opacity:X(t,"opacity")},o,function(){c.resolve()});break;default:t.css({display:"block",top:L(s+E().top),left:L(r+E().left),opacity:X(t,"opacity")}),c.resolve()}return c.promise()}function se(t){var i=t.outerWidth(),n=t.outerHeight(),a=X(t,"out"),o=X(t,"ease-out"),s=new e.Deferred;if("none"==t.css("display"))return s.resolve().promise();switch(a){case"slideDown":t.animate({top:R()},o,function(){t.css({display:"none"}),s.resolve()});break;case"slideUp":t.animate({top:-n},o,function(){t.css({display:"none"}),s.resolve()});break;case"slideLeft":t.animate({left:-i},o,function(){t.css({display:"none"}),s.resolve()});break;case"slideRight":t.animate({left:x()},o,function(){t.css({display:"none"}),s.resolve()});break;case"fade":t.animate({opacity:0},o,function(){t.css({display:"none",opacity:X(t,"opacity")}),s.resolve()});break;case"fadeDown":t.animate({top:R(),opacity:0},o,function(){t.css({display:"none",opacity:X(t,"opacity")}),s.resolve()});break;case"fadeUp":t.animate({top:-n,opacity:0},o,function(){t.css({display:"none",opacity:X(t,"opacity")}),s.resolve()});break;case"fadeLeft":t.animate({left:-i,opacity:0},o,function(){t.css({display:"none",opacity:X(t,"opacity")}),s.resolve()});break;case"fadeRight":t.animate({left:x(),opacity:0},o,function(){t.css({display:"none",opacity:X(t,"opacity")}),s.resolve()});break;case"fadeSmallDown":t.animate({top:L(X(t,"top")+E().top+30),opacity:0},o,function(){t.css({display:"none",opacity:X(t,"opacity")}),s.resolve()});break;case"fadeSmallUp":t.animate({top:L(X(t,"top")+E().top-30),opacity:0},o,function(){t.css({display:"none",opacity:X(t,"opacity")}),s.resolve()});break;case"fadeSmallLeft":t.animate({left:L(X(t,"left")+E().left-30),opacity:0},o,function(){t.css({display:"none",opacity:X(t,"opacity")}),s.resolve()});break;case"fadeSmallRight":t.animate({left:L(X(t,"left")+E().left+30),opacity:0},o,function(){t.css({display:"none",opacity:X(t,"opacity")}),s.resolve()});break;default:t.css({display:"none"}),s.resolve()}return s.promise()}this.resume=function(){M()},this.pause=function(){O()},this.nextSlide=function(){V(z())},this.previousSlide=function(){V(C())},this.changeSlide=function(e){V(e)},this.getCurrentSlide=function(){return l},this.getTotalSlides=function(){return n}},e.fn.crellySlider=function(t){var i=e.extend({layout:"fixed",responsive:!0,startWidth:1140,startHeight:500,pauseOnHover:!0,automaticSlide:!0,randomOrder:!0,startFromSlide:0,showControls:!0,showNavigation:!0,showProgressBar:!0,enableSwipe:!0,slidesTime:3e3,elementsDelay:0,elementsTime:"all",slidesEaseIn:300,elementsEaseIn:300,slidesEaseOut:300,elementsEaseOut:300,ignoreElementsEaseOut:!1,videoAutoplay:!1,videoLoop:!1,beforeStart:function(){},beforeSetResponsive:function(){},beforeSlideStart:function(){},beforePause:function(){},beforeResume:function(){}},t);return this.each(function(){if(null==e(this).data("crellySlider")){var t=new e.CrellySlider(this,i);e(this).data("crellySlider",t)}})}}(jQuery);