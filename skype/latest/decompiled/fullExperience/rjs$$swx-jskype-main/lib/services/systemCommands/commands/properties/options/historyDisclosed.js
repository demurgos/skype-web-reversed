(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/properties/options/historyDisclosed", [
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
      return e.historyService.isHistoryDisclosed();
    }, e.prototype.enable = function (e) {
      e.historyService.isHistoryDisclosed.set(!0)["catch"](function () {
      });
    }, e.prototype.disable = function (e) {
      e.historyService.isHistoryDisclosed.set(!1)["catch"](function () {
      });
    }, e;
  }();
  t.HistoryDisclosed = n;
  t.build = r;
}));
