define("jSkype/models/agentDetails", [
  "require",
  "jcafe-property-model"
], function (e) {
  function n() {
    this.author = t.property({ readOnly: !0 });
    this.description = t.property({ readOnly: !0 });
    this.certification = t.property({ readOnly: !0 });
    this.rating = t.property({ readOnly: !0 });
    this.website = t.property({ readOnly: !0 });
    this.privacyStatement = t.property({ readOnly: !0 });
    this.termsOfService = t.property({ readOnly: !0 });
    this.extraInfo = t.property({ readOnly: !0 });
  }
  var t = e("jcafe-property-model");
  return n;
});
