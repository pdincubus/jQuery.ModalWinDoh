/**
* ModalWinDoh plugin
* The Homer Simpson of lightboxy thingies: Simple. Loves doughnuts. Mmmm. Doughnuts.
* @author Phil Steer
* https://github.com/pdincubus/jquery.ModalWinDoh
*/

(function($) {
    var modalWinDoh = function(elem, options) {
        this.init(elem, 'modalWinDoh', options);
    };

    modalWinDoh.prototype = {
        constructor: this,
        init: function(element, type, options) {
            this.type = type;
            this.$element = $(element);
            this.options = this.getOptions(options);

            //set the basics for the overlay background
            var overlayHtml = '<div id="modalWinDohOverlay"></div>';
            $('body').append(overlayHtml);
            $('#modalWinDohOverlay').hide().css({ opacity: 0 });
        },

        getOptions: function(options) {
            options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data());
            return options;
        },

        open: function(callback) {
            //set some basics
            var overlayWidth = $(window).width(),
                overlayHeight = $(window).height(),
                $container = this.$element;
                var options = this.options;

            //trigger for preOpen function callback thingy
            this.$element.trigger('modalWinDoh.preOpen');

            //hook some stuff in, like where to find the modal content. You know, useful stuff
            if (callback) {
                callback.apply(this.$element);
            }

            $('#modalWinDohOverlay').show().css({ position: 'fixed', top: 0, left: 0, zIndex: 4000, width: overlayWidth, height: overlayHeight }).animate({
                opacity: 1
            }, options.overlayAnimationSpeed, options.overlayEasing, function(){
                //figure out the centre position for the content container
                var thisTop = ( ( (overlayHeight - $container.outerHeight()) /2) + $container.parent().scrollTop() + 'px');
                var thisLeft = ( ( (overlayWidth - $container.outerWidth()) /2) + $container.parent().scrollLeft() + 'px');

                //now show the modal
                $container.css({ zIndex: 5000, position: 'absolute', top: thisTop, left: thisLeft }).show().animate({
                    opacity: 1
                }, options.modalAnimationSpeed, options.modalEasing, function() {
                    //trigger for postOpen function callback thingy
                    $container.trigger('modalWinDoh.postOpen');
                });
            });
        },

        close: function() {
            $container = this.$element;
            var options = this.options;

            //trigger for preClose function callback thingy
            $container.trigger('modalWinDoh.preClose');

            //hide the modal container
            $container.animate({
                opacity: 0
            }, options.modalAnimationSpeed, options.modalEasing, function() {
                $container.hide();
                //hide the overlay
                $('#modalWinDohOverlay').animate({
                    opacity: 0
                }, options.overlayAnimationSpeed, options.overlayEasing, function() {
                    $('#modalWinDohOverlay').hide();
                });
                //trigger for postClose function callback thingy
                $container.trigger('modalWinDoh.postClose');
            });
        }
    };

    $.fn.modalWinDoh = function(option) {
        var args = Array.prototype.slice.call(arguments);

        return this.each(function() {
            var $this = $(this),
               data = $this.data('modalWinDoh'),
               options = typeof option == 'object' && option;

            if (!data) {
                $this.data('modalWinDoh', (data = new modalWinDoh(this, options)));
            }

            if (typeof option == 'string') {
                data[option].apply(data, args.slice(1));
            }
        });
    };

    $.fn.modalWinDoh.defaults = {
        overlayAnimationSpeed       : 250,
        overlayEasing               : 'swing',
        modalAnimationSpeed         : 250,
        modalEasing                 : 'swing'
    };
})(jQuery);
