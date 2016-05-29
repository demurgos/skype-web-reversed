define("jSkype/services/plugin/electron/electronManager", [
  "require",
  "exports",
  "module",
  "jSkype/services/plugin/electron/electronBase"
], function (e, t) {
  function r() {
    n.call(this);
  }
  var n = e("jSkype/services/plugin/electron/electronBase");
  r.prototype = Object.create(n.prototype);
  r.prototype.constructor = r;
  r.prototype.load = function () {
    this._raiseLoadComplete(!0);
  };
  r.prototype.runSoftwareUpdate = function () {
    this._raiseEvent("UpdateCheckComplete", { updateVersion: null });
  };
  t.build = function () {
    return new r();
  };
});
