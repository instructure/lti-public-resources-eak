export default Ember.Handlebars.makeBoundHelper(function(str, len) {
  if (str.length > len) {
    return new Handlebars.SafeString(str.substring(0, len - 3) + '&#8230;');
  } else {
    return str;
  }
});
