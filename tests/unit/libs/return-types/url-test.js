import URL from 'appkit/libs/return-types/url';

module('Unit: lib/return-types/url');

test('createFromData', function() {
  var data = {
    driver: "khan_academy",
    remote_id: "QI6x0KNxiCs",
    return_type: "url",
    text: "The idea of division",
    title: "The idea of division",
    url: "http://www.youtube.com/watch?v=QI6x0KNxiCs&feature=youtube_gdata_player"
  };

  var url = URL.createFromData(data);
  equal(url.get('driver'), 'khan_academy');
  equal(url.get('remoteId'), 'QI6x0KNxiCs');
  equal(url.get('returnType'), 'url');
  equal(url.get('text'), 'The idea of division');
  equal(url.get('title'), 'The idea of division');
  equal(url.get('url'), 'http://www.youtube.com/watch?v=QI6x0KNxiCs&feature=youtube_gdata_player');
});
