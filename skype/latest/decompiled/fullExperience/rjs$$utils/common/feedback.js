define("utils/common/feedback", [
  "require",
  "exports",
  "module",
  "experience/settings",
  "browser/detect",
  "ui/session/localSession",
  "cafe/applicationInstance",
  "swx-i18n"
], function (e, t) {
  var n = e("experience/settings"), r = e("browser/detect"), i = e("ui/session/localSession"), s = e("cafe/applicationInstance"), o = e("swx-i18n").localization;
  t.getFeedbackPageUrl = function () {
    var e = n.platformId, t = n.version, u = n.initParams.locale, a = s.get().personsAndGroupsManager.mePerson.id(), f = n.biAppName, l = n.initParams.correlationIds.hostProperty, c, h, p, d, v, m;
    return n.feedbackPageUrl.indexOf("mailto:") === 0 ? (v = r.getBrowserInfo(), d = String.fromCharCode(10), h = o.fetch({ key: "giveFeedback_subject" }), p = o.fetch({ key: "giveFeedback_body" }), p += d + d, p += d + "-------------------------------", p += d + "Skype Version: " + t, p += d + "Browser Name: " + v.browserName, p += d + "Browser Version: " + v.browserMajorVersion, p += d + "Language: " + u, p += d + "Property: " + f, p += d + "Session Id: " + (i.getSessionId() || ""), p += d + "Tab Session Id: " + (i.getTabSessionId() || ""), p += d + "Host Property: " + l, p += d + "Host User Id: " + n.initParams.correlationIds.userId, p += d + "Host Session Id: " + n.initParams.correlationIds.sessionId, m = n.feedbackPageUrl + "?subject=" + encodeURIComponent(h) + "&body=" + encodeURIComponent(p)) : (c = {
      userId: n.initParams.correlationIds.userId,
      sessionId: n.initParams.correlationIds.sessionId
    }, m = n.feedbackPageUrl + "?p=" + encodeURIComponent(e) + "&v=" + encodeURIComponent(t) + "&lang=" + encodeURIComponent(u) + "&e=" + encodeURIComponent(f), a && (m += "&u=" + encodeURIComponent(a)), l && (m += "&tag=" + encodeURIComponent(l)), m += "&tcg=" + encodeURIComponent(JSON.stringify(c))), m;
  }, t.getFeedbackPageTarget = function () {
    return n.feedbackPageUrl.indexOf("mailto:") === 0 ? "_self" : "_blank";
  };
})
