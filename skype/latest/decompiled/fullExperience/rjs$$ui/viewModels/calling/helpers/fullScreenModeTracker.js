define("ui/viewModels/calling/helpers/fullScreenModeTracker", [
  "require",
  "exports",
  "module"
], function (e, t) {
  function r() {
    var e = this, t = !0, n = t;
    e.modeChanged = function (e) {
      n = e;
    };
    e.getLastMode = function () {
      return n;
    };
  }
  var n = null;
  t.get = function () {
    return n === null && (n = new r()), n;
  };
  t.dispose = function () {
    n !== null && (n = null);
  };
});
