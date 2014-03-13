import ReturnType from 'appkit/libs/return-type';

var ImageUrl = ReturnType.extend({
  returnType : 'imageUrl',
  url        : null,
  title      : null,
  width      : null,
  height     : null,
  displayReturnType: 'Image'
});

ImageUrl.reopenClass({
  createFromData: function(data) {
    var imageUrl = ImageUrl.create({
      driver: data.driver,
      remoteId: data.remote_id,
      url: data.url,
      title: data.text,
      width: data.width,
      height: data.height
    });
    return imageUrl;
  }
});

export default ImageUrl;