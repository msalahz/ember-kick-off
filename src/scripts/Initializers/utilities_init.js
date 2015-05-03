Ember.Application.initializer({
    name:'utilitiesInit',
    initialize: function (container,application) {
        // REGISTER NOTIFY OBJECT
        application.register('class:utilities', Application.UtilitiesClass);
        // DEPENDENCY INJECTION FOR Utilities
        application.inject('route', 'utilities', 'class:utilities');
        application.inject('controller', 'utilities', 'class:utilities');
        application.inject('service', 'utilities', 'class:utilities');
    }
});

