define("ui/contextMenu/items/leaveConversation", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "ui/modalDialog/leaveConversationDialog",
  "swx-constants"
], function (e) {
  function s(e) {
    function u() {
      r.start(e, i.TIMELINE_MENU);
    }
    if (!e)
      throw new Error("Parameter missing: conversation is required");
    var o = t.fetch({ key: "recentItemMenuItem_text_leave" });
    n.call(this, s.TYPE, o, u);
    this.isEnabled = function () {
      return r.canLeaveConversation(e);
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("ui/modalDialog/leaveConversationDialog"), i = e("swx-constants").COMMON.telemetry.removeConversationHistory.cta;
  return s.prototype = Object.create(n.prototype), s.TYPE = "LeaveConversationMenuItem", s;
});
