define("jSkype/services/plugin/electron/electronSkypeCore", [
  "require",
  "exports",
  "module",
  "jSkype/services/plugin/electron/electronBase",
  "jSkype/services/plugin/skypeCoreComponent",
  "jSkype/telemetry/logging/callingLogTracer"
], function (e, t) {
  function s() {
    n.call(this);
  }
  var n = e("jSkype/services/plugin/electron/electronBase"), r = e("jSkype/services/plugin/skypeCoreComponent"), i = e("jSkype/telemetry/logging/callingLogTracer").get();
  s.prototype = Object.create(n.prototype);
  s.prototype.constructor = s;
  s.prototype.load = function (e) {
    try {
      this._skypeModule.skypeCoreInit(e);
      this._skypeModule.skypeCoreSetEventHandler(n.prototype._raiseEvent.bind(this));
      this._raiseLoadComplete(!0);
    } catch (t) {
      i.warn(t);
      this._raiseLoadComplete(!1);
    }
  };
  s.prototype.dispose = function (e) {
    try {
      this._skypeModule.skypeCoreDestroy();
    } catch (t) {
      i.warn(t);
    }
    n.prototype.dispose.call(this, e);
  };
  s.prototype._invokeMethod = function (e, t, n, r) {
    function s() {
    }
    i.log(this.constructor.name + "::" + e + ", " + JSON.stringify(t));
    n = n || s;
    r = r || s;
    try {
      var o = this._skypeModule.skypeCoreMethod(e, t || {});
      n(o || {});
    } catch (u) {
      i.warn(u);
      r(u);
    }
  };
  for (var o in r.prototype)
    r.prototype.hasOwnProperty(o) && (s.prototype[o] = r.prototype[o]);
  t.build = function () {
    return new s();
  };
});
