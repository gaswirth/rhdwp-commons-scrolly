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
        <div class="site-info">
			<p class="copy"><?php echo '&copy;' . date( 'Y' ); ?> <?php echo bloginfo( 'name' ); ?></p>
			<p class="rhd">Site by <a href="//roundhouse-designs.com" target="_blank">Roundhouse<img id="rhd-logo-footer" src="//assets.roundhouse-designs.com/images/rhd-white-house.png" alt="Roundhouse Designs">Designs</a> | Photos by <a href="http://www.danielmartincohen.com/" target="_blank">Daniel Martin Cohen</a></p>
        </div><!-- .site-info -->
    </footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
