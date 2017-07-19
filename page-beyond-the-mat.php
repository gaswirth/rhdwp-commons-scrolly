<?php
/**
 * The Front Page template file.
 *
 * @package WordPress
 * @subpackage rhd
 */

get_header();
?>

	<section id="primary" class="site-content">
		<div id="content" role="main">

			<section id="btm-full-bg-top" class="full-bg"></section>

			<section id="beyond-the-mat" class="bg-green">
				<?php if ( have_posts() ) : ?>
					<?php while ( have_posts() ) : the_post(); ?>

						<h2 class="section-title visuallyhidden"><?php the_title(); ?></h2>

						<div class="section-content">
							<?php the_content(); ?>
						</div>

					<?php endwhile; ?>
				<?php endif; ?>
			</section>

			<section id="contact">
				<div class="section-content">
					<?php
						$section_args = array(
							'post_type'		=> 'page',
							'post_status'	=> 'publish',
							'numberposts'	=> 1,
							'name'			=> 'contact'
						);
						$section = new WP_Query( $section_args );
					?>

					<?php while ( $section->have_posts() ) : $section->the_post(); ?>
						<h2 class="section-title"><?php the_title(); ?></h2>

						<?php the_content(); ?>

						<?php get_sidebar( 'footer' ); ?>
					<?php endwhile; ?>
				</div>
			</section>
		</div><!-- #content -->
	</section><!-- #primary -->

<?php get_footer(); ?>