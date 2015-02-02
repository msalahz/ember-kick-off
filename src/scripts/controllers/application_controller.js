(function () {
    'use strict';
    Application.ApplicationController = Ember.Controller.extend({
        currentRoute: 'index',
        // observe current route
        currentPathDidChange: function () {
            Ember.run.schedule('afterRender', this, function () {
                this.set('currentRoute', this.get('currentPath'));
            });
        }.observes('currentPath')
    });
})();