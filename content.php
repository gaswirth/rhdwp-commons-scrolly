<?php
/**
 * The default template for displaying content. Used for both single and index/archive/search, as well as home page.
 *
 * @package WordPress
 * @subpackage rhd
 */
?>

	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<header class="entry-header">
			<?php if ( is_single() ) : ?>
				<h2 class="entry-title"><?php the_title(); ?></h2>
			<?php else : ?>
				<h2 class="entry-title">
					<a href="<?php the_permalink(); ?>" title="<?php echo esc_attr( sprintf( __( 'Permalink to %s', 'rhd' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark"><?php the_title(); ?></a>
				</h2>
			<?php endif; // is_single() ?>

			<p class="entry-details"><?php the_time( get_option( 'date_format' ) ); ?></p>

			<?php if ( has_post_thumbnail() && ! is_single() ) : ?>
				<div class="blog-archive-thumb">
					<?php the_post_thumbnail( 'full' ); ?>
				</div>
			<?php endif; ?>
		</header><!-- .entry-header -->

		<?php if ( is_search() || !is_single() ) : // Only display Excerpts for Search + Archive ?>
			<div class="entry-summary">
				<?php the_excerpt(); ?>
			</div><!-- .entry-summary -->
		<?php else : ?>
			<div class="entry-content">
				<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'rhd' ) ); ?>
				<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'rhd' ), 'after' => '</div>' ) ); ?>

			</div><!-- .entry-content -->
		<?php endif; ?>

		<footer class="entry-meta">
			<p><?php edit_post_link( __( 'Edit', 'rhd' ), '<span class="edit-link">', '</span>' ); ?></p>
		</footer><!-- .entry-meta -->
	</article><!-- #post -->
