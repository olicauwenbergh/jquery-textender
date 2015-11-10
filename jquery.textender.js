(function( $ ) {

  $.fn.textender = function( options ) {

    return this.each(function() {

      var $textarea,
          $twin,
          opts = $.extend({}, $.fn.textender.defaults, options );

      // Making a invisible div with the same css values as the textarea.
      // Values that affect the height of the div.
      var maketwin = function( textarea ) {
        return $('<div class="textarea-twin"></div>').css({
          display: 'none',
          fontFamily: textarea.css('fontFamily'),
          fontSize: textarea.css('fontSize'),
          lineHeight: textarea.css('lineHeight'),
          padding: textarea.css('padding'),
          whiteSpace: textarea.css('whiteSpace'),
          width: textarea.css('width'),
          wordWrap: textarea.css('wordWrap')
        }).insertAfter( textarea );
      };

      $textarea = $(this);              // Current textarea
      $twin = maketwin( $textarea );    // Textarea's twin

      // Initialize the textarea with its height values.
      // This is necessary to avoid little jump in height when start typing
      // and to always reserve the min-height of the textarea defined by the user.
      $textarea.css({
        padding: $textarea.css('padding'),
        margin: $textarea.css('margin'),
        height: $textarea.height(),
        minHeight: $textarea.height(),
      });

      // On 'keyup' and 'paste' the textarea input value is being inserted into the twin.
      // Then the height of the textarea changes based on the twin's height
      $textarea.on('keyup paste', function() {
        var text = $textarea.val();                   // Value of the textarea
        var html = $('<div/>').text( text ).html();   // Value encoded into html
        $twin.html( html );

        if (  $twin.height() > $textarea.height() &&
              $twin.height() <= opts.maxrows * parseFloat( $textarea.css('lineHeight') ) &&
              $twin.height() >= parseFloat( $textarea.css('minHeight') ) )
          $textarea.height( $twin.height() + parseFloat( $textarea.css('paddingBottom') ) );

        if ( $twin.height() <= parseFloat( $textarea.css('minHeight') ) )
          $textarea.height( $textarea.css('minHeight') );
      });

    });

  };

  // Textender defaults
  $.fn.textender.defaults = {
    maxrows: 10
  };

})( jQuery );
