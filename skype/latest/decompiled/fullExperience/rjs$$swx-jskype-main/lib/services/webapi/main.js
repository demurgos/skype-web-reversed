(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/webapi/main", [
      "require",
      "exports",
      "swx-chat-service",
      "swx-browser-detect",
      "usertiming",
      "swx-jskype-internal-application-instance",
      "../internalPubSub",
      "../serviceAccessLayer/qos/reporter",
      "../../telemetry/endpointsTelemetry",
      "../../utils/chat/endpointsDataProvider",
      "../../telemetry/analytics",
      "../../services/cache/instance",
      "../../services/serviceAccessLayer/transientFaultPolicy",
      "../../utils/chat/conversation"
    ], e);
}(function (e, t) {
  function v(e) {
    if (!d) {
      var t = s.get();
      d = n["default"](e, h, t.signInManager, t.personsAndGroupsManager.mePerson, o.get(), t._standbyMode, t._telemetry, c, i, u, a, f, l, r["default"], p.getSyncStateFromResponse);
    }
    return d;
  }
  var n = e("swx-chat-service"), r = e("swx-browser-detect"), i = e("usertiming"), s = e("swx-jskype-internal-application-instance"), o = e("../internalPubSub"), u = e("../serviceAccessLayer/qos/reporter"), a = e("../../telemetry/endpointsTelemetry"), f = e("../../utils/chat/endpointsDataProvider"), l = e("../../telemetry/analytics"), c = e("../../services/cache/instance"), h = e("../../services/serviceAccessLayer/transientFaultPolicy"), p = e("../../utils/chat/conversation"), d;
  t.getInstance = v;
}));
