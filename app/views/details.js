var DetailsView = Ember.View.extend({
  templateNameBinding: 'hbsName',

  hbsName: function() {
    var mediaType = this.get('item.mediaType');
    return 'views/details-' + mediaType;
  }.property('item.mediaType')
});

export default DetailsView;
