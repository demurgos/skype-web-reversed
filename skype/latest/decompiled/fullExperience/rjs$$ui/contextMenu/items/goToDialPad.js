define("ui/contextMenu/items/goToDialPad", [
  "require",
  "swx-i18n",
  "constants/components",
  "swx-constants",
  "ui/contextMenu/menuItem",
  "swx-pubsub-instance"
], function (e) {
  function o(e) {
    function f() {
      u.actionBefore();
      l();
    }
    function l() {
      function e() {
        return {
          page: n.calling.SKYPEOUT_PAGE,
          origin: r.telemetry.historyLoadOrigin.SKYPEOUT_PAGE
        };
      }
      s.publish(r.events.navigation.NAVIGATE, e());
    }
    var u = this;
    u.actionBefore = e;
    var a = t.fetch({ key: "unanswered_call_dial_number" });
    i.call(this, o.TYPE, a, f);
  }
  var t = e("swx-i18n").localization, n = e("constants/components"), r = e("swx-constants").COMMON, i = e("ui/contextMenu/menuItem"), s = e("swx-pubsub-instance").default;
  return o.prototype = Object.create(i.prototype), o.TYPE = "GoToDialPadMenuItem", o;
});
