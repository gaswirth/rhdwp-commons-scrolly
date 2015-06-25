// wp_data object
var themeDir = wp_data.theme_dir,
	ajaxUrl = wp_data.ajax_url,
	queryVars = wp_data.query_vars;

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
				$("#news .pagination").remove();
				$('#news .news-item').animate({
					opacity: 0
				}, function(){
					$(this).remove();
				});
				$('#news').append( '<div class="page-content" id="loader"><img src="'+themeDir+'/img/preloader.gif" alt="Loading posts" /></div>' );
			},
			success: function( html ) {
				$('#news #loader').remove();
				$('#news .current-page').text( page );
				$('#news .news-list')
					.animate({opacity: 0}, function(){
						$(this)
							.append(html)
							.animate({opacity: 1});

						$('.news-list nav').appendTo('#news');
					});
			}
		});
	}
})(jQuery);
