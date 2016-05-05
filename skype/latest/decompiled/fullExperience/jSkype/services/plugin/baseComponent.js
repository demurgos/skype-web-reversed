define("jSkype/services/plugin/baseComponent", [
  "require",
  "utils/common/async",
  "jSkype/services/plugin/pluginEmbed",
  "swx-utils-common",
  "browser/detect",
  "jSkype/telemetry/logging/callingLogTracer",
  "browser/window",
  "jSkype/settings",
  "utils/common/version",
  "constants/plugin.const"
], function (e) {
  function l(e) {
    this._componentName = e, this._loadDelayMilisec = 0, this._loadDelayTimer = null, this._heartBeatTimer = null, this._pluginExistenceCheckTimer = null, this._useNativeArguments = !1;
  }
  function c(e) {
    return !!e.plugin && (m() || !!e.plugin.Load);
  }
  function h(e) {
    e._loadDelayMilisec < u.settings.plugin.maxTotalLoadDelayMilisec ? e._loadDelayTimer = o.setTimeout(function () {
      e._loadDelayMilisec += u.settings.plugin.loadDelayMilisec, e.load();
    }, u.settings.plugin.loadDelayMilisec) : e.onError && e.onError("Plugin Failed to Initialize");
  }
  function p(e) {
    return e + "-" + r.create();
  }
  function d(e) {
    function n() {
      o.clearTimeout(e._heartBeatTimer), e._heartBeatTimer = o.setTimeout(function () {
        e.onComponentCrashed && e.onComponentCrashed();
      }, u.settings.plugin.pingHeartBeatTimeout);
    }
    function r(e, n, r) {
      e["on" + n] && t.execute(e["on" + n].bind(null, r));
    }
    function i(t, n) {
      var i = e._decodeArgs(n);
      s.log(e._componentName + " Event - " + t + ": " + JSON.stringify(i) + " @" + e.componentId), t === "__FxLoadComplete" ? t = "LoadComplete" : t === "__FxUnLoadComplete" && (t = "UnLoadComplete"), r(e, t, i);
    }
    function a() {
      e._pluginExistenceCheckTimer && (o.clearTimeout(e._pluginExistenceCheckTimer), e._pluginExistenceCheckTimer = null), n();
      try {
        return e.plugin.PingResponse(), !0;
      } catch (t) {
      }
      return !1;
    }
    e.plugin.OnEvent = i, e.plugin.OnPing = a;
  }
  function v(e, t, r) {
    var i = {
      managerID: e,
      componentID: t,
      jsonMode: !0,
      windowless: !0,
      structuredArguments: !0
    };
    return n.createComponent(t, i, r);
  }
  function m() {
    return i.getBrowserInfo().isIeEngine;
  }
  function g(e) {
    var t = a.parse(e), n = a.parse(f.NATIVE_ARGUMENTS_REQUIRED_VERSION);
    return t.compareTo(n) >= 0;
  }
  function y(e) {
    var t;
    try {
      t = e.plugin.CheckExistence();
    } catch (n) {
      t = !1;
    }
    t ? e._pluginExistenceCheckTimer = o.setTimeout(y, u.settings.plugin.pingHeartBeatTimeout, e) : e.onComponentCrashed && e.onComponentCrashed();
  }
  var t = e("utils/common/async"), n = e("jSkype/services/plugin/pluginEmbed"), r = e("swx-utils-common").guid, i = e("browser/detect"), s = e("jSkype/telemetry/logging/callingLogTracer").get(), o = e("browser/window"), u = e("jSkype/settings"), a = e("utils/common/version"), f = e("constants/plugin.const");
  return l.prototype._init = function (t, r) {
    var i = this;
    i.componentId = p(i._componentName), i.plugin = v(t, i.componentId, r), i.whenUnloaded = new Promise(function (e) {
      i.onUnLoadComplete = function () {
        n.removeComponent(i.componentId), i.isDisposed = !0, delete i.plugin, e();
      };
    }), d(this), y(this);
  }, l.prototype.load = function (t) {
    c(this) ? (this._useNativeArguments = g(this.plugin.GetVersion()), this.plugin.Load(this._componentName, this._encodeArgs(t))) : h(this);
  }, l.prototype._invokeMethod = function (t, n, r, i) {
    var o = this._componentName + "::" + t + ", " + JSON.stringify(n) + " @" + this.componentId;
    if (!c(this)) {
      s.log("Attempted to execute this operation while plugin is not loaded:", o);
      return;
    }
    var u = this._encodeArgs(n), a, f = function () {
      };
    r = r || f, i = i || f;
    try {
      a = this.plugin.ProcessMethod(t, u);
    } catch (l) {
      s.warn("e", l.stack), i(l);
      return;
    }
    var h = this._decodeArgs(a), p = o + " Result: " + JSON.stringify(a);
    s.log(p), h.error ? i(h.error) : r(h);
  }, l.prototype.getVersion = function (t) {
    var n = this.plugin.GetVersion();
    t && t(n);
  }, l.prototype.setLogLevel = function (t, n) {
    var r = this.plugin.SetLogLevel(t);
    n && n(r);
  }, l.prototype.checkExistence = function (t) {
    var n = this.plugin.CheckExistence();
    t && t(n);
  }, l.prototype.unload = function (t) {
    try {
      this.whenUnloaded.then(t), this.plugin.UnLoad();
    } catch (n) {
      s.warn("[BaseComponent] unable to unload component", n), t && t();
    }
  }, l.prototype.dispose = function (t) {
    var r = this;
    this.isDisposed || (o.clearTimeout(this._loadDelayTimer), o.clearTimeout(this._heartBeatTimer), o.clearTimeout(this._pluginExistenceCheckTimer), this.unload(function () {
      n.removeComponent(r.componentId), delete r.plugin, t && t();
    }), this.isDisposed = !0);
  }, l.prototype._encodeArgs = function (e) {
    return this._useNativeArguments ? e || {} : JSON.stringify(e || {});
  }, l.prototype._decodeArgs = function (e) {
    return this._useNativeArguments ? e || {} : JSON.parse(e || "{}");
  }, l;
})
