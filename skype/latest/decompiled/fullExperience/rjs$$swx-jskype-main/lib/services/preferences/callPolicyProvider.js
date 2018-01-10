(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/preferences/callPolicyProvider", [
      "require",
      "exports",
      "../../../lib/services/preferences/optionsServiceProvider",
      "swx-enums"
    ], e);
}(function (e, t) {
  function s() {
    return new i();
  }
  var n = e("../../../lib/services/preferences/optionsServiceProvider"), r = e("swx-enums"), i = function (e) {
      function t() {
        return e.call(this, "OPT_SKYPE_CALL_POLICY") || this;
      }
      return __extends(t, e), t.prototype.read = function () {
        return e.prototype.read.call(this).then(function (e) {
          return e === 2 ? r.privacyPolicyValues.ContactsOnly : r.privacyPolicyValues.Anyone;
        });
      }, t.prototype.update = function (t) {
        return e.prototype.update.call(this, t === r.privacyPolicyValues.ContactsOnly ? 2 : 0);
      }, t;
    }(n.OptionsServiceProvider);
  t.CallPolicyProvider = i;
  t.build = s;
}));
