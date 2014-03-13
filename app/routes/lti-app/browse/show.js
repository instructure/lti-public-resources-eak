import Browse from 'appkit/libs/browse';

var LtiAppBrowseShowRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this._super.apply(this, arguments);
    var ltiApp = this.modelFor('lti-app');
    var browse = Browse.create({ toolId: ltiApp.get('toolId') });
    browse.loadFolder(model.folderChain);
    controller.set('model', browse);
  }
});

export default LtiAppBrowseShowRoute;
