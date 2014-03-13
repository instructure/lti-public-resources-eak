import ReturnType from 'appkit/libs/return-type';

var URL = ReturnType.extend({
  returnType : 'url',
  url        : null,
  text       : null,
  title      : null,
  target     : null,
  displayReturnType: 'URL'
});

URL.reopenClass({
  createFromData: function(data) {
    var url = URL.create({
      driver: data.driver,
      remoteId: data.remote_id,
      url: data.url,
      text: data.text,
      title: data.title,
      target: data.target
    });
    return url;
  }
});

export default URL;
