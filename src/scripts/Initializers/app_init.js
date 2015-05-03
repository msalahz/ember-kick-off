Ember.Application.initializer({
    name: "appInit",
    initialize: function (container, application) {
        // REGISTER SERVICE BASE OBJECT
        application.register('main:service', Application.ServiceObject);
    }
});
