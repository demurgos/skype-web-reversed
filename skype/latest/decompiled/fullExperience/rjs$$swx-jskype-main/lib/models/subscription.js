(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/subscription", [
      "require",
      "exports",
      "jcafe-property-model",
      "./entitlement"
    ], e);
}(function (e, t) {
  var n = e("jcafe-property-model"), r = e("./entitlement"), i = function (e) {
      function t() {
        var t = e !== null && e.apply(this, arguments) || this;
        return t.type = n.property({ readOnly: !0 }), t;
      }
      return __extends(t, e), t;
    }(r["default"]);
  t.__esModule = !0;
  t["default"] = i;
}));
