/* ==========================================================================
	Setup
   ========================================================================== */

var $window = jQuery(window),
	$body = jQuery('body'),
	$main = jQuery('#main');

var isSingle = ( $body.hasClass('single') ) ? true : false,
	isGrid = ( $main.hasClass('grid') === true ) ? true : false,
	isPaged = $body.hasClass('paged');

var isFrontPage = ( $body.hasClass('front-page') === true ) ? true : false;
var isMobile = ( $body.hasClass('mobile') === true ) ? true : false;
var isTablet = ( $body.hasClass('tablet') === true ) ? true : false;


/* ==========================================================================
	Let 'er rip... (DOM Ready)
   ========================================================================== */

// Initialize empty global skrollr object variable
var skr = null;
var cycleType = null;


(function($){
	$(document).ready(function($){
		// Fancy scrolly navigation
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


		// FitText
		fitText(document.getElementById('site-title'), 0.75);


		// Window resizing
		var resizeId;

		function doneResizing(){
			if ( $window.width() < 640 ) {
				if ( skr ) {
					try {
						skr.destroy();
						skr = null;
					} catch(err) {
						throw "Warning: Parallax disabled on this device.\n" . err;
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
					swipe: true,
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
					swipe: true,
					log: false
				});
				cycleType = 'single';
			}
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
})(jQuery);


/* ==========================================================================
	Functions
   ========================================================================== */


function skrollrInit() {
	try {
		skr = skrollr.init({
			forceHeight: false,
			smoothScrollingDuration: -100
		});
	} catch(err) {
		throw "Warning: Parallax effects disabled on this device.\n" . err;
	}
}
