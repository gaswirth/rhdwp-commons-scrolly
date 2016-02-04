/* ==========================================================================
	Setup
   ========================================================================== */

var $window = jQuery(window),
	$body = jQuery('body'),
	$main = jQuery('#main');

var isSingle = ( $body.hasClass('single') ) ? true : false,
	isGrid = ( $main.hasClass('grid') === true ) ? true : false,
	isPaged = $body.hasClass('paged');

var	isFrontPage = ( $body.hasClass('front-page') === true ) ? true : false,
	isMobile = ( $body.hasClass('mobile') === true ) ? true : false,
	isTablet = ( $body.hasClass('tablet') === true ) ? true : false;

// Site Data object: siteData


/* ==========================================================================
	Let 'er rip... (DOM Ready)
   ========================================================================== */

// Init
var skr = null;
var cycleType = null;
var playlistId = 'PLAYLIST_ID';

(function($){
	$(document).ready(function($){
		//toggleBurger();

		$.slidebars();

		$("#site-navigation-sb a").on('click', function(){
			$.slidebars.close();
		});

		// Fancy scrolly navigation
		/*
		$('#site-navigation a').on('click', function(e){
			e.preventDefault();

			var $a = $( '#' + $(this).attr('href').split('#').pop() );

			// Set data-offset in HTML to add offset parameter
			var offsetAttr = $a.attr('data-offset');
			var yOffset;

			if ( offsetAttr )
				yOffset = offsetAttr;
			else
				yOffset = 0;

			$('html, body').animate({
				scrollTop: $a.offset().top - yOffset
			}, 1000, 'easeInOutCubic');
		});
		*/


		if ( !isMobile && !isTablet ) {
			// Skrollr parallax
			$(".full-bg:nth-of-type(1)")
				.attr("data-start", "background-position: center 0px")
				.attr("data-top-bottom", "background-position: center 400px");

			$(".full-bg:nth-of-type(n+2)")
				.attr("data-bottom-top", "background-position: center -200px;")
				.attr("data-top-bottom", "background-position: center 200px;");

			if ( $window.width() > 640 ) {
				skrollrInit();
			}
		}


		// Window resizing
		var resizeId;

		function doneResizing(){
			if ( $window.width() < 640 ) {
				if ( skr ) {
					try {
						skr.destroy();
						skr = null;
					} catch(err) {
						throw "Error: Parallax disabled on this device.\n" . err;
					}
				}
			} else {
				if ( !skr ) {
					skrollrInit();
				}
			}
		}

		// News Scrolling
		if ( $window.width() < 640 )
			rhdCycleInit(false);
		else
			rhdCycleInit(true);


		// YouTube TV
		if ( !isMobile ) {
			$("#ytv").ytv({
				playlist: playlistId,
				autoplay: false,
			});
		} else { // Fallback to default YouTube playlist
			$("#ytv")
				.addClass('ytv-mobile')
				.html('<iframe id="ytplayer" type="text/html" src="https://www.youtube.com/embed/videoseries?list=' + playlistId + '" width="100%" height="100%" frameborder="0" />');
		}


		// Resize event
		$window.on('resize', function(){
			if ( $window.width() < 640 && cycleType == 'multi' ) {
				$('.news-entries').cycle('destroy');
				rhdCycleInit(false);
			} else if ( $window.width() > 640 && cycleType == 'single' ) {
				$('.news-entries').cycle('destroy');
				rhdCycleInit(true);
			}

			clearTimeout(resizeId);
			resizeId = setTimeout(doneResizing, 500);
		});
	});


	/* ==========================================================================
		Functions
	============================================================================= */

	function skrollrInit() {
		try {
			skr = skrollr.init({
				forceHeight: false,
				smoothScrollingDuration: -100
			});
		} catch(err) {
			throw "Error: Parallax disabled on this device.\n" . err;
		}
	}

	function rhdCycleInit( is_carousel ) {
		if ( is_carousel === true ) {
			$( '.news-entries' ).cycle({
				fx: 'carousel',
				timeout: 0,
				autoHeight: "calc",
				allowWrap: false,
				next: "#next",
				prev: "#prev",
				slides: "> article",
				carouselVisible: 3,
				carouselFluid: true,
				log: false
			});
			cycleType = 'multi';
		} else {
			$( '.news-entries' ).cycle({
				fx: 'scrollHorz',
				allowWrap: false,
				timeout: 0,
				next: "#next",
				prev: "#prev",
				slides: "> article",
				log: false
			});
			cycleType = 'single';
		}
	}

	// Adapted from Hamburger Icons: https://github.com/callmenick/Animating-Hamburger-Icons
	function toggleBurger() {
		var toggles = $(".c-hamburger");

		toggles.click(function(e){
			e.preventDefault();
			$(this).toggleClass('is-active');
		});
	}
})(jQuery);