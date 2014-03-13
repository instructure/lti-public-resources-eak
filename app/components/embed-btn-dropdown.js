var EmbedBtnDropdownComponent = Ember.Component.extend({
  classNames: 'return-types',

  actions: {
    embedItem: function(returnType) {
      this.sendAction('action', returnType);
    }
  }
});

export default EmbedBtnDropdownComponent;
