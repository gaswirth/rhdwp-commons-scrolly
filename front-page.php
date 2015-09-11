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
						<h1 id="front-page-title"><?php bloginfo( 'name' ); ?></h1>
						<?php
							$nav_args_main = array(
								'menu_location' => 'primary',
								'menu_id' => 'site-navigation',
								'container' => 'nav',
								'container_id' => 'site-navigation-container'
							);
							wp_nav_menu( $nav_args_main );
						?>
					</div>
				</header>
			</section>

			<section id="news">
				<div class="section-content">
					<h2 class="section-title">Recently</h2>

					<?php if ( have_posts() ) : ?>
						<ul class="news-list">
						<?php while ( have_posts() ) : the_post(); ?>

							<?php get_template_part( 'content' ); ?>

						<?php endwhile; ?>
						</ul>
					<?php endif; ?>
				</div>

				<?php
					the_posts_pagination( array(
						'mid_size' => 1,
						'prev_text' => '<div class="pagination-button ltri">&ltri;</div>',
						'next_text' => '<div class="pagination-button rtri">&rtri;</div>'
					) );
				?>
			</section>

			<section id="full-bg-1" class="full-bg"></section>

			<section id="resume">
				<div class="section-content">
					<?php
						$section_args['name'] = 'resume';
						$section = get_posts( $section_args );
					?>
					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>
				</div>
			</section>

			<section id="full-bg-2" class="full-bg"></section>

			<section id="photos">
				<div class="section-content">
					<?php
						$section_args['name'] = 'photos';
						$section = get_posts( $section_args );
					?>

					<h2 class="section-title"><?php echo $section[0]->post_title; ?></h2>

					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>
				</div>
			</section>

			<section id="full-bg-3" class="full-bg"></section>

			<section id="media">
				<div class="section-content">
					<?php
						$section_args['name'] = 'media';
						$section = get_posts( $section_args );
					?>

					<h2 class="section-title"><?php echo $section[0]->post_title; ?></h2>

					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>
				</div>
			</section>

			<section id="full-bg-4" class="full-bg"></section>

			<section id="contact">
				<div class="section-content">
					<?php
						$section_args['name'] = 'contact';
						$section = get_posts( $section_args );
					?>

					<h2 class="section-title"><?php echo $section[0]->post_title; ?></h2>

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