// tfsmartresize helper
!function(a,b){var c=function(a,b,c){var d;return function(){function g(){c||a.apply(e,f),d=null}var e=this,f=arguments;d?clearTimeout(d):c&&a.apply(e,f),d=setTimeout(g,b||100)}};jQuery.fn[b]=function(a){return a?this.bind("resize",c(a)):this.trigger(b)}}(jQuery,"tfsmartresize");

var Lazycrab, LazycrabGallery;
(function ($, window, document, undefined) {
	'use strict';

	/* window load fires only once in IE */
	window.addEventListener( "load", function () {
		window.loaded = true;
		Lazycrab.triggerEvent( window, 'resize' );
		$( 'body' ).addClass( 'page-loaded' );
	});
	Lazycrab = {
		fonts:[],
		cssLazy:[],
                jsLazy:[],
		triggerEvent: function (a, b) {
			var c;
			document.createEvent ? (c = document.createEvent("HTMLEvents"), c.initEvent(b, !0, !0)) : document.createEventObject && (c = document.createEventObject(), c.eventType = b), c.eventName = b, a.dispatchEvent ? a.dispatchEvent(c) : a.fireEvent && htmlEvents["on" + b] ? a.fireEvent("on" + c.eventType, c) : a[b] ? a[b]() : a["on" + b] && a["on" + b]()
		},
		UpdateQueryString : function ( a, b, c ) {
			c||(c=window.location.href);var d=RegExp("([?|&])"+a+"=.*?(&|#|$)(.*)","gi");if(d.test(c))return b!==void 0&&null!==b?c.replace(d,"$1"+a+"="+b+"$2$3"):c.replace(d,"$1$3").replace(/(&|\?)$/,"");if(b!==void 0&&null!==b){var e=-1!==c.indexOf("?")?"&":"?",f=c.split("#");return c=f[0]+e+a+"="+b,f[1]&&(c+="#"+f[1]),c}return c
		},
		Init: function () {
			if (typeof tbLocalScript !== 'undefined' && tbLocalScript) {
				var $self = Lazycrab;
				$(document).ready(function () {
                                    tbLocalScript.isTouch = $('body').hasClass('touch');
                                    if( $( '.lazycrab_builder_content div:not(.js-turn-on-builder)' ).length ) {
                                            $self.LoadAsync(tbLocalScript.builder_url + '/js/lazycrab.builder.script.js', function(){
                                                    $( 'body' ).trigger( 'lazycrabBuilderScriptLoaded' );
                                            }); // this script should be always loaded even there is no builder content because it's also requires for lazycrab_shortcode for exp: animation js
                                    }
                                    else{
                                            $self.bindEvents();
					}
				});
				$('body').on('builderscriptsloaded.lazycrab', function () {
                                    $self.LoadAsync(tbLocalScript.builder_url + '/js/lazycrab.builder.script.js');
				});
			}
			else {
				this.bindEvents();
			}
		},
		bindEvents: function () {
			var $self = Lazycrab;
			if (window.loaded) {
				$self.domready();
				$self.windowload();
			}
			else {
				$(window).load( $self.windowload );
				$(document).ready( $self.domready );
			}
			$('body').on('builder_load_module_partial builder_toggle_frontend', $self.InitMap)
                                .on( 'builder_load_module_partial builder_toggle_frontend', $self.LazyLoad);
		},
		domready : function() {
			Lazycrab.LazyLoad();
			Lazycrab.InitCarousel();
			Lazycrab.InitMap();
		},
		windowload : function() {
			$('.shortcode.slider, .shortcode.post-slider, .slideshow-wrap').css({'height': 'auto', 'visibility': 'visible'});
			Lazycrab.InitGallery();
		},
		LazyLoad: function() {
			var editMode = $('body').hasClass('lazycrab_builder_active'),
                            self = Lazycrab,
                            is_fontawesome = editMode || $('.fa').length>0,
                            is_lazycrab_icons = editMode || $( 'span[class*="ti-"], i[class*="ti-"], .module-menu[data-menu-breakpoint]').length>0;
                            if(!editMode){
                                    if(!is_fontawesome){
                                            is_fontawesome = self.checkFont('FontAwesome');
                                    }
                                    if(!is_lazycrab_icons){
                                            is_lazycrab_icons = self.checkFont('Lazycrab');
                                    }
                            }
                            else if(typeof tbLocalScript !== 'undefined' && tbLocalScript && $('link#builder-styles').length===0 ){
                            
                                self.LoadCss(  tbLocalScript.builder_url + '/css/lazycrab-builder-style.css', lazycrab_vars.version );
                            }
			
                        /*Load addons css/js,we don't need to wait the loading of builder*/
                        if(typeof tbLocalScript !== 'undefined' && tbLocalScript && Object.keys(tbLocalScript.addons).length>0){
                            for(var i in tbLocalScript.addons){
                                if($(tbLocalScript.addons[i].selector).length>0){
                                    if(tbLocalScript.addons[i].css){
                                        if( ! $( 'link[href*="' + tbLocalScript.addons[i].css + '"]' ).length )
											self.LoadCss(tbLocalScript.addons[i].css, tbLocalScript.addons[i].ver );
                                    }
                                    if(tbLocalScript.addons[i].js){
                                        if(tbLocalScript.addons[i].external){
                                            var s = document.createElement('script');
                                            s.type = 'text/javascript';
                                            s.text = tbLocalScript.addons[i].external;
                                            var t = document.getElementsByTagName('script')[0];
                                            t.parentNode.insertBefore(s, t);
                                        }
                                        self.LoadAsync(tbLocalScript.addons[i].js,null, tbLocalScript.addons[i].ver );
                                    }
                                }
                            }
                        }
			if(is_fontawesome) {
                            self.LoadCss( lazycrab_vars.url + '/fontawesome/css/font-awesome.min.css', lazycrab_vars.version );
			}
			if(is_lazycrab_icons) {
                            self.LoadCss(lazycrab_vars.url + '/lazycrab-icons/lazycrab-icons.css', lazycrab_vars.version);
			}
			if($( 'i[class*="icon-"]' ).length>0 && typeof lazycrab_vars.fontello_path === 'string') {
                            self.LoadCss( lazycrab_vars.fontello_path );
			}
			if($( '.shortcode' ).length>0) {
                            self.LoadCss( lazycrab_vars.url + '/css/lazycrab.framework.css', null, $( '#lazycrab-framework-css' )[0] );
			}  
		},
		InitCarousel: function () {
			if ($('.slides[data-slider]').length > 0) {
				var $self = this;
				$self.LoadAsync(lazycrab_vars.includesURL + 'js/imagesloaded.min.js', function () {
						if('undefined' === typeof $.fn.carouFredSel){
							$self.LoadAsync(lazycrab_vars.url + '/js/carousel.min.js', $self.carouselCalback, null, null, function () {
								return ('undefined' !== typeof $.fn.carouFredSel);
							});
						}
						else{
							$self.carouselCalback();
						}
				}, null, null, function () {
					return ('undefined' !== typeof $.fn.imagesLoaded);
				});
			}
		},
		carouselCalback: function () {

			$('.slides[data-slider]').each(function () {
				if ($(this).data('lazycrab_slider_ready') || $(this).closest('.caroufredsel_wrapper').length > 0) {
                                    return true;
				}
				$(this).data('lazycrab_slider_ready',1).find("> br, > p").remove();
				
				var $this = $(this),
                                    $data = JSON.parse(window.atob($(this).data('slider'))),
                                    height = (typeof $data.height === 'undefined') ? 'auto' : $data.height,
                                    $numsldr = $data.numsldr,
                                    $slideContainer = 'undefined' !== typeof $data.custom_numsldr ? '#' + $data.custom_numsldr : '#slider-' + $numsldr,
                                    $speed = $data.speed >= 1000 ? $data.speed : 1000 * $data.speed,
                                    $args = {
                                            responsive: true,
                                            swipe: true,
                                            circular: $data.wrapvar,
                                            infinite: $data.wrapvar,
                                            auto: {
                                                    play: $data.auto == 0 ? false : true,
                                                    timeoutDuration: $data.auto >= 1000 ? $data.auto : 1000 * $data.auto,
                                                    duration: $speed,
                                                    pauseOnHover: $data.pause_hover
                                            },
                                            scroll: {
                                                    items: parseInt($data.scroll),
                                                    duration: $speed,
                                                    fx: $data.effect
                                            },
                                            items: {
                                                    visible: {
                                                            min: 1,
                                                            max: parseInt($data.visible)
                                                    },
                                                    width: 120,
                                                    height: height
                                            },
                                            onCreate: function (items) {
                                                    $this.closest('.caroufredsel_wrapper').outerHeight($this.outerHeight(true));
                                                    $($slideContainer).css({'visibility': 'visible', 'height': 'auto'});
                                            }
                                    };
				if ($data.slider_nav) {
					$args.prev = $slideContainer + ' .carousel-prev';
					$args.next = $slideContainer + ' .carousel-next';
				}
				if ($data.pager) {
					$args.pagination = $slideContainer + ' .carousel-pager';
				}
				$this.imagesLoaded().always(function () {
					$this.carouFredSel($args);
				});
			});

			var tscpsDidResize = false;
			$(window).on("resize", function () {
				tscpsDidResize = true;
			});
			setInterval(function () {
				if (tscpsDidResize) {
					tscpsDidResize = false;
					$(".slides[data-slider]").each(function () {
						var heights = [],
								newHeight,
								$self = $(this);
						$self.find("li").each(function () {
							heights.push($(this).outerHeight(true));
						});
						newHeight = Math.max.apply(Math, heights);
						$self.outerHeight(newHeight);
						$self.parent().outerHeight(newHeight);
					});
				}
			}, 500);

		},
		InitMap: function () {
			var $self = Lazycrab;
			if ($('.lazycrab_map').length > 0) {
				if (typeof google !== 'object' || typeof google.maps !== 'object') {
					if(!lazycrab_vars.map_key){
						lazycrab_vars.map_key = '';
					}
					$self.LoadAsync('//maps.googleapis.com/maps/api/js?v=3.exp&callback=Lazycrab.MapCallback&key='+lazycrab_vars.map_key, false, true, true);
				} else {
					if( lazycrab_vars.isCached && lazycrab_vars.isCached === 'enable' ) {
						google.maps = { __gjsload__: function() { return; } };
						$self.LoadAsync('//maps.googleapis.com/maps/api/js?v=3.exp&callback=Lazycrab.MapCallback&key='+lazycrab_vars.map_key, false, true, true);
					} else {
						$self.MapCallback();
					}
				}
			}
		},
		MapCallback: function () {
			var $maps = $('.lazycrab_map');
			$maps.each(function ($i) {
				var $data = JSON.parse(window.atob($(this).data('map'))),
						address = $data.address,
						zoom = parseInt($data.zoom),
						type = $data.type,
						scroll = $data.scroll,
						drag = $data.drag,
						node = this;
				var delay = $i * 1000;
				setTimeout(function () {
					var geo = new google.maps.Geocoder(),
						latlng = new google.maps.LatLng(-34.397, 150.644),
						mapOptions = {
							zoom: zoom,
							center: latlng,
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							scrollwheel: scroll,
							draggable: drag
						};
					switch (type.toUpperCase()) {
						case 'ROADMAP':
							mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
							break;
						case 'SATELLITE':
							mapOptions.mapTypeId = google.maps.MapTypeId.SATELLITE;
							break;
						case 'HYBRID':
							mapOptions.mapTypeId = google.maps.MapTypeId.HYBRID;
							break;
						case 'TERRAIN':
							mapOptions.mapTypeId = google.maps.MapTypeId.TERRAIN;
							break;
					}

					var map = new google.maps.Map(node, mapOptions),
							revGeocoding = $(node).data('reverse-geocoding') ? true : false;

					google.maps.event.addListenerOnce( map, 'idle', function(){
						$( 'body' ).trigger( 'lazycrab_map_loaded', [ $(node), map ] );
					});

					/* store a copy of the map object in the dom node, for future reference */
					$(node).data( 'gmap_object', map );

					if (revGeocoding) {
						var latlngStr = address.split(',', 2),
								lat = parseFloat(latlngStr[0]),
								lng = parseFloat(latlngStr[1]),
								geolatlng = new google.maps.LatLng(lat, lng),
								geoParams = {'latLng': geolatlng};
					} else {
						var geoParams = {'address': address};
					}

					geo.geocode(geoParams, function (results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							var position = revGeocoding ? geolatlng : results[0].geometry.location;
							map.setCenter(position);
							var marker = new google.maps.Marker({
								map: map,
								position: position
							}),
							info = $(node).data('info-window');
							if (undefined !== info) {
								var contentString = '<div class="lazycrab_builder_map_info_window">' + info + '</div>',
									infowindow = new google.maps.InfoWindow({
										content: contentString
									});

								google.maps.event.addListener(marker, 'click', function () {
									infowindow.open(map, marker);
								});
							}
						}
					});
				}, delay);
			});
		},
                hash:function(str){
                    var hash = 0;
                    for (var i = 0,len=str.length; i < len; ++i) {
                        var char = str.charCodeAt(i);
                        hash = ((hash<<5)-hash)+char;
                        hash = hash & hash; // Convert to 32bit integer
                    }
                    return hash;
                },
		LoadAsync: function (src, callback, version, defer, test) {
                    var id = this.hash(src), // Make script path as ID
                        existElemens =  $.inArray( id, this.jsLazy ) !== -1 || document.getElementById(id);
			if (existElemens) {
				if (callback) {
					if (test) {
                                            var callbackTimer = setInterval(function () {
                                                    var call = false;
                                                    try {
                                                            call = test.call();
                                                    } catch (e) {
                                                    }

                                                    if (call) {
                                                        clearInterval(callbackTimer);
                                                        callback.call();
                                                    }
                                            }, 100);
					} else {
						setTimeout(callback, 110);
					}
				}
				return;
			}
                        else if(test){
                            try {
                                if(test.call()){
                                    if(callback){
                                        callback.call();
                                    }
                                    return;
                                }
                            } catch (e) {
                            }
                        }
                        this.jsLazy.push(id);
                        if(src.indexOf('.min.js')===-1){
                            var name = src.match(/([^\/]+)(?=\.\w+$)/);
                            if(name &&  name[0]){
                                name = name[0];
                                if(lazycrab_vars.minify.js[name]){
                                    src = src.replace(name+'.js',name+'.min.js');
                                }
                            }
                        }
			var s, r, t;
			r = false;
			s = document.createElement('script');
			s.type = 'text/javascript';
			s.id = id;
			s.src = !version && 'undefined' !== typeof tbLocalScript ? src + '?version=' + tbLocalScript.version : src;
			if (!defer) {
				s.async = true;
			}
			else {
				s.defer = true;
			}
			s.onload = s.onreadystatechange = function () {
				if (!r && (!this.readyState || this.readyState === 'complete'))
				{
					r = true;
					if (callback) {
						callback();
					}
				}
			};
			t = document.getElementsByTagName('script')[0];
			t.parentNode.insertBefore(s, t);
		},
		LoadCss: function (href, version, before, media, callback) {
                        var id = this.hash(href),
                            existElemens =  $.inArray( id, this.cssLazy ) !== -1 || document.getElementById(id),
                            fullHref = version ? href + '?version=' + version : href;
			if (existElemens || $("link[href='" + fullHref + "']").length > 0) {
				return;
			}
                        this.cssLazy.push(id);
                        if(href.indexOf('.min.css')===-1){
                            var name = href.match(/([^\/]+)(?=\.\w+$)/);
                            if(name &&  name[0]){
                                name = name[0];
                                if(lazycrab_vars.minify.css[name]){
                                    fullHref = fullHref.replace(name+'.css',name+'.min.css');
                                }
                            }
                        }
			var doc = window.document,
                            ss = doc.createElement("link"),
                            ref;
			if (before) {
				ref = before;
			}
			else {
				var refs = (doc.body || doc.getElementsByTagName("head")[ 0 ]).childNodes;
				ref = refs[ refs.length - 1];
			}

			var sheets = doc.styleSheets;
			ss.rel = "stylesheet";
			ss.href = fullHref;
			// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
			ss.media = "only x";
			ss.async = 'async';
                        ss.id = id;

			// Inject link
			// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
			ref.parentNode.insertBefore(ss, (before ? ref : ref.nextSibling));
			// A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
			var onloadcssdefined = function (cb) {
				var resolvedHref = ss.href;
				var i = sheets.length;
				while (i--) {
					if (sheets[ i ].href === resolvedHref) {
						if( callback ) {
							callback();
						}
						return cb();
					}
				}
				setTimeout(function () {
					onloadcssdefined(cb);
				});
			};

			// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
			ss.onloadcssdefined = onloadcssdefined;
			onloadcssdefined(function () {
				ss.media = media || "all";
			});
			return ss;
		},
		checkFont:function(font) {
			// Maakt een lijst met de css van alle @font-face items.
			if($.inArray(font,this.fonts)){
				return true;
			}
			if(this.fonts.length===0){
				var o = [],
				sheets = document.styleSheets,
				rules = null,
				i = sheets.length, j;
				while( 0 <= --i ){
					rules = sheets[i].cssRules || sheets[i].rules || [];
					j = rules.length;

					while( 0 <= --j ){
						if(rules[j].style) {
							var fontFamily = '';
							if(rules[j].style.fontFamily){
								fontFamily = rules[j].style.fontFamily;
							}
							else{
								fontFamily = rules[j].style.cssText.match(/font-family\s*:\s*([^;\}]*)\s*[;}]/i);
								if(fontFamily){
									fontFamily = fontFamily[1];
								}
							}
							if(fontFamily===font){
								return true;
							}
							if(fontFamily){
                                                            o.push(fontFamily);
							}
						}
					}
				}
				this.fonts = $.unique( o );
			}
			return $.inArray(font,this.fonts);
		},
		video: function () {
			if ($('.lazycrab_video_desktop a').length > 0) {
				if (typeof flowplayer === 'undefined') {
					this.LoadAsync(lazycrab_vars.url + '/js/flowplayer-3.2.4.min.js', this.videoCalback);
				}
				else {
					this.videoCalback();
				}
			}
		},
		videoCalback: function () {
			$('.lazycrab_video_desktop a').each(function () {
				flowplayer(
					$(this).attr('id'),
					lazycrab_vars.url + "/js/flowplayer-3.2.5.swf",
					{
						clip: {autoPlay: false}
					}
				);
			});
		},
		lightboxCallback: function ($el, $args) {
			this.LoadAsync(lazycrab_vars.url + '/js/lazycrab.gallery.js', function () {
				Lazycrab.GalleryCallBack($el, $args);
			}, null, null, function () {
				return ('undefined' !== typeof LazycrabGallery);
			});
		},
		InitGallery: function ($el, $args) {
			var lightboxConditions = typeof lazycrabScript === 'object' && ((lazycrabScript.lightbox.lightboxContentImages && $(lazycrabScript.lightbox.contentImagesAreas).length>0) || $(lazycrabScript.lightbox.lightboxSelector).length > 0);
                            if(!lightboxConditions){
                                lightboxConditions = typeof lazycrabScript === 'object' && lazycrabScript.lightbox.lightboxGalleryOn && ($(lazycrabScript.lightbox.lightboxContentImagesSelector).length > 0 || (typeof lazycrabScript.lightbox.gallerySelector!=='undefined' && $(lazycrabScript.lightbox.gallerySelector).length > 0));
                            }
			var self = this;
			if( lightboxConditions ) {
				this.LoadCss(lazycrab_vars.url + '/css/lightbox.css', null);
				this.LoadAsync(lazycrab_vars.url + '/js/lightbox.min.js', function () {
					Lazycrab.lightboxCallback($el, $args);
				}, null, null, function () {
					return ('undefined' !== typeof $.fn.magnificPopup);
				});
			}
			if ( $('.module.module-gallery,.module.module-image').length > 0) {
				
				if( $( '.gallery-masonry' ).length > 0) {
					this.LoadAsync(lazycrab_vars.includesURL + 'js/imagesloaded.min.js', function () {
						self.LoadAsync(lazycrab_vars.includesURL + 'js/masonry.min.js', function () {
							$( '.gallery-masonry' ).imagesLoaded(function() {
								$( '.gallery-masonry' ).masonry({
									itemSelector: '.gallery-item',
									columnWidth: 1,
									originLeft : ! $( 'body' ).hasClass( 'rtl' )
								}); 
                                                                if(!lightboxConditions){
                                                                    $('body').addClass('lazycrab_lightbox_loaded').removeClass('lazycrab_lightboxed_images');
                                                                }
							});
						}, null, null, function () {
							return ('undefined' !== typeof $.fn.masonry);
						});
					}, null, null, function () {
						return ('undefined' !== typeof $.fn.imagesLoaded);
					});
				}
                                else if(!lightboxConditions){
                                        $('body').addClass('lazycrab_lightbox_loaded').removeClass('lazycrab_lightboxed_images');
                                    }
			} else if(!lightboxConditions){
				$('body').addClass('lazycrab_lightbox_loaded').removeClass('lazycrab_lightboxed_images');
			}
                        
		},
		GalleryCallBack: function ($el, $args) {
			if (!$el) {
				$el = $(lazycrabScript.lightboxContext);
			}
			$args = !$args && lazycrabScript.extraLightboxArgs ? lazycrabScript.extraLightboxArgs : {};
			LazycrabGallery.init({'context': $el, 'extraLightboxArgs': $args});
			$('body').addClass('lazycrab_lightbox_loaded').removeClass('lazycrab_lightboxed_images');
		},
		isPageHasBuilderContent: function () {
			var check_builder = $('.lazycrab_builder_content').filter(function () {
				return $.trim($(this).html().toString()).length > 0;
			});
			return check_builder.length;
		}
	};

	Lazycrab.Init();

}(jQuery, window, document));