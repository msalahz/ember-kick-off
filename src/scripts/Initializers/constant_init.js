Ember.Application.initializer({
    name:'constantInit',
    after: 'appInit',
    initialize: function (container,application) {
        // REGISTER CONSTANT OBJECT
        application.register('main:constant', Application.ConstantObject);
        // DEPENDENCY INJECTION FOR CONSTANT OBJECT
        application.inject('route', 'constant', 'main:constant');
        application.inject('controller', 'constant', 'main:constant');
        application.inject('class', 'constant', 'main:constant');
        application.inject('service', 'constant', 'main:constant');
        application.inject('main:service', 'constant', 'main:constant');
    }
});