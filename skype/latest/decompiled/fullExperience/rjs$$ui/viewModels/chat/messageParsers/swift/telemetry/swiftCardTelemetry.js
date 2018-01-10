define("ui/viewModels/chat/messageParsers/swift/telemetry/swiftCardTelemetry", [
  "require",
  "swx-constants",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e) {
  function s() {
    function o(e) {
      for (var t in e)
        e.hasOwnProperty(t) && !(typeof e[t] == "string" || e[t] instanceof String) && (e[t] = e[t] + "");
      return e;
    }
    function u(e, t, n) {
      var r = {};
      return r.card_cta_type = e || s, r.card_cta_success = t ? 1 : 0, r.card_bot_id = n ? "28:" + n : s, r;
    }
    function a(e, t) {
      try {
        i.get().sendEvent(r.telemetry.uiTenantToken, e, o(t));
      } catch (n) {
      }
    }
    function f(e, t, n) {
      var r = {};
      r.card_failure_reason = t || s;
      r.card_bot_id = n ? "28:" + n : s;
      a(e, r);
    }
    var e = this, s = t.telemetry.NOT_AVAILABLE;
    e.publishCardAction = function (e, t, r) {
      var i = u(e, t, r);
      a(n.swiftCardActionEventName, i);
    };
    e.publishInvalidCard = function (e, t) {
      f(n.swiftCardInvalidEventName, e, t);
    };
    e.publishUnsupportedCard = function (e, t) {
      f(n.swiftCardUnsupportedEventName, e, t);
    };
  }
  var t = e("swx-constants").COMMON, n = t.telemetry.swiftCard, r = e("experience/settings"), i = e("ui/telemetry/telemetryClient");
  return s.build = function () {
    return new s();
  }, s;
});
