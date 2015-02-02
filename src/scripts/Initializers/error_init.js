Ember.Application.initializer({
    name:'errorInit',
    initialize: function (container,application) {
        // REGISTER ERROR OBJECT
        application.register('class:error', Application.ErrorClass);
        // DEPENDENCY INJECTION FOR Error OBJECT
        application.inject('route', 'error', 'class:error');
        application.inject('controller', 'error', 'class:error');
    }
});
