var LiItemView = Ember.View.extend({
  tagName: 'li',
  classNames: 'list-item media',
  templateNameBinding: 'hbsName',

  hbsName: function() {
    var mediaType = this.get('item.mediaType');
    return 'views/li-' + mediaType;
  }.property('item.mediaType')
});

export default LiItemView;
