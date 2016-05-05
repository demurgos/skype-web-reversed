define("experience/api/helpers/contentNavigator", [
  "require",
  "exports",
  "module",
  "constants/common",
  "services/serviceLocator"
], function (e, t) {
  function i(e) {
    function u() {
      return r.resolve(n.serviceLocator.PUBSUB);
    }
    function a(e) {
      f(e.contentElementId) && (u().unsubscribe(o, a), t = !0, i && (i(), i = null));
    }
    function f(e) {
      return s = s || l(), e === s;
    }
    function l() {
      return e.firstChild ? e.firstChild.getAttribute("id") : null;
    }
    function c(e) {
      u().publish(n.events.navigation.OPEN_CONVERSATION, {
        model: e,
        origin: n.telemetry.historyLoadOrigin.NEW_CHAT_API_START_CONVERSATION,
        contentElementId: s
      });
    }
    var t = !1, i = null, s = null, o = n.apiUIEvents.SWX_CONTENT_LOADED;
    u().subscribe(o, a), this.navigateToConversation = function (e) {
      t ? c(e) : i = c.bind(undefined, e);
    };
  }
  var n = e("constants/common"), r = e("services/serviceLocator");
  t.build = function (e) {
    return new i(e);
  };
})
