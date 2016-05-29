define("jSkype/models/phoneNumber", [
  "require",
  "jcafe-property-model"
], function (e) {
  function n() {
    this.type = t.property({ readOnly: !0 });
    this.telUri = t.property({ readOnly: !0 });
    this.displayString = t.property({ readOnly: !0 });
  }
  var t = e("jcafe-property-model");
  return n;
});
