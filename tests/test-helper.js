document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

Ember.testing = true;

var resolver = require('appkit/tests/helpers/resolver')['default'];
require('ember-qunit').setResolver(resolver);

window.startApp          = require('appkit/tests/helpers/start-app')['default'];
window.isolatedContainer = require('ember-qunit/isolated-container')['default'];
window.fakeServer        = require('appkit/tests/helpers/fake-server')['default'];

function exists(selector) {
  return !!find(selector).length;
}

function getAssertionMessage(actual, expected, message) {
  return message || QUnit.jsDump.parse(expected) + " expected but was " + QUnit.jsDump.parse(actual);
}

function equal(actual, expected, message) {
  message = getAssertionMessage(actual, expected, message);
  QUnit.equal.call(this, actual, expected, message);
}

function strictEqual(actual, expected, message) {
  message = getAssertionMessage(actual, expected, message);
  QUnit.strictEqual.call(this, actual, expected, message);
}

function currentRouteName(app){
  var appController = app.__container__.lookup('controller:application');
  return appController.get('currentRouteName');
}

function currentPath(app){
  var appController = app.__container__.lookup('controller:application');
  return appController.get('currentPath');
}

function currentURL(app){
  var router = app.__container__.lookup('router:main');
  return router.get('location').getURL();
}

function pushToStore(app, modelName, payload) {
  var myStore = app.__container__.lookup('store:main');
  Ember.run(function() {
    myStore.pushPayload(modelName, payload);
  });
}

Ember.Test.registerAsyncHelper('submitForm',
  function(app, selector, context) {
    var $el = findWithAssert(selector, context);
    Ember.run(function() {
      $el.submit();
    });
  }
);

window.exists = exists;
window.equal = equal;
window.strictEqual = strictEqual;

window.SEARCH_FIXTURE = {
  "driver_response": {
    "criteria": {
      "query": "education",
      "page": 1,
      "content_filter": "none",
      "sort": "relevance"
    },
    "next_criteria": {
      "query": "education",
      "page": 26,
      "per_page": 25
    },
    "total_items": 1000000,
    "items": [
      {
        "return_types": [
          {
            "driver": "youtube",
            "remote_id": "y_ZmM7zPLyI",
            "url": "https://www.youtube.com/watch?v=y_ZmM7zPLyI&feature=youtube_gdata_player",
            "text": "Why I Hate School But Love Education||Spoken Word",
            "title": "Why I Hate School But Love Education||Spoken Word",
            "return_type": "url"
          },
          {
            "driver": "youtube",
            "remote_id": "y_ZmM7zPLyI",
            "url": "https://www.youtube.com/embed/y_ZmM7zPLyI?feature=oembed",
            "text": "Why I Hate School But Love Education||Spoken Word",
            "title": "Why I Hate School But Love Education||Spoken Word",
            "width": 640,
            "height": 360,
            "return_type": "iframe"
          }
        ],
        "kind": "video",
        "id": "y_ZmM7zPLyI",
        "title": "Why I Hate School But Love Education||Spoken Word",
        "description": "The Latest Spoken Word Video from Suli Breaks. PURCHASE ON ITUNES: http://goo.gl/ZhqVl SUBSCRIBE: http://goo.gl/6mf0j TWITTER: http://www.twitter.com/sulibre...",
        "thumbnail_url": "https://i.ytimg.com/vi/y_ZmM7zPLyI/default.jpg",
        "url": "https://www.youtube.com/watch?v=y_ZmM7zPLyI&feature=youtube_gdata_player",
        "embed_url": "https://www.youtube.com/embed/y_ZmM7zPLyI?feature=oembed",
        "duration": 368,
        "num_views": 4737346,
        "num_likes": 115348,
        "num_comments": 18928,
        "created_date": "2012-12-02",
        "username": "sulibreezy",
        "width": 640,
        "height": 360
      },
      {
        "return_types": [
          {
            "driver": "youtube",
            "remote_id": "zDZFcDGpL4U",
            "url": "https://www.youtube.com/watch?v=zDZFcDGpL4U&feature=youtube_gdata_player",
            "text": "RSA Animate - Changing Education Paradigms",
            "title": "RSA Animate - Changing Education Paradigms",
            "return_type": "url"
          },
          {
            "driver": "youtube",
            "remote_id": "zDZFcDGpL4U",
            "url": "https://www.youtube.com/embed/zDZFcDGpL4U?feature=oembed",
            "text": "RSA Animate - Changing Education Paradigms",
            "title": "RSA Animate - Changing Education Paradigms",
            "width": 640,
            "height": 360,
            "return_type": "iframe"
          }
        ],
        "kind": "video",
        "id": "zDZFcDGpL4U",
        "title": "RSA Animate - Changing Education Paradigms",
        "description": "This RSA Animate was adapted from a talk given at the RSA by Sir Ken Robinson, world-renowned education and creativity expert and recipient of the RSA's Benj...",
        "thumbnail_url": "https://i.ytimg.com/vi/zDZFcDGpL4U/default.jpg",
        "url": "https://www.youtube.com/watch?v=zDZFcDGpL4U&feature=youtube_gdata_player",
        "embed_url": "https://www.youtube.com/embed/zDZFcDGpL4U?feature=oembed",
        "duration": 701,
        "num_views": 11378484,
        "num_likes": 85037,
        "num_comments": 12935,
        "created_date": "2010-10-14",
        "username": "The RSA",
        "width": 640,
        "height": 360
      },
      {
        "return_types": [
          {
            "driver": "youtube",
            "remote_id": "46La-hV_PLs",
            "url": "https://www.youtube.com/watch?v=46La-hV_PLs&feature=youtube_gdata_player",
            "text": "This Is What Happens When A Kid Leaves Traditional Education",
            "title": "This Is What Happens When A Kid Leaves Traditional Education",
            "return_type": "url"
          },
          {
            "driver": "youtube",
            "remote_id": "46La-hV_PLs",
            "url": "https://www.youtube.com/embed/46La-hV_PLs?feature=oembed",
            "text": "This Is What Happens When A Kid Leaves Traditional Education",
            "title": "This Is What Happens When A Kid Leaves Traditional Education",
            "width": 640,
            "height": 360,
            "return_type": "iframe"
          }
        ],
        "kind": "video",
        "id": "46La-hV_PLs",
        "title": "This Is What Happens When A Kid Leaves Traditional Education",
        "description": "Please subscribe us and Fallow at https://www.facebook.com/realwomanrealman/ Logan Laplante is a 13 year-old boy who was taken out of the education system to...",
        "thumbnail_url": "https://i.ytimg.com/vi/46La-hV_PLs/default.jpg",
        "url": "https://www.youtube.com/watch?v=46La-hV_PLs&feature=youtube_gdata_player",
        "embed_url": "https://www.youtube.com/embed/46La-hV_PLs?feature=oembed",
        "duration": 674,
        "num_views": 31101,
        "num_likes": 353,
        "num_comments": 51,
        "created_date": "2014-01-09",
        "username": "Gedas kirsch",
        "width": 640,
        "height": 360
      },
      {
        "return_types": [
          {
            "driver": "youtube",
            "remote_id": "wX78iKhInsc",
            "url": "https://www.youtube.com/watch?v=wX78iKhInsc&feature=youtube_gdata_player",
            "text": "Ken Robinson: How to escape education's death valley",
            "title": "Ken Robinson: How to escape education's death valley",
            "return_type": "url"
          },
          {
            "driver": "youtube",
            "remote_id": "wX78iKhInsc",
            "url": "https://www.youtube.com/embed/wX78iKhInsc?feature=oembed",
            "text": "Ken Robinson: How to escape education's death valley",
            "title": "Ken Robinson: How to escape education's death valley",
            "width": 640,
            "height": 360,
            "return_type": "iframe"
          }
        ],
        "kind": "video",
        "id": "wX78iKhInsc",
        "title": "Ken Robinson: How to escape education's death valley",
        "description": "Sir Ken Robinson outlines 3 principles crucial for the human mind to flourish -- and how current education culture works against them. In a funny, stirring t...",
        "thumbnail_url": "https://i.ytimg.com/vi/wX78iKhInsc/default.jpg",
        "url": "https://www.youtube.com/watch?v=wX78iKhInsc&feature=youtube_gdata_player",
        "embed_url": "https://www.youtube.com/embed/wX78iKhInsc?feature=oembed",
        "duration": 1152,
        "num_views": 556421,
        "num_likes": 11060,
        "num_comments": 1554,
        "created_date": "2013-05-10",
        "username": "TED",
        "width": 640,
        "height": 360
      },
      {
        "return_types": [
          {
            "driver": "youtube",
            "remote_id": "hAIJGogWrgM",
            "url": "https://www.youtube.com/watch?v=hAIJGogWrgM&feature=youtube_gdata_player",
            "text": "School - The Story of American Public Education",
            "title": "School - The Story of American Public Education",
            "return_type": "url"
          },
          {
            "driver": "youtube",
            "remote_id": "hAIJGogWrgM",
            "url": "https://www.youtube.com/embed/hAIJGogWrgM?feature=oembed",
            "text": "School - The Story of American Public Education",
            "title": "School - The Story of American Public Education",
            "width": 640,
            "height": 360,
            "return_type": "iframe"
          }
        ],
        "kind": "video",
        "id": "hAIJGogWrgM",
        "title": "School - The Story of American Public Education",
        "description": "",
        "thumbnail_url": "https://i.ytimg.com/vi/hAIJGogWrgM/default.jpg",
        "url": "https://www.youtube.com/watch?v=hAIJGogWrgM&feature=youtube_gdata_player",
        "embed_url": "https://www.youtube.com/embed/hAIJGogWrgM?feature=oembed",
        "duration": 3362,
        "num_views": 1945,
        "num_likes": 6,
        "num_comments": 6,
        "created_date": "2013-12-12",
        "username": "weldin1960",
        "width": 640,
        "height": 360
      }
    ]
  }
};