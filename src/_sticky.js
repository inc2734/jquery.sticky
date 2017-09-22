'use strict';

import $ from 'jquery';

export default class Sticky {
  constructor(target, args = {}) {
    if (! target.length) {
      return;
    }

    this.target = target;
    this.parent = target.parent();
    this.args   = $.extend({
      offset: 0
    }, args);

    this.placeholder = $('<div class="js-sticky-placeholder"/>');

    this.isAdded = false;

    this.initialize();

    $(window).scroll(() => {
      this.initialize();
    });

    $(window).resize(() => {
      this.initialize();
    });
  }

  initialize() {
    if ('none' == this.target.css('display')) {
      this.parent.removeClass('js-sticky-parent');
      this.target.removeClass('js-sticky-top');
      this.target.removeClass('js-sticky-bottom');
      this.placeholder.remove();
      this.isAdded = false;
      return;
    }

    this.placeholder.width(this.target.outerWidth());
    this.placeholder.height(this.target.outerHeight() + parseInt(this.target.css('margin-bottom')));

    if (this.shouldStickyTop()) {
      this.setTargetSize(this.target.height(), this.target.width());
      this.target.addClass('js-sticky-top');
      this.target.css('top', this.args.offset);
      this.target.after(this.placeholder);
      this.isAdded = true;
    } else if (this.shouldStickyBottom()) {
      this.parent.addClass('js-sticky-parent');
      this.target.removeClass('js-sticky-top');
      this.target.css('top', '');
      this.target.addClass('js-sticky-bottom');
    } else if (this.shouldReleaseStickyBottom()) {
      this.parent.removeClass('js-sticky-parent');
      this.target.addClass('js-sticky-top');
      this.target.css('top', this.args.offset);
      this.target.removeClass('js-sticky-bottom');
    } else if (this.shouldReleaseStickyTop()) {
      this.parent.removeClass('js-sticky-parent');
      this.target.removeClass('js-sticky-top');
      this.target.css('top', '')
      this.target.removeClass('js-sticky-bottom');
      this.setTargetSize('', '');
      this.placeholder.remove();
      this.isAdded = false;
    }
  }

  shouldStickyTop() {
    return (this.getScrollTop() >= this.getTargetTopY() && ! this.isAdded);
  }

  shouldStickyBottom() {
    return (this.getTargetBottomY() >= this.getParentBottomY()
         && ! this.parent.hasClass('js-sticky-parent')
         && this.isAdded);
  }

  shouldReleaseStickyBottom() {
    return (this.getScrollTop() <= this.getTargetTopY()
         && this.getTargetTopY() >= this.getParentTopY()
         && this.parent.hasClass('js-sticky-parent')
         && this.isAdded);
  }

  shouldReleaseStickyTop() {
    return (this.getScrollTop() <= this.getParentTopY()
         && this.isAdded);
  }

  getScrollTop() {
    return $(window).scrollTop() + this.args.offset + parseInt(this.target.css('margin-top'));
  }

  getParentTopY() {
    if (this.target.prev().length) {
      return this.target.prev().offset().top + this.target.prev().outerHeight();
    }
    return this.parent.offset().top;
  }

  getParentBottomY() {
    if (this.target.next(':not(.js-sticky-placeholder)').length) {
      return this.target.next(':not(.js-sticky-placeholder)').offset().top;
    }
    return this.parent.offset().top + this.parent.outerHeight();
  }

  getTargetTopY() {
    return this.target.offset().top;
  }

  getTargetBottomY() {
    return this.getTargetTopY() + this.target.outerHeight();
  }

  setTargetSize(height, width) {
    this.target.width(width);
    this.target.height(height);
  }
};
