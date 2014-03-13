import LtiLaunchUrl from 'appkit/libs/return-types/lti-launch-url';

module('Unit: lib/return-types/lti-launch-url');

test('createFromData', function() {
  var data = {
    driver: "khan_academy",
    remote_id: "QI6x0KNxiCs",
    return_type: "url",
    text: "The idea of division",
    title: "The idea of division",
    url: "http://www.youtube.com/watch?v=QI6x0KNxiCs&feature=youtube_gdata_player"
  };

  var ltiLaunchUrl = LtiLaunchUrl.createFromData(data);
  equal(ltiLaunchUrl.get('driver'), 'khan_academy');
  equal(ltiLaunchUrl.get('remoteId'), 'QI6x0KNxiCs');
  equal(ltiLaunchUrl.get('returnType'), 'ltiLaunchUrl');
  equal(ltiLaunchUrl.get('text'), 'The idea of division');
  equal(ltiLaunchUrl.get('title'), 'The idea of division');
  equal(ltiLaunchUrl.get('url'), 'http://www.youtube.com/watch?v=QI6x0KNxiCs&feature=youtube_gdata_player');
});
