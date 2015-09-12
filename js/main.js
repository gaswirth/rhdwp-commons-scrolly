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
var s = null;
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
		fitText(document.getElementById('front-page-title'), 0.75);


		// Window resizing
		var resizeId;

		function doneResizing(){
			if ( $window.width() < 640 ) {
				if ( s ) {
					try {
						s.destroy();
						s = null;
					} catch(err) {
						throw "Warning: Skrollr disabled on this device.\n" . err;
					}
				}
			} else {
				if ( !s ) {
					skrollrInit();
				}
			}
		}

		// News Scrolling
		if ( $window.width() < 640 )
			rhdCycleInit('scrollHorz');
		else
			rhdCycleInit('carousel');

		function rhdCycleInit( type ) {
			if ( type == 'carousel' ) {
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
					swipe: true
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
					swipe: true
				});
				cycleType = 'single';
			}
		}


		// Resize event
		$window.on('resize', function(){
			clearTimeout(resizeId);
			resizeId = setTimeout(doneResizing, 500);

			if ( $window.width() < 640 && cycleType == 'multi' ) {
				$('.news-entries').cycle('destroy');
				rhdCycleInit('scrollHorz');
			} else if ( $window.width() > 640 && cycleType == 'single' ) {
				$('.news-entries').cycle('destroy');
				rhdCycleInit('carousel');
			}
		});
	});
})(jQuery);


/* ==========================================================================
	Functions
   ========================================================================== */


function skrollrInit() {
	try {
		s = skrollr.init({
			forceHeight: false,
			smoothScrollingDuration: -100
		});
	} catch(err) {
		throw "Warning: Parallax effects disabled on this device.\n" . err;
	}
}