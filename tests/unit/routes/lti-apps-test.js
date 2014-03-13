import { test, moduleFor } from 'ember-qunit';
import LtiAppsRoute from 'appkit/routes/lti-apps';

moduleFor('route:lti-apps', 'Unit: routes/lti-apps');

test('it exists', function() {
  ok(this.subject() instanceof LtiAppsRoute);
});
