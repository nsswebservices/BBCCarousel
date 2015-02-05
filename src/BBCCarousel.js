/*jslint browser:true,nomen:true*/
/*global window, document, jQuery, console, $*/
(function ($, window, document) {
	'use strict';
    var pluginName = "BBCCarousel",
        defaults = {
            paneWidth : 990
        };

	
    function Plugin(element, options) {
        this.DOMElement = element;
        this.options = $.extend(defaults, options);

        this.init();
    }

    Plugin.prototype = {
		slide : function (forwards) {
            var self = this;
            
            if (forwards) {
                $('.BBCCarousel-car')
                    .append($('.BBCCarousel-pane').first().clone())
                    .animate({
                        left: '-=' + this.options.paneWidth
                    }, 250, function () {
                        $('.BBCCarousel-pane').first().remove();
                        $('.BBCCarousel-car').css('left', -(self.options.paneWidth));
                    });
                
            } else {
                $('.BBCCarousel-car')
                    .prepend($('.BBCCarousel-pane').last().clone())
                    .css('left', -(self.options.paneWidth) * 2)
                    .animate({
                        left: '+=' + this.options.paneWidth
                    }, 250, function () {
                        $('.BBCCarousel-pane').last().remove();
                    });
            }
        },
        init : function () {
            var self = this;
            this.car = $('.BBCCarousel-car');
            this.templates = $('.BBCCarousel-pane');
            this.current = 1;
            this.numSlides = $('.BBCCarousel-pane').length;
            
            $(this.car)
                .width(this.options.paneWidth * this.numSlides)
                .css('left', -(this.options.paneWidth));
            
            $('.BBCCarousel-arrow--previous')
				.on('click', function() {
					$('.BBCCarousel').removeClass('BBCCarousel-bump-right');
					self.slide(false);
				})
				.hover(function() {
					$('.BBCCarousel').addClass('BBCCarousel-bump-right');
				}, function() {
					$('.BBCCarousel').removeClass('BBCCarousel-bump-right');
			});
            $('.BBCCarousel-arrow--next')
				.on('click', function() {
					$('.BBCCarousel').removeClass('BBCCarousel-bump-left');
					self.slide(true);
				})
				.hover(function() {
					$('.BBCCarousel').addClass('BBCCarousel-bump-left');
				}, function() {
					$('.BBCCarousel').removeClass('BBCCarousel-bump-left');
			});
		}
    };

    $.fn[pluginName] = function (options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin(this, options));
            }
        });
    };

}(jQuery, window, document));