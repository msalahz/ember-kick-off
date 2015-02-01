var SprocketAdminWeb = window.SprocketAdminWeb = Ember.Application.create({
    LOG_TRANSITIONS: true,
    ready: function () {

        // REGISTER OBJECTS
        SprocketAdminWeb.register('main:constant', SprocketAdminWeb.ConstantObject);
        SprocketAdminWeb.register('main:service', SprocketAdminWeb.ServiceObject);
        SprocketAdminWeb.register('class:notify', SprocketAdminWeb.NotifyClass);
        SprocketAdminWeb.register('class:error', SprocketAdminWeb.ErrorClass);
        SprocketAdminWeb.register('class:utilities', SprocketAdminWeb.UtilitiesClass);
        SprocketAdminWeb.register('class:cookie', SprocketAdminWeb.CookieClass);
        SprocketAdminWeb.register('class:storage', SprocketAdminWeb.StorageClass);
        SprocketAdminWeb.register('class:block', SprocketAdminWeb.BlockClass);
        // DEPENDENCY INJECTION FOR CONSTANT OBJECT
        SprocketAdminWeb.inject('route', 'constant', 'main:constant');
        SprocketAdminWeb.inject('controller', 'constant', 'main:constant');
        SprocketAdminWeb.inject('class', 'constant', 'main:constant');
        SprocketAdminWeb.inject('service', 'constant', 'main:constant');
        SprocketAdminWeb.inject('main:service', 'constant', 'main:constant');
        // DEPENDENCY INJECTION FOR Notify OBJECT
        SprocketAdminWeb.inject('route', 'notify', 'class:notify');
        SprocketAdminWeb.inject('controller', 'notify', 'class:notify');
        SprocketAdminWeb.inject('class:error', 'notify', 'class:notify');
        // DEPENDENCY INJECTION FOR Error OBJECT
        SprocketAdminWeb.inject('route', 'error', 'class:error');
        SprocketAdminWeb.inject('controller', 'error', 'class:error');
        // DEPENDENCY INJECTION FOR Utilities
        SprocketAdminWeb.inject('route', 'utilities', 'class:utilities');
        SprocketAdminWeb.inject('controller', 'utilities', 'class:utilities');
        SprocketAdminWeb.inject('service', 'utilities', 'class:utilities');
        // DEPENDENCY INJECTION FOR Cookie OBJECT
        SprocketAdminWeb.inject('route', 'cookie', 'class:cookie');
        SprocketAdminWeb.inject('controller', 'cookie', 'class:cookie');
        SprocketAdminWeb.inject('service', 'cookie', 'class:cookie');
        // DEPENDENCY INJECTION FOR Storage OBJECT
        SprocketAdminWeb.inject('route', 'storage', 'class:storage');
        SprocketAdminWeb.inject('controller', 'storage', 'class:storage');
        // DEPENDENCY INJECTION FOR Block OBJECT
        SprocketAdminWeb.inject('view', 'blocker', 'class:block');
        SprocketAdminWeb.inject('controller', 'blocker', 'class:block');

    }
});
