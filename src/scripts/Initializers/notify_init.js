Ember.Application.initializer({
    name:'notifyInit',
    after:'errorInit',
    initialize: function (container,application) {
        // REGISTER NOTIFY OBJECT
        application.register('class:notify', Application.NotifyClass);
        // DEPENDENCY INJECTION FOR NOTIFY OBJECT
        application.inject('route', 'notify', 'class:notify');
        application.inject('controller', 'notify', 'class:notify');
        application.inject('class:error', 'notify', 'class:notify');
    }
});
