(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/agentDetails", [
      "require",
      "exports",
      "jcafe-property-model"
    ], e);
}(function (e, t) {
  var n = e("jcafe-property-model"), r = function () {
      function e() {
        this.author = n.property({ readOnly: !0 });
        this.description = n.property({ readOnly: !0 });
        this.certification = n.property({ readOnly: !0 });
        this.rating = n.property({ readOnly: !0 });
        this.website = n.property({ readOnly: !0 });
        this.privacyStatement = n.property({ readOnly: !0 });
        this.termsOfService = n.property({ readOnly: !0 });
        this.extraInfo = n.property({ readOnly: !0 });
        this.messages_mode_all = n.property({ readOnly: !0 });
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));
