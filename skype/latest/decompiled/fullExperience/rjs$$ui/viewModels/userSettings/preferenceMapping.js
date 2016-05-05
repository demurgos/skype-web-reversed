define("ui/viewModels/userSettings/preferenceMapping", [
  "require",
  "exports",
  "module",
  "constants/common",
  "browser/detect"
], function (e, t) {
  var n = e("constants/common").userSettings, r = e("browser/detect").BROWSERS;
  t.groups = {
    CONTACTS: {
      id: n.categories.CONTACTS,
      titleI18NKey: "settings_contacts_category_title"
    },
    MESSAGING: {
      id: n.categories.MESSAGING,
      titleI18NKey: "settings_messaging_category_title"
    },
    PRIVACY: {
      id: n.categories.PRIVACY,
      titleI18NKey: "settings_privacy_category_title"
    },
    UNLISTED: {
      id: n.categories.UNLISTED,
      titleI18NKey: "settings_unlisted_category_title"
    }
  }, t.templates = {
    TOGGLE: "pref-template-boolean",
    SELECT: "pref-template-select",
    AUTO_BUDDY: "pref-template-autoBuddy",
    AUTO_BUDDY_DISCOVERY: "pref-template-autoBuddyDiscovery"
  }, t.mapping = {}, t.mapping[n.preferences.DYNAMIC_DISCOVERY] = { category: t.groups.CONTACTS.id }, t.mapping[n.preferences.MENTIONS] = {
    category: t.groups.MESSAGING.id,
    titleKey: "settings_mentionsEnabled_title",
    altTextKey: "settings_mentionsEnabled_alt_text"
  }, t.mapping[n.preferences.FILE_PASTE] = {
    category: t.groups.MESSAGING.id,
    titleKey: "settings_filePaste_title",
    altTextKey: "settings_filePaste_alt_text",
    supportedBrowsers: [
      r.CHROME,
      r.EDGE
    ]
  }, t.mapping[n.preferences.SKYPE_CALL_POLICY_SUPPORT] = {
    category: t.groups.PRIVACY.id,
    titleKey: "settings_skypeCallPolicy_title",
    altTextKey: ""
  }, t.mapping[n.preferences.SKYPE_VIDEO_CALLING_POLICY_SUPPORT] = {
    category: t.groups.PRIVACY.id,
    titleKey: "settings_skypeVideoPolicy_title",
    altTextKey: ""
  }, t.mapping[n.preferences.READ_RECEIPT] = {
    category: t.groups.PRIVACY.id,
    titleKey: "settings_sendReadReceipts_title",
    altTextKey: "settings_sendReadReceipts_alt_text"
  }, t.mapping[n.preferences.URL_PREVIEWS] = {
    category: t.groups.MESSAGING.id,
    titleKey: "settings_urlPreview_title",
    altTextKey: "settings_urlPreview_alt_text"
  }, t.mapping[n.preferences.YOUTUBE_PLAYER] = {
    category: t.groups.MESSAGING.id,
    titleKey: "settings_youtube_player_title",
    altTextKey: "settings_youtube_player_alt_text"
  }, t.mapping[n.preferences.AUTO_BUDDY] = {
    category: t.groups.CONTACTS.id,
    titleKey: "settings_short_circuit_title",
    template: t.templates.AUTO_BUDDY
  }, t.mapping[n.preferences.AUTO_BUDDY_DISCOVERY] = {
    category: t.groups.CONTACTS.id,
    template: t.templates.AUTO_BUDDY_DISCOVERY
  };
})
