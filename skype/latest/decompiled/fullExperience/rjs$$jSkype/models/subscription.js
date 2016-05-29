define("jSkype/models/subscription", [
  "require",
  "jcafe-property-model",
  "jSkype/models/entitlement"
], function (e) {
  function r() {
    var e = this;
    n.call(this);
    e.type = t.property({ readOnly: !0 });
  }
  var t = e("jcafe-property-model"), n = e("jSkype/models/entitlement");
  return r.prototype = new n(), r.prototype.constructor = r, r;
});
