var LtiAppController = Ember.ObjectController.extend({
  returnType: null,

  triggerModal: function(returnType) {
    this.set('returnType', returnType);
    Ember.$('#embed-modal').modal('show');
  }
});

export default LtiAppController;
