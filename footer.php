<?php
/**
 * The template for displaying the footer.
 *
 * Contains footer content and the closing of the
 * #main and #page div elements.
 *
 * @package WordPress
 * @subpackage rhd
 */
?>

	</main><!-- #main -->

    <footer id="colophon" role="contentinfo">
        <?php get_sidebar( 'footer' ); ?>
        <div class="site-info">
			<p>
				<?php echo '&copy;' . date( 'Y' ); ?> <?php echo bloginfo( 'name' ); ?> <?php echo ( rhd_is_mobile() ) ? '<br>' : '|&nbsp;'; ?>Site photography by <a href="https://murphymade.com" target="_blank">Matt Murphy</a> and <a href="http ://tedely.com" target="_blank">Ted Ely</a> <?php echo ( rhd_is_mobile() ) ? '<br>' : '|&nbsp;'; ?>Site by <a href="//roundhouse-designs.com" target="_blank">Roundhouse Designs</a>
            </p>
        </div><!-- .site-info -->
    </footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
