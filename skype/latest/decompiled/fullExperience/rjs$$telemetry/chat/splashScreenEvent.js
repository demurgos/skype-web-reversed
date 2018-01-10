define("telemetry/chat/splashScreenEvent", [
  "require",
  "exports",
  "module",
  "usertiming",
  "experience/settings",
  "swx-constants",
  "swx-telemetry-buckets",
  "ui/telemetry/telemetryClient",
  "swx-utils-chat"
], function (e, t) {
  function c() {
    function p() {
      var e = l, t = f.EXPERIENCE.SPLASH_TIME, r = n.getEntriesByName(a.EXPERIENCE.CONTENT_INIT);
      if (r.length > 0) {
        n.measure(t, a.EXPERIENCE.CONTENT_INIT, a.TIMELINE.SYNC_END_OK);
        var i = n.getEntriesByName(t);
        i && i.length > 0 && (e = i[0].duration);
      } else {
        n.measure(t, a.EXPERIENCE.CONTENT_INIT, a.TIMELINE.SYNC_END_ERROR);
        var s = n.getEntriesByName(t);
        s && s.length > 0 && (e = s[0].duration);
      }
      return e;
    }
    function d() {
      var e = l, t = n.getEntriesByName(f.TIMELINE.TTL), r = n.getEntriesByName(f.TIMELINE.TTL);
      return t && t.length > 0 ? e = t[0].duration : r && r.length > 0 && (e = r[0].duration), e;
    }
    var e = this, t = i.telemetry.splashScreenEvent.TYPE, c, h = {
        isSignInEnabled: l,
        isLearnMoreLinkVisible: l,
        timeToSplash: l,
        timeToSplashGroup: l
      };
    e.startSplashScreenMeasure = function (e, t) {
      c = u.getDate();
      h.isSignInEnabled = typeof e == "undefined" ? l : e;
      h.isLearnMoreLinkVisible = typeof t == "undefined" ? l : t;
    };
    e.publish = function () {
      c && (h.timeToSplash = u.getDate() - c, h.timeToSplashGroup = s.getSecondsDurationGroupFromMs(h.timeToSplash));
      h.timeToContent = p();
      h.timeToContentGroup = s.getSecondsDurationGroupFromMs(h.timeToContent);
      h.timelineTTL = d();
      h.timelineTTLGroup = s.getSecondsDurationGroupFromMs(h.timelineTTL);
      o.get().sendEvent(r.telemetry.chatTenantToken, t, h);
    };
  }
  var n = e("usertiming"), r = e("experience/settings"), i = e("swx-constants").COMMON, s = e("swx-telemetry-buckets"), o = e("ui/telemetry/telemetryClient"), u = e("swx-utils-chat").dateTime, a = i.telemetry.performanceMarks, f = i.telemetry.measurements, l = i.telemetry.NOT_AVAILABLE;
  t.build = function () {
    return new c();
  };
});
