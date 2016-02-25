<?php
/**
 * The Front Page template file.
 *
 * @package WordPress
 * @subpackage rhd
 */

get_header();

// General get_posts() arguments
$section_args = array(
  'post_type'   => 'page',
  'post_status' => 'publish',
  'numberposts' => 1
);
?>

	<section id="primary" class="site-content">
		<div id="content" role="main">

			<section id="top">
				<header id="masthead">
					<div id="navbar">
						<div class="navbar-inner">
							<h1 id="site-title"><a href="#top"><?php bloginfo( 'name' ); ?></a></h1>
							<?php
								$nav_args = array(
									'menu_location' => 'primary',
									'menu_id' => 'site-navigation',
									'menu_class' => 'site-navigation',
									'container' => 'nav',
									'container_id' => 'site-navigation-container',
									'walker' => new RHD_Walker_Nav
								);
								wp_nav_menu( $nav_args );
							?>

							<button id="hamburger" class="sb-toggle-right c-hamburger c-hamburger--htra">
								<span>Toggle nav</span>
	                        </button>
						</div>
					</div>
				</header>
			</section>

			<section id="news" class="hash">
				<header class="section-header">
					<h2 class="section-title">Latest News</h2>
				</header>

				<div class="section-content">
					<?php
					$news_args = array(
						'post_type'			=> 'post',
						'post_status'		=> 'publish',
						'posts_per_page'	=> 12
					);

					$news = get_posts( $news_args );
					?>

					<?php if ( $news ) : ?>
						<div class="news-entries slideshow">
						<?php foreach( $news as $post ) : setup_postdata( $post ); ?>
							<?php if ( has_post_thumbnail() ) : ?>
								<article id="news-<?php the_ID(); ?>" <?php post_class( 'news-entry' ); ?>>

									<?php $ext_url = esc_url( get_post_meta( get_the_ID(), '_ext-link', true ) ); ?>

									<header class="news-header">
										<?php
										if ( $ext_url )
											echo "<a href='$ext_url'>";

										the_post_thumbnail( 'news-item' );

										if ( $ext_url )
											echo '</a>';
										?>
									</header><!-- .entry-header -->

									<div class="news-content">
										<?php the_content(); ?>
									</div><!-- .entry-content -->
								</article><!-- #post -->
							<?php endif; ?>
						<?php endforeach; ?>
						<?php wp_reset_postdata(); ?>

						</div><!-- .news-entries -->
					<?php endif; ?>
				</div>

				<div class="news-scroller">
					<a id="next" href="#"></a>
					<a id="prev" href="#"></a>
				</div>
			</section>

			<section id="about" class="hash thumb-left">
				<?php
				$section_args['name'] = 'about';
				$section = get_posts( $section_args );
				$thumb_src = rhd_get_thumbnail( $section[0]->ID );
				?>

				<div class="section-thumb" style="background-image: url(<?php echo $thumb_src[0]; ?>);"></div>

				<div class="section-content">
					<header class="section-header invisible">
						<h2 class="section-title"><?php echo $section[0]->post_title; ?></h2>
					</header>

					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>
				</div>
			</section>

			<section id="video" class="hash">
				<?php
				$section_args['name'] = 'video';
				$section = get_posts( $section_args );
				?>

				<div class="section-content">
					<header class="section-header">
						<h2 class="section-title"><?php echo $section[0]->post_title; ?></h2>
					</header>

					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>

					<?php if ( function_exists( 'soliloquy' ) ) { soliloquy( 'media-slider', 'slug' ); } ?>
				</div>
			</section>

			<section id="audio" class="thumb-right">
				<?php
				$section_args['name'] = 'audio';
				$section = get_posts( $section_args );
				$thumb_src = rhd_get_thumbnail( $section[0]->ID );
				?>

				<div class="section-thumb" style="background-image: url(<?php echo $thumb_src[0]; ?>);"></div>

				<div class="section-content">
					<header class="section-header">
						<h2 class="section-title"><?php echo $section[0]->post_title; ?></h2>
					</header>

					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>

					<?php if ( function_exists( 'soliloquy' ) ) { soliloquy( 'media-slider', 'slug' ); } ?>
				</div>
			</section>

			<section id="photos" class="hash">
				<?php
				$section_args['name'] = 'photos';
				$section = get_posts( $section_args );
				?>

				<div class="section-content">
					<header class="section-header">
						<h2 class="section-title"><?php echo $section[0]->post_title; ?></h2>
					</header>

					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>

					<?php if ( function_exists( 'soliloquy' ) ) { soliloquy( 'media-slider', 'slug' ); } ?>
				</div>
			</section>

			<section id="teaching" class="hash thumb-left">
				<?php
				$section_args['name'] = 'teaching';
				$section = get_posts( $section_args );
				$thumb_src = rhd_get_thumbnail( $section[0]->ID );
				?>

				<div class="section-thumb" style="background-image: url(<?php echo $thumb_src[0]; ?>);"></div>

				<div class="section-content">
					<header class="section-header">
						<h2 class="section-title"><?php echo $section[0]->post_title; ?></h2>
					</header>

					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>
				</div>
			</section>

			<section id="contact" class="hash">
				<?php
				$section_args['name'] = 'contact-info';
				$section = get_posts( $section_args );
				?>

				<div class="section-content">
					<header class="section-header invisible">
						<h2 class="section-title"><?php echo $section[0]->post_title; ?></h2>
					</header>

					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>
				</div>
			</section>

			<section id="contact-form" class="thumb-right">
				<?php
				$section_args['name'] = 'contact-form';
				$section = get_posts( $section_args );
				$thumb_src = rhd_get_thumbnail( $section[0]->ID );
				?>

				<div class="section-thumb" style="background-image: url(<?php echo $thumb_src[0]; ?>);"></div>

				<div class="section-content">
					<header class="section-header invisible">
						<h2 class="section-title"><?php echo $section[0]->post_title; ?></h2>
					</header>

					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>

					<footer id="colophon">
						<div class="site-info">
							<p>
								<?php echo '&copy;' . date( 'Y' ); ?> <?php echo bloginfo( 'name' ); ?> <?php echo ( rhd_is_mobile() ) ? '<br />' : '|&nbsp;'; ?>Site by <a href="//roundhouse-designs.com" target="_blank">Roundhouse<img id="rhd-logo-footer" src="//assets.roundhouse-designs.com/images/rhd-black-house.png" alt="Roundhouse Designs">Designs</a>
					        </p>
					    </div>
					</footer>
				</div>
			</section>
		</div><!-- #content -->
	</section><!-- #primary -->

<?php get_footer(); ?>