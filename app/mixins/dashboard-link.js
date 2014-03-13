var DashboardLinkMixin = Ember.Mixin.create({
  showDashboard: function() {
    return Ember.isEmpty(Ember.ENV.TOOL_ID);
  }.property('Ember.ENV.TOOL_ID')
});

export default DashboardLinkMixin;
