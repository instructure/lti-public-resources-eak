var attr = DS.attr;

var LtiApp = DS.Model.extend({
  name        : attr(),
  toolId      : attr(),
  toolType    : attr(),
  description : attr(),
  iconPath    : attr(),
  imageUrl    : attr()
});

export default LtiApp;
