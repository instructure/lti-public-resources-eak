import File from 'appkit/libs/return-types/file';

module('Unit: lib/return-types/file');

test('createFromData', function() {
  var data = {
    driver: "box",
    remote_id: "ABCDE",
    return_type: "file",
    url: "http://box.net/my-doc.xls",
    text: "my-doc.xls",
    content_type: "application/vnd.ms-excel",
    return_types: []
  };

  var file = File.createFromData(data);
  equal(file.get('driver'), 'box');
  equal(file.get('remoteId'), 'ABCDE');
  equal(file.get('returnType'), 'file');
  equal(file.get('url'), 'http://box.net/my-doc.xls');
  equal(file.get('fileName'), 'my-doc.xls');
  equal(file.get('contentType'), 'application/vnd.ms-excel');
});
