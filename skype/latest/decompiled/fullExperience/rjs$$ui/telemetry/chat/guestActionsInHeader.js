define("ui/telemetry/chat/guestActionsInHeader", [
  "require",
  "exports",
  "module",
  "constants/common",
  "experience/settings",
  "cafe/applicationInstance",
  "usertiming",
  "ui/telemetry/telemetryClient",
  "ui/modelHelpers/personHelper"
], function (e, t) {
  function h() {
    function t(e) {
      if (!n())
        return;
      var t = {
        ttp: c(),
        participantsNumber: e.participantsCount,
        totalMessagesCount: e.totalMessagesCount,
        userMessagesCount: e.userMessagesCount,
        cta: e.cta
      };
      o.get().sendEvent(r.telemetry.uiTenantToken, "chat_guest_headerActions", t);
    }
    function n() {
      return u.isGuest(i.get().personsAndGroupsManager.mePerson);
    }
    function c() {
      s.mark(f.CONVERSATION.TTP);
      s.measure(l.EXPERIENCE.TTL, f.EXPERIENCE.TTL_START, f.CONVERSATION.TTP);
      var e = s.getEntriesByName(l.EXPERIENCE.TTL), t = e && e.length ? e[0].duration : "undefined";
      return s.clearMeasures(l.EXPERIENCE.TTL), s.clearMarks(f.CONVERSATION.TTP), t;
    }
    var e = this;
    return e.onProfileToggled = function (e) {
      e.cta = a.cta.PROFILE_TOGGLED;
      e.telemetryItem === a.telemetryItem.AVATAR ? e.cta = 1 : e.telemetryItem === a.telemetryItem.TOPIC ? e.cta = e.groupProfileExpanded ? 3 : 2 : e.telemetryItem === a.telemetryItem.CHEVRON_DOWN ? e.cta = 4 : e.telemetryItem === a.telemetryItem.CHEVRON_UP && (e.cta = 5);
      t(e);
    }, e.onCopyLinkClicked = function (e) {
      e.cta = a.cta.COPY_LINK;
      e.parent === a.parent.GROUP_PROFILE_VIEW_MODEL ? e.cta = 6 : e.parent === a.parent.HEADER_VIEW_MODEL && (e.cta = 7);
      t(e);
    }, e.onEmailLinkClicked = function (e) {
      e.cta = a.cta.EMAIL_LINK;
      e.parent === a.parent.GROUP_PROFILE_VIEW_MODEL ? e.cta = 8 : e.parent === a.parent.HEADER_VIEW_MODEL && (e.cta = 9);
      t(e);
    }, e.onMediaButtonClicked = function (e) {
      e.cta = 10;
      t(e);
    }, e;
  }
  var n = e("constants/common"), r = e("experience/settings"), i = e("cafe/applicationInstance"), s = e("usertiming"), o = e("ui/telemetry/telemetryClient"), u = e("ui/modelHelpers/personHelper"), a = n.telemetry.guestActionsInHeader, f = n.telemetry.performanceMarks, l = n.telemetry.measurements, c;
  t.get = function () {
    return c || (c = new h()), c;
  };
});
