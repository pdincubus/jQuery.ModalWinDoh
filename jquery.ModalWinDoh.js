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
                var options = this.options,
                modalMaxWidth = overlayWidth - options.modalSpace;
                modalMaxHeight = overlayHeight - options.modalSpace;

            //trigger for preOpen function callback thingy
            this.$element.trigger('modalWinDoh.preOpen');

            //hook some stuff in, like where to find the modal content. You know, useful stuff
            if (callback) {
                callback.apply(this.$element);
            }

            //let's actually do something. show overlay
            $('#modalWinDohOverlay').show().css({ position: 'absolute', top: 0, left: 0, zIndex: 4000, width: overlayWidth, height: overlayHeight }).animate({
                opacity: 1
            }, options.overlayAnimationSpeed, options.overlayEasing, function(){
                //now show the modal window container
                $container.css({ position: 'absolute', zIndex: 5000, width: modalMaxWidth, maxHeight: modalMaxHeight }).centre().show().animate({
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

    //centre func stolen almost verbatim - http://stackoverflow.com/questions/210717/using-jquery-to-center-a-div-on-the-screen
    //hat tip to those dudes who contributed!
    //only, I'm British so I corrected the spelling of centre ;)
    $.fn.centre = function(parent) {
        if (parent) {
            parent = this.parent();
        } else {
            parent = window;
        }
        this.css({
            position: 'absolute',
            top: ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + 'px'),
            left: ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + 'px')
        });
        return this;
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
        modalEasing                 : 'swing',
        modalAnimationStyle         : 'fade',
        modalSpace                  : 200
    };
})(jQuery);
