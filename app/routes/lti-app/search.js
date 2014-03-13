import Search from 'appkit/libs/search';

var LtiAppSearchRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('lti-app');
  },

  actions: {
    performSearch: function() {
      var search = Search.create({
        toolId: this.controller.get('model.toolId'),
        searchText: this.controller.get('searchText')
      });
      this.transitionTo('lti-app.search.results', search);
    }
  }
});

export default LtiAppSearchRoute;
