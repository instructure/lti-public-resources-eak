import ReturnType from 'appkit/libs/return-type';

var File = ReturnType.extend({
  returnType  : 'file',
  url         : null,
  fileName    : null,
  contentType : null,
  displayReturnType: 'File',

  embedCode: function() {
    this.get('url');
  }.property('url')
});

File.reopenClass({
  createFromData: function(data) {
    var file = File.create({
      driver: data.driver,
      remoteId: data.remote_id,
      url: data.url,
      fileName: data.text,
      contentType: data.content_type
    });
    return file;
  }
});

export default File;