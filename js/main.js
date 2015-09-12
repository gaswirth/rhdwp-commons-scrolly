/* ==========================================================================
	Setup
   ========================================================================== */

var $window = jQuery(window),
	$body = jQuery('body'),
	$main = jQuery('#main'),
	$pagButton = jQuery(".pagination-button");

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


		// Set pagination text
		$pagButton.each(function(){
			var text = $(this).text();
			$(this).data('text', text);
		});
		// ...and set initial state:
		if ( $window.width() >= 640 )
			$pagButton.text('');


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

		$window.resize(function(){
			clearTimeout(resizeId);
			resizeId = setTimeout(doneResizing, 500);

			if ( $window.width() >= 640 && $pagButton.text() !== '' ) {
				$pagButton.text('');
			} else if ( $window.width() < 640 && $pagButton.text() === '' ) {
				$pagButton.text( $pagButton.data('text') );
			}
		});
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
			forceHeight: false,
			smoothScrollingDuration: -100
		});
	} catch(err) {
		throw "Warning: Parallax effects disabled on this device.\n" . err;
	}
}