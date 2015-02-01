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

SprocketAdminWeb.Router.map(function () {
  // Add your routes here
});

(function () {
    'use strict';
    SprocketAdminWeb.ConstantObject = Ember.Object.extend({
        set: function () { }
    });
})();
(function () {
    'use strict';
    SprocketAdminWeb.ServiceObject = Ember.Object.extend({});
})();

(function () {
    'use strict';
    SprocketAdminWeb.BlockClass = Ember.Object.extend({
        spin: function (elementId) {
            // add spinner
            var opts = {
                lines: 12, // The number of lines to draw
                length: 0, // The length of each line
                width: 6, // The line thickness
                radius: 15, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 90, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#07A9F2', // #rgb or #rrggbb or array of colors
                speed: 1, // Rounds per second
                trail: 88, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
            };
            var target = document.getElementById(elementId);
            new Spinner(opts).spin(target);
        },
        block: function (elementId, spin, bgColor, onBlock) {
            var target = null, label = null;
            var spinnerId = 'spinner-' + new Date().getTime().toString();
            if (Object.prototype.toString.call(elementId) === "[object Object]") {
                target = elementId;
            }
            else {
                target = $('#' + elementId)
            }

            target.attr('blocked','true');
            if(target.selector && target.selector=='body'){
                $('html,body').animate({scrollTop: 0},'slow',"swing",function(){
                    if(target.attr('blocked')=='true'){//check that unblock is not called before animate completed
                        target.css('overflow','hidden');
                    }
                });
            }else{
                target.scrollTop(0).css('overflow', 'hidden');
            }

            var cursor = 'progress';
            if (spin == undefined || spin == null || spin == true || spin == 'true') {
                cursor = 'default';
            }
            var overlayBg = bgColor || bgColor == '' ? bgColor : '#000';
            onBlock = _.isFunction(onBlock) ? onBlock : $.noop;
            target.block({
                message: (spin ? '<div id="' + spinnerId + '" class="spinner">' : '' ) + (label ? '</div><div class="spinnerLabel">' + label + '</div>' : ''),
                css: {
                    width: '',
                    'background-color': '',
                    border: 0,
                    cursor: cursor
                },
                overlayCSS: { backgroundColor: overlayBg, position: 'absolute', cursor: cursor, opacity:.2 },
                onBlock: onBlock
            });
            if ((spin != undefined && spin != null && spin == true) || (label != undefined && label != null && label.length > 0)) {
                var msg = target.find('.blockMsg');
                if (msg.css('top') == '0px' && msg.css('left') == '0px') {
                    target.find('.blockMsg').css('top', '50%').css('left', '50%');
                }
                else {
                    target.find('.spinnerLabel').css('position', '50%').css('left', '0').css('margin-top', '0');
                    target.find('.spinner').css('margin', 'auto');
                }
            }

            // add spinner
            if (spin == undefined || spin == null || spin == true || spin == 'true') {
                this.spin(spinnerId);
            }
        },
        unblock: function (elementId) {
            var target = null;
            if (Object.prototype.toString.call(elementId) === "[object Object]") {
                target = elementId;
            }
            else {
                target = $('#' + elementId)
            }
            target.attr('blocked','');
            target.css('overflow', '');
            target.unblock();
        }
    });
})();
(function () {
    'use strict';
    SprocketAdminWeb.CookieClass = Ember.Object.extend({
        prefix: 'sprocket_admin_',
        withPrefix: function (key) {
            return this.prefix + key;
        },
        set: function (key, value, expires) {
            expires = expires ? expires : 15; // default expire to 15 day
            $.cookie(this.withPrefix(key), value, {path:'/',expires: expires});
        },
        get: function (key, defaultVal) {
            return !Ember.empty($.cookie(this.withPrefix(key))) ? $.cookie(this.withPrefix(key)) : defaultVal;
        },
        remove: function (key) {
            $.removeCookie(this.withPrefix(key));
        }
    });
})();
(function () {
    'use strict';
    SprocketAdminWeb.ErrorClass = Ember.Object.extend({
        showServerError: function (jqxhr) {
            console.log('showServerError:');
            console.log(jqxhr);
            console.log('showServerError/');
            var _this= this;
            if (_.isString(jqxhr.responseText)) {
                if (_.isObject(jqxhr) && _.isArray(jqxhr.messages)) {
                    _.each(jqxhr.messages, function (message) {
                        _this.showErrorMessage(message, true)
                    });
                }
                else if (_.isObject(jqxhr) && _.isString(jqxhr.responseText)) {
                    var messages = [];
                    try {
                        messages = JSON.parse(jqxhr.responseText)
                    } catch (e) {
                        //when it's html message not json
                        _this.showErrorMessage(jqxhr.responseText, true);
                        return;
                    }
                    messages = messages.messages ? messages.messages : messages;
                    if (messages) {
                        _.each(messages, function (message) {
                            _this.showErrorMessage(message, true)
                        });
                    }
                }
            } else if (_.isString(jqxhr)) {
                _this.showErrorMessage(jqxhr, true);
            }
        },
        showErrorMessage: function (msg, sticky) {
            this.notify.danger(msg, sticky);
        }
    });
})();
(function () {
    'use strict';
    SprocketAdminWeb.NotifyClass = Ember.Object.extend({
        closeAll: function () {
            $('#jGrowl').find('.jGrowl-close').click();
        },
        growl: function (message, args) {
            return new Promise(function (resolve, reject) {
                message = message.replace(/<style/g, '<remove').replace(/style>/g, 'remove>');
                message = message.replace(/<script/g, '<remove').replace(/script>/g, 'remove>');
                args.close = function () {
                    // on success
                    resolve();
                };
                args.check = 0;
                args.pool = 8;
                args.animateClose = {opacity: 'hide'};
                args.glue = 'before';
                if (!args.life)
                    args.life = 3000;
                $.jGrowl(message, args);
            });
        },
        success: function (message) {
            return this.growl(message, {});
        },
        info: function (message) {
            return this.growl(message, {});
        },
        warning: function (message) {
            return this.growl(message, {});
        },
        danger: function (message, sticky, life) {
            return this.growl(message, {
                theme: 'danger',
                sticky: sticky ? sticky : false,
                life: life ? life : null
            });
        }
    });
})();
(function () {
    'use strict';
    SprocketAdminWeb.StorageClass = Ember.Object.extend({});
    SprocketAdminWeb.StorageClass.reopenClass({});
})();
(function () {
    'use strict';
    SprocketAdminWeb.UtilitiesClass = Ember.Object.extend({
        isValidEmail: function (email) {
            var splitted = email.match("^(.+)@(.+)$");
            if (splitted == null) return false;
            if (splitted[1] != null) {
                var regexp_user = /^\"?[\w-_\.]*\"?$/;
                if (splitted[1].match(regexp_user) == null) return false;
            }
            if (splitted[2] != null) {
                var regexp_domain = /^[\w-\.]*\.[A-Za-z]{2,4}$/;
                if (splitted[2].match(regexp_domain) == null) {
                    var regexp_ip = /^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
                    if (splitted[2].match(regexp_ip) == null) return false;
                } // if
                return true;
            }
            return false;
        },
        isValidUrl: function (url) {
            var urlRegExp = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
            return urlRegExp.test(url);
        }
    });
})();
(function () {
    'use strict';
    SprocketAdminWeb.ApplicationRoute = Ember.Route.extend({
        beforeModel: function () {},
        model: function () {},
        setupController: function () {},
        resetController: function () {},
        actions:{}
    });
})();

(function () {
    'use strict';
    SprocketAdminWeb.IndexRoute = Ember.Route.extend({
        beforeModel: function () {
            this._super();
        },
        model: function () {
        },
        setupController: function () {
        },
        resetController: function () {
        }
    });
})();
(function () {
    'use strict';
    SprocketAdminWeb.ApplicationController = Ember.Controller.extend({
        currentRoute: 'index',
        isHome: function () {
            return this.get('currentRoute') === 'index';
        }.property('currentRoute'),
        isStatus: function () {
            return this.get('currentRoute') === 'status';
        }.property('currentRoute'),
        isDashboard: function () {
            return this.get('currentRoute') === 'dashboard';
        }.property('currentRoute'),
        isForum: function () {
            return this.get('currentRoute') === 'forum';
        }.property('currentRoute'),
        isLogin: function () {
            return this.get('currentRoute') === 'login';
        }.property('currentRoute'),
        // observe current route
        currentPathDidChange: function () {
            Ember.run.schedule('afterRender', this, function () {
                this.set('currentRoute', this.get('currentPath'));
            });
        }.observes('currentPath')
    });
})();