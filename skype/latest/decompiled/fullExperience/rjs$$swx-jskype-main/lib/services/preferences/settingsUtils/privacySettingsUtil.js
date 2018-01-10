(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/preferences/settingsUtils/privacySettingsUtil", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-constants",
      "swx-enums",
      "jskype-settings-instance",
      "swx-log-tracer",
      "swx-utils-chat",
      "swx-constants",
      "swx-browser-detect"
    ], e);
}(function (e, t) {
  function c(e) {
    return s.isFeatureOn(r.COMMON.featureFlags.SKYPE_CALL_POLICY_SUPPORT) ? e.isGroupConversation() ? Promise.resolve(!0) : v(e.participants(0), r.COMMON.userSettings.preferences.SKYPE_CALL_POLICY_SUPPORT) : Promise.resolve(!0);
  }
  function h(e) {
    return s.isFeatureOn(r.COMMON.featureFlags.SKYPE_VIDEO_CALLING_POLICY_SUPPORT) ? v(e, r.COMMON.userSettings.preferences.SKYPE_VIDEO_CALLING_POLICY_SUPPORT) : Promise.resolve(!0);
  }
  function p(e) {
    if (e.value.state() === i.preferenceValueState.Defined)
      return Promise.resolve(e.value());
    if (f["default"].getBrowserInfo().isShellApp)
      return Promise.resolve(i.privacyPolicyValues.Anyone);
    var t = new Promise(function (e, t) {
      setTimeout(t, s.settings.userSettings.privacySettingsFetchTimeout);
    });
    return Promise.race([
      e.value.get(),
      t
    ]);
  }
  function d(e, t) {
    var n = e.person._authorization._value === a.PEOPLE.authorizationStates.AUTHORIZED;
    return t === i.privacyPolicyValues.Anyone || t === i.privacyPolicyValues.ContactsOnly && n;
  }
  function v(e, t) {
    var r = n.get().personsAndGroupsManager;
    if (u.participant.isMeParticipant(e, r))
      return Promise.resolve(!0);
    var i = r.mePerson.preferences(t);
    return i ? p(i).then(function (n) {
      var r = d(e, n);
      return l.log("[Settings Manager] Privacy settings for " + t + " is " + r), r;
    })["catch"](function () {
      return l.log("[Settings Manager] Could not reach privacy settings within " + s.settings.userSettings.privacySettingsFetchTimeout + " ms"), !0;
    }) : Promise.resolve(!0);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-constants"), i = e("swx-enums"), s = e("jskype-settings-instance"), o = e("swx-log-tracer"), u = e("swx-utils-chat"), a = e("swx-constants"), f = e("swx-browser-detect"), l = o.getLogger("Settings");
  t.checkCallPolicySettings = c;
  t.checkVideoPolicySettings = h;
}));
