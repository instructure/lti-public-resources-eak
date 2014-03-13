import { test, moduleFor } from 'ember-qunit';
moduleFor('view:li-item', 'Unit: views/li-item');

test('hbsName', function() {
  expect(2);

  var video = Ember.Object.create({ mediaType: 'video' });
  var liItemView = this.subject({ item: video });
  equal(liItemView.get('hbsName'), 'views/li-video');

  var quiz = Ember.Object.create({ mediaType: 'quiz' });
  Ember.run(function() {
    liItemView.set('item', quiz);
    equal(liItemView.get('hbsName'), 'views/li-quiz');
  });
});