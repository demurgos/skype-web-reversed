define("jSkype/services/NGCCallAgent/NGCCallAgent/signalingAgent", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/signalingSession",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants",
  "constants/common",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils"
], function (e) {
  function s(e) {
    var s = this, o = {}, u = e.logger.createChild("SignalingAgent");
    i.assertNotNull(e, "signalingAgentConfig should be a non null value"), this.getNewSignalingSession = function (n, r) {
      i.assertNotNull(n, "selfParticipant should be a non null value"), i.assertNotNull(r, "signalingSessionCallback should be a non null value");
      var a = i.newGuid();
      i.assertNotNullOrEmpty(a, "signalingSession id generated cannot be null or empty");
      var f = t.build(n, r, e, a, s);
      return o[a] = f, u.log("created new signalingSession with id " + a), f;
    }, this.handleIncomingNotification = function (e) {
      i.assertNotNull(e, "request should be a non null value"), u.log("handleIncomingNotification to : " + e.url);
      if (!e.body)
        return u.error("request has no body"), r.badRequest;
      var t = r.OK, s = e.url.match(new RegExp("/" + i.escapeRegExp(n.URL_BASE.CALLAGENT) + "/+([^/]+)", "i"));
      if (s) {
        var a = s[1];
        o.hasOwnProperty(a) ? o[a].handleIncomingMsgAsync(e).catch(function (e) {
          u.error("handling IncomingMsg failed with error: " + e);
        }) : (u.log("Incoming message for call id " + a + ". But call not found !"), t = r.notFound);
      } else
        u.error("could not retrieve callId from Url path . Path = " + e.url), t = r.badRequest;
      return t;
    }, this.onCallCompleted = function (e) {
      o.hasOwnProperty(e) ? (delete o[e], u.log("Call id " + e + " found. Deleted from signalingSession table")) : u.error("Call id " + e + " not found. Could not delete from signalingSession table");
    };
  }
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/signalingSession"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), r = e("constants/common").httpStatusCodes, i = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils");
  return s;
})
