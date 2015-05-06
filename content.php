<?php
/**
 * The default template for displaying post content.
 *
 * @package WordPress
 * @subpackage rhd
 */
?>

	<li <?php post_class( 'news-item' ); ?>>
		<?php if ( has_post_thumbnail() ) : ?>
			<a href="<?php echo do_shortcode('[ct id="###CUSTOMPRESS ID###" property="value"]'); ?>" target="_blank">
				<?php the_post_thumbnail( 'news' ); ?>
			</a>
			<?php the_content(); ?>
		<?php endif; ?>
	</li>