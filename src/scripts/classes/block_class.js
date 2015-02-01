(function () {
    'use strict';
    SprocketAdminWeb.BlockClass = Ember.Object.extend({
        spin: function (elementId) {
            // add spinner
            var opts = {
                lines: 12, // The number of lines to draw
                length: 0, // The length of each line
                width: 6, // The line thickness
                radius: 15, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 90, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#07A9F2', // #rgb or #rrggbb or array of colors
                speed: 1, // Rounds per second
                trail: 88, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
            };
            var target = document.getElementById(elementId);
            new Spinner(opts).spin(target);
        },
        block: function (elementId, spin, bgColor, onBlock) {
            var target = null, label = null;
            var spinnerId = 'spinner-' + new Date().getTime().toString();
            if (Object.prototype.toString.call(elementId) === "[object Object]") {
                target = elementId;
            }
            else {
                target = $('#' + elementId)
            }

            target.attr('blocked','true');
            if(target.selector && target.selector=='body'){
                $('html,body').animate({scrollTop: 0},'slow',"swing",function(){
                    if(target.attr('blocked')=='true'){//check that unblock is not called before animate completed
                        target.css('overflow','hidden');
                    }
                });
            }else{
                target.scrollTop(0).css('overflow', 'hidden');
            }

            var cursor = 'progress';
            if (spin == undefined || spin == null || spin == true || spin == 'true') {
                cursor = 'default';
            }
            var overlayBg = bgColor || bgColor == '' ? bgColor : '#000';
            onBlock = _.isFunction(onBlock) ? onBlock : $.noop;
            target.block({
                message: (spin ? '<div id="' + spinnerId + '" class="spinner">' : '' ) + (label ? '</div><div class="spinnerLabel">' + label + '</div>' : ''),
                css: {
                    width: '',
                    'background-color': '',
                    border: 0,
                    cursor: cursor
                },
                overlayCSS: { backgroundColor: overlayBg, position: 'absolute', cursor: cursor, opacity:.2 },
                onBlock: onBlock
            });
            if ((spin != undefined && spin != null && spin == true) || (label != undefined && label != null && label.length > 0)) {
                var msg = target.find('.blockMsg');
                if (msg.css('top') == '0px' && msg.css('left') == '0px') {
                    target.find('.blockMsg').css('top', '50%').css('left', '50%');
                }
                else {
                    target.find('.spinnerLabel').css('position', '50%').css('left', '0').css('margin-top', '0');
                    target.find('.spinner').css('margin', 'auto');
                }
            }

            // add spinner
            if (spin == undefined || spin == null || spin == true || spin == 'true') {
                this.spin(spinnerId);
            }
        },
        unblock: function (elementId) {
            var target = null;
            if (Object.prototype.toString.call(elementId) === "[object Object]") {
                target = elementId;
            }
            else {
                target = $('#' + elementId)
            }
            target.attr('blocked','');
            target.css('overflow', '');
            target.unblock();
        }
    });
})();