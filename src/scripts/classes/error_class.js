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