import Media from 'appkit/libs/media';

var Quiz = Media.extend({
  mediaType    : 'quiz',
  id           : null,
  title        : null,
  description  : null,
  thumbnailUrl : null,
  url          : null,
  termCount    : null,
  createdDate  : null,
  hasImages    : null,
  subjects     : null,

  init: function() {
    this._super.apply(this, arguments);
    return this.set('subjects', Em.A([]));
  },

  embedHref: function() {
    var iframe = this.get('returnTypes').findProperty('returnType', 'iframe');
    return '<iframe src="' + iframe.url + '" width="100%" height="350" title="' + iframe.title + '" allowfullscreen="allowfullscreen" frameborder="0"></iframe>';
  }.property('returnTypes.@each')
});

Quiz.reopenClass({
  createFromData: function(data) {
    var quiz,
        _this = this;
    quiz = Quiz.create({
      id           : data.id,
      title        : data.title,
      description  : data.description,
      thumbnailUrl : data.thumbnail_url,
      url          : data.url,
      termCount    : data.term_count,
      createdDate  : data.created_date,
      hasImages    : data.has_images
    });
    data.subjects.forEach(function(subject) {
      quiz.get('subjects').pushObject(subject);
    });
    quiz.addReturnTypes(data.return_types);
    return quiz;
  }
});

export default Quiz;
