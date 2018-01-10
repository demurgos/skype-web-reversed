define("telemetry/chat/conversationJoined", [
  "require",
  "exports",
  "module",
  "experience/settings",
  "ui/modelHelpers/personHelper",
  "swx-utils-chat",
  "ui/telemetry/telemetryClient",
  "swx-browser-globals",
  "swx-constants"
], function (e, t) {
  function c() {
    function t(e) {
      return r.isGuestId(e) ? a.result.SIGNED_OUT : a.result.SIGNED_IN;
    }
    function u(t, r, i) {
      r = r || a.result.INCONCLUSIVE;
      var u = a.TYPE, f = o.getWindow(), c = {
          milestone: t,
          result: r.toString(),
          client_time: new f.Date().getTime().toString(),
          Prefix: e._prefix,
          thread_id: e._threadId.toString(),
          conversationOrigin: l()
        };
      i && (c.participantsCount = i);
      s.get().sendEvent(n.telemetry.chatTenantToken, u, c);
    }
    function l() {
      return i.isGuestHostConversation(e._threadId) ? f.GUEST_HOST : f.NORMAL;
    }
    function c(e) {
      return /^(.*):/.exec(e)[1];
    }
    function h() {
      e._threadId = undefined;
      e._prefix = undefined;
    }
    var e = this;
    return e._threadId = undefined, e._prefix = undefined, e.onJoinConversation = function (n) {
      var r = n.prefix.indexOf(":") === -1, i = t(n.prefix);
      e._threadId = n.uri;
      e._prefix = r ? "" : c(n.prefix);
      u(a.milestoneType.CLIENT_INIT, i);
    }, e.onJoinConversationError = function (t) {
      if (!e.isTriggered())
        return;
      u(a.milestoneType.ERROR, t);
      h();
    }, e.onConversationJoined = function (t) {
      if (!e.isTriggered())
        return;
      u(a.milestoneType.END, a.result.SUCCESS, t ? t.participantsCount + 1 : t);
      h();
    }, e.isTriggered = function () {
      return e._threadId;
    }, e.isTriggeredFor = function (t) {
      return e._threadId === t;
    }, e;
  }
  var n = e("experience/settings"), r = e("ui/modelHelpers/personHelper"), i = e("swx-utils-chat").conversation, s = e("ui/telemetry/telemetryClient"), o = e("swx-browser-globals"), u = e("swx-constants").COMMON, a = u.telemetry.conversationJoined, f = u.telemetry.conversationOrigin, l;
  t.get = function () {
    return l || (l = new c()), l;
  };
});
