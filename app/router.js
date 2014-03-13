var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('lti-apps', { path: '/' });
  this.resource('lti-app', { path: '/:toolId' }, function() {
    this.resource('lti-app.browse', { path: '/browse' }, function() {
      this.route('show', { path: '/:folderChain' });
      this.route('details', { path: '/details/:id' });
    });
    this.resource('lti-app.search', { path: '/search' }, function() {
      this.route('results', { path: '/results/:searchText' });
      this.route('details', { path: '/details/:id' });
    });
  });
});

export default Router;
