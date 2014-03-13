/* global Spinner */
var IcSpinnerComponent = Ember.Component.extend({
  spinner   : undefined,
  lines     : 9,         // The number of lines to draw
  length    : 4,         // The length of each line
  width     : 3,         // The line thickness
  radius    : 6,         // The radius of the inner circle
  corners   : 1,         // Corner roundness (0..1)
  rotate    : 0,         // The rotation offset
  direction : 1,         // 1: clockwise, -1: counterclockwise
  color     : '#000',    // #rgb or #rrggbb or array of colors
  speed     : 1,         // Rounds per second
  trail     : 63,        // Afterglow percentage
  shadow    : false,     // Whether to render a shadow
  hwaccel   : false,     // Whether to use hardware acceleration
  className : 'spinner', // The CSS class to assign to the spinner
  zIndex    : 2e9,       // The z-index (defaults to 2000000000)
  top       : 'auto',    // Top position relative to parent in px
  left      : 'auto',    // Left position relative to parent in px

  showSpinner: function() {
    var target = this.get('element');
    this.spinner = new Spinner({
      lines     : this.get('lines'),
      length    : this.get('length'),
      width     : this.get('width'),
      radius    : this.get('radius'),
      corners   : this.get('corners'),
      rotate    : this.get('rotate'),
      direction : this.get('direction'),
      color     : this.get('color'),
      speed     : this.get('speed'),
      trail     : this.get('trail'),
      shadow    : this.get('shadow'),
      hwaccel   : this.get('hwaccel'),
      className : this.get('className'),
      zIndex    : this.get('zIndex'),
      top       : this.get('top'),
      left      : this.get('left')
    });
    this.spinner.spin(target);
  }.on('didInsertElement'),

  teardown: function() {
    if (this.spinner) {
      this.spinner.stop();
    }
  }.on('willDestroyElement')
});

export default IcSpinnerComponent;
