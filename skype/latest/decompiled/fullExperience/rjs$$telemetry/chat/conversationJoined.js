define("telemetry/chat/conversationJoined", [
  "require",
  "exports",
  "module",
  "experience/settings",
  "ui/modelHelpers/personHelper",
  "ui/telemetry/telemetryClient",
  "browser/window",
  "constants/common"
], function (e, t) {
  function a() {
    function t(e) {
      return r.isGuestId(e) ? o.result.SIGNED_OUT : o.result.SIGNED_IN;
    }
    function u(t, r) {
      r = r || o.result.INCONCLUSIVE;
      var u = o.TYPE, a = {
          milestone: t,
          result: r.toString(),
          client_time: new s.Date().getMilliseconds().toString(),
          Prefix: e._prefix,
          thread_id: e._threadId.toString()
        };
      i.get().sendEvent(n.telemetry.uiTenantToken, u, a);
    }
    function a(e) {
      return /^(.*):/.exec(e)[1];
    }
    function f() {
      e._threadId = undefined, e._prefix = undefined;
    }
    var e = this;
    return e._threadId = undefined, e._prefix = undefined, e.onJoinConversation = function (n) {
      var r = n.prefix.indexOf(":") === -1, i = t(n.prefix);
      e._threadId = n.uri, e._prefix = r ? "" : a(n.prefix), u(o.milestoneType.CLIENT_INIT, i);
    }, e.onJoinConversationError = function (e) {
      u(o.milestoneType.ERROR, e), f();
    }, e.onConversationJoined = function () {
      if (!e.isTriggered())
        return;
      u(o.milestoneType.END, o.result.SUCCESS), f();
    }, e.isTriggered = function () {
      return e._threadId;
    }, e;
  }
  var n = e("experience/settings"), r = e("ui/modelHelpers/personHelper"), i = e("ui/telemetry/telemetryClient"), s = e("browser/window"), o = e("constants/common").telemetry.conversationJoined, u;
  t.get = function () {
    return u || (u = new a()), u;
  };
})
