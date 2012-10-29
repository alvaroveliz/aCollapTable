/*
 * jQuery Alvaro's Collaptable 1.0
 *
 * Copyright (c) 2010 Alvaro Véliz Marín - yo@alvaroveliz.cl
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * More info in http://github.com/alvaroveliz/aCollapTable
 */
(function($){
  $.fn.extend({ 
    aCollapTable: function(options) {
      var defaults = {
        startCollapsed : false
      };
      var options = $.extend(defaults, options);
      var self = this;  

      var _collaptable = function($element, $parent, $display)
      {
        parent = (typeof($parent) == 'undefined') ? $element.parents('tr').data('id') : $parent;
        display = (typeof($display) == 'undefined') ? ( ($element.hasClass('act-expanded')) ? 'none' : 'table-row' ) : $display;
        table = self;
        
        $('tr[data-parent='+parent+']', table).each(function(key, item){
          $(item).css('display', display);
          if ($(item).hasClass('act-tr-expanded')) {
            _collaptable($element, $(item).data('id'), display);   
          }
        });

        if (display == 'none') {
          $element.html('<span class="i">+</span>').removeClass('act-expanded').addClass('act-collapsed');
          $element.parents('tr').addClass('act-tr-collapsed').removeClass('act-tr-expanded');
        }
        else {
          $element.html('<span class="i">-</span>').removeClass('act-collapsed').addClass('act-expanded');
          $element.parents('tr').addClass('act-tr-expanded').removeClass('act-tr-collapsed');
        }
      };

      return this.each(function() {
        var o = options;  
        var obj = $(this);

        // adding minus
        if ( $('tr', obj).length > 0) {
          $('tr', obj).each(function(k, item){
            if ($('tr[data-parent='+$(item).data('id')+']').length > 0) {
              $minus = $('<a />').attr('href', 'javascript:void(0)')
              .addClass('act-more act-expanded')
              .html('-')
              .bind('click', function(){
                _collaptable($(this));
              })
              ;
              $td = $('<td />').html($minus);  
            }
            else {
              $td = $('<td />').html('');
            }
            
            $(item).prepend($td);
          });

          // start collapsed
          if (o.startCollapsed) {
            $('.act-more').each(function(k, item){
              $(item).click();
            });
          }
        }
      });
    }
  })
})(jQuery);
