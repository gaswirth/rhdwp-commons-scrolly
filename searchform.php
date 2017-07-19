<?php
/**
 * Roundhouse Designs
 *
 * Custom Search Form
 *
 * @package WordPress
 * @subpackage rhd
 */
?>

<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url('/') ); ?>">
    <div>
        <input type="text" value="<?php echo ( get_search_query() ) ? get_search_query() : ''; ?>" class="search-field" placeholder="SEARCH" name="s" />
        <input type="submit" class="search-submit" value="Go" />
    </div>
</form>