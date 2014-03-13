import Browse from 'appkit/libs/browse';

var LtiAppBrowseIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this._super.apply(this, arguments);
    var ltiApp = this.modelFor('lti-app');
    var browse = Browse.create({ toolId: ltiApp.get('toolId') });
    browse.loadFolder('root');
    this.transitionTo('lti-app.browse.show', browse);
  }
});

export default LtiAppBrowseIndexRoute;
