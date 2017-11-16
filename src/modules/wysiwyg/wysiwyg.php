<?php if ( !empty( $content ) ) : ?>

<section class="section wysiwyg">
  <div class="container wysiwyg__container">
    <?php echo apply_filters('the_content', $content); ?>
  </div>
</section>
<?php endif; ?>