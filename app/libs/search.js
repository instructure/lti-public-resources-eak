import ajax from 'appkit/utils/ajax';
import Video from 'appkit/libs/media/video';
import Image from 'appkit/libs/media/image';
import Quiz from 'appkit/libs/media/quiz';
import Folder from 'appkit/libs/media/folder';

// ArrayProxy which will contain Media objects.
var Search = Ember.ArrayProxy.extend({

  isLoaded      : true,
  nextCriteria  : null,
  loadingMore   : false,
  toolId        : null,
  searchText    : null,

  // Ensure that the defaults are set
  init: function() {
    this.set('content', []);
    this._super.apply(this, arguments);
    if (!this.get('searchText')) {
      this.set('searchText', '');
    }
    if (!this.get('searchResults')) {
      this.set('searchResults', Em.A([]));
    }
  },

  // Performs ajax request and returns parsed results
  performSearch: function() {
    var _this = this;
    this.set('isLoaded', false);
    this.clear();
    return this.performRequest().then(
      function(result) {
        return _this.parseResults(result);
      },
      function (err) {
        _this.set('isLoaded', true);
        return err;
      }
    );
  },

  // helper function to get post data attributes
  ajaxData: function () {
    return {
      tool_id: this.get('toolId'),
      query: this.get('searchText')
    };
  }.property('toolId', 'searchText'),

  // ic-ajax wrapper
  performRequest: function() {
    return ic.ajax.raw({
      type: 'GET',
      url: '/api/v1/search',
      data: this.get('ajaxData')
    });
  },

  // Parse the results from the ajax request and build the data
  parseResults: function(results) {
    var _this = this;
    var driverResponse = Ember.Object.create(results.response.driver_response);
    this.set('nextCriteria', driverResponse.get('next_criteria'));

    driverResponse.get('items').forEach(function(item) {
      var obj = null;
      switch (item.kind) {
        case 'video':
          obj = Video.createFromData(item);
          break;
        case 'folder':
          obj = Folder.createFromData(item);
          break;
        case 'image':
          obj = Image.createFromData(item);
          break;
        case 'quiz':
          obj = Quiz.createFromData(item);
          break;
      }
      if (obj) {
        _this.pushObject(obj);
      }
    });
    this.set('isLoaded', true);
    this.set('loadingMore', false);
    return this;
  },

  loadNextPage: function() {
    if (!Ember.isEmpty(this.get('nextCriteria'))) {
      var _this = this;
      this.set('loadingMore', true);

      return ic.ajax.raw({
        type: 'GET',
        url: '/api/v1/search',
        data: Ember.merge(this.get('nextCriteria'), { tool_id: this.get('toolId') })
      }).then(
        function(result) { // Success
          return _this.parseResults(result);
        },
        function(err) { // Failure
          _this.set('loadingMore', false);
          return err;
        }
      );
    }
  }
});

export default Search;
