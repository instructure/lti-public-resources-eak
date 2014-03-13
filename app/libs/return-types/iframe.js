import ReturnType from 'appkit/libs/return-type';

var Iframe = ReturnType.extend({
  returnType : 'iframe',
  url        : null,
  text       : null,
  title      : null,
  width      : null,
  height     : null,
  displayReturnType: 'Iframe',

  embedCode: function() {
    return '<iframe src="' + this.get('url') + '" width="' + this.get('width') + '" height="' + this.get('height') + '" title="' + this.get('title') + '" frameborder="0" allowfullscreen></iframe>';
  }.property('url', 'title', 'width', 'height')
});

Iframe.reopenClass({
  createFromData: function(data) {
    var iframe = Iframe.create({
      driver: data.driver,
      remoteId: data.remote_id,
      url: data.url,
      text: data.text,
      title: data.title,
      width: data.width,
      height: data.height
    });
    return iframe;
  }
});

export default Iframe;