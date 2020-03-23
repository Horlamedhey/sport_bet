var Themibox = {};

(function($) {

	Themibox = {
		UpdateQueryString : function(a,b,c) {
			c||(c=window.location.href);var d=RegExp("([?|&])"+a+"=.*?(&|#|$)(.*)","gi");if(d.test(c))return b!==void 0&&null!==b?c.replace(d,"$1"+a+"="+b+"$2$3"):c.replace(d,"$1$3").replace(/(&|\?)$/,"");if(b!==void 0&&null!==b){var e=-1!==c.indexOf("?")?"&":"?",f=c.split("#");return c=f[0]+e+a+"="+b,f[1]&&(c+="#"+f[1]),c}return c
		},

		init: function(config) {
			// private
			this.isFrameLoading = false;
			this.lightboxOpen = false;

			// public
			this.config = config;
			this.bindEvents();
			this.setupLightbox();
		},

		bindEvents: function() {
			var $body = $('body');

			$body.on('click', '.lazycrab-lightbox', this.clickLightBox);
			$body.on('click', '.close-lightbox', this.closeLightBox);

			// lightbox navigation
			$body.on('click', '.lightbox-prev', this.clickLightBoxPrev);
			$body.on('click', '.lightbox-next', this.clickLightBoxNext);

			$(document).keyup(this.keyUp);

			// Set up overlay
                        if($('#overlay').length===0){
                            $('<div id="overlay" class="overlay" />').appendTo('body');
                        }
			$('#overlay').on('click', function(e){
					e.preventDefault();
					if ( Themibox.isFrameLoading ) {
						Themibox.cancelLightBox(e);
					} else {
						Themibox.closeLightBox(e);
					}
				});
		},

		setupLightbox: function() {
                    if($('#post-lightbox-wrap').length===0){
			$('<div class="clone-wrap"></div><div id="post-lightbox-wrap" class="album-lightbox"></div>')
				.hide()
				.prependTo('body');
                    }
		},

		clickLightBox: function(e) {
			e.preventDefault();

			// update status
			Themibox.isFrameLoading = true;
			Themibox.lightboxOpen = true;

			var $link = $(this),
				url = Themibox.UpdateQueryString( 'post_in_lightbox', 1, $link.data('album') );


			var offset = $link.find('img').offset();
			var posY = offset.top;
			var posX = offset.left;
			$link.find('img').clone().addClass('clone').prependTo('.clone-wrap');
			$('.clone-wrap').css({
				'top' : posY,
				'left' : posX
			});
			$('body').addClass('post-lightbox');
			$('.overlay').hide().fadeIn(800);
			$('<div id="loader"><div class="lazycrab-loader"><div class="lazycrab-loader_1 lazycrab-loader_blockG"></div><div class="lazycrab-loader_2 lazycrab-loader_blockG"></div><div class="lazycrab-loader_3 lazycrab-loader_blockG"></div></div></div>').appendTo('body');
			setTimeout(function(){
				$('.clone-wrap').addClass('moved');
				$('.clone').addClass('image-clone');
				$('#post-lightbox-wrap').empty().load(url + ' .album-container', function(){
					if ( Themibox.lightboxOpen ) {

						$('#loader').remove();

						var $self = $(this);
						$self.show();

						$('.image-clone').on('transitionend webkitTransitionEnd otransitionend oTransitionEnd MSTransitionEnd', function(){
                                                    $self.addClass('flipped');
						}).addClass('flipped');

						$('.lightbox-direction-nav').show();

						var prev = $(this).contents().find('.post-nav .prev a');
						var next = $(this).contents().find('.post-nav .next a');

						if(prev.length == 0){
							$('.lightbox-prev').hide();
						}

						if(next.length == 0){
							$('.lightbox-next').hide();
						}

						// also for the form should exit the lightbox
						$(this).contents().find("form").attr('target', '_top');

						// update current status
						Themibox.isFrameLoading = false;

					}

					// ((((( Broadcast Event ))))))
					$('body').trigger('themiboxloaded');

				}).iframeAutoHeight();
			}, 5);
		},

		closeLightBox: function(e) {

			e.preventDefault();
			$('.image-clone').remove();
			$('.clone-wrap').removeClass('moved').css({
				'top' : '',
				'left' : ''
			});

			$('#post-lightbox-wrap').removeClass('flipped');
			// Animation complete.
			$('.overlay').fadeOut(800, function(){
				$('body').removeClass('post-lightbox');
				$('#post-lightbox-wrap').empty().hide();
				$('.lightbox-direction-nav').hide();
				
				Themibox.lightboxOpen = false; // update current status

				// ((((( Broadcast Event ))))))
				$('body').trigger('themiboxclosed');
				$(window).resize(); // fix issue
			});

		},

		getDocHeight: function(){
			var D = document;
			return Math.max(
				Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
				Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
				Math.max(D.body.clientHeight, D.documentElement.clientHeight)
			);
		},

		clickLightBoxPrev: function(e) {
			var link = $('#post-lightbox-wrap').contents().find('.post-nav .prev a').attr('href');
			link = Themibox.UpdateQueryString( 'post_in_lightbox', 1, link );

			if($(this).hasClass('click-disabled')){
				return false;
			}

			$(this).addClass('click-disabled');

			Themibox.loadLightboxPost(link);

			e.preventDefault();
		},

		clickLightBoxNext: function(e) {
			var link = $('#post-lightbox-wrap').contents().find('.post-nav .next a').attr('href');
			link = Themibox.UpdateQueryString( 'post_in_lightbox', 1, link );

			if($(this).hasClass('click-disabled')){
				return false;
			}

			$(this).addClass('click-disabled');

			Themibox.loadLightboxPost(link);
			e.preventDefault();
		},

		loadLightboxPost: function(url) {
			$('<div/>', {id: 'loader'}).appendTo('body');
			Themibox.isFrameLoading = true;

			$('#post-lightbox-wrap, .lightbox-direction-nav').hide();

			$('#post-lightbox-wrap').empty().load(url + ' #pagewrap', function(){
				$('#loader').remove();

				$(this)
					.show()
					.css('top', Themibox.getDocHeight())
					.animate({
						top: 0
					}, 800 );

				$('.lightbox-direction-nav').removeClass('click-disabled').show();

				var prev = $(this).contents().find('.post-nav .prev a');
				var next = $(this).contents().find('.post-nav .next a');

				if(prev.length == 0){
					$('.lightbox-prev').hide();
				}

				if(next.length == 0){
					$('.lightbox-next').hide();
				}

				// also for the form should exit the lightbox
				$(this).contents().find("form").attr('target', '_top');

				Themibox.isFrameLoading = false;

			}).iframeAutoHeight();
		},

		keyUp: function(e) {
			if(Themibox.isFrameLoading && e.keyCode == 27){
				Themibox.cancelLightBox();
			}

			if (Themibox.lightboxOpen && e.keyCode == 27) {
				$('.close-lightbox').trigger('click');
				$('#loader').remove();
			}
		},

		cancelLightBox: function(e) {
			e.preventDefault();
			$('.image-clone, #loader').remove();
			$('.clone-wrap').removeClass('moved').css({
				'top' : '',
				'left' : ''
			});

			$('#post-lightbox-wrap').removeClass('flipped');
			// Animation complete.
			$('.overlay').fadeOut(800, function(){
				$('body').removeClass('post-lightbox');
				$('#post-lightbox-wrap').empty().hide();
				$('.lightbox-direction-nav').hide();
				$(window).resize(); // fix issue
			});

			// ((((( Broadcast Event ))))))
			$('body').trigger('themiboxcanceled');

			// update status
			Themibox.isFrameLoading = false;
			Themibox.lightboxOpen = false;

			// ((((( Broadcast Event ))))))
			$('body').trigger('themiboxclosed');
		}
	};
})(jQuery);