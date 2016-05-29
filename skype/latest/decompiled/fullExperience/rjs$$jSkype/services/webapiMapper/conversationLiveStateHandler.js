define("jSkype/services/webapiMapper/conversationLiveStateHandler", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "browser/window",
  "jSkype/client",
  "jSkype/settings",
  "constants/common",
  "browser/detect",
  "jSkype/utils/chat/parser",
  "utils/common/logTracer/api"
], function (e, t) {
  function b(e) {
    g.hasOwnProperty(e.conversationId) && (r.clearTimeout(g[e.conversationId]), e._setCanJoinNGCCall(!1));
  }
  function w(e) {
    try {
      return JSON.parse(e);
    } catch (t) {
      return null;
    }
  }
  function E(e) {
    return e.filter(function (e) {
      return v.indexOf(e.VoiceStatus) !== -1;
    });
  }
  function S(e) {
    return n.isArray(e.Participants) ? E(e.Participants).length > 0 : !1;
  }
  function x(e, t, n, r) {
    var i = w(t);
    if (u.getBrowserInfo().browserName === u.BROWSERS.SKYPE_SHELL)
      return;
    if (i) {
      if (i.AccessToken === m)
        return;
      r._setCanJoinCall(S(i), n, i);
      T(e, r);
      y.log("Enabling P2P black bar");
    } else
      y.error("Unable to enable P2P black bar, wrong/missing payload");
  }
  function T(e, t) {
    r.clearTimeout(g[t.conversationId]);
    g[t.conversationId] = r.setTimeout(N.bind(null, t), e);
  }
  function N(e) {
    if (u.getBrowserInfo().browserName === u.BROWSERS.SKYPE_SHELL)
      return;
    r.clearTimeout(g[e.conversationId]);
    e._setCanJoinCall(!1);
    y.log("Disabling P2P black bar");
  }
  var n = e("lodash-compat"), r = e("browser/window"), i = e("jSkype/client"), s = e("jSkype/settings"), o = e("constants/common"), u = e("browser/detect"), a = e("jSkype/utils/chat/parser"), f = e("utils/common/logTracer/api"), l = "2", c = "1", h = 1000, p = /1\/([12])\s([^ ]*)\s([01])(\s(\d*)\s(\{(.|[\r\n])*\}))?/, d = {
      PARSING_ERROR: "Could not properly parse LiveState message !",
      WRONG_VERSION: "Could not properly parse LiveState message - wrong version. We need JSON payload version !",
      WRONG_PAYLOAD: "Could not properly parse LiveState payload !",
      WRONG_PARTICIPANTS_FORMAT: "Participants were not provided so live state could not be obtained !"
    }, v = [
      4,
      6,
      7,
      8
    ], m = "NgAccessToken", g = {}, y = f.getLogger("P2PBlackBar");
  t.updateCallState = function (e, t) {
    var n = e.match(p), r, s;
    if (!n)
      return;
    y.log("P2P Live state update", { content: e });
    var o = n[1], u = n[2], f = n[3], d = n[5] * h, v = n[6];
    if (o !== l)
      return;
    r = a.getConversationIdFromUrl(t);
    s = i.get().conversationsManager._getConversation(r);
    if (!s) {
      y.warn("Unable to find conversation");
      return;
    }
    f === c ? x(d, v, u, s) : N(s);
  };
  t.updateNGCCallState = function (e, t) {
    var n = null, a = null, l, c, h = null, p = null, d = f.getLogger("NGCBlackBar"), v;
    if (!s.isFeatureOn(o.featureFlags.GVC_JOINING)) {
      d.log("conversationLiveStateHandler:updateNGCCallState: GVC Joining not supported");
      return;
    }
    if (!s.isFeatureOn(o.featureFlags.NG_CALLING)) {
      d.log("conversationLiveStateHandler:updateNGCCallState: NGC caling not supported");
      return;
    }
    if (u.getBrowserInfo().browserName === u.BROWSERS.SKYPE_SHELL)
      return;
    if (!t) {
      d.log("conversationLiveStateHandler:updateNGCCallState: GVC Joining is supported but no awareness_conversationLiveState");
      return;
    }
    l = e;
    c = i.get().conversationsManager._getConversation(l);
    if (!c) {
      d.error("conversationLiveStateHandler::updateNGCCallState: no conversation found with id = " + l);
      return;
    }
    if (!t.awareness_conversationLiveState || t.awareness_conversationLiveState === "null") {
      b(c);
      return;
    }
    try {
      v = JSON.parse(t.awareness_conversationLiveState);
      n = v.conversationUrl;
      a = v.conversationId;
      h = v.groupCallInitiator;
      p = v.expiration;
    } catch (m) {
      d.error(m);
      return;
    }
    if (n && a) {
      r.clearTimeout(g[c.conversationId]);
      var y = p * 1000 - new Date().getTime();
      d.log("conversationLiveStateHandler::updateNGCCallState: setting timeout for : " + y + " ms");
      y > 0 && (c._setCanJoinNGCCall(!0, h, n, a), g[c.conversationId] = r.setTimeout(b.bind(null, c), y));
    } else
      b(c);
  };
});
