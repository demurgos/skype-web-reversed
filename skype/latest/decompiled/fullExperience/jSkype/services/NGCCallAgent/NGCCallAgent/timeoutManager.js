define("jSkype/services/NGCCallAgent/NGCCallAgent/timeoutManager", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), r = function (e) {
      var r = this, i = {}, s = e.logger;
      r.startTimer = function (e, r, o) {
        s.log("startTimer called for : " + e);
        var u = 0;
        switch (e) {
        case t.TIMEOUT_OPERATIONS.ADD_PARTICIPANT:
          n.assertNotNullOrEmpty(o, "remoteParticipantId must be specified for : " + e), u = t.TIMEOUT_VALUES_IN_SECONDS.ADD_PARTICIPANT_TIMEOUT * 1000, e = e + "_" + o;
          break;
        case t.TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT:
          n.assertNotNullOrEmpty(o, "remoteParticipantId must be specified for : " + e), u = t.TIMEOUT_VALUES_IN_SECONDS.REMOVE_PARTICIPANT_TIMEOUT * 1000, e = e + "_" + o;
          break;
        case t.TIMEOUT_OPERATIONS.INCOMING_CALL_ESTABLISHMENT:
          u = t.TIMEOUT_VALUES_IN_SECONDS.INCOMING_CALL_ESTABLISHMENT_TIMEOUT * 1000;
          break;
        case t.TIMEOUT_OPERATIONS.OUTGOING_CALL_ESTABLISHMENT:
          u = t.TIMEOUT_VALUES_IN_SECONDS.OUTGOING_CALL_ESTABLISHMENT_TIMEOUT * 1000;
          break;
        case t.TIMEOUT_OPERATIONS.MEDIA_ANSWER:
          u = t.TIMEOUT_VALUES_IN_SECONDS.MEDIA_ANSWER_TIMEOUT * 1000;
          break;
        case t.TIMEOUT_OPERATIONS.MEDIA_ANSWER_ACKNOWLEDGEMENT:
          u = t.TIMEOUT_VALUES_IN_SECONDS.MEDIA_ANSWER_ACKNOWLEDGEMENT_TIMEOUT * 1000;
          break;
        default:
          return;
        }
        var a = setTimeout(r, u);
        i[e] = a;
      }, r.stopTimer = function (e, r) {
        switch (e) {
        case t.TIMEOUT_OPERATIONS.ADD_PARTICIPANT:
        case t.TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT:
          n.assertNotNullOrEmpty(r, "remoteParticipantId must be specified for : " + e), e = e + "_" + r;
          break;
        default:
        }
        s.log("stopTimer called for : " + e), i.hasOwnProperty(e) && (clearTimeout(i[e]), delete i[e]);
      }, r.dispose = function () {
        s.log("timeoutManager :: dispose");
        for (var e in i)
          i.hasOwnProperty(e) && r.stopTimer(e);
      };
    };
  return r;
})
