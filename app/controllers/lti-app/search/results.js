import DashboardLinkMixin from 'appkit/mixins/dashboard-link';

var LtiAppSearchResultsController = Ember.ObjectController.extend(DashboardLinkMixin, {
  actions: {
    getMore: function() {
      this.get('model').loadNextPage();
    }
  }
});

export default LtiAppSearchResultsController;
