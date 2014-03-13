import Media from 'appkit/libs/media';

var data, originalReturnTypes;

module('Unit: libs/media', {
  setup: function() {
    originalReturnTypes = Ember.get('ENV.RETURN_TYPES');
    data = [
      {
        driver: "box",
        remote_id: "ABCDE",
        return_type: "file",
        url: "http://box.net/my-doc.xls",
        text: "my-doc.xls",
        content_type: "application/vnd.ms-excel",
        return_types: []
      },{
        driver: "youtube",
        remote_id: "y_ZmM7zPLyI",
        return_type: "iframe",
        url: "https://www.youtube.com/embed/y_ZmM7zPLyI?feature=oembed",
        text: "Why I Hate School But Love Education||Spoken Word",
        title: "Why I Hate School But Love Education||Spoken Word",
        width: 640,
        height: 360
      },{
        driver: "flickr",
        remote_id: "26849514",
        return_type: "image_url",
        url: "http://www.flickr.com/photos/26849514@N06/12830415325/player/",
        title: "ABM (Another Blue Monday) / Dubai alive and kicking !",
        width: 500,
        height: 333
      },{
        driver: 'youtube',
        remote_id: 'UUx10KOWIE',
        return_type: "oembed",
        url: 'http://www.youtube.com/watch?v=UUx10KOWIE',
        endpoint: 'http://www.youtube.com/oembed'
      },{
        driver: "khan_academy",
        remote_id: "QI6x0KNxiCs",
        return_type: "url",
        text: "The idea of division",
        title: "The idea of division",
        url: "http://www.youtube.com/watch?v=QI6x0KNxiCs&feature=youtube_gdata_player"
      }
    ];
  },
  teardown: function() {
    Ember.set('ENV.RETURN_TYPES', originalReturnTypes);
  }
});

test('addReturnTypes with return types: url, image_url, iframe, oembed, file', function() {
  Ember.set('ENV.RETURN_TYPES', ['url', 'image_url', 'iframe', 'oembed', 'file']);
  var media = Media.create();
  media.addReturnTypes(data);
  equal(media.get('returnTypes.length'), 5);
  equal(media.get('returnableReturnTypes.length'), 5);
  equal(media.get('defaultReturnType.returnType'), 'iframe');
});

test('addReturnTypes with return types: url, iframe', function() {
  Ember.set('ENV.RETURN_TYPES', ['url', 'iframe']);
  var media = Media.create();
  media.addReturnTypes(data);
  equal(media.get('returnTypes.length'), 5);
  equal(media.get('returnableReturnTypes.length'), 2);
  equal(media.get('defaultReturnType.returnType'), 'iframe');
});

test('addReturnTypes with return types: image_url', function() {
  Ember.set('ENV.RETURN_TYPES', ['image_url']);
  var media = Media.create();
  media.addReturnTypes(data);
  equal(media.get('returnTypes.length'), 5);
  equal(media.get('returnableReturnTypes.length'), 1);
  equal(media.get('defaultReturnType.returnType'), 'imageUrl');
});

test('addReturnTypes with return types: lti_launch_url', function() {
  Ember.set('ENV.RETURN_TYPES', ['lti_launch_url']);
  var media = Media.create();
  media.addReturnTypes(data);
  equal(media.get('returnTypes.length'), 5);
  equal(media.get('returnableReturnTypes.length'), 1);
  equal(media.get('defaultReturnType.returnType'), 'ltiLaunchUrl');
});
