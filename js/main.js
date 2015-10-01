/* ==========================================================================
	Setup
   ========================================================================== */

var $window = jQuery(window),
	$body = jQuery('body'),
	$main = jQuery('#main');


var $packery = jQuery(".blog-index #content"),
	packeryIsActive = false;


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


		// Slidebars
		$.slidebars({
			siteClose: false,
		});


		// FitText
		// fitText(document.getElementById('site-title'), 0.75);


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


		// Packery
		if ( !isMobile )
			packeryInit();

		$(window).resize(function(){
			if ( $(window).width() < 640 && packeryIsActive ) {
				$packery.packery('destroy');
				packeryIsActive = false;
			} else
				packeryInit();
		});


		// Resize event
		$window.on('resize', function(){

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

	function packeryInit() {
		$packery.imagesLoaded( function(){
			$packery.packery({
				itemSelector: '.post',
				percentPosition: true,
				gutter: '.gutter-sizer'
			});
		});

		packeryIsActive = true;
	}
})(jQuery);