import Video from 'appkit/libs/media/video';

var data, originalReturnTypes;

module('Unit: lib/media/video', {
  setup: function() {
    originalReturnTypes = Ember.get('ENV.RETURN_TYPES');
    data = {
      return_types: [
        {
          driver: "youtube",
          remote_id: "y_ZmM7zPLyI",
          url: "https://www.youtube.com/watch?v=y_ZmM7zPLyI&feature=youtube_gdata_player",
          text: "Why I Hate School But Love Education||Spoken Word",
          title: "Why I Hate School But Love Education||Spoken Word",
          return_type: "url"
        },
        {
          driver: "youtube",
          remote_id: "y_ZmM7zPLyI",
          url: "https://www.youtube.com/embed/y_ZmM7zPLyI?feature=oembed",
          text: "Why I Hate School But Love Education||Spoken Word",
          title: "Why I Hate School But Love Education||Spoken Word",
          width: 640,
          height: 360,
          return_type: "iframe"
        }
      ],
      kind: "video",
      id: "y_ZmM7zPLyI",
      title: "Why I Hate School But Love Education||Spoken Word",
      description: "The Latest Spoken Word Video from Suli Breaks. PURCHASE ON ITUNES: http://goo.gl/ZhqVl SUBSCRIBE: http://goo.gl/6mf0j TWITTER: http://www.twitter.com/sulibre...",
      thumbnail_url: "https://i.ytimg.com/vi/y_ZmM7zPLyI/default.jpg",
      url: "https://www.youtube.com/watch?v=y_ZmM7zPLyI&feature=youtube_gdata_player",
      embed_url: "https://www.youtube.com/embed/y_ZmM7zPLyI?feature=oembed",
      duration: 368,
      num_views: 4737346,
      num_likes: 115348,
      num_comments: 18928,
      created_date: "2012-12-02",
      username: "sulibreezy",
      width: 640,
      height: 360
    };
  },
  teardown: function() {
    Ember.set('ENV.RETURN_TYPES', originalReturnTypes);
  }
});

test('createFromData', function() {
  var video = Video.createFromData(data);
  equal(video.get('id'), 'y_ZmM7zPLyI');
  equal(video.get('title'), 'Why I Hate School But Love Education||Spoken Word');
  equal(video.get('description'), 'The Latest Spoken Word Video from Suli Breaks. PURCHASE ON ITUNES: http://goo.gl/ZhqVl SUBSCRIBE: http://goo.gl/6mf0j TWITTER: http://www.twitter.com/sulibre...');
  equal(video.get('thumbnailUrl'), 'https://i.ytimg.com/vi/y_ZmM7zPLyI/default.jpg');
  equal(video.get('url'), 'https://www.youtube.com/watch?v=y_ZmM7zPLyI&feature=youtube_gdata_player');
  equal(video.get('embedUrl'), 'https://www.youtube.com/embed/y_ZmM7zPLyI?feature=oembed');
  equal(video.get('duration'), 368);
  equal(video.get('numViews'), 4737346);
  equal(video.get('width'), 640);
  equal(video.get('height'), 360);
  equal(video.get('username'), 'sulibreezy');
  equal(video.get('numLikes'), 115348);
  equal(video.get('numComments'), 18928);
  equal(video.get('createdDate'), '2012-12-02');
  equal(video.get('mediaType'), 'video');
});

test('createFromData with returnTypes: url, iframe', function() {
  Ember.set('ENV.RETURN_TYPES', ['url', 'iframe']);
  var video = Video.createFromData(data);
  var returnTypes = video.get('returnTypes');
  equal(returnTypes.get('length'), 2);

  var iframe = returnTypes.findBy('returnType', 'iframe');
  equal(iframe.get('returnable'), true);
  equal(iframe.get('driver'), 'youtube');
  equal(iframe.get('remoteId'), 'y_ZmM7zPLyI');
  equal(iframe.get('returnType'), 'iframe');
  equal(iframe.get('url'), 'https://www.youtube.com/embed/y_ZmM7zPLyI?feature=oembed');
  equal(iframe.get('text'), 'Why I Hate School But Love Education||Spoken Word');
  equal(iframe.get('title'), 'Why I Hate School But Love Education||Spoken Word');
  equal(iframe.get('width'), 640);
  equal(iframe.get('height'), 360);

  var url = returnTypes.findBy('returnType', 'url');
  equal(url.get('returnable'), true);
  equal(url.get('driver'), 'youtube');
  equal(url.get('remoteId'), 'y_ZmM7zPLyI');
  equal(url.get('returnType'), 'url');
  equal(url.get('text'), 'Why I Hate School But Love Education||Spoken Word');
  equal(url.get('title'), 'Why I Hate School But Love Education||Spoken Word');
  equal(url.get('url'), 'https://www.youtube.com/watch?v=y_ZmM7zPLyI&feature=youtube_gdata_player');
});

test('createFromData with returnTypes: iframe', function() {
  Ember.set('ENV.RETURN_TYPES', ['iframe']);
  var video = Video.createFromData(data);
  var returnTypes = video.get('returnTypes');
  equal(returnTypes.get('length'), 2);
  var iframe = returnTypes.findBy('returnType', 'iframe');
  equal(iframe.get('returnable'), true);
  var url = returnTypes.findBy('returnType', 'url');
  equal(url.get('returnable'), false);
});

test('createFromData with returnTypes: url', function() {
  Ember.set('ENV.RETURN_TYPES', ['url']);
  var video = Video.createFromData(data);
  var returnTypes = video.get('returnTypes');
  equal(returnTypes.get('length'), 2);
  var iframe = returnTypes.findBy('returnType', 'iframe');
  equal(iframe.get('returnable'), false);
  var url = returnTypes.findBy('returnType', 'url');
  equal(url.get('returnable'), true);
});

test('createFromData with returnTypes: []', function() {
  Ember.set('ENV.RETURN_TYPES', []);
  var video = Video.createFromData(data);
  var returnTypes = video.get('returnTypes');
  equal(returnTypes.get('length'), 2);
  var iframe = returnTypes.findBy('returnType', 'iframe');
  equal(iframe.get('returnable'), false);
  var url = returnTypes.findBy('returnType', 'url');
  equal(url.get('returnable'), false);
});

test('createFromData with returnTypes: lti_launch_url', function() {
  Ember.set('ENV.RETURN_TYPES', ['lti_launch_url']);
  var video = Video.createFromData(data);
  var returnTypes = video.get('returnTypes');
  equal(returnTypes.get('length'), 2);
  var iframe = returnTypes.findBy('returnType', 'iframe');
  equal(iframe.get('returnable'), false);
  var ltiLaunchUrl = returnTypes.findBy('returnType', 'ltiLaunchUrl');
  equal(ltiLaunchUrl.get('returnable'), true);
});

test('embedHtml', function() {
  expect(0);
});