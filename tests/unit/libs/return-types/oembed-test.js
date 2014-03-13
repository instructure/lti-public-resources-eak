import Oembed from 'appkit/libs/return-types/oembed';

module('Unit: lib/return-types/oembed');

test('createFromData', function() {
  var data = {
    driver: 'youtube',
    remote_id: 'UUx10KOWIE',
    return_type: "oembed",
    url: 'http://www.youtube.com/watch?v=UUx10KOWIE',
    endpoint: 'http://www.youtube.com/oembed'
  };

  var oembed = Oembed.createFromData(data);
  equal(oembed.get('driver'), 'youtube');
  equal(oembed.get('remoteId'), 'UUx10KOWIE');
  equal(oembed.get('url'), 'http://www.youtube.com/watch?v=UUx10KOWIE');
  equal(oembed.get('endpoint'), 'http://www.youtube.com/oembed');
});
