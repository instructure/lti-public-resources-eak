import ajax from 'appkit/utils/ajax';
import Video from 'appkit/libs/media/video';
import Image from 'appkit/libs/media/image';
import Quiz from 'appkit/libs/media/quiz';
import Folder from 'appkit/libs/media/folder';

var Browse = Ember.Object.extend({
  toolId      : null,
  folders     : null,
  items       : null,
  isLoaded    : true,
  folderChain : null,

  init: function() {
    this._super.apply(this, arguments);
    this.set('folders', Em.A([]));
    this.set('items', Em.A([]));
  },

  currentFolder: function() {
    return this.get('folderChain').split('.').pop();
  }.property('folderChain'),

  parentFolderChain: function() {
    if (this.get('folderChain') === 'root') {
      return null;
    } else {
      return this.get('folderChain').split('.').slice(0, -1).join('.');
    }
  }.property('folderChain'),

  parentFolder: function() {
    if (this.get('folderChain') === 'root') {
      return null;
    } else {
      return this.get('folderChain').split('.').pop();
    }
  }.property('folderChain'),

  isEmptyResults: function() {
    return (Em.isEmpty(this.get('items')) && Em.isEmpty(this.get('folders')));
  }.property('items.@each', 'folders.@each'),

  loadFolder: function(folderChain) {
    var _this = this;

    this.set('folderChain', folderChain);

    this.set('isLoaded', false);
    return ajax({
      type: 'GET',
      url: '/api/v1/browse',
      dataType: 'json',
      data: {
        folder: this.get('currentFolder'),
        tool_id: this.get('toolId')
      }
    }).then(
      function(result) { // Success
       return  _this.parseResults(result);
      },
      function(err) { // Failure
        _this.set('isLoaded', true);
        Ember.debug('Error: ' + err);
        return err;
      }
    );
  },

  parseResults: function(result) {
    var _this = this,
        items = result.driver_response.items;

    items.forEach(function(item) {
      var obj;
      obj = null;
      switch (item.kind) {
        case 'folder':
          obj = Folder.createFromData(item);
          obj.set('folderChain', _this.get('folderChain') + '.' + item.id);
          _this.get('folders').pushObject(obj);
          break;
        case 'video':
          obj = Video.createFromData(item);
          obj.set('folderChain', _this.get('folderChain'));
          _this.get('items').pushObject(obj);
          break;
        case 'image':
          obj = Image.createFromData(item);
          obj.set('folderChain', _this.get('folderChain'));
          _this.get('items').pushObject(obj);
          break;
        case 'quiz':
          obj = Quiz.createFromData(item);
          obj.set('folderChain', _this.get('folderChain'));
          _this.get('items').pushObject(obj);
          break;
        default:
          Em.debug('UNKNOWN KIND: ' + item.kind);
      }
    });

    this.set('isLoaded', true);
    return this;
  }
});

export default Browse;