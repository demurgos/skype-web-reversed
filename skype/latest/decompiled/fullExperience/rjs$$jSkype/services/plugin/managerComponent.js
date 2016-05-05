define("jSkype/services/plugin/managerComponent", [
  "require",
  "jSkype/services/plugin/baseComponent"
], function (e) {
  function r() {
    i(), this._init.call(this, "_", { cssClass: "pluginNoSize" });
  }
  function i() {
    window.navigator.plugins && window.navigator.plugins.refresh && window.navigator.plugins.refresh(!1);
  }
  var t = "__pluginFx", n = e("jSkype/services/plugin/baseComponent");
  return r.prototype = new n(t), r.constructor = n.constructor, r.prototype.runSoftwareUpdate = function (t, n, r, i) {
    var s = {
      minVersion: t,
      highVersion: n,
      pluginManifestKey: r,
      ecs: i
    };
    this._invokeMethod("RunSoftwareUpdate", s);
  }, r;
})
