(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/incomingNotificationMessageHandler", [
      "require",
      "exports",
      "./utilities/constants"
    ], e);
}(function (e, t) {
  var n = e("./utilities/constants"), r = function () {
      function e(e) {
        var t = this;
        this.handleMessage = function (e) {
          if (!t.isMessageForExistingCall(e))
            return { isHandled: !1 };
          if (e.url.search(new RegExp("/" + n["default"].URL_BASE.CALLAGENT + "/", "i")) > -1) {
            var r = t.signalingAgent.handleIncomingNotification(e);
            return {
              isHandled: !0,
              resultCode: r
            };
          }
          return { isHandled: !1 };
        };
        this.signalingAgent = e;
      }
      return e.prototype.isMessageForExistingCall = function (e) {
        return !e.eventId;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));
