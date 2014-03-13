import ReturnType from 'appkit/libs/return-type';

var Oembed = ReturnType.extend({
  returnType : 'oembed',
  url        : null,
  endpoint   : null,
  displayReturnType: 'OEmbed'
});

Oembed.reopenClass({
  createFromData: function(data) {
    var oembed = Oembed.create({
      driver: data.driver,
      remoteId: data.remote_id,
      url: data.url,
      endpoint: data.endpoint
    });
    return oembed;
  }
});

export default Oembed;
