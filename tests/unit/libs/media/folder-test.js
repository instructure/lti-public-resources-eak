import Folder from 'appkit/libs/media/folder';

module('Unit: lib/media/folder');

test('createFromData on root path', function() {
  var data = {
    "return_types": [],
    "kind": "folder",
    "id": "new-and-noteworthy",
    "title": "New and noteworthy",
    "parent_id": null
  };
  var folder = Folder.createFromData(data);
  equal(folder.get('mediaType'), 'folder');
  equal(folder.get('id'), 'new-and-noteworthy');
  equal(folder.get('title'), 'New and noteworthy');
  equal(folder.get('description'), null);
  equal(folder.get('parentId'), null);
});

test('createFromData with parent folder', function() {
  var data = {
    "return_types": [],
    "kind": "folder",
    "id": "cc-third-grade-multiplication-di",
    "title": "Concept of multiplication and division",
    "parent_id": "cc-third-grade-math"
  };
  var folder = Folder.createFromData(data);
  equal(folder.get('mediaType'), 'folder');
  equal(folder.get('id'), 'cc-third-grade-multiplication-di');
  equal(folder.get('title'), 'Concept of multiplication and division');
  equal(folder.get('description'), null);
  equal(folder.get('parentId'), 'cc-third-grade-math');
});
