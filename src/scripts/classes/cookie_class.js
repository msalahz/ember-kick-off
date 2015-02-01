(function () {
    'use strict';
    SprocketAdminWeb.CookieClass = Ember.Object.extend({
        prefix: 'sprocket_admin_',
        withPrefix: function (key) {
            return this.prefix + key;
        },
        set: function (key, value, expires) {
            expires = expires ? expires : 15; // default expire to 15 day
            $.cookie(this.withPrefix(key), value, {path:'/',expires: expires});
        },
        get: function (key, defaultVal) {
            return !Ember.empty($.cookie(this.withPrefix(key))) ? $.cookie(this.withPrefix(key)) : defaultVal;
        },
        remove: function (key) {
            $.removeCookie(this.withPrefix(key));
        }
    });
})();