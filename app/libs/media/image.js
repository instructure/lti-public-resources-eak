import Media from 'appkit/libs/media';

var Image = Media.extend({
  mediaType   : 'image',
  id          : null,
  title       : null,
  description : null,
  url         : null,
  width       : null,
  height      : null,

  embedHref: function() {
    var imageUrl = this.get('returnTypes').findProperty('returnType', 'imageUrl');
    return '<img src="' + imageUrl.get('url') + '" width="' + imageUrl.get('width') + '" height="' + imageUrl.get('height') + '" alt="' + imageUrl.get('title') + '"/>';
  }.property('returnTypes.@each')
});

Image.reopenClass({
  createFromData: function(data) {
    var image = Image.create({
      id: data.id,
      title: data.title,
      description: data.description,
      url: data.url,
      width: data.width,
      height: data.height
    });
    image.addReturnTypes(data.return_types);
    return image;
  }
});

export default Image;
