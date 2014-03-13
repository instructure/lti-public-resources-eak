var LtiAppsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('lti-app');
  },
  
  setupController: function(controller, model) {
    this._super.apply(null, arguments);
    controller.set('searchText', '');
  }
});

export default LtiAppsRoute;
