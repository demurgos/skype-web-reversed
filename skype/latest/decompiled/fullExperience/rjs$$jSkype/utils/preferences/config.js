define("jSkype/utils/preferences/config", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "constants/common",
  "jSkype/services/preferences/autoBuddyProvider",
  "jSkype/services/preferences/profileServiceProvider",
  "jSkype/services/preferences/flagsServiceProvider",
  "jSkype/services/preferences/defaultToTrueFlagProvider",
  "jSkype/services/preferences/callPolicyProvider",
  "jSkype/services/preferences/videoPolicyProvider",
  "jSkype/services/preferences/readReceiptsProvider"
], function (e, t) {
  var n = e("swx-enums"), r = e("constants/common"), i = e("jSkype/services/preferences/autoBuddyProvider"), s = e("jSkype/services/preferences/profileServiceProvider"), o = e("jSkype/services/preferences/flagsServiceProvider"), u = e("jSkype/services/preferences/defaultToTrueFlagProvider"), a = e("jSkype/services/preferences/callPolicyProvider"), f = e("jSkype/services/preferences/videoPolicyProvider"), l = e("jSkype/services/preferences/readReceiptsProvider"), c = r.featureFlags, h = r.userSettings.preferences, p = n.skypeFlagsApiMappings, d = n.preferenceType, v = [];
  v.push({
    featureFlag: c.URL_PREVIEWS,
    id: h.URL_PREVIEWS,
    type: d.Boolean,
    provider: {
      "const": u,
      args: [p.URL_PREVIEWS]
    },
    defaultValue: !0
  }), v.push({
    featureFlag: c.YOUTUBE_PLAYER_ENABLED,
    id: h.YOUTUBE_PLAYER,
    type: d.Boolean,
    provider: {
      "const": o,
      args: [p.YOUTUBE_PLAYER]
    },
    defaultValue: !1
  }), v.push({
    featureFlag: c.URL_PREVIEW_LOAD_YOUTUBE_PLAYER,
    id: h.YOUTUBE_PLAYER,
    type: d.Boolean,
    provider: {
      "const": o,
      args: [p.YOUTUBE_PLAYER]
    },
    defaultValue: !1
  }), v.push({
    featureFlag: c.MENTIONS_ENABLED,
    id: h.MENTIONS,
    type: d.Boolean,
    provider: {
      "const": u,
      args: [p.MENTIONS]
    },
    defaultValue: !0
  }), v.push({
    featureFlag: c.FILE_PASTE_ENABLED,
    id: h.FILE_PASTE,
    type: d.Boolean,
    provider: {
      "const": o,
      args: [p.FILE_PASTE]
    },
    defaultValue: !1
  }), v.push({
    featureFlag: c.SKYPE_CALL_POLICY_SUPPORT,
    id: h.SKYPE_CALL_POLICY_SUPPORT,
    type: d.CallPolicy,
    provider: { "const": a },
    defaultValue: n.privacyPolicyValues.Anyone
  }), v.push({
    featureFlag: c.SKYPE_VIDEO_CALLING_POLICY_SUPPORT,
    id: h.SKYPE_VIDEO_CALLING_POLICY_SUPPORT,
    type: d.VideoPolicy,
    provider: { "const": f },
    defaultValue: n.privacyPolicyValues.Anyone
  }), v.push({
    featureFlag: c.READ_RECEIPT_ENABLED,
    id: h.READ_RECEIPT,
    type: d.Boolean,
    provider: { "const": l },
    defaultValue: !1
  }), v.push({
    featureFlag: c.SHORT_CIRCUIT_SUPPORT,
    id: h.AUTO_BUDDY,
    type: d.AutoBuddy,
    provider: { "const": i },
    defaultValue: !1
  }), v.push({
    featureFlag: c.SHORT_CIRCUIT_SUPPORT,
    id: h.AUTO_BUDDY_DISCOVERY,
    type: d.AutoBuddyDiscovery,
    provider: { "const": s },
    defaultValue: !1,
    disableReporting: !0
  }), t.preferences = v;
})
