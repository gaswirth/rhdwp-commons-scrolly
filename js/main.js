/* ==========================================================================
	Setup
   ========================================================================== */

var $window = jQuery(window),
	$body = jQuery('body'),
	$main = jQuery('#main'),
	$mast = jQuery('#masthead'),
	$navLink = jQuery('#site-navigation a');

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


(function($){
	$(document).ready(function($){
		if ( !isMobile && !isTablet ) {
			// Skrollr parallax
			$(".full-bg:nth-of-type(1)")
				.attr("data-start", "background-position: center 0px")
				.attr("data-top-bottom", "background-position: center 200px");

			$(".full-bg:nth-of-type(n+2)")
				.attr("data-bottom-top", "background-position: center -100px;")
				.attr("data-top-bottom", "background-position: center 100px;");

			if ( $(window).width() > 640 ) {
				skrollrInit();
			}
		}

		// FitText
		fitText(document.getElementById('front-page-title'), 0.9);

		// Fancy scrolly navigation
		$navLink.click(function(e){
			e.preventDefault();

			var $a = $( '#' + $(this).attr('href').split('#').pop() );
			var yOffset;

			if ( $a.attr('data-offset').length > 0 )
				yOffset = $a.data('offset');
			else
				yOffset = 0;

			console.log(yOffset);

			$('html, body').animate({
				scrollTop: $a.offset().top - yOffset
			}, 1000, 'easeInOutCubic');
		});

		// Window resizing
		var resizeId;

		function doneResizing(){
			if ( $(window).width() < 640 ) {
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

		$(window).resize(function(){
			clearTimeout(resizeId);
			resizeId = setTimeout(doneResizing, 500);
		});

		// Remove ajax pagination text glyph fallback
		$(".pagination-button").text('');
	});

	wpadminbarPush();
})(jQuery);


/* ==========================================================================
	Functions
   ========================================================================== */


function wpadminbarPush() {
	jQuery("#wpadminbar").css({
		top: '50px',
	});
}


function skrollrInit() {
	try {
		s = skrollr.init({
			forceHeight: false
		});
	} catch(err) {
		throw "Warning: Skrollr disabled on this device.\n" . err;
	}
}