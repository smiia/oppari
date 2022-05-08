<?php /* Template Name: Sivu hero-kuvalla, ei sidebaria */ ?>
<?php get_header();
?>
<?php $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'full');
echo '<div class="site-wrapper" style="background: url('. $featured_img_url.')">';?>
	<div class="main-wrapper">
	<main id="primary" class="site-main">

		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content', 'page' );

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		endwhile; // End of the loop.
		?>

	</main><!-- #main -->
</div></div>
<?php
get_footer();
