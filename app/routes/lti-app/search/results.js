var LtiAppSearchResultsRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this._super.apply(this, arguments);
    model.performSearch();
  }
});

export default LtiAppSearchResultsRoute;
