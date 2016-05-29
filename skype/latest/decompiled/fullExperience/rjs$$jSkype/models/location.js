define("jSkype/models/location", [
  "require",
  "jcafe-property-model"
], function (e) {
  function n() {
    this.type = t.property({ readOnly: !0 });
    this.street = t.property({ readOnly: !0 });
    this.city = t.property({ readOnly: !0 });
    this.state = t.property({ readOnly: !0 });
    this.country = t.property({ readOnly: !0 });
    this.postalCode = t.property({ readOnly: !0 });
  }
  var t = e("jcafe-property-model");
  return n;
});
