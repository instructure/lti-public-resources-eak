var App,
    fixtureRoot = _fixtures['browse-root'],
    fixtureEmpty = _fixtures['browse-empty'],
    fixtureNewAndNoteworthy = _fixtures['browse-new-and-noteworthy'];

module('Acceptance: lti-app/browse', {
  setup: function() {
    App = startApp();
    pushToStore(App, 'lti-app', {
      lti_apps: [
        {
          "id": "khan_academy",
          "name": "Khan Academy",
          "description": "Search for and embed Khan Academy lessons and exercise into course material. Khan Academy focuses on short lessons on math, science, etc. Uses the embedded player so students earn points for watching videos.",
          "tool_id": "khan_academy",
          "tool_type": "browse",
          "icon_path": "khan_academy_icon.png",
          "image_url": "khan_academy_banner.png"
        }
      ]
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('loads the root folders', function() {
  expect(2);

  ic.ajax.defineFixture('/api/v1/browse', {
    response: fixtureRoot,
    jqXHR: {},
    textStatus: 'success'
  });

  visit('/khan_academy');
  andThen(function() {
    equal(find('table.folder-table tr').length, Object.keys(fixtureRoot.driver_response.items).length);
    equal(find('table.folder-table tr:first td').text(), fixtureRoot.driver_response.items[0].title);
  });
});

test('shows empty folder message if folder has no contents', function() {
  expect(1);

  ic.ajax.defineFixture('/api/v1/browse', {
    response: fixtureEmpty,
    jqXHR: {},
    textStatus: 'success'
  });

  visit('/khan_academy');
  andThen(function() {
    equal(find('h5:contains("There are no folders or videos available in this folder")').length, 1);
  });
});

test('loads subfolder content when folder is clicked', function() {
  expect(5);

  ic.ajax.defineFixture('/api/v1/browse', {
    response: fixtureRoot,
    jqXHR: {},
    textStatus: 'success'
  });

  visit('/khan_academy');
  andThen(function() {
    equal(currentRouteName(App), 'lti-app.browse.show', 'lti-app route was loaded');
    equal(currentURL(App), '/khan_academy/browse/root');
  });

  ic.ajax.defineFixture('/api/v1/browse', {
    response: fixtureNewAndNoteworthy,
    jqXHR: {},
    textStatus: 'success'
  });

  click(find('table.folder-table tr:first td a'));
  andThen(function() {
    equal(currentURL(App), '/khan_academy/browse/root.new-and-noteworthy');
    equal(find('ul#browse-media-items > li').length, Object.keys(fixtureNewAndNoteworthy.driver_response.items).length);
    equal(find('ul#browse-media-items li:contains("' + fixtureNewAndNoteworthy.driver_response.items[0].title + '")').length, 1);
  });
});