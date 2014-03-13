import Jsonable from 'appkit/mixins/jsonable';
import File from 'appkit/libs/return-types/file';
import Iframe from 'appkit/libs/return-types/iframe';
import ImageUrl from 'appkit/libs/return-types/image-url';
import LtiLaunchUrl from 'appkit/libs/return-types/lti-launch-url';
import Oembed from 'appkit/libs/return-types/oembed';
import URL from 'appkit/libs/return-types/url';

export default Ember.Object.extend(Jsonable, {
  returnTypes: null,
  defaultReturnType: null,

  init: function() {
    this._super.apply(this, arguments);
    this.set('returnTypes', Em.A([]));
  },

  addReturnTypes: function(returnTypes) {
    var _this = this;

    returnTypes.forEach(function(rt) {
      switch(rt.return_type) {
        case 'file':
          var file = File.createFromData(rt);
          _this.get('returnTypes').pushObject(file);
          break;
        case 'iframe':
          var iframe = Iframe.createFromData(rt);
          _this.get('returnTypes').pushObject(iframe);
          break;
        case 'image_url':
          var imageUrl = ImageUrl.createFromData(rt);
          _this.get('returnTypes').pushObject(imageUrl);
          break;
        case 'oembed':
          var oembed = Oembed.createFromData(rt);
          _this.get('returnTypes').pushObject(oembed);
          break;
        case 'url':
          var url = URL.createFromData(rt);
          if (Ember.get('ENV.RETURN_TYPES').contains('lti_launch_url')) {
            url = LtiLaunchUrl.createFromData(rt);
          }
          _this.get('returnTypes').pushObject(url);
          break;
      }
    });
    this.updateDefaultReturnType();
  },

  returnableReturnTypes: function() {
    var returnables = this.get('returnTypes').filterBy('returnable', true);
    if (returnables.length > 0) {
      return returnables;
    } else {
      return this.get('returnTypes');
    }
  }.property('returnTypes'),

  updateDefaultReturnType: function() {
    if (Ember.isEmpty(this.get('defaultReturnType'))) {
      // Make the default iframe if available
      var rt = this.get('returnableReturnTypes').findBy('returnType', 'iframe');
      if (rt) {
        this.set('defaultReturnType', rt);
      } else {
        this.set('defaultReturnType', this.get('returnableReturnTypes.firstObject'));
      }
    }
  }
});
