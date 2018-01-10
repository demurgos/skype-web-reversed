(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/outOfBrowser/messagingChannel", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-constants",
      "swx-log-tracer"
    ], e);
}(function (e, t) {
  function u(e) {
    return new o(e);
  }
  var n = e("jcafe-property-model"), r = e("swx-constants"), i = e("swx-log-tracer"), s = i.getLogger("MessagingChannel"), o = function () {
      function e(e) {
        var t = this;
        this.sendCommandTasks = {};
        this.commandHandlers = {};
        this.eventHandlers = {};
        this.sendCommand = function (e, r) {
          var i = n.task();
          if (!t.sendCommandTasks[e]) {
            var o = t.buildCommand(e, r);
            t.sendCommandTasks[e] = i;
            t.send(o);
          } else
            i.reject("Command " + e + " is already awaiting response."), s.warn("Command ", e, " is already awaiting response.");
          return i.promise;
        };
        this.registerCommandHandler = function (e, n) {
          t.commandHandlers[e] = n;
        };
        this.registerEventHandler = function (e, n) {
          t.eventHandlers[e] = n;
        };
        this.unregisterEventHandler = function (e) {
          delete t.eventHandlers[e];
        };
        this.unregisterCommandHandler = function (e) {
          delete t.commandHandlers[e];
        };
        this.skypeExtension = e;
        this.skypeExtension.addMessageHandler(this.onMessageReceived.bind(this));
        this.skypeExtension.addEventHandler(r.OUT_OF_BROWSER.shellAppEvents.WindowHidden, this.onWindowHidden.bind(this));
      }
      return e.prototype.dispose = function () {
        for (var e in this.commandHandlers)
          delete this.commandHandlers[e];
        for (var t in this.eventHandlers)
          delete this.eventHandlers[t];
      }, e.prototype.buildCommand = function (e, t) {
        return {
          name: e,
          type: r.OUT_OF_BROWSER.commandTypes.REQUEST,
          data: t
        };
      }, e.prototype.send = function (e) {
        var t = this;
        this.skypeExtension.postMessage(e)["catch"](function () {
          var n = t.sendCommandTasks[e.name];
          t.sendCommandTasks[e.name] = undefined;
          n.reject("Failed to post command " + e.name);
        });
      }, e.prototype.onWindowHidden = function () {
        var e = this.eventHandlers[r.OUT_OF_BROWSER.shellAppEvents.WindowHidden];
        e && e();
      }, e.prototype.onMessageReceived = function (e) {
        var t = e.message;
        t && t.name && t.type && (t.type === r.OUT_OF_BROWSER.commandTypes.REQUEST ? this.onRequestCommandReceived(t) : t.type === r.OUT_OF_BROWSER.commandTypes.RESPONSE && this.onResponseCommandReceived(t));
      }, e.prototype.onRequestCommandReceived = function (e) {
        var t = this.commandHandlers[e.name];
        t && t(e.data);
      }, e.prototype.onResponseCommandReceived = function (e) {
        var t = this.sendCommandTasks[e.name];
        t && (e.error ? t.reject(e.error) : t.resolve(e.data), this.sendCommandTasks[e.name] = undefined);
      }, e;
    }();
  t.MessagingChannel = o;
  t.build = u;
}));
