define("jSkype/models/entitlement", [
  "require",
  "jcafe-property-model"
], function (e) {
  function n() {
    var e = this;
    e.name = t.property({ readOnly: !0 });
    e.active = t.property({ readOnly: !0 });
  }
  var t = e("jcafe-property-model");
  return n;
});
