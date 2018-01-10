(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-web-calling/lib/callEndReasonMapping", [
      "require",
      "exports",
      "swx-constants",
      "swx-enums",
      "web-calling"
    ], e);
}(function (e, t) {
  function s(e) {
    return {
      local: o(e),
      remote: u(e)
    };
  }
  function o(e) {
    if (e.explicitEndCallReason)
      return e.explicitEndCallReason;
    if (e.isIncoming) {
      if (!e.wasConnected && !e.info.remote && e.endCallReason === "cancelCall")
        return r.callDisconnectionReason.Canceled;
      if (!e.wasConnected && !e.info.remote && e.endCallReason === "rejectCall")
        return r.callDisconnectionReason.Busy;
      if (f(e.reason))
        return r.callDisconnectionReason.Missed;
    }
    return r.callDisconnectionReason.Terminated;
  }
  function u(e) {
    if (!e.isIncoming && e.oneToOne) {
      if (f(e.reason))
        return r.callDisconnectionReason.Missed;
      if (a(e.info.subCode))
        return l(e.info);
      if (!e.wasConnected && e.info.remote)
        return r.callDisconnectionReason.Busy;
    }
    return r.callDisconnectionReason.Terminated;
  }
  function a(e) {
    return e >= n.CALLING.PLUGINLESS_PSTN.END_REASONS.SUBCODE_RANGE.MIN && e <= n.CALLING.PLUGINLESS_PSTN.END_REASONS.SUBCODE_RANGE.MAX;
  }
  function f(e) {
    return e === i.TerminatedReason.Cancelled || e === i.TerminatedReason.CallEstablismentTimeout;
  }
  function l(e) {
    var t = e.subCode - n.CALLING.PLUGINLESS_PSTN.END_REASONS.SUBCODE_RANGE.MIN, i = n.CALLING.PLUGINLESS_PSTN.END_REASONS.REASON_MAP;
    return i[e.code] && i[e.code][t] ? i[e.code][t] : r.callDisconnectionReason.Terminated;
  }
  var n = e("swx-constants"), r = e("swx-enums"), i = e("web-calling");
  t.getCallEndReasons = s;
}));
