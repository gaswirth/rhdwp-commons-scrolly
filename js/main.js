/* ==========================================================================
	Setup
   ========================================================================== */

var $window = jQuery(window),
	$body = jQuery('body'),
	$main = jQuery('#main');

var isSingle = ( $body.hasClass('single') ) ? true : false,
	isGrid = ( $main.hasClass('grid') === true ) ? true : false,
	isPaged = $body.hasClass('paged');

// wp_data object
var homeUrl = wp_data.home_url,
	themeDir = wp_data.theme_dir,
	imgDir = wp_data.img_dir,
	ajaxUrl = wp_data.ajax_url,
	queryVars = wp_data.query_vars;

var isFrontPage = ( $body.hasClass('front-page') === true ) ? true : false;
var isMobile = ( $body.hasClass('mobile') === true ) ? true : false;
var isTablet = ( $body.hasClass('tablet') === true ) ? true : false;


/* ==========================================================================
	Let 'er rip... (DOM Ready)
   ========================================================================== */

(function($){
	function find_page_number() {
		var pg,
			$current = $("#news .current-page");

		var navPg = parseInt( $current.text().replace ( /[^\d.]/g, '' ) );

		if ( navPg.length > 0 ) {
			pg = navPg;
		} else {
			pg = 1;
		}

		return pg;
	}

	$(document).on( 'click', '#news .nav-links a', function( event ) {
		var $clicked = $(this),
			page;

		event.preventDefault();

		if ( $clicked.hasClass( 'prev' ) )
			page = find_page_number() - 1;
		else if ( $clicked.hasClass( 'next' ) )
			page = find_page_number() + 1;
		else if ( $clicked.hasClass( 'page-numbers') )
			page = find_page_number();

		load_ajax( page );
	});

	function load_ajax( page ) {
		$.ajax({
			url: ajaxUrl,
			type: 'post',
			data: {
				action: 'ajax_pagination',
				query_vars: queryVars,
				page: page
			},
			beforeSend: function() {
				$("#news nav").remove();
				$('#news .news-item').fadeOut(function(){
					$(this).remove();
				});
				$('#news').append( '<div class="page-content" id="loader">Loading Posts...</div>' );
			},
			success: function( html ) {
				$('#news #loader').hide();
				$('#news .current-page').text( page );
				$('#news .news-list')
					.animate({opacity: 0}, function(){
						$(this)
							.append(html)
							.animate({opacity: 1});
					});
			}
		});
	}
})(jQuery);


/* ==========================================================================
	Functions
   ========================================================================== */


function wpadminbarPush() {
	jQuery("#wpadminbar").css({
		top: '50px',
	});
}