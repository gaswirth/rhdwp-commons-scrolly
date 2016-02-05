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
	var toggles = $(".c-hamburger");

	$(document).ready(function($){
		rhdInit();


		$(".c-hamburger").click(function(e){
			e.preventDefault();
			toggleBurger(toggles);
		});


		$("#site-navigation-sb a").on('click', function(){
			$.slidebars.close();
			toggleBurger(toggles);
		});


		// News Scrolling
		if ( $window.width() < 640 )
			rhdCycleInit(false);
		else
			rhdCycleInit(true);


		// YouTube TV
/*
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
*/


		// Resize event
		$window.on('resize', function(){
			rhdRotateDeviceCheck();

			if ( !$("body").hasClass("mobile") && !$("body").hasClass("tablet") ) {
				if ( $window.width() < 640 && cycleType == 'multi' ) {
					$('.news-entries').cycle('destroy');
					rhdCycleInit(false);
				} else if ( $window.width() > 640 && cycleType == 'single' ) {
					$('.news-entries').cycle('destroy');
					rhdCycleInit(true);
				}
			}
		});


		// Scroll event
		$(window).on('scroll', rhdStickyNav);
	});


	/* ==========================================================================
		Functions
	============================================================================= */

	function rhdInit() {
		rhdStickyNav();
		rhdRotateDeviceCheck();

		$.slidebars({
			siteClose: false
		});
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
	function toggleBurger(elem) {
		elem.toggleClass('is-active');
	}


	function rhdRotateDeviceCheck() {
		if ( $("body").hasClass("tablet") || $("body").hasClass("mobile") ) {
			if ( window.innerWidth > window.innerHeight ) {
				$("#rotate-device").show();
			} else {
				$("#rotate-device").hide();
			}
		}
	}


	function rhdStickyNav() {
		var $navbar = $("#navbar"),
			navHeight = $(window).height() - $navbar.height(),
			scrollTop = $(window).scrollTop();

		if ( scrollTop > navHeight ) {
			$navbar
				.prependTo('body')
				.addClass('sticky')
				.addClass('sb-slide');
		} else {
			$navbar
				.removeClass('sticky')
				.removeClass('sb-slide')
				.prependTo('#masthead');
		}
	}
})(jQuery);