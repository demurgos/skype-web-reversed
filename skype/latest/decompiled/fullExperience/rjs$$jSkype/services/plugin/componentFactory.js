define("jSkype/services/plugin/componentFactory", [
  "require",
  "exports",
  "module",
  "jSkype/services/plugin/managerComponent",
  "jSkype/services/plugin/skypeCoreComponent",
  "jSkype/services/plugin/videoComponent",
  "jSkype/services/plugin/electron/electronManager",
  "jSkype/services/plugin/electron/electronSkypeCore",
  "jSkype/services/plugin/electron/electronVideoRenderer",
  "browser/detect"
], function (e, t) {
  function f() {
    return a.getBrowserInfo().isElectron;
  }
  var n = e("jSkype/services/plugin/managerComponent"), r = e("jSkype/services/plugin/skypeCoreComponent"), i = e("jSkype/services/plugin/videoComponent"), s = e("jSkype/services/plugin/electron/electronManager"), o = e("jSkype/services/plugin/electron/electronSkypeCore"), u = e("jSkype/services/plugin/electron/electronVideoRenderer"), a = e("browser/detect");
  t.createManagerComponent = function () {
    return f() ? s.build() : new n();
  }, t.createSkypeCoreComponent = function (e) {
    return f() ? o.build() : new r(e);
  }, t.createVideoComponent = function (e, t) {
    return f() ? u.build(t) : new i(e, t);
  };
})
