Ember.Application.initializer({
    name:'storageInit',
    initialize: function (container,application) {
        // REGISTER STORAGE OBJECT
        application.register('class:storage', Application.StorageClass);
        // DEPENDENCY INJECTION FOR STORAGE OBJECT
        application.inject('route', 'storage', 'class:storage');
        application.inject('controller', 'storage', 'class:storage');
    }
});