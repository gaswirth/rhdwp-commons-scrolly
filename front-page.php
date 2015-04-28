<?php
/**
 * The Front Page template file.
 *
 * @package WordPress
 * @subpackage rhd
 */

get_header(); ?>

	<section id="primary" class="site-content">
		<div id="content" role="main" class="front-page-content">

			<section id="top">
				<header id="masthead">
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


				<div id="bio">
					<div class="wrapper">
						<?php $bio_post = get_post( 2 ); ?>
						<?php
							if ( $bio_post ) {
								echo apply_filters( 'the_content', $bio_post->post_content );
							}
						?>
					</div>
				</div>
			</section>

			<section id="news">
				<div class="wrapper">
					<h2 class="section-title">Recently</h2>

					<?php if ( have_posts() ) : ?>
						<ul class="news-list">
						<?php while ( have_posts() ) : the_post(); ?>

							<?php get_template_part( 'content' ); ?>

						<?php endwhile; ?>
						</ul>
					<?php endif; ?>

					<div class="first-news-pag">
						<?php
							the_posts_pagination( array(
								'mid_size' => 1,
								'prev_text' => __( 'Back', 'rhd' ),
								'next_text' => __( 'More', 'rhd' ),
								'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'rhd' ) . ' </span>',
							) );
						?>
					</div>

				</div>
			</section>

			<section id="resume">
				<figure class="resume-bg full-bg">
					<img src="<?php echo RHD_IMG_DIR; ?>/resume.jpg" alt="Janine DiVita" />
					<figcaption>
						<a href="" class="download-res">Download Resume</a>
					</figcaption>
				</figure>
			</section>

			<section id="media">
				<div class="wrapper">
					<?php $media_post = get_post( 18 ); ?>
					<?php
						if ( $media_post ) {
							echo apply_filters( 'the_content', $media_post->post_content );
						}
					?>
				</div>
			</section>

			<section id="squintysmiles">
				<figure class="resume-bg full-bg">
					<img src="<?php echo RHD_IMG_DIR; ?>/contact.jpg" alt="Janine DiVita" />
				</figure>
			</section>

			<section id="contact">
				<div class="wrapper">
					<?php $contact_post = get_post( 49 ); ?>
					<?php
						if ( $contact_post ) {
							echo apply_filters( 'the_content', $contact_post->post_content );
						}
					?>
				</div>
			</section>
		</div><!-- #content -->
	</section><!-- #primary -->

<?php get_footer(); ?>