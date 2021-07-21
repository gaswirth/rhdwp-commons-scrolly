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
				<header id="masthead" class="full-bg">
					<div class="header-content">
						<h1 id="site-title"><?php bloginfo( 'name' ); ?></h1>
						<?php
							$nav_args = array(
								'menu_location' => 'primary',
								'menu_id' => 'site-navigation',
								'container' => 'nav',
								'container_id' => 'site-navigation-container',
								'walker' => new RHD_Walker_Nav
							);
							wp_nav_menu( $nav_args );
						?>
					</div>
				</header>
			</section>

			<section id="news">
				<h2 class="section-title">Latest News</h2>
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

			<section id="full-bg-1" class="full-bg"></section>

			<section id="media" class="full-bg">
				<?php
				$section_args['name'] = 'media';
				$section = get_posts( $section_args );
				?>

				<h2 class="section-title"><?php echo $section[0]->post_title; ?></h2>

				<div class="section-content">
					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>
				</div>
			</section>

			<section id="full-bg-2" class="full-bg"></section>

			<section id="resume">
				<?php
				$section_args['name'] = 'resume';
				$section = get_posts( $section_args );
				?>

				<h2 class="section-title"><?php echo $section[0]->post_title; ?></h2>

				<div class="section-content">
					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>
				</div>
			</section>

			<section id="full-bg-3" class="full-bg"></section>

			<section id="contact">
				<?php
				$section_args['name'] = 'contact';
				$section = get_posts( $section_args );
				?>

				<h2 class="section-title"><?php echo $section[0]->post_title; ?></h2>

				<div class="section-content">
					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>
				</div>
			</section>
		</div><!-- #content -->
	</section><!-- #primary -->

<?php get_footer(); ?>
