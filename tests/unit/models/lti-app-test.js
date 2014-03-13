import { test, moduleForModel } from 'ember-qunit';
import LtiApp from 'appkit/models/lti-app';

moduleForModel('lti-app', 'Unit: models/lti-app');

test('LtiApp is a valid ember-data Model', function () {
  var ltiApp = this.subject({
    toolId: 'vimeo',
    name: 'Vimeo',
    toolType: 'search',
    imageUrl: 'vimeo_icon.png',
    description: 'Vimeo is a video sharing website.'
  });

  ok(ltiApp, 'ltiApp exists');
  ok(ltiApp instanceof DS.Model, 'ltiApp is an instance of DS.Model');
  ok(ltiApp instanceof LtiApp, 'ltiApp is an instance of LtiApp');
});
