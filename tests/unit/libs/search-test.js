import Search from 'appkit/libs/search';

var fixture  = _fixtures['search-page-1'],
    fixture2 = _fixtures['search-page-2'];

module('Unit: libs/search', {
  setup: function() {},
  teardown: function() {}
});

test('ajaxData', function() {
  var search = Search.create();
  var ad = search.get('ajaxData');
  equal(ad.tool_id, null);
  equal(ad.query, '');
  search.setProperties({
    toolId: 'youtube',
    searchText: 'education'
  });
  ad = search.get('ajaxData');
  equal(ad.tool_id, 'youtube');
  equal(ad.query, 'education');
});

test('performSearch should fetch and parse results', function() {
  expect(9);

  ic.ajax.defineFixture('/api/v1/search', {
    response: fixture,
    jqXHR: {},
    textStatus: 'success'
  });


  Ember.run(function() {
    var search = Search.create({ toolId: 'youtube', searchText: 'education' });
    equal(search.get('isLoaded'), true);
    stop();
    search.performSearch().then(function(result) {
      ok(result);
      equal(result.get('nextCriteria.query'), 'education');
      equal(result.get('nextCriteria.page'), 26);
      equal(result.get('nextCriteria.per_page'), 25);
      equal(result.get('content.length'), Object.keys(fixture.driver_response.items).length);
      var media = result.get('firstObject');
      var item = fixture.driver_response.items[0];
      equal(media.get('title'), item.title);
      equal(media.get('returnTypes.length'), 2);
      equal(search.get('isLoaded'), true);

      start();
    });
  });
});

test('loadNextPage loads the next search criteria results', function() {
  expect(5);

  ic.ajax.defineFixture('/api/v1/search', {
    response: fixture,
    jqXHR: {},
    textStatus: 'success'
  });

  Ember.run(function() {
    var search = Search.create({ toolId: 'youtube', searchText: 'education' });
    stop();
    search.performSearch().then(function(result) {
      ok(result);
      equal(result.get('content.length'), Object.keys(fixture.driver_response.items).length);
      equal(result.get('nextCriteria.page'), 26);

      ic.ajax.defineFixture('/api/v1/search', {
        response: fixture2,
        jqXHR: {},
        textStatus: 'success'
      });

      search.loadNextPage().then(function(result) {
        equal(result.get('content.length'), Object.keys(fixture.driver_response.items).length + Object.keys(fixture2.driver_response.items).length);
        equal(result.get('nextCriteria.page'), 51);
        start();
      });

    });
  });

});