(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/electron/electronSkypeCore", [
      "require",
      "exports",
      "./electronBase",
      "../../../../lib/services/plugin/skypeCoreComponent",
      "../../../../lib/telemetry/logging/callingLogTracer"
    ], e);
}(function (e, t) {
  function u() {
    return new o();
  }
  var n = e("./electronBase"), r = e("../../../../lib/services/plugin/skypeCoreComponent"), i = e("../../../../lib/telemetry/logging/callingLogTracer"), s = i.get(), o = function (e) {
      function t() {
        var n = e.call(this) || this, i = r["default"].prototype, s = t.prototype;
        for (var o in r["default"].prototype)
          r["default"].prototype.hasOwnProperty(o) && (s[o] = i[o]);
        return n;
      }
      return __extends(t, e), t.prototype.loginWithSkypeToken = function (e, t, n, r) {
      }, t.prototype.load = function (e) {
        try {
          this._skypeModule.skypeCoreInit(e);
          this._skypeModule.skypeCoreSetEventHandler(this._raiseEvent.bind(this));
          this._raiseLoadComplete(!0);
        } catch (t) {
          s.warn(t);
          this._raiseLoadComplete(!1);
        }
      }, t.prototype.dispose = function (t) {
        try {
          this._skypeModule.skypeCoreDestroy();
        } catch (n) {
          s.warn(n);
        }
        e.prototype.dispose.call(this, t);
      }, t.prototype._invokeMethod = function (e, t, n, r) {
        function i() {
        }
        s.log("ElectronSkypeCore::" + e + ", " + JSON.stringify(t));
        n = n || i;
        r = r || i;
        try {
          var o = this._skypeModule.skypeCoreMethod(e, t || {});
          n(o || {});
        } catch (u) {
          s.warn(u);
          r(u);
        }
      }, t;
    }(n["default"]);
  t.ElectronSkypeCore = o;
  t.build = u;
}));
