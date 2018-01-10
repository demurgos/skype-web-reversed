(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/timeoutManager", [
      "require",
      "exports",
      "./utilities/constants",
      "./utilities/utils"
    ], e);
}(function (e, t) {
  var n = e("./utilities/constants"), r = e("./utilities/utils"), i = function () {
      function e(e) {
        var t = this;
        this.timers = {};
        this.startTimer = function (e, i, s) {
          t.logger.log("startTimer called for : " + e);
          var o = 0;
          switch (e) {
          case n["default"].TIMEOUT_OPERATIONS.ADD_PARTICIPANT:
            r.assertNotNullOrEmpty(s, "remoteParticipantId must be specified for : " + e), o = n["default"].TIMEOUT_VALUES_IN_SECONDS.ADD_PARTICIPANT_TIMEOUT * 1000, e = e + "_" + s;
            break;
          case n["default"].TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT:
            r.assertNotNullOrEmpty(s, "remoteParticipantId must be specified for : " + e), o = n["default"].TIMEOUT_VALUES_IN_SECONDS.REMOVE_PARTICIPANT_TIMEOUT * 1000, e = e + "_" + s;
            break;
          case n["default"].TIMEOUT_OPERATIONS.INCOMING_CALL_ESTABLISHMENT:
            o = n["default"].TIMEOUT_VALUES_IN_SECONDS.INCOMING_CALL_ESTABLISHMENT_TIMEOUT * 1000;
            break;
          case n["default"].TIMEOUT_OPERATIONS.OUTGOING_CALL_ESTABLISHMENT:
            o = n["default"].TIMEOUT_VALUES_IN_SECONDS.OUTGOING_CALL_ESTABLISHMENT_TIMEOUT * 1000;
            break;
          case n["default"].TIMEOUT_OPERATIONS.MEDIA_ANSWER:
            o = n["default"].TIMEOUT_VALUES_IN_SECONDS.MEDIA_ANSWER_TIMEOUT * 1000;
            break;
          case n["default"].TIMEOUT_OPERATIONS.MEDIA_ANSWER_ACKNOWLEDGEMENT:
            o = n["default"].TIMEOUT_VALUES_IN_SECONDS.MEDIA_ANSWER_ACKNOWLEDGEMENT_TIMEOUT * 1000;
            break;
          case n["default"].TIMEOUT_OPERATIONS.ADD_MODALITY:
            o = n["default"].TIMEOUT_VALUES_IN_SECONDS.ADD_MODALITY_TIMEOUT * 1000;
            break;
          case n["default"].TIMEOUT_OPERATIONS.UNMUTE:
            o = n["default"].TIMEOUT_VALUES_IN_SECONDS.UNMUTE_TIMEOUT * 1000;
            break;
          default:
            return;
          }
          var u = setTimeout(i, o);
          t.timers[e] = u;
        };
        this.stopTimer = function (e, i) {
          switch (e) {
          case n["default"].TIMEOUT_OPERATIONS.ADD_PARTICIPANT:
          case n["default"].TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT:
            r.assertNotNullOrEmpty(i, "remoteParticipantId must be specified for : " + e), e = e + "_" + i;
            break;
          default:
          }
          t.logger.log("stopTimer called for : " + e);
          t.timers.hasOwnProperty(e) && (clearTimeout(t.timers[e]), delete t.timers[e]);
        };
        this.dispose = function () {
          t.logger.log("timeoutManager :: dispose");
          for (var e in t.timers)
            t.timers.hasOwnProperty(e) && t.stopTimer(e);
        };
        this.logger = e.logger;
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));
