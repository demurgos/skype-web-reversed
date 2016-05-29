define("jSkype/services/outOfBrowser/messagingChannel", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "constants/outOfBrowser"
], function (e, t) {
  function i(e) {
    function o(e, t) {
      return {
        name: e,
        type: r.commandTypes.REQUEST,
        data: t
      };
    }
    function u(n) {
      e.postMessage(n).catch(function () {
        var e = t[n.name];
        t[n.name] = undefined;
        e.reject("Failed to post command " + n.name);
      });
    }
    function a() {
      var e = s[r.shellAppEvents.WindowHidden];
      e && e();
    }
    function f(e) {
      var t = e.message;
      t && t.name && t.type && (t.type === r.commandTypes.REQUEST ? l(t) : t.type === r.commandTypes.RESPONSE && c(t));
    }
    function l(e) {
      var t = i[e.name];
      t && t(e.data);
    }
    function c(e) {
      var n = t[e.name];
      n && (e.error ? n.reject(e.error) : n.resolve(e.data), t[e.name] = undefined);
    }
    var t = {}, i = {}, s = {};
    e.addMessageHandler(f);
    e.addEventHandler(r.shellAppEvents.WindowHidden, a);
    this.sendCommand = function (e, r) {
      var i, s = n.task();
      return t[e] ? s.reject("Command ", e, " is already awaiting response.") : (i = o(e, r), t[e] = s, u(i)), s.promise;
    };
    this.registerCommandHandler = function (e, t) {
      i[e] = t;
    };
    this.registerEventHandler = function (e, t) {
      s[e] = t;
    };
    this.unregisterEventHandler = function (e) {
      delete s[e];
    };
    this.unregisterCommandHandler = function (e) {
      delete i[e];
    };
  }
  var n = e("jcafe-property-model"), r = e("constants/outOfBrowser");
  t.build = function (e) {
    return new i(e);
  };
});
