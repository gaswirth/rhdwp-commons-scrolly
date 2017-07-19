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

			<section id="top" class="full-bg">
				<header id="masthead">
					<h1 id="site-title-text"><?php bloginfo( 'name' ); ?></h1>
					<?php rhd_svg_logo_main(); ?>
				</header>
				<a href="#nav" id="downarrows"><img src="<?php echo RHD_IMG_DIR; ?>/arrows.png" alt="Scroll down"></a>
			</section>

			<section id="nav">
				<?php rhd_site_navigation(); ?>
			</section>

			<section id="intro" class="bg-blue">
				<?php
				$section_args['name'] = 'intro';
				$section = get_posts( $section_args );
				?>

				<h2 class="section-title visuallyhidden"><?php echo $section[0]->post_title; ?></h2>

				<div class="section-content">
					<?php echo apply_filters( 'the_content', $section[0]->post_content ); ?>

					<?php the_widget( 'RHD_Mailchimp_Widget', array( 'button' => 'Sign Me Up!', 'fname' => true, 'lname' => true ), array() ); ?>
				</div>
			</section>

			<section id="full-bg-1" class="full-bg"></section>

			<section id="blog">
				<div class="section-content">
					<?php
					$blog_args = array(
						'post_type' 			=> 'post',
						'post_status'			=> 'publish',
						'posts_per_page' 		=> '1',
						'post__in'				=> get_option( 'sticky_posts' ),
						'ignore_sticky_posts'	=> 1
					);
					$blog = new WP_Query( $blog_args );
					?>
					<?php if ( $blog->have_posts() ) : ?>
						<?php while ( $blog->have_posts() ) : $blog->the_post(); ?>

							<div class="front-page-entry">
								<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
									<?php if ( has_post_thumbnail() ) : ?>
										<div class="front-page-entry-thumb">
											<a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_post_thumbnail( 'medium' ); ?></a>
										</div>
									<?php endif; ?>

									<header class="entry-header">
										<h3 class="entry-title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h3>
										<p class="entry-details"><?php the_time( get_option( 'date_format' ) ); ?></p>
									</header><!-- .entry-header -->

									<div class="entry-summary">
										<?php the_excerpt(); ?>
									</div><!-- .entry-summary -->
								</article><!-- #post -->
							</div>

							<a class="ghost-button" href="<?php echo home_url( '/blog' ); ?>">Read More Blog Posts</a>

						<?php endwhile; ?>
					<?php endif; ?>
				</div>
			</section>

			<section id="full-bg-2" class="full-bg"></section>

			<section id="teaching" class="bg-pink">
				<?php
				$section_args['name'] = 'teaching';
				$section = get_posts( $section_args );
				?>
				<h2 class="section-title visuallyhidden"><?php echo $section[0]->post_title; ?></h2>

				<div class="section-content">
					<?php echo apply_filters( 'the_content', $section[0]->post_content ); ?>
				</div>
			</section>

			<section id="video">
				<?php
				$section_args['name'] = 'video';
				$section = get_posts( $section_args );
				?>

				<h2 class="section-title visuallyhidden"><?php echo $section[0]->post_title; ?></h2>

				<div class="section-content">
					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>
				</div>
			</section>

			<section id="full-bg-3" class="full-bg"></section>

			<section id="coaching" class="bg-orange">
				<?php
				$section_args['name'] = 'coaching';
				$section = get_posts( $section_args );
				?>

				<h2 class="section-title visuallyhidden"><?php echo $section[0]->post_title; ?></h2>

				<div class="section-content">
					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>
				</div>
			</section>

			<section id="full-bg-4" class="full-bg"></section>

			<section id="about" class="bg-red">
				<?php
				$section_args['name'] = 'about';
				$section = get_posts( $section_args );
				?>

				<h2 class="section-title visuallyhidden"><?php echo $section[0]->post_title; ?></h2>

				<div class="section-content">
					<?php
						if ( $section ) {
							echo apply_filters( 'the_content', $section[0]->post_content );
						}
					?>
				</div>
			</section>

			<section id="contact">
				<div class="section-content">
					<?php
						$section_args['name'] = 'contact';
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