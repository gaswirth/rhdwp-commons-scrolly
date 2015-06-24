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

(function($){

	// Fancy scrolly navigation
	if ( isFrontPage ) {
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
	}

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