(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/preferences/readReceiptsProvider", [
      "require",
      "exports",
      "../../../lib/services/preferences/optionsServiceProvider"
    ], e);
}(function (e, t) {
  function i() {
    return new r();
  }
  var n = e("../../../lib/services/preferences/optionsServiceProvider"), r = function (e) {
      function t() {
        return e.call(this, "OPT_READ_RECEIPT_OPTOUT") || this;
      }
      return __extends(t, e), t.prototype.read = function () {
        return e.prototype.read.call(this).then(function (e) {
          return e === 0 || e === 1 ? !e : e;
        });
      }, t.prototype.update = function (t) {
        return e.prototype.update.call(this, t ? 0 : 1);
      }, t;
    }(n.OptionsServiceProvider);
  t.ReadReceiptsProvider = r;
  t.build = i;
}));
