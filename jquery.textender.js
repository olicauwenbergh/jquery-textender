+function ($) {
  'use strict';

  var Textender = function (textarea, options) {
    this.$textarea  = $(textarea)
    this.$twin      = this.maketwin(this.$textarea)
    this.options    = $.extend({}, Textender.DEFAULTS, options)

    this.init()
  }

  Textender.VERSION = '1.1.0'

  Textender.DEFAULTS = {
    maxrows: 10
  }

  Textender.prototype.init = function () {
    var t = this;
    t.$textarea.css({
      padding: t.$textarea.css('padding'),
      margin: t.$textarea.css('margin'),
      height: t.$textarea.height(),
      minHeight: t.$textarea.height(),
    })

    t.$textarea.on('keyup paste', function() {
      var text = t.$textarea.val()
      var html = $('<div/>').text( text ).html()
      t.$twin.html( html )

      if (  t.$twin.height() > t.$textarea.height() &&
            t.$twin.height() <= t.options.maxrows * parseFloat( t.$textarea.css('lineHeight') ) &&
            t.$twin.height() >= parseFloat( t.$textarea.css('minHeight') ) )
        t.$textarea.height( t.$twin.height() + parseFloat( t.$textarea.css('paddingBottom') ) )

      if ( t.$twin.height() <= parseFloat( t.$textarea.css('minHeight') ) )
        t.$textarea.height( t.$textarea.css('minHeight') )
    })
  }

  Textender.prototype.maketwin = function (textarea) {
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
  }

  function Plugin(option) {
    return this.each(function () {
      var options = typeof option == 'object' && option
      var textender = new Textender(this, options)
    })
  }

  var old = $.fn.textender

  $.fn.textender              = Plugin
  $.fn.textender.Constructor  = Textender

  $.fn.textender.noConflict = function () {
    $.fn.textender = old
    return this
  }

}(jQuery);
