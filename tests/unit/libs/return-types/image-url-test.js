import ImageUrl from 'appkit/libs/return-types/image-url';

module('Unit: lib/return-types/image-url');

test('createFromData', function() {
  var data = {
    driver: "flickr",
    remote_id: "26849514",
    return_type: "image_url",
    url: "http://www.flickr.com/photos/26849514@N06/12830415325/player/",
    text: "ABM (Another Blue Monday) / Dubai alive and kicking !",
    width: 500,
    height: 333
  };

  var imageUrl = ImageUrl.createFromData(data);
  equal(imageUrl.get('driver'), 'flickr');
  equal(imageUrl.get('remoteId'), '26849514');
  equal(imageUrl.get('returnType'), 'imageUrl');
  equal(imageUrl.get('url'), 'http://www.flickr.com/photos/26849514@N06/12830415325/player/');
  equal(imageUrl.get('title'), 'ABM (Another Blue Monday) / Dubai alive and kicking !');
  equal(imageUrl.get('width'), 500);
  equal(imageUrl.get('height'), 333);
});
