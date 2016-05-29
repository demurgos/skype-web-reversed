define("jSkype/models/device", [
  "require",
  "jcafe-property-model"
], function (e) {
  function n(e, n, r) {
    this.deviceFriendlyName = t.property({ value: e });
    this.deviceId = t.property({ value: n });
    this.type = t.property({ value: r });
  }
  var t = e("jcafe-property-model");
  return n;
});
