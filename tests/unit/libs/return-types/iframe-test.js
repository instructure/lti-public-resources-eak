import Iframe from 'appkit/libs/return-types/iframe';

var data;

module('Unit: lib/return-types/iframe', {
  setup: function() {
    data = {
      driver: "youtube",
      remote_id: "y_ZmM7zPLyI",
      return_type: "iframe",
      url: "https://www.youtube.com/embed/y_ZmM7zPLyI?feature=oembed",
      text: "Why I Hate School But Love Education||Spoken Word",
      title: "Why I Hate School But Love Education||Spoken Word",
      width: 640,
      height: 360
    };
  }
});

test('createFromData', function() {
  var iframe = Iframe.createFromData(data);
  equal(iframe.get('driver'), 'youtube');
  equal(iframe.get('remoteId'), 'y_ZmM7zPLyI');
  equal(iframe.get('returnType'), 'iframe');
  equal(iframe.get('url'), 'https://www.youtube.com/embed/y_ZmM7zPLyI?feature=oembed');
  equal(iframe.get('text'), 'Why I Hate School But Love Education||Spoken Word');
  equal(iframe.get('title'), 'Why I Hate School But Love Education||Spoken Word');
  equal(iframe.get('width'), 640);
  equal(iframe.get('height'), 360);
});

test('embedCode', function() {
  var iframe = Iframe.createFromData(data);
  equal(
      iframe.get('embedCode'),
      '<iframe src="https://www.youtube.com/embed/y_ZmM7zPLyI?feature=oembed" width="640" height="360" title="Why I Hate School But Love Education||Spoken Word" frameborder="0" allowfullscreen></iframe>'
  );
});
