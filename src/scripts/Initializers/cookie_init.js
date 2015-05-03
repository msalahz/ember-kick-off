Ember.Application.initializer({
    name:'cookieInit',
    initialize: function (container,application) {
        // REGISTER COOKIE OBJECT
        application.register('class:cookie', Application.CookieClass);
        // DEPENDENCY INJECTION FOR COOKIE OBJECT
        application.inject('route', 'cookie', 'class:cookie');
        application.inject('controller', 'cookie', 'class:cookie');
        application.inject('service', 'cookie', 'class:cookie');

    }
});