/**
 * Name: jquery.sticky
 * Author: Takashi Kitajima (inc2734)
 * Author URI: https://2inc.org
 * License: MIT
 *
 * @param { offset }
 */

'use strict';

import $ from 'jquery';
import Sticky from './_sticky.js';

;(function($) {
  $.fn.sticky = function(args) {
    return this.each(function(i, e) {
      new Sticky($(e), args);
    });
  };
})(jQuery);
