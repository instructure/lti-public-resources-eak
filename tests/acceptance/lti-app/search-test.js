var App,
    fixture = _fixtures['search-page-1'],
    fixture2 = _fixtures['search-page-2'],
    fixture3 = _fixtures['search-page-3'],
    originalReturnTypes;

Ember.Test.registerAsyncHelper('performSearch', function(app, selector, context) {
  Ember.run(function() {
    ic.ajax.defineFixture('/api/v1/search', {
      response: fixture,
      jqXHR: {},
      textStatus: 'success'
    });

    visit('/youtube/search');
    fillIn('input#search', 'education');
    submitForm('form.form-search');
  });
});

module('Acceptance: lti-app/search', {
  setup: function() {
    originalReturnTypes = Ember.get('ENV.RETURN_TYPES');
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
      }]
    });
    ic.ajax.defineFixture('/api/embed', {
      response: {},
      jqXHR: {},
      textStatus: 'success'
    });
  },
  teardown: function() {
    Ember.set('ENV.RETURN_TYPES', originalReturnTypes);
    Ember.run(App, 'destroy');
  }
});

test('displays "Type in your search criteria above"', function() {
  expect(1);

  visit('/youtube/search');
  andThen(function() {
    ok(find('.youtube:contains("Type in your search criteria above")').length);
  });
});

test('perform search', function() {
  expect(4);

  Ember.run(function() {
    performSearch();
    equal(currentRouteName(App), 'lti-app.search.index');
    stop();
    andThen(function() {
      equal(currentRouteName(App), 'lti-app.search.results');
      equal(currentURL(App), '/youtube/search/results/education');
      equal(find('ul li.list-item').length, Object.keys(fixture.driver_response.items).length);
      start();
    });
  });
});

test('redirects to details view when clicking on image', function() {
  expect(3);

  Ember.run(function() {
    performSearch();
    equal(currentRouteName(App), 'lti-app.search.index');
    stop();
    andThen(function() {
      click('ul li.list-item:first a:first');
      andThen(function() {
        equal(currentRouteName(App), 'lti-app.search.details');
        equal(currentURL(App), '/youtube/search/details/' + fixture.driver_response.items[0].id);
        start();
      });
    });
  });
});

test('redirects to details view when clicking on title', function() {
  expect(3);

  Ember.run(function() {
    performSearch();
    equal(currentRouteName(App), 'lti-app.search.index');
    stop();
    andThen(function() {
      click('ul li.list-item:first h2 a');
      andThen(function() {
        equal(currentRouteName(App), 'lti-app.search.details');
        equal(currentURL(App), '/youtube/search/details/' + fixture.driver_response.items[0].id);
        start();
      });
    });
  });
});

test('clicking the embed button displays the popup', function() {
  expect(4);

  var rt = fixture.driver_response.items[0].return_types[1];

  var ltiAppController = App.__container__.lookup('controller:lti-app');
  var stub = sinon.stub(ltiAppController , 'triggerModal', function(returnType) {
    // This is where the modal popup occurs
    equal(returnType.get('driver'), rt.driver);
    equal(returnType.get('remoteId'), rt.remote_id);
    equal(returnType.get('returnType'), rt.return_type);
    equal(returnType.get('text'), rt.text);
  });

  Ember.run(function() {
    performSearch();
    stop();
    andThen(function() {
      click('button[rel="default-embed"]:first');
      start();
    });
  });
});

test('clicking the embed button in the dropdown displays the popup (with url/iframe as acceptable return types)', function() {
  expect(4);

  Ember.set('ENV.RETURN_TYPES', ['url', 'iframe']);

  var rt = fixture.driver_response.items[0].return_types[0];

  var ltiAppController = App.__container__.lookup('controller:lti-app');
  var stub = sinon.stub(ltiAppController , 'triggerModal', function(returnType) {
    // This is where the modal popup occurs
    equal(returnType.get('driver'), rt.driver);
    equal(returnType.get('remoteId'), rt.remote_id);
    equal(returnType.get('returnType'), rt.return_type);
    equal(returnType.get('text'), rt.text);
  });

  Ember.run(function() {
    performSearch();
    stop();
    andThen(function() {
      click('button.dropdown-toggle');
      click('.return-types:first ul.dropdown-menu li:first a');
      start();
    });
  });
});

test('clicking the embed button in the dropdown displays the popup (with lti_launch_url as acceptable return type)', function() {
  expect(4);

  Ember.set('ENV.RETURN_TYPES', ['lti_launch_url']);

  var rt = fixture.driver_response.items[0].return_types[0];

  var ltiAppController = App.__container__.lookup('controller:lti-app');
  var stub = sinon.stub(ltiAppController , 'triggerModal', function(returnType) {
    // This is where the modal popup occurs
    equal(returnType.get('driver'), rt.driver);
    equal(returnType.get('remoteId'), rt.remote_id);
    equal(returnType.get('returnType'), 'ltiLaunchUrl');
    equal(returnType.get('text'), rt.text);
  });

  Ember.run(function() {
    performSearch();
    stop();
    andThen(function() {
      click('button.dropdown-toggle');
      click('.return-types:first ul.dropdown-menu li:first a');
      start();
    });
  });
});

test('clicking "load more results" loads the next page', function() {
  expect(4);

  Ember.run(function() {
    performSearch();
    stop();
    andThen(function() {
      equal(currentRouteName(App), 'lti-app.search.results');
      equal(currentURL(App), '/youtube/search/results/education');
      equal(find('ul li.list-item').length, Object.keys(fixture.driver_response.items).length);

      // Load page 2 results on API call
      ic.ajax.defineFixture('/api/v1/search', {
        response: fixture2,
        jqXHR: {},
        textStatus: 'success'
      });

      click('a[rel="load-more"]');
      andThen(function() {
        equal(find('ul li.list-item').length, Object.keys(fixture.driver_response.items).length + Object.keys(fixture2.driver_response.items).length);
      });
      start();
    });
  });
});

test('"load more results" does not appear when there are no more additional results', function() {
  expect(6);

  Ember.run(function() {
    performSearch();
    stop();
    andThen(function() {
      equal(currentRouteName(App), 'lti-app.search.results');
      equal(currentURL(App), '/youtube/search/results/education');
      equal(find('ul li.list-item').length, Object.keys(fixture.driver_response.items).length);

      // Load page 2 results on API call
      ic.ajax.defineFixture('/api/v1/search', {
        response: fixture3,
        jqXHR: {},
        textStatus: 'success'
      });

      click('a[rel="load-more"]');
      andThen(function() {
        equal(find('ul li.list-item').length, Object.keys(fixture.driver_response.items).length + Object.keys(fixture2.driver_response.items).length);
        equal(find('a[rel="load-more"]').length, 0);
        equal(find('.load-more:contains("Found 50 results")').length, 1);
      });
      start();
    });
  });
});