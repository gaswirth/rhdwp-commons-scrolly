/* ==========================================================================
	Setup
   ========================================================================== */

var $window = jQuery(window),
	$body = jQuery('body'),
	$main = jQuery('#main'),
	$nav = jQuery('#nav'),
	$rolldown = jQuery('#btm-rolldown-form');


var $packery = jQuery(".blog-index #content"),
	packeryIsActive = false;

var sb;

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
var skr;
var resizeId;
var isStuck;
var navTop;

(function($){
	$(document).ready(function($){
		rhdInit();

		// Fancy scrolly navigation
		$('.site-navigation a').on('click', function(e){
			if ( isFrontPage ) {
				if ( $(this).attr('href').indexOf('#') > -1 ) {
					e.preventDefault();

					var $target = $(this).attr('href').split('#').pop();
					var $a = $( '#' + $target );

					// Set data-offset in HTML to add offset parameter
					var offsetAttr = $nav.height();
					var yOffset;

					if ( offsetAttr )
						yOffset = offsetAttr;
					else
						yOffset = 0;

					$('html, body').animate({
						scrollTop: $a.offset().top - yOffset
					}, 1000, 'easeInOutCubic');

					if ( sb.slidebars.active('right') )
						$("#hamburger").click();
				}
			}
		});


		// Front page downarrow
		$("#downarrows").on('click', function(e){
			if ( !isMobile ) {
				e.preventDefault();

				$('html, body').animate({
					scrollTop: $(window).height() - $nav.offset().top + $nav.height()
				});
			}
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


		// "Beyond the Mat" Signup form
		$rolldown.addClass('inactive');
		$(".btm-rolldown-button").click(function(e){
			e.preventDefault();

			if ( ! $rolldown.hasClass('active') )
				$rolldown
					.removeClass('inactive')
					.addClass('active');
			else
				$rolldown
					.removeClass('active')
					.addClass('inactive');
		});


		// Slidebars
		sb = new $.slidebars();


		// Metabar dropdowns
		$('.rhd-dropdown-title').on('click', function(e){
			e.preventDefault();

			var $this = $(this),
				$dd = $this.siblings('ul');

			$dd.slideToggle();
		});


		// Window resizing
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


		// Resize event
		$window.resize(function(){
			navTop = $("#top").height();

			if ( $(window).width() < 640 && packeryIsActive ) {
				$packery.packery('destroy');
				packeryIsActive = false;
			} else
				packeryInit();
		});


		// Scroll event
		$window.on('scroll', function(){
			if ( isFrontPage ) {
				if ( $window.scrollTop() >= navTop ) {
					stickNav();
				} else {
					unstickNav();
				}
			}
		});
	});


	/* ==========================================================================
		Functions
	============================================================================= */

	function rhdInit() {
		navTop = $nav.offset().top;

		if ( $window.scrollTop() >= navTop && isFrontPage ) {
			stickNav();
		}

		toggleBurger();
	}

	// Adapted from Hamburger Icons: https://github.com/callmenick/Animating-Hamburger-Icons
    function toggleBurger() {
        var toggles = $(".c-hamburger");

        toggles.click(function(e){
                e.preventDefault();
                $(this).toggleClass('is-active');
        });
    }

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

	function stickNav() {
		if ( !isStuck ) {
			$nav.appendTo("body");
			$nav.css({
				'position': 'fixed',
				'top' : '0',
				'left' : '0'
			});
			$("#page").css('paddingTop',$nav.height());

			isStuck = true;
		}
	}

	function unstickNav() {
		if ( isStuck ) {
			$nav.insertAfter("#top");
			$nav.css({
				'top': 'initial',
				'left': 'initial',
				'position': 'relative'
			});
			$("#page").css('paddingTop',0);

			isStuck = false;
		}
	}
})(jQuery);