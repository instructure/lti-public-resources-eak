import ReturnType from 'appkit/libs/return-type';

var LtiLaunchUrl = ReturnType.extend({
  returnType : 'ltiLaunchUrl',
  url        : null,
  text       : null,
  title      : null,
  target     : null,
  displayReturnType: 'Embed'
});

LtiLaunchUrl.reopenClass({
  createFromData: function(data) {
    var ltiLaunchUrl = LtiLaunchUrl.create({
      driver: data.driver,
      remoteId: data.remote_id,
      url: data.url,
      text: data.text,
      title: data.title,
      target: data.target
    });
    return ltiLaunchUrl;
  }
});

export default LtiLaunchUrl;
