define("ui/viewModels/userSettings/preferenceMapping", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "swx-browser-detect"
], function (e, t) {
  var n = e("swx-constants").COMMON.userSettings, r = e("swx-browser-detect").default.BROWSERS;
  t.groups = {
    CONTACTS: {
      id: n.categories.CONTACTS,
      titleI18NKey: "settings_contacts_category_title"
    },
    IM_SETTINGS: {
      id: n.categories.IM_SETTINGS,
      titleI18NKey: "settings_im_settings_category_title"
    },
    IM_APPEARANCE: {
      id: n.categories.IM_APPEARANCE,
      titleI18NKey: "settings_im_appearance_category_title"
    },
    PRIVACY: {
      id: n.categories.PRIVACY,
      titleI18NKey: "settings_privacy_category_title"
    },
    UNLISTED: {
      id: n.categories.UNLISTED,
      titleI18NKey: "settings_unlisted_category_title"
    },
    NOTIFICATIONS: {
      id: n.categories.NOTIFICATIONS,
      titleI18NKey: "settings_notifications_category_title"
    },
    PERSONALIZATION: {
      id: n.categories.PERSONALIZATION,
      titleI18NKey: "settings_personalization_category_title"
    }
  };
  t.templates = {
    TOGGLE: "pref-template-boolean",
    SELECT: "pref-template-select",
    AUTO_BUDDY: "pref-template-autoBuddy",
    AUTO_BUDDY_DISCOVERY: "pref-template-autoBuddyDiscovery",
    NOTIFICATIONS: "pref-template-boolean",
    RINGING_DEFERRER: "pref-template-ringingDeferrer"
  };
  t.mapping = {};
  t.mapping[n.preferences.DYNAMIC_DISCOVERY] = { category: t.groups.CONTACTS.id };
  t.mapping[n.preferences.MENTIONS] = {
    category: t.groups.IM_SETTINGS.id,
    titleKey: "settings_mentionsEnabled_title",
    altTextKey: "settings_mentionsEnabled_alt_text"
  };
  t.mapping[n.preferences.FILE_PASTE] = {
    category: t.groups.IM_SETTINGS.id,
    titleKey: "settings_filePaste_title",
    altTextKey: "settings_filePaste_alt_text",
    supportedBrowsers: [
      r.CHROME,
      r.EDGE,
      r.ELECTRON
    ]
  };
  t.mapping[n.preferences.TYPING_INDICATOR] = {
    category: t.groups.IM_SETTINGS.id,
    titleKey: "settings_typingIndicator_title",
    altTextKey: "settings_typingIndicator_alt_text"
  };
  t.mapping[n.preferences.SKYPE_CALL_POLICY_SUPPORT] = {
    category: t.groups.PRIVACY.id,
    titleKey: "settings_skypeCallPolicy_title",
    altTextKey: ""
  };
  t.mapping[n.preferences.SKYPE_VIDEO_CALLING_POLICY_SUPPORT] = {
    category: t.groups.PRIVACY.id,
    titleKey: "settings_skypeVideoPolicy_title",
    altTextKey: ""
  };
  t.mapping[n.preferences.READ_RECEIPT] = {
    category: t.groups.PRIVACY.id,
    titleKey: "settings_sendReadReceipts_title",
    altTextKey: "settings_sendReadReceipts_alt_text"
  };
  t.mapping[n.preferences.URL_PREVIEWS] = {
    category: t.groups.IM_APPEARANCE.id,
    titleKey: "settings_urlPreview_title",
    altTextKey: "settings_urlPreview_alt_text"
  };
  t.mapping[n.preferences.YOUTUBE_PLAYER] = {
    category: t.groups.IM_SETTINGS.id,
    titleKey: "settings_youtube_player_title",
    altTextKey: "settings_youtube_player_alt_text"
  };
  t.mapping[n.preferences.AUTO_BUDDY] = {
    category: t.groups.CONTACTS.id,
    titleKey: "settings_short_circuit_title",
    template: t.templates.AUTO_BUDDY
  };
  t.mapping[n.preferences.AUTO_BUDDY_DISCOVERY] = {
    category: t.groups.CONTACTS.id,
    template: t.templates.AUTO_BUDDY_DISCOVERY
  };
  t.mapping[n.preferences.NOTIFICATIONS] = {
    category: t.groups.NOTIFICATIONS.id,
    titleKey: "settings_notifications_title",
    altTextKey: "settings_notifications_alt_text"
  };
  t.mapping[n.preferences.NOTIFICATIONS_SOUND] = {
    category: t.groups.NOTIFICATIONS.id,
    titleKey: "settings_notifications_sound_title",
    altTextKey: "settings_notifications_sound_alt_text"
  };
  t.mapping[n.preferences.DEFER_RINGING_SOUND] = {
    category: t.groups.NOTIFICATIONS.id,
    titleKey: "settings_ringing_deferrer_title",
    altTextKey: "settings_ringing_deferrer_alt_text",
    template: t.templates.RINGING_DEFERRER
  };
  t.mapping[n.preferences.CHAT_NOTIFICATIONS_SOUND] = {
    category: t.groups.NOTIFICATIONS.id,
    titleKey: "settings_chat_notifications_sound_title",
    altTextKey: "settings_chat_notifications_sound_alt_text"
  };
  t.mapping[n.preferences.CALL_NOTIFICATIONS] = {
    category: t.groups.NOTIFICATIONS.id,
    titleKey: "settings_call_notifications_title",
    altTextKey: "settings_call_notifications_alt_text"
  };
  t.mapping[n.preferences.CALL_NOTIFICATIONS_SOUND] = {
    category: t.groups.NOTIFICATIONS.id,
    titleKey: "settings_call_notifications_sound_title",
    altTextKey: "settings_call_notifications_sound_alt_text"
  };
  t.mapping[n.preferences.EMOTICON_SUGGESTIONS] = {
    category: t.groups.IM_SETTINGS.id,
    titleKey: "settings_emoticonSuggestions_title",
    altTextKey: "settings_emoticonSuggestions_alt_text"
  };
  t.mapping[n.preferences.SHOW_EMOTICONS] = {
    category: t.groups.IM_APPEARANCE.id,
    titleKey: "settings_showEmoticons_title",
    altTextKey: "settings_showEmoticons_alt_text"
  };
  t.mapping[n.preferences.SHOW_ANIMATED_EMOTICONS] = {
    category: t.groups.IM_APPEARANCE.id,
    titleKey: "settings_showAnimatedEmoticons_title",
    altTextKey: "settings_showAnimatedEmoticons_alt_text"
  };
  t.mapping[n.preferences.SHOW_LARGE_EMOTICONS] = {
    category: t.groups.IM_APPEARANCE.id,
    titleKey: "settings_showLargeEmoticons_title",
    altTextKey: "settings_showLargeEmoticons_alt_text"
  };
  t.mapping[n.preferences.DARK_THEME] = {
    category: t.groups.PERSONALIZATION.id,
    titleKey: "settings_dark_theme",
    altTextKey: "settings_dark_theme_alt_text"
  };
  t.mapping[n.preferences.VIDEO_AUTOPLAY] = {
    category: t.groups.PERSONALIZATION.id,
    titleKey: "settings_video_autoplay",
    altTextKey: "settings_video_autoplay_alt_text"
  };
});
