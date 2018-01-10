define("ui/viewModels/me/moodMessage", [
  "require",
  "vendor/knockout",
  "swx-constants",
  "swx-cafe-application-instance",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "swx-service-locator-instance",
  "swx-i18n",
  "swx-constants",
  "swx-utils-chat",
  "utils/common/eventHelper"
], function (e) {
  function c() {
    function v() {
      e.activity(c.activity());
    }
    function m() {
      var t = e.activity();
      return t ? t : d;
    }
    function g() {
      var t = e.editableActivity(), n = e.currentActivityTitle(), r;
      return t !== n && (t = y(t), r = c.activity.set(t), h.recordAction(i.me.activityChanged, {
        source: s.me.area,
        oldActivity: n,
        newActivity: t
      })), r || Promise.resolve();
    }
    function y(e) {
      return f.escapeOutgoingHTML(e);
    }
    var e = this, c = r.get().personsAndGroupsManager.mePerson, h = o.resolve(n.serviceLocator.ACTION_TELEMETRY), p = o.resolve(n.serviceLocator.FEATURE_FLAGS), d = u.fetch({ key: "me_input_text_activity_message_placeholder" });
    e.editMode = t.observable(!1);
    e.activity = t.observable("");
    e.currentActivityMessage = t.computed(m);
    e.currentActivityTitle = t.computed(function () {
      return f.stripHTML(e.currentActivityMessage());
    });
    e.editableActivity = t.observable("");
    e.isEnabled = function () {
      return p.isFeatureOn(n.featureFlags.MOOD_MESSAGE_EDIT_ENABLED);
    };
    e.updateMoodButtonClick = function () {
      return g().then(function () {
        e.editMode(!1);
      }), !0;
    };
    e.toggleEditMode = function () {
      var t = e.editMode();
      t || (e.currentActivityMessage() !== d ? e.editableActivity(e.currentActivityTitle()) : e.editableActivity(""));
      e.editMode(!t);
    };
    e.onEditMoodKeyDown = function (t, n) {
      switch (n.keyCode) {
      case a.ENTER:
        return g().then(function () {
          e.editMode(!1);
        }), !1;
      case a.ESCAPE:
        return e.editMode(!1), !1;
      }
      return !0;
    };
    e.onUpdateMoodKeyDown = function (t, n) {
      var r = l.isActivation(n);
      return r && g().then(function () {
        e.editMode(!1);
      }), !r;
    };
    e.onCancelUpdateMoodKeyDown = function (t, n) {
      var r = l.isActivation(n);
      return r && e.editMode(!1), !r;
    };
    e.init = function () {
      c.activity.changed(v);
    };
    e.dispose = function () {
      c.activity.changed.off(v);
      e.currentActivityMessage.dispose();
      e.currentActivityTitle.dispose();
    };
  }
  var t = e("vendor/knockout"), n = e("swx-constants").COMMON, r = e("swx-cafe-application-instance"), i = e("ui/telemetry/actions/actionNames"), s = e("ui/telemetry/actions/actionSources"), o = e("swx-service-locator-instance").default, u = e("swx-i18n").localization, a = e("swx-constants").KEYS, f = e("swx-utils-chat").messageSanitizer, l = e("utils/common/eventHelper");
  return c.build = function (e, t) {
    return new c(e, t);
  }, c;
});
