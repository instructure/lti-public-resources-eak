import Jsonable from 'appkit/mixins/jsonable';
export default Ember.Object.extend(Jsonable, {
  driver: null,
  remoteId: null,

  returnable: function() {
    return Ember.ENV.RETURN_TYPES.contains(this.get('returnType').underscore());
  }.property('Ember.ENV.RETURN_TYPES')
});
