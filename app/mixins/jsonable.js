var Jsonable = Ember.Mixin.create({
  getJson: function() {
    var v, key, ret;
    ret = [];
    for (key in this) {
      if (this.hasOwnProperty(key)) {
        v = this[key];
        if (v === 'toString') { continue; }
        if (Ember.typeOf(v) === 'function') { continue; }
        ret.push(key);
      }
    }
    return this.getProperties.apply(this, ret);
  }
});

export default Jsonable;
