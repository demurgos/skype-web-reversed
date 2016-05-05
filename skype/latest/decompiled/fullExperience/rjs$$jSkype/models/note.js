define("jSkype/models/note", [
  "require",
  "jcafe-property-model"
], function (e) {
  function n() {
    this.type = t.property({ readOnly: !0 }), this.text = t.property({ readOnly: !0 });
  }
  var t = e("jcafe-property-model");
  return n;
})
