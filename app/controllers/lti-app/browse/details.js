import DashboardLinkMixin from 'appkit/mixins/dashboard-link';

var LtiAppBrowseDetailsController = Ember.ObjectController.extend(DashboardLinkMixin, {
  actions: {
    goUpFolder: function() {
      this.transitionToRoute('lti-app.browse.show', { folderChain: this.get('model.folderChain') });
    }
  }
});

export default LtiAppBrowseDetailsController;
