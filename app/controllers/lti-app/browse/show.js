import DashboardLinkMixin from 'appkit/mixins/dashboard-link';

var LtiAppBrowseShowController = Ember.ObjectController.extend(DashboardLinkMixin, {
  actions: {
    goUpFolder: function() {
      this.transitionToRoute('lti-app.browse.show', { folderChain: this.get('model.parentFolderChain') });
    }
  }
});

export default LtiAppBrowseShowController;
