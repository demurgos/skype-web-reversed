(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/baseComponent", [
      "require",
      "exports",
      "swx-utils-common",
      "./pluginEmbed",
      "swx-utils-common",
      "swx-browser-detect",
      "../../../lib/telemetry/logging/callingLogTracer",
      "swx-browser-globals",
      "jskype-settings-instance",
      "swx-utils-common/lib/version",
      "swx-utils-common",
      "swx-constants"
    ], e);
}(function (e, t) {
  var n = e("swx-utils-common"), r = e("./pluginEmbed"), i = e("swx-utils-common"), s = e("swx-browser-detect"), o = e("../../../lib/telemetry/logging/callingLogTracer"), u = e("swx-browser-globals"), a = e("jskype-settings-instance"), f = e("swx-utils-common/lib/version"), l = e("swx-utils-common"), c = e("swx-constants"), h = o.get(), p = function () {
      function e(e) {
        this._loadDelayMilisec = 0;
        this._loadDelayTimer = null;
        this._heartBeatTimer = null;
        this._pluginExistenceCheckTimer = null;
        this._useNativeArguments = !1;
        this._componentName = e;
      }
      return e.prototype._init = function (e, t) {
        var n = this;
        this.componentId = this.generateComponentId(this._componentName);
        this.plugin = this.createPlugin(e, this.componentId, t);
        this.whenUnloaded = new Promise(function (e) {
          n.onUnLoadComplete = function () {
            r.removeComponent(n.componentId);
            n.isDisposed = !0;
            delete n.plugin;
            e();
          };
        });
        this.applyEventHandlers(this);
        this.pluginExistenceCheck(this);
      }, e.prototype.load = function (e) {
        this.isLoaded(this) ? (this._useNativeArguments = this.checkNativeArgumentsSupport(this.plugin.GetVersion()), this.plugin.Load(this._componentName, this._encodeArgs(e))) : this.loadOnInterval(this);
      }, e.prototype._invokeMethod = function (e, t, n, r) {
        var i = this._componentName + "::" + e + ", " + JSON.stringify(t) + " @" + this.componentId, s = l.settablePromise.build();
        if (!this.isLoaded(this))
          return h.log("Attempted to execute this operation while plugin is not loaded:", i), undefined;
        var o = this._encodeArgs(t), u, a = function () {
          };
        n = n || a;
        r = r || a;
        try {
          u = this.plugin.ProcessMethod(e, o);
        } catch (f) {
          return h.warn("e", f.stack), r(f), s.reject(f), s;
        }
        var p = this._decodeArgs(u), d = u === undefined ? "undefined" : JSON.stringify(u), v = i + " Result: " + (d.length > c.PLUGIN_CONST.MAX_RESPONSE_LOG_LENGTH ? d.substring(0, c.PLUGIN_CONST.MAX_RESPONSE_LOG_LENGTH) + "..." : d);
        return h.log(v), p.error ? (r(p.error), s.reject(p.error)) : (n(p), s.resolve(p)), s;
      }, e.prototype.getVersion = function (e) {
        var t = this.plugin.GetVersion();
        return e && e(t), Promise.resolve(t);
      }, e.prototype.setLogLevel = function (e, t) {
        var n = this.plugin.SetLogLevel(e);
        t && t(n);
      }, e.prototype.checkExistence = function (e) {
        var t = this.plugin.CheckExistence();
        e && e(t);
      }, e.prototype.unload = function (e) {
        try {
          this.whenUnloaded.then(e);
          this.plugin.UnLoad();
        } catch (t) {
          h.warn("[BaseComponent] unable to unload component", t);
          this.onUnLoadComplete();
        }
      }, e.prototype.dispose = function (e) {
        var t = u.getWindow();
        this.isDisposed || (t.clearTimeout(this._loadDelayTimer), t.clearTimeout(this._heartBeatTimer), t.clearTimeout(this._pluginExistenceCheckTimer), this.unload(e));
      }, e.prototype.isLoaded = function (e) {
        return !!e.plugin && (this.isIeEngine() || !!e.plugin.Load);
      }, e.prototype.loadOnInterval = function (e) {
        e._loadDelayMilisec < a.settings.plugin.maxTotalLoadDelayMilisec ? e._loadDelayTimer = u.getWindow().setTimeout(function () {
          e._loadDelayMilisec += a.settings.plugin.loadDelayMilisec;
          e.load();
        }, a.settings.plugin.loadDelayMilisec) : e.onError && e.onError("Plugin Failed to Initialize");
      }, e.prototype.generateComponentId = function (e) {
        return e + "-" + i.guid.create();
      }, e.prototype.applyEventHandlers = function (e) {
        function t() {
          u.getWindow().clearTimeout(e._heartBeatTimer);
          e._heartBeatTimer = u.getWindow().setTimeout(function () {
            e.onComponentCrashed && e.onComponentCrashed();
          }, a.settings.plugin.pingHeartBeatTimeout);
        }
        function r(e, t, r) {
          var i = e;
          i["on" + t] && n.async.execute(i["on" + t].bind(null, r));
        }
        function i(t, n) {
          var i = e._decodeArgs(n);
          h.log(e._componentName + " Event - " + t + ": " + JSON.stringify(i) + " @" + e.componentId);
          t === "__FxLoadComplete" ? t = "LoadComplete" : t === "__FxUnLoadComplete" && (t = "UnLoadComplete");
          r(e, t, i);
        }
        function s() {
          e._pluginExistenceCheckTimer && (u.getWindow().clearTimeout(e._pluginExistenceCheckTimer), e._pluginExistenceCheckTimer = null);
          t();
          try {
            return e.plugin.PingResponse(), !0;
          } catch (n) {
          }
          return !1;
        }
        e.plugin.OnEvent = i;
        e.plugin.OnPing = s;
      }, e.prototype.createPlugin = function (e, t, n) {
        var i = {
          managerID: e,
          componentID: t,
          jsonMode: !0,
          windowless: !0,
          structuredArguments: !0
        };
        return r.createComponent(t, i, n);
      }, e.prototype.isIeEngine = function () {
        return s["default"].getBrowserInfo().isIeEngine;
      }, e.prototype.checkNativeArgumentsSupport = function (e) {
        var t = f.parse(e), n = f.parse(c.PLUGIN_CONST.NATIVE_ARGUMENTS_REQUIRED_VERSION);
        return t.compareTo(n) >= 0;
      }, e.prototype.pluginExistenceCheck = function (e) {
        var t;
        try {
          t = e.plugin.CheckExistence();
        } catch (n) {
          t = !1;
        }
        t ? e._pluginExistenceCheckTimer = u.getWindow().setTimeout(this.pluginExistenceCheck.bind(this), a.settings.plugin.pingHeartBeatTimeout, e) : e.onComponentCrashed && e.onComponentCrashed();
      }, e.prototype._encodeArgs = function (e) {
        return this._useNativeArguments ? e || {} : JSON.stringify(e || {});
      }, e.prototype._decodeArgs = function (e) {
        return this._useNativeArguments ? e || {} : JSON.parse(e || "{}");
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = p;
}));
