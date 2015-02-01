(function () {
    'use strict';
    SprocketAdminWeb.NotifyClass = Ember.Object.extend({
        closeAll: function () {
            $('#jGrowl').find('.jGrowl-close').click();
        },
        growl: function (message, args) {
            return new Promise(function (resolve, reject) {
                message = message.replace(/<style/g, '<remove').replace(/style>/g, 'remove>');
                message = message.replace(/<script/g, '<remove').replace(/script>/g, 'remove>');
                args.close = function () {
                    // on success
                    resolve();
                };
                args.check = 0;
                args.pool = 8;
                args.animateClose = {opacity: 'hide'};
                args.glue = 'before';
                if (!args.life)
                    args.life = 3000;
                $.jGrowl(message, args);
            });
        },
        success: function (message) {
            return this.growl(message, {});
        },
        info: function (message) {
            return this.growl(message, {});
        },
        warning: function (message) {
            return this.growl(message, {});
        },
        danger: function (message, sticky, life) {
            return this.growl(message, {
                theme: 'danger',
                sticky: sticky ? sticky : false,
                life: life ? life : null
            });
        }
    });
})();