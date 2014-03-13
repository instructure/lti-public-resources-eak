import Media from 'appkit/libs/media';

var Folder = Media.extend({
  mediaType    : 'folder',
  id           : null,
  title        : null,
  description  : null,
  parentId     : null,
  folderChain  : null
});

Folder.reopenClass({
  createFromData: function(data) {
    var folder = Folder.create({
      id          : data.id,
      title       : data.title,
      description : data.description,
      parentId    : data.parent_id
    });
    return folder;
  }
});

export default Folder;
