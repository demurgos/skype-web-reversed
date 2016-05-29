define("jSkype/services/preferences/settingsUtils/privacySettingsUtil", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "constants/common",
  "swx-enums",
  "jSkype/settings",
  "utils/common/logTracer/api",
  "jSkype/modelHelpers/participantHelper",
  "constants/people",
  "browser/detect"
], function (e, t) {
  function c(e) {
    if (e.value.state() === i.preferenceValueState.Defined)
      return Promise.resolve(e.value());
    if (f.getBrowserInfo().isShellApp)
      return Promise.resolve(i.privacyPolicyValues.Anyone);
    var t = new Promise(function (e, t) {
      setTimeout(t, s.settings.userSettings.privacySettingsFetchTimeout);
    });
    return Promise.race([
      e.value.get(),
      t
    ]);
  }
  function h(e, t) {
    var n = e.person._authorization._value === a.authorizationStates.AUTHORIZED;
    return t === i.privacyPolicyValues.Anyone || t === i.privacyPolicyValues.ContactsOnly && n;
  }
  function p(e, t) {
    if (u.isMeParticipant(e))
      return Promise.resolve(!0);
    var r = n.get().personsAndGroupsManager.mePerson.preferences(t);
    return r ? c(r).then(function (n) {
      var r = h(e, n);
      return l.log("[Settings Manager] Privacy settings for " + t + " is " + r), r;
    }).catch(function () {
      return l.log("[Settings Manager] Could not reach privacy settings within " + s.settings.userSettings.privacySettingsFetchTimeout + " ms"), !0;
    }) : Promise.resolve(!0);
  }
  var n = e("jSkype/client"), r = e("constants/common"), i = e("swx-enums"), s = e("jSkype/settings"), o = e("utils/common/logTracer/api"), u = e("jSkype/modelHelpers/participantHelper"), a = e("constants/people"), f = e("browser/detect"), l = o.getLogger("Settings");
  t.checkCallPolicySettings = function (e) {
    return s.isFeatureOn(r.featureFlags.SKYPE_CALL_POLICY_SUPPORT) ? e.isGroupConversation() ? Promise.resolve(!0) : p(e.participants(0), r.userSettings.preferences.SKYPE_CALL_POLICY_SUPPORT) : Promise.resolve(!0);
  };
  t.checkVideoPolicySettings = function (e) {
    return s.isFeatureOn(r.featureFlags.SKYPE_VIDEO_CALLING_POLICY_SUPPORT) ? p(e, r.userSettings.preferences.SKYPE_VIDEO_CALLING_POLICY_SUPPORT) : Promise.resolve(!0);
  };
});
