(function () {
    'use strict';
    SprocketAdminWeb.ApplicationController = Ember.Controller.extend({
        currentRoute: 'index',
        isHome: function () {
            return this.get('currentRoute') === 'index';
        }.property('currentRoute'),
        isStatus: function () {
            return this.get('currentRoute') === 'status';
        }.property('currentRoute'),
        isDashboard: function () {
            return this.get('currentRoute') === 'dashboard';
        }.property('currentRoute'),
        isForum: function () {
            return this.get('currentRoute') === 'forum';
        }.property('currentRoute'),
        isLogin: function () {
            return this.get('currentRoute') === 'login';
        }.property('currentRoute'),
        // observe current route
        currentPathDidChange: function () {
            Ember.run.schedule('afterRender', this, function () {
                this.set('currentRoute', this.get('currentPath'));
            });
        }.observes('currentPath')
    });
})();