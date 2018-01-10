define("ui/contextMenu/items/scheduleCall", [
  "require",
  "exports",
  "module",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-service-locator-instance",
  "swx-constants",
  "constants/cssClasses",
  "ui/telemetry/actions/actionNames",
  "ui/modalDialog/modalDialog",
  "ui/viewModels/chat/scheduleCallModal",
  "text!views/chat/scheduleCallModal.html",
  "ui/educationBubbles/educationBubble",
  "ui/educationBubbles/educationBubbleInfo"
], function (e, t) {
  function p(e) {
    function v() {
      m();
      g();
    }
    function m() {
      var t = f.build(e), r = n.fetch({ key: "modal_scheduleCall_text_aria_label" });
      a.build(f.ELEMENT_ID, t, l);
      a.show(f.ELEMENT_ID, r);
    }
    function g() {
      var e = i.resolve(s.serviceLocator.ACTION_TELEMETRY);
      e.recordAction(u.conversation.scheduleCallButton);
    }
    function y() {
      var e = h.SCHEDULE_CALL_EDUCATION_BUBBLE_2, t = i.resolve(s.serviceLocator.FEATURE_FLAGS);
      t.isFeatureOn(s.featureFlags.SCHEDULE_CALL_EDUCATION_BUBBLE_2) && (d = c.build(e.id, e.anchorElementQuery, e.i18nKey, e.iconUrlPath, e.options), d.show());
    }
    var p = n.fetch({ key: "actionsMenuItem_text_scheduleCall" }), d;
    r.call(this, t.TYPE, p, v);
    y();
    this.cssClass = o.contextMenu.items.SCHEDULE_CALL;
    this.dispose = function () {
      d && d.hide();
    };
  }
  var n = e("swx-i18n").localization, r = e("ui/contextMenu/menuItem"), i = e("swx-service-locator-instance").default, s = e("swx-constants").COMMON, o = e("constants/cssClasses"), u = e("ui/telemetry/actions/actionNames"), a = e("ui/modalDialog/modalDialog"), f = e("ui/viewModels/chat/scheduleCallModal"), l = e("text!views/chat/scheduleCallModal.html"), c = e("ui/educationBubbles/educationBubble"), h = e("ui/educationBubbles/educationBubbleInfo");
  p.prototype = Object.create(r.prototype);
  t.TYPE = "ScheduleCallMenuItem";
  t.build = function (e) {
    return new p(e);
  };
});
