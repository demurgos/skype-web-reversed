(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/outOfBrowser/shellApp/messagingChannel", [
      "require",
      "exports",
      "swx-constants"
    ], e);
}(function (e, t) {
  function i() {
    return new r();
  }
  var n = e("swx-constants"), r = function () {
      function e() {
        var e = this;
        this.commandHandlers = {};
        this.sendCommand = function (e) {
          window.shellApp.invoke(n.OUT_OF_BROWSER.shellAppMethods.PostMessage, { message: e });
        };
        this.registerCommandHandler = function (t, n) {
          e.commandHandlers[t] = n;
        };
        window.shellApp.addEventListener(n.OUT_OF_BROWSER.shellAppEvents.MessageReceived, this.onShellAppMessageEvent.bind(this));
      }
      return e.prototype.onShellAppMessageEvent = function (e) {
        var t = this, r = e.data;
        if (r.type === n.OUT_OF_BROWSER.commandTypes.REQUEST) {
          var i = {
              name: r.name,
              type: n.OUT_OF_BROWSER.commandTypes.RESPONSE
            }, s = function () {
              t.sendCommand(i);
            }, o = function (e) {
              i.error = e;
              t.sendCommand(i);
            }, u = void 0;
          try {
            var a = this.commandHandlers[r.name];
            u = Promise.resolve(a(r.data));
          } catch (f) {
            u = Promise.reject(f);
          }
          u.then(s, o);
        }
      }, e;
    }();
  t.MessagingChannel = r;
  t.build = i;
}));
