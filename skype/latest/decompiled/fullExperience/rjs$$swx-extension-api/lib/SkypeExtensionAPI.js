(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-extension-api/lib/SkypeExtensionAPI", [
      "require",
      "exports",
      "global-portable"
    ], e);
}(function (e, t) {
  function o() {
    return Math.random().toString(16).slice(2);
  }
  function u() {
    return o() + "@" + Date.now();
  }
  function a() {
    function e(e) {
      return e in this._listeners || (this._listeners[e] = []), this._listeners[e];
    }
    this._listeners = {};
    this.add = function (t, n) {
      var r = e.call(this, t), i = r.indexOf(n);
      i === -1 && r.push(n);
    };
    this.remove = function (t, n) {
      var r = e.call(this, t), i = r.indexOf(n);
      i !== -1 && r.splice(i, 1);
    };
    this.dispatchEvent = function (t) {
      var n = e.call(this, t.type).slice();
      for (var r = 0; r < n.length; r++)
        n[r].call(this, t);
      return !t.defaultPrevented;
    };
    this.invokeHandlerWithMessage = function (t) {
      var n = e.call(this, t.cookie).slice();
      if (n.length > 0) {
        for (var r = 0; r < n.length; r++)
          n[r].call(this, t);
        return;
      }
      n = e.call(this, t.name).slice();
      if (n.length > 0) {
        for (var r = 0; r < n.length; r++)
          n[r].call(this, t.data);
        return;
      }
    };
  }
  function l(e, t) {
    return new Promise(function (r, s) {
      function l(e) {
        clearTimeout(a);
        f.remove(o, l);
        "error" in e ? s(e.error) : r(e.data);
      }
      function c() {
        f.remove(o, l);
        s(new Error("Chrome Extension reply timeout: (" + i + " ms passed)"));
      }
      var o = u(), a = null;
      a = setTimeout(c, i);
      f.add(o, l);
      t.cookie = o;
      e.postMessage({
        origin: n,
        message: t
      }, "*");
    });
  }
  function c(e) {
    this.nmHost = e;
    this.postMessage = function (e) {
      return this.nmHost.postMessage({
        method: "messageToWindow",
        args: { message: e }
      });
    };
    this.addMessageHandler = function (e) {
      this.nmHost.addMessageHandler("messageFromWindow", function (t) {
        e(t.message);
      });
    };
  }
  function h(e, t) {
    this.id = e;
    this.extension = t;
    this.hostWindow = null;
    this.postMessage = function (e) {
      return this.extension.postMessage({
        name: "MessageToNativeMessagingHost",
        nmHostID: this.id,
        content: e
      });
    };
    this.invokeMethod = function (e, t) {
      return t || (t = {}), this.postMessage({
        method: e,
        args: t
      });
    };
    this.getVersion = function () {
      return this.invokeMethod("getVersion").then(function (e) {
        return e.message.result;
      });
    };
    this.openWindow = function (e) {
      var t = this;
      return new Promise(function (n, r) {
        t.invokeMethod("openWindow", e).then(function () {
          t.hostWindow = new c(t);
          n(t.hostWindow);
        }).catch(r);
      });
    };
    this.addMessageHandler = function (e, t) {
      this.extension.addMessageHandler("NMHostMessage", function (n) {
        var r = n.message;
        r.event == e && t(r.args);
      });
    };
    this.onDisconnected = function (e) {
      var t = this;
      this.extension.addMessageHandler("NMHostConnectionChange", function (n) {
        if (n.nmHostID != t.id)
          return;
        if (n.isConnected)
          return;
        e(n.reason);
      });
    };
    var n = this;
    this.onDisconnected(function (e) {
      n.hostWindow != null && (n.hostWindow.nmHost = null, n.hostWindow = null);
      n.extension != null && (n.extension.nmHost = null);
    });
    this.disconnect = function () {
      return this.extension.postMessage({
        name: "DisconnectNativeMessagingHost",
        nmHostId: this.id
      });
    };
  }
  function p(e, t) {
    this.id = e;
    this.version = t;
    this.nmHost = null;
    this.postMessage = function (e) {
      return l(window, e);
    };
    this.addMessageHandler = function (e, t) {
      f.add(e, t);
    };
    this.removeMessageHandler = function (e, t) {
      f.remove(e, t);
    };
    this.onDisconnected = function (e) {
      var t = this;
      this.addMessageHandler("ExtensionConnectionChange", function (n) {
        if (n.extensionID != t.id)
          return;
        if (n.isConnected)
          return;
        e();
      });
    };
    var n = this;
    this.onDisconnected(function () {
      n.nmHost != null && (n.nmHost.extension = null, n.nmHost = null);
      s = null;
    });
    this.connectNMHost = function (e) {
      var t = this;
      return new Promise(function (n, r) {
        t.postMessage({
          name: "ConnectNativeMessagingHost",
          nmHostId: e
        }).then(function (r) {
          t.nmHost = new h(e, t);
          n(t.nmHost);
        }).catch(r);
      });
    };
  }
  function d(e) {
    this.nmHost = e;
    this.postMessage = function (e) {
      return this.nmHost.extension.postMessage({
        method: "messageToWindow",
        args: e
      });
    };
    this.addMessageHandler = function (e) {
      this.nmHost.extension.addMessageHandler("messageFromWindow", function (t) {
        e(t.message);
      });
    };
  }
  function v(e, t) {
    this.id = e;
    this.extension = t;
    this.hostWindow = null;
    this.invokeMethod = function (e, t) {
      return t || (t = {}), this.extension.invokeMethod(e, t);
    };
    this.getVersion = function () {
      return this.invokeMethod("getVersion");
    };
    this.openWindow = function (e) {
      var t = this;
      return new Promise(function (n, r) {
        t.invokeMethod("openWindow", e).then(function () {
          t.hostWindow = new d(t);
          n(t.hostWindow);
        }).catch(r);
      });
    };
    this.addMessageHandler = function (e, t) {
      f.add(e, t);
    };
    this.onDisconnected = function (e) {
    };
    this.disconnect = function () {
      this.extension.port.Disconnect();
    };
  }
  function m(e, t, n) {
    this.version = t;
    this.id = e;
    this.nmHost = null;
    this.port = n;
    var r = this;
    this.invokeMethod = function (e, t) {
      return new Promise(function (n, s) {
        function c(e) {
          var t = e.data;
          t.cookie == a && (clearTimeout(l), f.remove(o, c), "error" in t ? s(t.error) : n(t.result));
        }
        function h() {
          f.remove(o, c);
          s(new Error("EdgeActiveX reply timeout: (" + i + " ms passed)"));
        }
        var o = "MessageReceived", a = u(), l = null;
        l = setTimeout(h, i);
        f.add(o, c);
        var p = {
          cookie: a,
          method: e,
          args: t
        };
        r.port.PostMessage(p);
      });
    };
    this.postMessage = function (e) {
      var t = e.name;
      if (t == undefined || t == null)
        t = e.method;
      return this.invokeMethod(t, { message: e.args });
    };
    this.addMessageHandler = function (e, t) {
      f.add(e, t);
    };
    this.removeMessageHandler = function (e, t) {
      f.remove(e, t);
    };
    this.onDisconnected = function (e) {
      f.add("NMHostConnectionChange", e);
    };
    this.connectNMHost = function (e) {
      var t = this;
      return new Promise(function (n, r) {
        t.port.Connect();
        t.nmHost = new v(e, t);
        n(t.nmHost);
      });
    };
    this.onPluginMessage = function (e) {
      f.dispatchEvent({
        type: "MessageReceived",
        data: e
      });
      if (!e || !e.event)
        return;
      e.args && e.args.message ? f.dispatchEvent({
        type: e.event,
        message: e.args.message,
        data: e.args.message
      }) : f.dispatchEvent({ type: e.event });
    };
    this.onPluginDisconnected = function () {
      var e = {
        type: "NMHostConnectionChange",
        data: { isConnected: !1 }
      };
      f.dispatchEvent(e);
    };
  }
  var n = "XwaWebSite", r = "XwaContentScript", i = 3000, s = null, f = new a();
  window.addEventListener("message", function (e) {
    var t = window.location.protocol + "//" + window.location.host;
    if (e.origin != t)
      return;
    var n = e.data;
    if (n.origin != r)
      return;
    f.invokeHandlerWithMessage(n.message);
  });
  var g = {
    connect: function (e, t) {
      return t != undefined && t != null ? new Promise(function (n, r) {
        var i = document.createElement("object");
        i.setAttribute("type", e);
        i.setAttribute("class", "pluginNoSize");
        var s = t;
        s.appendChild(i);
        var o = i.GetVersion(), u = new m(e, o, i);
        i.OnMessage = u.onPluginMessage;
        i.OnDisconnected = u.onPluginDisconnected;
        n(u);
      }) : new Promise(function (t, n) {
        l(window, {
          name: "ExtensionConnect",
          extensionId: e
        }).then(function () {
          return l(window, { name: "ExtensionVersion" });
        }).then(function (n) {
          var r = new p(e, n);
          t(r);
        }).catch(n);
      });
    },
    sharedExtension: function (e, t) {
      var n = this;
      return new Promise(function (r, i) {
        if (s != null) {
          r(s);
          return;
        }
        n.connect(e, t).then(function (e) {
          s = e;
          r(s);
        }).catch(i);
      });
    },
    sharedNMHost: function (e, t, n) {
      var r = this;
      return new Promise(function (i, o) {
        if (s != null && s.nmHost != null) {
          i(s.nmHost);
          return;
        }
        r.sharedExtension(e, n).then(function (e) {
          return e.connectNMHost(t);
        }).then(i, o);
      });
    },
    sharedNMHostWindow: function (e, t, n, r) {
      var i = this;
      return new Promise(function (o, u) {
        if (s != null && s.nmHost != null && s.nmHost.hostWindow != null) {
          o(s.nmHost.hostWindow);
          return;
        }
        i.sharedNMHost(e, t, r).then(function (e) {
          return e.openWindow(n);
        }).then(o, u);
      });
    },
    cleanupCallbacks: function () {
      f._listeners = {};
    }
  };
  t.SkypeExtension = g;
  var y = e("global-portable");
  y["default"].SkypeExtension = g;
}));
