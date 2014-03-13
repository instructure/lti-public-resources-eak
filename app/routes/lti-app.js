import ajax from 'appkit/utils/ajax';

var LtiAppRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('lti-app', params.toolId);
  },

  afterModel: function(model) {
    if (model.get('toolType') === 'browse') {
      this.transitionTo('lti-app.browse');
    } else {
      this.transitionTo('lti-app.search');
    }
  },

  actions: {
    embedItem: function(returnType) {
      var _this = this;
      ajax({
        type: 'POST',
        url: '/api/embed',
        dataType: 'json',
        data: {
          return_type: returnType.getJson(),
          launch_params: Ember.ENV.LAUNCH_PARAMS
        }
      }).then(
        function(data) {
          if (data.hasOwnProperty('redirectUrl')) {
            window.location.replace(data.redirectUrl);
          } else {
            _this.get('controller').triggerModal(returnType);
          }
        },
        function(err) {
          Ember.debug(err);
        }
      );
    }
  }
});

export default LtiAppRoute;
