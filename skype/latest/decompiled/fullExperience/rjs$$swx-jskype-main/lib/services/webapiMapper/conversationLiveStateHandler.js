(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/webapiMapper/conversationLiveStateHandler", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../lib/utils/chat/parser",
      "swx-browser-globals",
      "jskype-settings-instance",
      "swx-constants",
      "swx-browser-detect",
      "swx-log-tracer",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function b(e, t) {
    var i = e.match(p);
    if (!i)
      return;
    y.log("P2P Live state update", { content: e });
    var s = i[1], o = i[2], u = i[3], a = i[5] * h, f = i[6];
    if (s !== l)
      return;
    var d = r.getConversationIdFromUrl(t), v = n.get().conversationsManager._getConversation(d);
    if (!v) {
      y.warn("Unable to find conversation");
      return;
    }
    u === c ? N(a, f, o, v) : k(v);
  }
  function w(e, t) {
    var r = null, f = null, l = null, c = null, h = a.getLogger("NGCBlackBar"), p = i.getWindow();
    if (!s.isFeatureOn(o.COMMON.featureFlags.GVC_JOINING)) {
      h.log("conversationLiveStateHandler:updateNGCCallState: GVC Joining not supported");
      return;
    }
    if (!s.isFeatureOn(o.COMMON.featureFlags.NG_CALLING)) {
      h.log("conversationLiveStateHandler:updateNGCCallState: NGC caling not supported");
      return;
    }
    if (u["default"].getBrowserInfo().browserName === u["default"].BROWSERS.SKYPE_SHELL)
      return;
    if (!t) {
      h.log("conversationLiveStateHandler:updateNGCCallState: GVC Joining is supported but no awareness_conversationLiveState");
      return;
    }
    var d = e, v = n.get().conversationsManager._getConversation(d);
    if (!v) {
      h.log("conversationLiveStateHandler::updateNGCCallState: no conversation found", "with id =   ", d);
      return;
    }
    if (!t.awareness_conversationLiveState || t.awareness_conversationLiveState === "null") {
      E(v);
      return;
    }
    if (!v.activeModalities.chat()) {
      h.log("conversationLiveStateHandler:updateNGCCallState: The conversation is inactive (e.g. user was removed)");
      E(v);
      return;
    }
    try {
      var m = JSON.parse(t.awareness_conversationLiveState);
      r = m.conversationUrl;
      f = m.conversationId;
      l = m.groupCallInitiator;
      c = m.expiration;
    } catch (y) {
      h.error(y);
      return;
    }
    if (r && f) {
      p.clearTimeout(g[v.conversationId]);
      var b = c * 1000 - new Date().getTime();
      h.log("conversationLiveStateHandler::updateNGCCallState: setting timeout for : " + b + " ms");
      b > 0 && (v._setCanJoinNGCCall(!0, l, r, f), g[v.conversationId] = p.setTimeout(E.bind(null, v), b));
    } else
      E(v);
  }
  function E(e) {
    g.hasOwnProperty(e.conversationId) && (i.getWindow().clearTimeout(g[e.conversationId]), e._setCanJoinNGCCall(!1));
  }
  function S(e) {
    try {
      return JSON.parse(e);
    } catch (t) {
      return null;
    }
  }
  function x(e) {
    return e.filter(function (e) {
      return v.indexOf(e.VoiceStatus) !== -1;
    });
  }
  function T(e) {
    return f.isArray(e.Participants) ? x(e.Participants).length > 0 : !1;
  }
  function N(e, t, n, r) {
    var i = S(t);
    if (u["default"].getBrowserInfo().browserName === u["default"].BROWSERS.SKYPE_SHELL)
      return;
    if (i) {
      if (i.AccessToken === m)
        return;
      r._setCanJoinCall(T(i), n, i);
      C(e, r);
      y.log("Enabling P2P black bar");
    } else
      y.error("Unable to enable P2P black bar, wrong/missing payload");
  }
  function C(e, t) {
    i.getWindow().clearTimeout(g[t.conversationId]);
    g[t.conversationId] = i.getWindow().setTimeout(k.bind(null, t), e);
  }
  function k(e) {
    if (u["default"].getBrowserInfo().browserName === u["default"].BROWSERS.SKYPE_SHELL)
      return;
    i.getWindow().clearTimeout(g[e.conversationId]);
    e._setCanJoinCall(!1);
    y.log("Disabling P2P black bar");
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../lib/utils/chat/parser"), i = e("swx-browser-globals"), s = e("jskype-settings-instance"), o = e("swx-constants"), u = e("swx-browser-detect"), a = e("swx-log-tracer"), f = e("lodash-compat"), l = "2", c = "1", h = 1000, p = /1\/([12])\s([^ ]*)\s([01])(\s(\d*)\s(\{(.|[\r\n])*\}))?/, d = {
      PARSING_ERROR: "Could not properly parse LiveState message !",
      WRONG_VERSION: "Could not properly parse LiveState message - wrong version. We need JSON payload version !",
      WRONG_PAYLOAD: "Could not properly parse LiveState payload !",
      WRONG_PARTICIPANTS_FORMAT: "Participants were not provided so live state could not be obtained !"
    }, v = [
      4,
      6,
      7,
      8
    ], m = "NgAccessToken", g = {}, y = a.getLogger("P2PBlackBar");
  t.updateCallState = b;
  t.updateNGCCallState = w;
}));
