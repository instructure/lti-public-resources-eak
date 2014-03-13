var LtiAppsController = Ember.ArrayController.extend({
  sortProperties: ['name'],
  sortAscending: true,
  searchText: null,

  filteredApps: function() {
    var searchText = this.get('searchText');
    if (Em.isEmpty(searchText)) {
      return this.get('content').sortBy('name');
    } else {
      return this.get('content').filter(function(item) {
        var name = item.get('name').toLowerCase();
        return name.match(searchText.toLowerCase());
      }).sortBy('name');
    }
  }.property('searchText')

});


export default LtiAppsController;
