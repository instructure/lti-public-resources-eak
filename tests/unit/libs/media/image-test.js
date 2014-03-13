import Image from 'appkit/libs/media/image';

var data, originalReturnTypes;

module('Unit: lib/media/image', {
  setup: function() {
    originalReturnTypes = Ember.get('ENV.RETURN_TYPES');
    data = {
      return_types: [
        {
          driver: "flickr",
          remote_id: 6404436475,
          url: "http://farm8.staticflickr.com/7003/6404436475_055dbf22f7_b.jpg",
          text: "The Rock Across The Bay",
          width: 500,
          height: 333,
          return_type: "image_url"
        }
      ],
      kind: "image_url",
      id: 6404436475,
      title: "The Rock Across The Bay",
      description: "View of Gibraltar from across the bay in La Linea, Andalusia, Spain",
      url: "http://www.flickr.com/photos/44292341@N03/6404436475/player/",
      width: 500,
      height: 333
    };
  },
  teardown: function() {
    Ember.set('ENV.RETURN_TYPES', originalReturnTypes);
  }
});

test('createFromData', function() {
  var image = Image.createFromData(data);
  equal(image.get('mediaType'), 'image');
  equal(image.get('id'), 6404436475);
  equal(image.get('title'), 'The Rock Across The Bay');
  equal(image.get('description'), 'View of Gibraltar from across the bay in La Linea, Andalusia, Spain');
  equal(image.get('width'), 500);
  equal(image.get('height'), 333);
});

test('createFromData with returnTypes: url', function() {
  Ember.set('ENV.RETURN_TYPES', ['url', 'iframe']);
  var image = Image.createFromData(data);
  var returnTypes = image.get('returnTypes');
  equal(returnTypes.get('length'), 1);

  var imageUrl = returnTypes.findBy('returnType', 'imageUrl');

  // TODO: This will cause issues possibly. Re-test when we have an image picker
  equal(imageUrl.get('returnable'), false);

  equal(imageUrl.get('driver'), 'flickr');
  equal(imageUrl.get('remoteId'), 6404436475);
  equal(imageUrl.get('returnType'), 'imageUrl');
  equal(imageUrl.get('title'), 'The Rock Across The Bay');
  equal(imageUrl.get('url'), 'http://farm8.staticflickr.com/7003/6404436475_055dbf22f7_b.jpg');
  equal(imageUrl.get('width'), 500);
  equal(imageUrl.get('height'), 333);
});

test('createFromData with returnTypes: []', function() {
  Ember.set('ENV.RETURN_TYPES', []);
  var image = Image.createFromData(data);
  var returnTypes = image.get('returnTypes');
  equal(returnTypes.get('length'), 1);

  var imageUrl = returnTypes.findBy('returnType', 'imageUrl');
  equal(imageUrl.get('returnable'), false);
});

test('createFromData with returnTypes: lti_launch_url', function() {
  Ember.set('ENV.RETURN_TYPES', ['lti_launch_url']);
  var image = Image.createFromData(data);
  var returnTypes = image.get('returnTypes');
  equal(returnTypes.get('length'), 1);

  var imageUrl = returnTypes.findBy('returnType', 'imageUrl');
  equal(imageUrl.get('returnable'), false);
});