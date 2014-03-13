import Browse from 'appkit/libs/browse';

var fixtureRoot = _fixtures['browse-root'],
    fixtureMath = _fixtures['browse-math'],
    fixtureLast = _fixtures['browse-cc-3rd-adding-carrying'],
    browse;

module('Unit: libs/browse', {
  setup: function() {
    browse = Browse.create({ toolId: 'khan_academy' });
  },
  teardown: function() {}
});

test('currentFolderChain', function() {
  browse.set('folderChain', 'foo.bar.baz.bop');
  equal(browse.get('currentFolder'), 'bop');

  browse.set('folderChain', 'root');
  equal(browse.get('currentFolder'), 'root');
});

test('parentFolderChain', function() {
  browse.set('folderChain', 'foo.bar.baz.bop');
  equal(browse.get('parentFolderChain'), 'foo.bar.baz');

  browse.set('folderChain', 'root');
  equal(browse.get('parentFolderChain'), null);
});

test('parentFolder', function() {
  browse.set('folderChain', 'foo.bar.baz.bop');
  equal(browse.get('parentFolder'), 'bop');

  browse.set('folderChain', 'root');
  equal(browse.get('parentFolder'), null);
});

test('loadFolder with root folder', function() {
  var folder = 'root',
      parentFolderChain = '';

  ic.ajax.defineFixture('/api/v1/browse', {
    response: fixtureRoot,
    jqXHR: {},
    textStatus: 'success'
  });

  Ember.run(function() {
    stop();
    browse.loadFolder(parentFolderChain + '.' + folder).then(function(b) {
      equal(b.get('items').length, 0);
      equal(b.get('folders').length, Object.keys(fixtureRoot.driver_response.items).length);
      equal(b.get('folders.firstObject.title'), 'New and noteworthy');
      start();
    });
  });
});

test('loadFolder with sub folder', function() {
  var folder = 'math',
      parentFolderChain = 'root';

  ic.ajax.defineFixture('/api/v1/browse', {
    response: fixtureMath,
    jqXHR: {},
    textStatus: 'success'
  });

  Ember.run(function() {
    stop();
    browse.loadFolder(parentFolderChain + '.' + folder).then(function(b) {
      equal(b.get('items').length, 0);
      equal(b.get('folders').length, Object.keys(fixtureMath.driver_response.items).length);
      equal(b.get('folders.firstObject.title'), '3rd grade (U.S.)');
      equal(b.get('folders.firstObject.parentId'), 'root');
      start();
    });
  });
});

test('loadFolder with folder containing other media types', function() {
  var folder = 'cc-3rd-adding-carrying',
      parentFolderChain = 'root.match.cc-third-grade.cc-3rd-add-sub-topic';

  ic.ajax.defineFixture('/api/v1/browse', {
    response: fixtureLast,
    jqXHR: {},
    textStatus: 'success'
  });

  Ember.run(function() {
    stop();
    browse.loadFolder(parentFolderChain + '.' + folder).then(function(b) {
      console.log(browse);
      equal(b.get('folders').length, 0);
      equal(b.get('items').length, 4);
      equal(b.get('items.firstObject.title'), 'Base ten warmup');
      start();
    });
  });
});
