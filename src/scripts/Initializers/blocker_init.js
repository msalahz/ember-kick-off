Ember.Application.initializer({
    name:'blockerInit',
    initialize: function (container,application) {
        // REGISTER BLOCKER OBJECT
        application.register('class:block', Application.BlockClass);
        // DEPENDENCY INJECTION FOR BLOCKER OBJECT
        application.inject('view', 'blocker', 'class:block');
        application.inject('controller', 'blocker', 'class:block');
    }
});