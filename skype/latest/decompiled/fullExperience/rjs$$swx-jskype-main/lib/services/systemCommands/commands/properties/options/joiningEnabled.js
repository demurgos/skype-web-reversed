(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/properties/options/joiningEnabled", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function r() {
    return new n();
  }
  var n = function () {
    function e() {
    }
    return e.prototype.isEnabled = function (e) {
      return e.isJoiningEnabled();
    }, e.prototype.enable = function (e) {
      e.isJoiningEnabled.set(!0)["catch"](function () {
      });
    }, e.prototype.disable = function (e) {
      e.isJoiningEnabled.set(!1)["catch"](function () {
      });
    }, e;
  }();
  t.JoiningEnabled = n;
  t.build = r;
}));
