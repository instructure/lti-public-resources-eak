export default Ember.Handlebars.makeBoundHelper(function(time) {
  var hours = Math.floor(time / 3600);
  time -= hours * 3600;

  var minutes = Math.floor(time / 60);
  time -= minutes * 60;

  var seconds = parseInt(time % 60, 10);

  if (hours) {
    return (hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds));
  } else {
    return ((minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds));
  }
});
