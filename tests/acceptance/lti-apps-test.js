var App, server;

module('Acceptance: lti-apps', {
  setup: function(){
    App = startApp();
    server = fakeServer('GET', '/api/v1/lti_apps', { 
      lti_apps: [
        { id: 'youtube', name: 'YouTube' },
        { id: 'vimeo', name: 'Vimeo' },
        { id: 'schooltube', name: 'SchoolTube' },
        { id: 'khan_academy', name: 'Khan Academy' },
        { id: 'quizlet', name: 'Quizlet' },
      ] 
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.restore();
  }
});

test('lti-app renders list of available public resources', function() {
  expect(6);

  visit('/');
  
  andThen(function() {
    var list = find('ul li.list-item');
    equal(list.length, 5);
    ok(find('a[rel="YouTube"]'));
    ok(find('a[rel="Vimeo"]'));
    ok(find('a[rel="SchoolTube"]'));
    ok(find('a[rel="Khan Academy"]'));
    ok(find('a[rel="Quizlet"]'));
  });

  server.respond();
});

test('filters the results based when typing into the filter field', function() {
  expect(3);

  visit('/');
  fillIn('input.search', 'tube');

  andThen(function() {
    var list = find('ul li.list-item');
    equal(list.length, 2);
    ok(find('a[rel="YouTube"]'));
    ok(find('a[rel="SchoolTube"]'));
  });

  server.respond();
});

test('click lti app transitions to the lti-app route', function() {
  expect(2);

  visit('/');
  andThen(function() {
    equal(currentRouteName(App), 'lti-apps', 'lti-apps route was loaded');
    click('a[rel="YouTube"]');

    andThen(function() {
      equal(currentRouteName(App), 'lti-app.search.index', 'lti-app route was loaded');
    });
  });

  server.respond();
});
