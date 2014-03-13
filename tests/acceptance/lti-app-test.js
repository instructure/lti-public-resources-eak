var App,
    server,
    fixtureRoot = _fixtures['browse-root'];

module('Acceptance: lti-app', {
  setup: function() {
    App = startApp();
    pushToStore(App, 'lti-app', {
      lti_apps: [{
        id: 'youtube',
        name: 'YouTube',
        tool_id: 'youtube',
        tool_type: 'search',
        description: 'lorem ipsum dolor',
        icon_path: 'youtube_icon.png',
        image_url: 'youtube_banner.png'
      },{
        id: 'khan_academy',
        name: 'Khan Academy',
        tool_id: 'khan_academy',
        tool_type: 'browse',
        description: 'lorem ipsum dolor',
        icon_path: 'khan_academy_icon.png',
        image_url: 'khan_academy_banner.png'
      }]
    });
    ic.ajax.defineFixture('/api/v1/browse', {
      response: fixtureRoot,
      jqXHR: {},
      textStatus: 'success'
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('redirect to search when toolType is search', function() {
  visit('/youtube');
  andThen(function() {
    equal(currentRouteName(App), 'lti-app.search.index', 'lti-app.search.index route was loaded');
  });
});

test('redirect to browse when toolType is browse', function() {
  expect(1);
  visit('/khan_academy');
  andThen(function() {
    equal(currentRouteName(App), 'lti-app.browse.show', 'lti-app.browse route was loaded');
  });
});
