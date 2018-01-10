(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-constants/lib/common", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.__esModule = !0;
  t["default"] = {
    storageKeys: {
      ENDPOINT_ID: "endpointId",
      PRESENCE_DATA: "presenceData",
      RESURECTION_KEY: "isResurected",
      RECENT_COUNTRY: "swx|recentCountry",
      AAD_TOKEN_EXPIRED: "aadTokenExpired",
      CHAT_NOTIFICATIONS_SETTINGS_KEY: "chatNotificationsMuted",
      NOTIFICATIONS_SOUND_SETTINGS_KEY: "notificationsSoundMuted",
      CHAT_NOTIFICATIONS_SOUND_SETTINGS_KEY: "chatNotificationsSoundMuted",
      CALL_NOTIFICATIONS_SETTINGS_KEY: "callNotificationsMuted",
      RINGING_DEFERRER_SETTINGS_KEY: "ringingDeferrerSetting"
    },
    browserProperties: {
      DEFAULT: {
        HIDDEN: "hidden",
        VISIBILITY_CHANGE: "visibilitychange"
      },
      MS: {
        HIDDEN: "msHidden",
        VISIBILITY_CHANGE: "msvisibilitychange"
      },
      MOZ: {
        HIDDEN: "mozHidden",
        VISIBILITY_CHANGE: "mozvisibilitychange"
      },
      WEBKIT: {
        HIDDEN: "webkitHidden",
        VISIBILITY_CHANGE: "webkitvisibilitychange"
      }
    },
    permission: {
      DEFAULT: "default",
      GRANTED: "granted",
      DENIED: "denied"
    },
    events: {
      actions: {
        subscriptionCreation: "subscriptioncreation",
        getUserPresence: "getuserpresence",
        setUserPresence: "setuserpresence",
        getSelfProperties: "getselfproperties",
        messageSubmitted: "messagesubmitted",
        messageQuoted: "messageQuoted",
        callMade: "action:callMade"
      },
      auth: {
        SIGNIN_FAILED: "signInFailed",
        SIGN_OUT: "signOut"
      },
      callScreen: {
        CONTROLS_VISIBLE: "controlsVisible",
        VIDEO_STATE_CHANGED: "videoStateChanged",
        VIDEO_CONTAINER_SIZE_CHANGED: "videoContainerSizeChanged",
        SIDEBAR_TOGGLED: "sidebarToggled",
        VIDEO_ZOOMED_IN: "videoZoomedIn",
        TOGGLE_FULLSCREEN: "toggleFullscreen",
        TOGGLE_NARROW_MENU: "toggleNarrowMenu",
        BUTTON_FOCUSED: "buttonFocused",
        FOCUS_CALL_SCREEN: "focusCallScreen",
        BUTTONS_WIDTH_CHANGED: "buttonsWidthChanged",
        ROSTER_WIDTH_CHANGED: "rosterWidthChanged",
        TOGGLE_MODAL_DIALOG: "toggleCallScreenModal",
        MORE_ACTION_MENU_VISIBLE: "moreActionsMenuVisible",
        MORE_ACTION_MENU_HIDDEN: "moreActionsMenuHidden",
        DIALPAD_VISIBLE: "dialpadVisible",
        DIALPAD_HIDDEN: "dialpadHidden",
        STAGE_LAYOUT_CHANGED: "stageLayoutChanged",
        PARTICIPANT_MENU_VISIBILITY_CHANGED: "participantMenuVisibilityChanged",
        PARTICIPANT_MENU_FOCUSED: "participantMenuFocused",
        TOGGLE_GRID_VIEW: "toggleGridView",
        PINNED_PARTICIPANT_CHANGED: "pinParticipant",
        PARTICIPANT_ITEM_CONTEXT_MENU: "participantItemContextMenu",
        SHOW_CHAT: "showChat",
        HIDE_CHAT: "hideChat"
      },
      contacts: {
        CONTACTS_LOADED: "contactsLoaded",
        CONTACT_REQUEST_SENT: "contactRequestSent",
        CONTACT_REQUEST_ACCEPTED: "contactRequestAccepted",
        CONTACT_REQUEST_DECLINED: "contactRequestDeclined"
      },
      message: {
        RENDERED: "message:rendered",
        QUOTE: "message:quote",
        EDIT: "message:edit",
        COPY: "message:copy",
        AFTER_EXPANDED: "message:afterExpanded",
        BEFORE_EXPANDED: "message:beforeExpanded",
        REMOVED: "message:removed",
        SENT: "message:sent",
        ADD_CONTACT: "message:addContact"
      },
      resourceTypes: { userPresence: "userpresence" },
      navigation: {
        OPEN_CONVERSATION: "navigate:conversation",
        NAVIGATE: "navigate:navigate",
        NAVIGATE_TO_PREVIOUS_PAGE: "navigate:previousPage",
        NAVIGATE_TO_SEARCH_INPUT: "navigate:searchInput",
        COMPONENT_RENDERED: "component:rendered",
        FRAGMENT_SHOW: "fragment:show",
        FRAGMENT_HIDE: "fragment:hide",
        FRAGMENT_BEFORE_SHOW: "fragment:beforeShow",
        FRAGMENT_BEFORE_HIDE: "fragment:beforeHide",
        FRAGMENT_LOADED: "fragment:loaded",
        FRAGMENT_REMOVE: "fragment:remove",
        FRAGMENT_REMOVE_ALL_HIDDEN: "fragment:removeAllHidden",
        LEAVE_EDIT_MODE: "leave:edit:mode",
        NOTIFICATIONS_CENTER: "navigate:notificationsCenter"
      },
      search: {
        QUERY_CHANGED: "query:changed",
        QUERY_EXECUTED: "query:finished",
        QUERY_RESET: "query:reset",
        RESET: "search:reset",
        DIRECTORY_SEARCH_RESULTS: "search:directory:results",
        DIRECTORY_SEARCH_RESULTS_RENDERED: "search:directory:results:rendered",
        DIRECTORY_SEARCH_ACTIVATED: "search:directory:activated",
        DIRECTORY_SEARCH_DEACTIVATED: "search:directory:deactivated",
        ACTIVATE_DIRECTORY_SEARCH: "search:directory:activate",
        GROUPS_SEARCH_RESULTS: "search:groups:results",
        LOCAL_SEARCH_RESULTS: "search:local:results",
        LOCAL_SEARCH_RESULTS_RENDERED: "search:local:results:rendered",
        INPUT_FOCUS: "searchInput:focus",
        INPUT_BLUR: "searchInput:blur",
        SESSION_SUCCESS: "search:sessionSuccess"
      },
      roster: {
        ROSTER_QUERY_CHANGED: "roster:participants:search",
        ROSTER_QUERY_EXECUTED: "roster:participants:searchFinished",
        ROSTER_SELECTION_REMOVED: "roster:selection:removed",
        PICKER_CONTACT_SELECTED: "people:picker:selected",
        PICKER_CONTACT_DESELECTED: "people:picker:deselected",
        EDIT_ROSTER_MODE: "roster:editRosterMode"
      },
      conversation: {
        JOINING_ENABLED: "conversation:joining:enabled",
        OPEN_PROFILE: "conversation:open:profile",
        CLOSE_PROFILE: "conversation:close:profile",
        COPY_LINK: "conversation:copy:link",
        EMAIL_LINK: "conversation:mail:link",
        SHARED: "conversation:shared",
        MARK_AS_READ: "conversation:mark:read",
        VIEWPORT_CHANGED: "conversation:viewport:changed",
        MESSAGES_LOADED: "conversation:messages:loaded",
        OVERLAY_CLOSED: "conversation:overlay:closed"
      },
      expressionPicker: {
        ITEM_PREVIEW_REQUEST: "pes:picker:previewRequest",
        ITEM_SELECT_REQUEST: "pes:picker:selectRequest",
        ITEM_SEND_REQUEST: "pes:picker:sendRequest",
        ITEM_CANCEL_REQUEST: "pes:picker:cancelRequest",
        TAB_SELECT_REQUEST: "pes:tabs:selectRequest",
        CLOSE_REQUEST: "pes:picker:close",
        OPEN_REQUEST: "pes:picker:open",
        MRUITEM_ADD_REQUEST: "pes:mruitem:addRequest",
        MRUITEM_ADD_EMOTICON_REQUEST: "pes:mruitem:addEmoticonRequest"
      },
      suggestionList: {
        SHOWN: "suggestionList:shown",
        HIDDEN: "suggestionList:hidden",
        ITEM_SELECTED: "suggestionList:itemSelected"
      },
      textarea: {
        MESSAGE_SENT: "textarea:messageSent",
        SUBMIT_AND_FOCUS: "textarea:submitAndFocus",
        CHANGED: "textarea:changed",
        KEY_DOWN: "textarea:keyDown",
        KEY_PRESS: "textarea:keyPress",
        INPUT: "textarea:input",
        HAS_INPUT: "textarea:hasInput",
        INITIALIZATION_COMPLETE: "textarea:initializationComplete",
        SET_ATTRIBUTION: "textarea:setAttribution",
        UPDATE_SMS_DESTINATION: "textarea:updateSmsDestination",
        UPDATE_SMS_FRAGMENTS: "textarea:updateSmsFragments",
        UPDATE_TEXTAREA_ENABLE: "textarea:enable"
      },
      chatInput: { INITIALIZATION_COMPLETE: "chatInput:initializationComplete" },
      emoticonPicker: {
        EMOTICON_SELECTED: "emoticon:selected",
        CLOSE: "emoticon:close"
      },
      errors: { SERVICE_FAILURE: "serviceFailure" },
      system: {
        EXPERIENCE_INITIALIZED: "experienceInitialized",
        EXPERIENCE_READY: "experienceReady",
        BUTTON_CLICK: "buttonClick",
        FORCE_RESYNC: "webapi:forceResync",
        ONLINE_STATE_CHANGED: "webapi:onlineStateChanged",
        DATE_CHANGED: "dateChanged"
      },
      trouter: {
        CONTACTLIST_CHANGE: 6,
        OFFLINE_AUTHREQUEST: 14,
        INCOMING_SKYPE_NGC_CALL: 107,
        INCOMING_SKYPE_P2P_CALL: 108,
        INCOMING_SKYPE_NGC_GVC_CALL: 109,
        INCOMING_LYNC_NGC_CALL: 105,
        INCOMING_STOP_RINGER: 104,
        INCOMING_SKYPE_NGC_STOP_RINGER: 110,
        INCOMING_SKYPE_NGC_PSTN_CALL: 111,
        USER_SERVICES_CHANGE: 601,
        INCOMING_CONTACT_INVITE: 801,
        OUTGOING_CONTACT_INVITE_ACCEPTED: 802,
        CONTACT_INVITES_LIST_CHANGE: 803,
        USER_PROFILE_CHANGE: 20,
        USER_AVATAR_CHANGE: 21
      },
      newConversation: {
        CONFIRMED: "newConversation:confirmed",
        CANCELLED: "newConversation:cancelled"
      },
      narrowMode: {
        SIDEBAR_STATE_CHANGED: "narrowMode:sidebarStateChanged",
        SHOW_SIDEBAR: "narrowMode:showSidebar",
        HIDE_SIDEBAR: "narrowMode:hideSidebar",
        SIDEBAR_TRANSITION_ENDED: "narrowMode:sidebarTransitionEnded"
      },
      interaction: { SCROLL_START: "interaction:scrollStart" },
      browser: {
        CLICK: "click",
        RESIZE: "resize",
        SCROLL: "scroll",
        FOCUS: "focus",
        BLUR: "blur",
        KEYDOWN: "keydown",
        KEYUP: "keyup",
        KEYPRESS: "keypress",
        MOUSEMOVE: "mousemove",
        MOUSEDOWN: "mousedown",
        BEFOREUNLOAD: "beforeunload",
        VISIBILITYCHANGE: "visibilitychange",
        TRANSITIONEND: "transitionend",
        MESSAGE: "message",
        CONTEXTMENU: "contextmenu",
        NARRATOR_ANNOUNCE: "announce"
      },
      personalExpression: {
        CONFIG_INITIALIZED: "pes:configInitialized",
        CONFIG_PROCESSED: "pes:configProcessed",
        CDN_TOKEN_UPDATED: "pes:cdnTokenUpdated",
        store: {
          LOAD_PACKS: "pesStore:loadPacks",
          PACK_PURCHASED: "pesStore:packPurchased"
        }
      },
      mediaPicker: {
        CLOSE_PICKER: "mediaPicker:closePicker",
        FILE_PICKER_SELECTED: "mediaPicker:filePickerSelected",
        SEND_CONTACTS_SELECTED: "mediaPicker:sendContactsSelected",
        POLL_BUTTON_SELECTED: "mediaPicker:pollButtonSelected"
      },
      shareControl: {
        SHARE_CONTROL_SHOW: "shareControl:show",
        SHARE_CONTROL_HIDE: "shareControl:hide"
      },
      skypeOut: {
        DIAL_BUTTON_CLICKED: "skypeOut:dialButtonClicked",
        INPUT_CHANGED: "skypeOut:inputChanged",
        INPUT_TYPE_TOUCH: "touch",
        INPUT_TYPE_MOUSE: "mouse",
        INPUT_TYPE_KEYBOARD: "keyboard"
      },
      selectBox: { TOGGLE: "selectBox:toggle" },
      userListPopup: { POPUP_TOGGLE: "userListPopup:toggle" },
      videoPlayer: {
        FULLSCREEN_ON: "videoPlayer:fullscreenOn",
        FULLSCREEN_OFF: "videoPlayer:fullscreenOff"
      },
      me: {
        PRESENCE_POPUP_SHOW: "presencePopup:show",
        MOOD_MESSAGE_EDIT: "moodMessage:edit"
      },
      flags: { SET_FLAG: "setFlag" },
      contextMenu: {
        MENU_SHOWN: "contextMenu:shown",
        MENU_HIDDEN: "contextMenu:hidden"
      }
    },
    styleMode: {
      breakpoint: {
        NARROW: 420,
        MEDIUM: 600,
        WIDE: 800
      },
      NARROW: "style:narrow",
      MEDIUM: "style:medium",
      WIDE: "style:wide"
    },
    deviceSelection: {
      DEFAULT_ID: "default",
      DEFAULT_NAME: "default"
    },
    notifications: {
      ERROR: "shellError",
      SUCCESS: "shellSuccess",
      WARNING: "shellWarning",
      INCOMING_CALL: "incomingCall",
      INCOMING_CALL_WITH_NO_PLUGIN: "incomingCallWithNoPlugin",
      INCOMING_CALL_BROWSER_NOT_SUPPORTED: "incomingCallBrowserNotSupported",
      INCOMING_CALL_OS_NOT_SUPPORTED: "incomingCallOsrNotSupported",
      DEVICE_MISSING_CAMERA: "cameraMissing",
      DEVICE_MISSING_MICROPHONE: "microphoneMissing",
      DEVICE_MISSING_SPEAKER: "speakerMissing",
      UNREAD_MESSAGE: "UnreadMessage",
      CONTACT_REQUEST: "ContactRequest",
      SIGN_IN_REQUEST: "SignInRequest",
      CHAT: "Chat",
      AUDIO: "Audio",
      AUDIO_CALL: "AudioCall",
      AUDIO_WITHOUT_VIDEO: "AudioWithoutVideo",
      EDUCATION: "Education",
      AVATAR_NOT_SUPPORTED_IMAGE_TYPE: "AvatarNotSupportedImageType",
      AVATAR_TOO_LARGE: "AvatarTooLarge",
      AVATAR_UPLOAD_ERROR: "AvatarUploadError"
    },
    serviceLocator: {
      FEATURE_FLAGS: "featureFlagApi",
      CONTROLS_BUILDER: "controlsBuilder",
      NAVIGATION_CONTEXT: "navigation",
      PUBSUB: "pubSub",
      SETTINGS: "settings",
      LOCAL_STORAGE: "localStorage",
      TELEMETRY_MANAGER: "telemetryManager",
      MODEL_UI_OBSERVER: "webClientModelObserver",
      SPLASH_SCREEN: "spashScreen",
      SUBSCRIPTION_PROVIDER: "subscriptionProvider",
      ACTION_TELEMETRY: "actionTelemetry",
      PES_MRU_SERVICE: "pesMRUService",
      PES_BING_SEARCH_SERVICE: "pesBingSearchService",
      PES_GIPHY_SEARCH_SERVICE: "pesGiphySearchService",
      URL_PREVIEW_SERVICE: "urlPreviewService",
      PES_CONFIG_SERVICE: "pesConfigService",
      PES_STORE_SERVICE: "pesStoreService",
      PROGRESSIVE_TIMEOUT: "progressiveTimeout"
    },
    msnpErrors: {
      nonExistingConverstion: 730,
      redirectionOverride: 752,
      missingEndpoint: 729,
      invalidSyncState: 230
    },
    callingErrors: { AUTO_CALL_FAILED: "AUTO_CALL_FAILED" },
    httpStatusCodes: {
      OK: 200,
      created: 201,
      badRequest: 400,
      unauthorized: 401,
      notFound: 404,
      forbidden: 403,
      preconditionFailed: 412,
      unprocessableEntity: 422,
      internalServerError: 500
    },
    onlineStates: {
      ONLINE: "state:online",
      OFFLINE: "state:offline"
    },
    translatorServiceState: {
      NotReady: "NotReady",
      Authenticated: "Authenticated",
      Error: "Error"
    },
    isTyping: {
      THROTTLE: 5000,
      EXPIRY: 7000,
      DETAILED_PARTICIPANTS_MAX_COUNT: 2,
      MESSAGE_TYPE: {
        SET_TYPING: "Control/Typing",
        CLEAR_TYPING: "Control/ClearTyping"
      }
    },
    activityItemGroups: {
      PARTICIPANT: "participant",
      TEXT: "text",
      CALL: "live-session",
      NGC_UPGRADE: "ngc-upgrade",
      PLUGIN_FREE: "plugin-free",
      MEDIA: "media",
      CONTACT_REQUEST: "contact-request",
      MOJI: "moji",
      CONTACT_INFO: "contact-info",
      TRANSACTION: "transaction",
      POLL: "poll",
      PSTN: "pstn",
      CUSTOM: "custom",
      TRANSCRIPT: "transcript",
      SYSTEM: "system"
    },
    customActivityItemTemplates: { SPACES_WELCOME_MESSAGE: "spacesWelcomeMessage" },
    featureFlags: {
      AGENTS_ENABLED: "agentsEnabled",
      AGENTS_DISCOVERABLE: "agentsDiscoverable",
      SHOW_AGENT_ID_ON_PROFILE: "showAgentIdOnProfile",
      SHOW_AGENT_RATING_ON_PROFILE: "showAgentRatingOnProfile",
      SHOW_AGENT_EXTRA_INFO_ON_PROFILE: "showAgentExtraInfoOnProfile",
      URL_OVERRIDE_ENABLED: "urlOverrideEnabled",
      CONTACTLIST_CHANGE_NOTIFICATION: "contactListChangeNotification",
      SHOW_SPLASH_SCREEN: "showSplashScreen",
      SHOW_EDU_CAROUSEL: "showEducationalCarousel",
      BLOCK_CONTACT: "blockContact",
      DEACTIVATE_CACHE: "deactivateCache",
      HAS_TIMELINE_BADGE: "hasTimelineBadge",
      HAS_BETA_LABEL: "hasBetaLabel",
      HAS_FEEDBACK_LINK: "hasFeedbackLink",
      HAS_FEEDBACK_LINK_ON_ERROR: "hasFeedbackLinkOnError",
      SKYPE_DIRECTORY_SEARCH: "skypeDirectorySearch",
      MUTE_NOTIFICATIONS: "muteNotifications",
      BROWSER_NATIVE_NOTIFICATIONS_ENABLED: "browserNativeNotificationsEnabled",
      USE_DARK_THEME_FOR_BROWSER_NOTIFICATIONS_OPT_IN_FLOW: "useDarkThemeForBrowserNotificationsOptInFlow",
      BROWSER_NOTIFICATIONS_EDUCATIONAL_TOAST_ENABLED: "browserNotificationEducationalToastEnabled",
      LAST_SEEN: "lastSeen",
      MOBILE_INDICATOR: "mobileIndicator",
      NEW_CONVERSATION_V2: "newConversationV2",
      SPACES: "spaces",
      SHOW_SPACES_WELCOME_MESSAGE: "showSpacesWelcomeMessage",
      SHOW_CONTACTS_PAGE_HINT: "showContactsPageHint",
      SHOW_CONTACTS_PAGE_INFORMATIONAL_MESSAGE: "showContactsPageInformationalMessage",
      SHOW_FIRST_RUN_LANDING_EXPERIENCE: "showFirstRunLandingExperience",
      INCOMING_SCREEN_SHARING: "incomingScreenSharing",
      OUTGOING_SCREEN_SHARING: "outgoingScreenSharing",
      OUTGOING_SCREEN_SHARING_PREVIEW: "outgoingScreenSharingPreview",
      TRANSFER_CALL: "transferCall",
      INCOMING_WIKI_MARKUP: "incomingWikiMarkup",
      MESSAGE_ENFORCE_TEXT_FORMAT: "messageEnforceTextFormat",
      PHOTO_SHARING_ENABLED: "photoSharingEnabled",
      SPACE_TOPIC_EDITOR: "spaceTopicEditor",
      HEADER_CONTROLS_DISABLED: "headerControlsDisabled",
      HIDE_SIDEBAR_ON_START: "hideSidebarOnStart",
      SINGLE_CONVERSATION_MODE: "singleConversationMode",
      DISABLE_POLLING_ON_KAHUNA: "disablePollingOnKahuna",
      ENABLE_RAW_EMOTICONS_RENDERING: "enableRawEmoticonsRendering",
      UNREAD_MESSAGE_REMINDER_TOAST: "unreadMessageReminderToast",
      PROFILE_UPDATE_NOTIFICATIONS_ENABLED: "profileUpdateNotificationsEnabled",
      TIMEZONE_IN_CHATSERVICE_REQUEST: "timezoneInChatServiceRequest",
      CONTENT_SEARCH: "contentSearch",
      SWIFT_CARD_COMMAND: "swiftCardCommand",
      SWIFT_CARD_RENDERING: "swiftCardRendering",
      SWIFT_CARD_RENDERING_MEDIA_CARDS: "swiftCardRenderingMediaCards",
      BOT_MESSAGES_MODE_V2_ENABLED: "botMessagesModeV2enabled",
      SUGGESTED_ACTIONS_ENABLED: "suggestedActionsEnabled",
      UNREAD_MSG_LOGGING: "enableUnreadMessagesLogging",
      SEND_SKYPE_INITIATING_USERNAME: "sendSkypeInitiatingUsername",
      SHOW_MESSAGE_DELIVERY_INDICATOR_SW4B: "showMessageDeliveryIndicator",
      SHOW_MESSAGE_DELIVERY_STATUS: "showMessageDeliveryStatus",
      SHOW_TIMESTAMPS_IN_NARROW_MODE: "showTimestampsInNarrowMode",
      HIDE_EMOTICON_PICKER_BUTTON: "hideEmoticonPickerButton",
      IS_TYPING_INDICATOR: "isTypingIndicator",
      SERVICE_FAILURE_REPORTING: "serviceFailureReporting",
      CALLING: "calling",
      CALLING_FULL_SCREEN_ENABLED: "callingFullScreen",
      INCLUDE_SELF_IN_PARTICIPANTS_COUNT: "includeSelfInParticipantsCount",
      HIDE_USER_ROLE: "hideUserRole",
      SHOW_ALTERNATE_SHARE_DIALOG_EXPERIENCE: "showAlternateShareDialogExperience",
      IS_FLIK_MESSAGE_ENABLED: "isFlikMessageEnabled",
      PES_CDN_AUTH_ENABLED: "pesCDNAuthEnabled",
      PINNING_TO_DOGFOOD_CLOUD: "pinningToDogfoodCloud",
      NOTIFICATIONS_CENTER: "notificationsCenter",
      POLLS_ENABLED: "pollsEnabled",
      SUPPORT_MESSAGE_PROPERTIES: "supportMessageProperties",
      ENABLE_PING_ECS_CONFIG: "enablePingEcsConfig",
      ENABLE_ENDPOINT_ECS_CONFIG: "enableEndpointEcsConfig",
      SUPPORT_STANDBY_MODE: "supportStandbyMode",
      MENTIONS_ENABLED: "mentionsEnabled",
      MENTIONS_PEOPLE_ENABLED: "mentionsPeopleEnabled",
      CODE_SNIPPET_ENABLED: "codeSnippetEnabled",
      SKYPE_URI_NAVIGATION_ENABLED: "skypeUriNavigationEnabled",
      ALTERNATIVE_SIDEBAR_LAYOUT_ENABLED: "alternativeSidebarLayout",
      CONTEXT_MENU_QUOTE_MESSAGES_ENABLED: "contextMenuQuoteMessagesEnabled",
      CONTEXT_MENU_COPY_MESSAGES_ENABLED: "contextMenuCopyMessagesEnabled",
      CONTEXT_MENU_SAVE_VIDEO_MESSAGES_ENABLED: "contextMenuSaveVideoMessagesEnabled",
      CONTEXT_MENU_MARK_AS_READ_ENABLED: "contextMenuMarkAsReadEnabled",
      MARK_READ_MESSAGES_V2_ENABLED: "markReadMessagesV2Enabled",
      SKIP_CHAT_CAPABILITY_CHECK: "skipChatCapabilityCheck",
      URL_PREVIEWS: "urlPreviews",
      SILENT_LINKING: "silentLinking",
      REMOVE_CONVERSATION_HISTORY: "removeConversationHistory",
      AVATAR_SERVICE_SUPPORTS_SIZE_PARAMETER: "avatarServiceSupportsSizeParameter",
      COPY_SELECTION_AS_QUOTE_KEYBOARD: "copySelectionAsQuoteKeyboard",
      FULL_SCREEN_MODE_FROM_SIDEPANE: "fullScreenModeFromSidepane",
      PES_CDN_AUTH_URL_FALLBACK_ENABLED: "pesCDNAuthUrlFallbackEnabled",
      PES_FETCH_SMALL_ASSETS_ON_DEMAND: "pesFetchSmallAssetsOnDemand",
      PES_FETCH_MEDIUM_ASSETS_ON_DEMAND: "pesFetchMediumAssetsOnDemand",
      PES_FETCH_LARGE_ASSETS_ON_DEMAND: "pesFetchLargeAssetsOnDemand",
      PES_FETCH_MOJI_ASSETS_ON_DEMAND: "pesFetchMojiAssetsOnDemand",
      PES_USE_EXTRA_LARGE_EMOTICONS: "pesUseExtraLargeEmoticons",
      PES_BING_IMAGE_SEARCH_ENABLED: "pesBingImageSearchEnabled",
      PES_GIPHY_IMAGE_SEARCH_ENABLED: "pesGiphyImageSearchEnabled",
      PES_LOCAL_SEARCH_ENABLED: "pesLocalSearchEnabled",
      EMOTICON_SUGGESTION_ENABLED: "emoticonSuggestionEnabled",
      EMOTICON_IMPLICIT_SUGGESTION_DISABLED: "emoticonImplicitSuggestionDisabled",
      SUGGEST_HIDDEN_EMOTICONS: "suggestHiddenEmoticons",
      PES_STORE_ENABLED: "pesStoreEnabled",
      EMOTICON_SETTINGS_ENABLED: "emoticonSettingsEnabled",
      YOUTUBE_PLAYER_ENABLED: "youtubePlayer",
      FILE_DRAG_DROP_ENABLED: "fileDragDropEnabled",
      FILE_PASTE_ENABLED: "filePasteEnabled",
      TYPING_INDICATOR_ENABLED: "showWhenIamTyping",
      FILE_TRANSFER_ENABLED: "fileTransferEnabled",
      CONTEXT_MENU_LIKE_MESSAGES_ENABLED: "contextMenuLikeMessagesEnabled",
      SHOW_DEFAULT_AVATAR_IN_NOTIFICATIONS: "showDefaultAvatarInNotifications",
      MEDIA_BAR_ENABLED: "mediaBarEnabled",
      MEDIA_BAR_V2_ENABLED: "mediaBarV2Enabled",
      PSTN_ENABLED: "PSTN",
      CQF_ENABLED: "CQF",
      UNANSWERED_CALL_UI: "unansweredCallUIEnabled",
      CONSOLE_LOGGING: "consoleLogging",
      ISSUE_REPORTING: "issueReporting",
      CALL_INFO_COMMAND: "callInfoCommand",
      ERROR_LOG_REPORTING: "errorLogReporting",
      AGGRESSIVE_IMPLICT_MENTIONS_MATCHING: "aggressiveImplicitMentionsMatching",
      ENABLE_AGGRESSIVE_MENTIONS_TOAST: "enableAggressiveMentionsToast",
      SEND_CONTACT_CARD_ENABLED: "sendContactCardEnabled",
      NOTIFY_HOST_EVEN_WHEN_ME_NOTAVAILABLE: "notifyHostEvenWhenMeNotAvailable",
      HEARTS_ENABLED: "heartsEnabled",
      HEARTS_NOTIFICATION_ENABLED: "heartsNotificationEnabled",
      SHOW_CHAT_INTRO_TEXT: "showChatIntroText",
      TRANSLATOR_SENDING_ENABLED: "translatorSendingEnabled",
      CONTACT_CARD_RENDERING_ENABLED: "contactCardRenderingEnabled",
      NEW_URLP_DOMAIN_ENABLED: "newUrlPreviewDomainEnabled",
      IS_CLOUD_VIDEO_MESSAGE_ENABLED: "isCloudVideoMessageEnabled",
      IS_CLOUD_AUDIO_MESSAGE_ENABLED: "isCloudAudioMessageEnabled",
      CREDIT_GIFTING: "creditGifting",
      MUTE_SPECIFIC_CONVERSATIONS_ENABLED: "muteSpecificConversationsEnabled",
      AUTO_CALLING: "autoCalling",
      GVC_ESCALATION: "GVCEscalation",
      GVC_LOCAL_ESCALATION: "GVCLocalEscalation",
      GVC_JOINING: "GVCJoining",
      GVC_OUTGOING: "GVCOutgoing",
      HOSTLESS_GROUP_CALLING_PLUGINLESS: "hostlessGroupCallingPluginless",
      PERSISTENT_PLUGIN: "persistentPlugin",
      PERSISTENT_SHELL_APP: "persistentShellApp",
      PLUGINLESS_CALLING_CHROME: "pluginlessCallingChrome",
      PLUGINLESS_CALLING_CHROME_LINUX: "pluginlessCallingChromeLinux",
      PLUGINLESS_CALLING_EDGE: "pluginlessCallingEdge",
      PLUGINLESS_CALLING_FIREFOX: "pluginlessCallingFirefox",
      PLUGINLESS_CALLING_ELECTRON: "pluginlessCallingElectron",
      PLUGINLESS_VIDEO_CALLING_CHROME_LINUX: "pluginlessVideoCallingChromeLinux",
      PLUGINLESS_VIDEO_CALLING_FIREFOX: "pluginlessVideoCallingFirefox",
      PLUGINLESS_GROUP_VIDEO_CALLING_CHROME_LINUX: "pluginlessGroupVideoCallingChromeLinux",
      PLUGINLESS_PSTN_CALLING: "pluginlessPSTNCalling",
      PLUGINLESS_INCOMING_SCREEN_SHARING_EDGE: "pluginlessIncomingScreenSharingEdge",
      PLUGINLESS_REMOTE_ESCALATION: "pluginlessRemoteEscalation",
      PLUGINLESS_LOCAL_ESCALATION: "pluginlessLocalEscalation",
      DEVICE_DISABLED_DIALOG_ENABLED: "deviceDisabledDialogEnabled",
      CAN_NOTIFY_WITHOUT_VIDEO: "canNotifyWithoutVideo",
      PRELOAD_PLUGIN: "preloadPlugin",
      PRELOAD_SHELL_APP: "preloadShellApp",
      NG_CALLING: "NGCalling",
      FAIL_INITIALIZATION_FOR_IE_AND_EDGE: "failInitializationOnIE",
      SHELL_APP_LOGS: "shellAppLogs",
      INVITE_FREE: "inviteFree",
      INVITE_FREE_IMPLICIT_INCOMING_CONTACT_REQUEST: "inviteFreeImplicitIncomingContactRequest",
      SHORT_CIRCUIT: "shortCircuit",
      USER_SETTINGS_ENABLED: "userSettingsEnabled",
      ALTERNATIVE_SETTINGS_POSITION: "alternativeSettingsPositionEnabled",
      SHOW_UNLISTED_SETTINGS: "showUnlistedSettings",
      ABOUT_PAGE_ENABLED: "aboutPageEnabled",
      LOCATION_MESSAGE_SUPPORT: "locationMessageSupport",
      READ_RECEIPT_ENABLED: "readReceiptEnabled",
      URL_PREVIEW_LOAD_YOUTUBE_PLAYER: "urlPreviewLoadYoutubePlayer",
      SEARCH_EDUCATION_BUBBLE: "searchEducationBubble",
      CHAT_EDUCATION_BUBBLE: "chatEducationBubble",
      CALL_EDUCATION_BUBBLE: "callEducationBubble",
      SCHEDULE_CALL_EDUCATION_BUBBLE_1: "scheduleCallEducationBubble1",
      SCHEDULE_CALL_EDUCATION_BUBBLE_2: "scheduleCallEducationBubble2",
      WELCOME_DIALOG: "welcomeDialog",
      NOTIFICATIONS_SETTINGS_ENABLED: "notificationsSettingsEnabled",
      NOTIFICATIONS_SOUNDS_SETTING_ENABLED: "notificationsSoundsSettingsEnabled",
      CHAT_NOTIFICATIONS_SETTINGS_ENABLED: "chatNotificationsSettingsEnabled",
      CHAT_NOTIFICATIONS_SOUND_SETTINGS_ENABLED: "chatNotificationsSoundSettingsEnabled",
      CALL_NOTIFICATIONS_SETTINGS_ENABLED: "callNotificationsSettingsEnabled",
      CALL_NOTIFICATIONS_SOUND_SETTINGS_ENABLED: "callNotificationsSoundSettingsEnabled",
      UNREAD_MESSAGE_TOAST_NOTIFICATIONS: "unreadMessageToastNotifications",
      INCOMING_CALL_TOAST_NOTIFICATIONS: "incomingCallToastNotifications",
      CONTACT_REQUEST_TOAST_NOTIFICATIONS: "contactRequestToastNotifications",
      CHAT_REQUEST_TOAST_NOTIFICATIONS: "chatRequestToastNotifications",
      UNREAD_MESSAGE_TOAST_FOR_ACTIVE_ENDPOINT: "unreadMessageToastForActiveEndpoint",
      CHAT_MESSAGE_TYPE_NOTIFICATION_ENABLED: "chatMessageTypeNotificationEnabled",
      TELEMETRY_UIACTIONPERF_ENABLED: "uiActionPerfTelemetryEnabled",
      TELEMETRY_RUNTIME_ERRORS_ENABLED: "runtimeErrorsTelemetryEnabled",
      TELEMETRY_CAPTURE_SOURCE_ENABLED: "captureSourceInAllTelemetryEnabled",
      DO_NOT_SEND_CONTACTS_TO_CHAT_SERVICE: "doNotSendContactsToChatService",
      SCHEDULE_CALL_FROM_CONVERSATION: "scheduleCallFromConversation",
      USE_LEGACY_SCHEDULER_URI_FORMAT: "useLegacySchedulerUriFormat",
      DIRECTORY_SEARCH_SKYPE_AND_LYNC: "directorySearchSkypeAndLync",
      USE_GRAPH_SEARCH_ANNOTATIONS: "useGraphSearchAnnotations",
      GRAPH_SEARCH_MIRRORING_ENABLED: "graphSearchMirroringEnabled",
      GIPHY: "giphy",
      ME_COMMAND_ENABLED: "meCommandEnabled",
      SKYPE_CALL_POLICY_SUPPORT: "skypeCallPolicySupport",
      SKYPE_VIDEO_CALLING_POLICY_SUPPORT: "skypeVideoCallingPolicySupport",
      SHORT_CIRCUIT_SUPPORT: "shortCircuit",
      FETCH_CONTACTS_BY_PAGE: "fetchContactsByPageEnabled",
      CONTACT_PAGE_FILTER_TABS: "contactPageFilterTabs",
      USE_AZURE_BASED_SILENT_LOGIN: "useAzureBasedSilentLogin",
      KEY_ENCRYPTION_SERVICE_V2_ENABLED: "keyEncryptionServiceV2Enabled",
      NAVIGATION_MENU_ICONS_ENABLED: "navigationMenuIconsEnabled",
      CANVAS_EMOTICONS_ENABLED: "canvasEmoticonsEnabled",
      MOOD_MESSAGE_EDIT_ENABLED: "moodMessageEditEnabled",
      FAVORITES_CONVERSATION_ENABLED: "favoritesConversationsEnabled",
      FAVORITE_CONTACTS_ENABLED: "favoriteContactsEnabled",
      SYNC_THREAD_BEFORE_JOIN_CONVERSATION_FLOW_ENABLED: "syncThreadBeforeJoinConversationEnabled",
      AUDIO_VIDEO_SETTINGS_SUPPORT: "audioVideoSettingsSupport",
      SPLASH_SCREEN_WHITE_THEME: "useWhiteThemeForSplashScreen",
      SHOW_SIGN_IN_BUTTON_ON_TIMEOUT: "showSignInButtonOnTimeout",
      SHOW_SIGN_IN_BUTTON_ON_SIGNOUT: "showSignInButtonOnSignout",
      IDLE_USERS_ANALYTICS: "idleUsersAnalytics",
      USERS_ANALYTICS: "usersAnalytics",
      ENHANCED_NOTIFICATION: "enhancedNotification",
      REOPEN_SIDEBAR: "sidebarReopenEnabled",
      USE_AVATAR_CACHE: "useAvatarCache",
      USE_AVATAR_INITIALS: "useAvatarInitials",
      SHOW_ONE_ACCOUNT_LINK: "showOneAccountLink",
      INIT_PREFERENCES_AFTER_SIGNIN: "initPreferencesAfterSignin",
      RINGING_DEFERRING: "ringingDeferring",
      SHOW_EMOTICON_SUGGESTIONS_SETTINGS: "showEmoticonSuggestionsSetting",
      FORMAT_QUOTES_ENABLED: "formatQuotesEnabled",
      DARK_THEME_ENABLED: "darkThemeEnabled",
      VIDEO_AUTOPLAY_SETTINGS_ENABLED: "videoAutoPlaybackSettingsEnabled",
      ASK_TO_UNBLOCK_PLUGIN: "askToUnblockPlugin",
      SMS_SUPPORT_ENABLED: "smsSupportEnabled",
      UNREAD_CONVERSATION_DEBUGGER: "unreadConversationDebugger",
      GROUP_AVATAR_UPDATE_ENABLED: "groupAvatarUpdateEnabled",
      HIDE_SYSTEM_MESSAGES: "hideSystemMessages",
      LOW_FOCUS_IMPORTANCE_CONTACT_REQUEST: "lowFocusImportanceContactRequest",
      ENABLE_BUSINESS_CONTACT_MANAGEMENT: "enableBusinessContactManagement",
      USE_BUSINESS_WORDING: "useBusinessWording",
      SEARCH_EDUCATION_BUBBLE_BUSINESS: "searchEducationBubbleBusiness",
      CHAT_EDUCATION_BUBBLE_BUSINESS: "chatEducationBubbleBusiness",
      NOTIFICATIONS_TOGGLE_ENABLED: "notificationsToggleEnabled",
      DISABLE_CONCURRENT_ACTIVE_CALLS: "disableConcurrentActiveCalls",
      DISABLE_CONTACT_CARD_MENU: "disableContactCardMenu",
      DISABLE_KES: "disableKes",
      DISABLE_LEAVE_CONVERSATION: "disableLeaveConversation",
      DISABLE_OPEN_CONVERSATION_WITH_AUTHOR: "disableOpenConversationWithAuthor",
      DISABLE_PERSISTENT_CONTACT_PRESENCE_SUBSCRIPTION: "disablePersistentContactPresenceSubscription",
      OPTIMIZE_SPACE_FOR_CC: "optimizeSpaceForCC",
      DISABLE_REMOVE_CONVERSATION_CONFIRMATION: "disableRemoveConversationConfirmation",
      DISABLE_CALLSCREEN_CHAT_OPTION: "disableCallScreenChatOption",
      HAS_FEEDBACK_ICON: "hasFeedbackIcon",
      SHOW_PICKER_SPINNER: "showPickerSpinner",
      SHOW_SEARCH_QUERY_MORE_RESULTS_AVAILABLE: "showSearchQueryMoreResultsAvailable",
      CALLSCREEN_MINMAX: "callscreenMinMax"
    },
    autoCallingMode: {
      call: "Call",
      join: "Join",
      golive: "GoLive"
    },
    autoCallingThreadId: "autoCallingThreadId",
    capabilities: {
      chat: "im.receive",
      audio: "audio.receive",
      video: "video.receive",
      screenSharing: "screen_share",
      groupAdd: "group.add",
      _gvc: "gvc",
      _groupChat: "group_chat",
      _fileSend: "file.send",
      _contactSend: "contact.send",
      _videoMessageSend: "videomessage.send",
      _audioMessageSend: "audiomessage.send",
      _mediaMessageSend: "meidamessage.send",
      _annotationSend: "annotation.send",
      _photoSend: "photo.send",
      _mojiSend: "moji.send",
      _locationSend: "location.send"
    },
    modalityType: {
      CHAT: "Chat",
      AUDIO: "Audio",
      VIDEO: "Video",
      SCREENSHARING: "ScreenSharing",
      DATACOLLABORATION: "DataCollaboration"
    },
    apiUIEvents: {
      SWX_TIMELINE_LOADED: "swx:timeline:loaded",
      SWX_CHAT_LOADED: "swx:chat:loaded",
      SWX_CONTENT_LOADED: "swx:content:loaded",
      SWX_SPLASHSCREEN_LOADED: "swx:splashscreen:loaded",
      SWX_CALLSCREEN_MAXIMIZE: "swx:callscreen:maximize",
      SWX_ON_SIGN_OUT: "swx:on:sign:out",
      SWX_SINGLE_CONVERSATION: "swx:single:conversation"
    },
    chat: {
      messageType: {
        OUTGOING: "Outgoing",
        INCOMING: "Incoming",
        AUDIO: "Audio",
        VIDEO: "Video"
      },
      BOT_MESSAGING_MODE: {
        UNDEFINED: "Undefined",
        ALL: "All",
        AT: "At"
      }
    },
    telemetry: {
      APP_SOURCE_NAME: "SWX",
      uiActions: { TYPE: "ui_action" },
      runtimeErrors: { TYPE: "runtime_error" },
      calling: {
        MASTER_EVENT: "calling",
        DEVICES: "devices",
        INTERNAL_PLUGIN_TELEMETRY: "internal_plugin_telemetry",
        CALL_INFO: "CallInfo",
        START_CALL: "StartCall",
        END_CALL: "EndCall",
        RINGING_CALL: "RingingCall",
        CONNECTED_CALL: "ConnectedCall",
        UNKNOWN_CONTACT_TYPE: "unknown",
        PARTICIPANTS_COUNT_PREFIX: "participantsCount_",
        direction: {
          OUTGOING: "Outgoing call",
          INCOMING: "Incoming call"
        },
        callType: {
          S2S: "S2S",
          SkypeOut: "SkypeOut",
          SkypeIn: "SkypeIn"
        },
        AVAILABLE: "Available",
        UNAVAILABLE: "Unavailable",
        NA: "N/A"
      },
      callQualityFeedback: {
        MASTER_EVENT: "call_quality_feedback",
        NA: "N/A",
        PROBLEM_TOKEN_PREFIX: "checks=",
        reason: {
          CANCEL: "cancel",
          RANDOM: "random"
        }
      },
      unansweredCallUI: { MASTER_EVENT: "log_call_unanswered" },
      autoCalling: {
        MASTER_EVENT: "autoCalling",
        SERVICE_FAILURE: "serviceFailure",
        AUTO_CALL_ENDED: "autoCallEnded",
        AUTO_CALL_PAYLOAD_INVALID: "autoCallPayloadInvalid",
        AUTO_CALL_HANDLING_ERROR: "autoCallHandlingError",
        HOST_JOINED: "hostJoined",
        PARTICIPANT_JOINED: "participantJoined",
        ATTEMPT_TO_JOIN: "attemptToJoin"
      },
      meArea: { CREDIT_DISPLAY: "credit_display" },
      chat: {
        UI_SEND_MESSAGE: "ui_sendMessage",
        UI_EDIT_MESSAGE: "ui_editMessage",
        MESSAGE_NOTIFICATION: "message_notification",
        FILE_TRANSFER: "file_transfer",
        SYSTEM_COMMAND: "system_command",
        VIDEO_MESSAGE: {
          TYPE: "video_message",
          action: {
            FIRST_PLAY: "firstPlay",
            PLAY: "play",
            FULLSCREEN: "fullscreen",
            SEEK: "seeking",
            REPLAY: "replay"
          },
          eventName: { LOADED: "loaded" }
        },
        AUDIO_MESSAGE: {
          TYPE: "audio_message",
          action: {
            VM_CHAT_PLAYBACK: "vm_chat_playback",
            VM_CHAT_REPLAY: "vm_chat_playback_replay"
          }
        },
        SMS_ADD_CREDIT: "sms_add_credit"
      },
      navigation: {
        ONE_TO_ONE_CHAT_SKYPE_URI: "skypeUriOneToOneChat",
        GROUP_CHAT_SKYPE_URI: "skypeUriGroupChat",
        ONE_TO_ONE_CALL_SKYPE_URI: "skypeUriOneToOneCall",
        GROUP_CALL_SKYPE_URI: "skypeUriGroupCall"
      },
      contacts: {
        type: {
          CONTACTS: "Contacts",
          CONTACT_REQUESTS: "ContactRequests"
        },
        name: {
          GET_CONTACT_LIST: "GetContactList",
          GET_CONTACT_LIST_DELTA: "GetContactListDelta",
          CONTACT_REQUEST_READ: "ContactRequestRead",
          CONTACT_REQUEST_ACCEPTED: "AcceptContact",
          CONTACT_REQUEST_DECLINED: "DeclineContact",
          CONTACT_BLOCKED: "ContactBlocked",
          CONTACT_UNBLOCKED: "ContactUnblocked",
          CONTACT_DELETED: "ContactDeleted",
          GET_PROFILES: "GetProfiles",
          ADD_CONTACT: "AddContact",
          CONTACTS_PAGE_PERFORMANCE: "ContactsPagePerformance",
          DISCOVER_AGENTS_PAGE_PERFORMANCE: "DiscoverAgentsPagePerformance",
          PROFILE_OPENED: "contact_profile_opened"
        },
        source: {
          INITIALIZED: "initilized",
          UPDATED: "updated"
        },
        shortCircuit: {
          START: "log_sc_start",
          FINISHED: "log_sc_finished",
          VISIBLE: "log_sc_visible",
          ADDRESS_BOOK_ADDED: "log_sc_address_book_added"
        },
        searchForFriends: {
          event: {
            SHOW: "searchForFriends_page_visible",
            CLICK: "searchForFriends_search_clicked",
            KEYDOWN: "searchForFriends_search_key_pressed"
          }
        }
      },
      contactsV2: {
        contactManagement: {
          TYPE: "contacts_contact",
          names: {
            ADD_CONTACT: "add_contact",
            UPDATE_CONTACT: "update_contact",
            REMOVE_CONTACT: "remove_contact",
            QUERY_CONTACT: "query_contact"
          },
          fields: {
            NAME: "name",
            SUCCESS: "success",
            BEGIN_TIMESTAMP: "begin_timestamp",
            ELAPSED: "elapsed",
            SOURCE: "action_source",
            CONTACT_TYPE: "contact_type"
          }
        },
        contactAction: {
          TYPE: "contacts_contact_action",
          names: {
            BLOCK_CONTACT: "block_contact",
            UNBLOCK_CONTACT: "unblock_contact",
            ADD_TO_FAVORITES: "add_contact_to_favorites",
            REMOVE_FROM_FAVORITES: "remove_contact_from_favorites"
          },
          fields: {
            NAME: "name",
            SUCCESS: "success",
            BEGIN_TIMESTAMP: "begin_timestamp",
            ELAPSED: "elapsed",
            SOURCE: "action_source",
            CONTACT_TYPE: "contact_type",
            REASON: "reason",
            REPORT_ABUSE: "report_abuse"
          }
        },
        contactList: {
          TYPE: "contacts_contact_list",
          names: { QUERY_CONTACT_LIST: "query_contact_list" },
          fields: {
            NAME: "name",
            SUCCESS: "success",
            BEGIN_TIMESTAMP: "begin_timestamp",
            ELAPSED: "elapsed",
            SOURCE: "action_source",
            SERVICE_ELAPSED: "service_elapsed",
            FULL_FETCH: "full_fetch",
            INITIAL_LOAD: "initial_load",
            NUM_CONTACTS: "number_of_contacts",
            NUM_AGENTS: "number_of_agents",
            NUM_SUGGESTED: "number_of_suggested",
            NUM_PENDING: "number_of_pending",
            NUM_BLOCKED: "number_of_blocked",
            NUM_FAVOURITES: "number_of_favorites"
          }
        },
        invitation: {
          TYPE: "contacts_invitation",
          names: {
            SEND_CONTACT_REQUEST: "send_contact_request",
            ACCEPT_CONTACT_REQUEST: "accept_contact_request",
            DECLINE_CONTACT_REQUEST: "decline_contact_request",
            QUERY_INVITATION_LIST: "query_invitation_list"
          },
          fields: {
            NAME: "name",
            SUCCESS: "success",
            BEGIN_TIMESTAMP: "begin_timestamp",
            SERVICE_ELAPSED: "service_elapsed",
            ELAPSED: "elapsed",
            SOURCE: "action_source",
            RESEND: "resend",
            INVITATION_COUNT: "invitationCount"
          }
        },
        contactSearch: {
          TYPE: "contacts_search",
          names: {
            SEARCH_ADDRESSBOOK: "search_addressBook",
            SEARCH_DIRECTORY: "search_directory",
            SEARCH_GROUPS: "search_groups"
          },
          fields: {
            NAME: "name",
            SUCCESS: "success",
            BEGIN_TIMESTAMP: "begin_timestamp",
            ELAPSED: "elapsed",
            SOURCE: "action_source",
            QUERY_ID: "query_id",
            RESULT_COUNT: "result_count",
            CLICK_POSITION: "click_position"
          }
        },
        searchSession: {
          TYPE: "contacts_search_session",
          names: { SEARCH_SESSION: "search_session" },
          fields: {
            NAME: "name",
            SUCCESS: "success",
            BEGIN_TIMESTAMP: "begin_timestamp",
            ELAPSED: "elapsed",
            SOURCE: "action_source",
            SESSION_ID: "session_id",
            SUCCESS_CRITERIA: "success_criteria",
            QUERY_COUNT: "query_count"
          },
          enums: {
            success_criteria: {
              IM_SENT: "IMsent",
              CALL_MADE: "callMade",
              CONTACT_ADDED: "contactAdded"
            }
          }
        }
      },
      agents: {
        type: { AGENTS: "Agents" },
        name: { DISCOVER_AGENTS_PAGE_PERFORMANCE: "DiscoverAgentsPagePerformance" }
      },
      autoBuddy: { SUCCESS: "AutoBuddySuccess" },
      pes: {
        eventName: {
          MOJI_SENT: "moji_sent",
          MOJI_PLAYED: "moji_played",
          EMO_SENT: "emo_sent",
          IMAGE_SENT: "image_sent",
          PICKER_OPENED: "expression_picker_opened"
        },
        section: {
          FEATURED: "FEATURED",
          REGULAR: "REGULAR"
        },
        source: {
          TYPED: "TYPED",
          ROSTER: "ROSTER",
          RECENTS: "RECENTS"
        },
        UNKNOWN: "N/A"
      },
      presence: {
        TYPE: "Presence",
        name: {
          SET_ME_PRESENCE: "SetMePresence",
          GET_CONTACTS_PRESENCE: "GetContactsPresence"
        }
      },
      search: { TYPE: "Search" },
      promiseInvalidStateException: {
        TYPE: "PromiseInvalidStateException",
        feature: {
          GROUP_SEARCH: "GroupSearch",
          CONTACT_PICKER: "ContactPicker",
          PEOPLE_SEARCH: "PeopleSearch"
        }
      },
      NOT_AVAILABLE: "n/a",
      conversationJoined: {
        TYPE: "weblauncher_join",
        result: {
          SIGNED_IN: "signed_in",
          SIGNED_OUT: "signed_out",
          SUCCESS: "success",
          INCONCLUSIVE: "inconclusive"
        },
        milestoneType: {
          CLIENT_INIT: "client_init",
          ERROR: "error",
          END: "end"
        }
      },
      guestActionsInHeader: {
        TYPE: "chat_guest_headerActions",
        cta: {
          PROFILE_TOGGLED: "profileToggled",
          COPY_LINK: "copyLink",
          EMAIL_LINK: "emailLink"
        },
        telemetryItem: {
          AVATAR: "telemetryItemAvatar",
          TOPIC: "telemetryItemTopic",
          CHEVRON_DOWN: "telemetryItemChevronDown",
          CHEVRON_UP: "telemetryItemChevronUp"
        },
        parent: {
          GROUP_PROFILE_VIEW_MODEL: "GroupProfileViewModel",
          HEADER_VIEW_MODEL: "HeaderViewModel"
        }
      },
      removeConversationHistory: {
        TYPE: "swx_conversation_removeHistory",
        cta: {
          TIMELINE_MENU: "timeline",
          PROFILE: "profile"
        },
        action: {
          CANCELED: "canceled",
          CONFIRMED: "confirmed"
        }
      },
      leaveConversation: {
        TYPE: "swx_conversation_leave",
        cta: {
          TIMELINE_MENU: "timeline",
          PROFILE: "profile"
        },
        action: {
          CANCELED: "canceled",
          CONFIRMED: "confirmed"
        }
      },
      sendSms: {
        TYPE: "swx_send_sms",
        status: {
          FAILED: "failed",
          NOT_ENOUGH_CREDIT: "notEnoughCredit",
          SUCCESSFUL: "successful"
        }
      },
      markAllConversationsAsRead: { TYPE: "swx_mark_all_conversations_read" },
      markConversationAsRead: { TYPE: "swx_conversation_mark_read" },
      browserToast: {
        EVENTS: {
          SHOWN: "kpi_toast_shown",
          CLICKED: "kpi_toast_clicked"
        },
        toastType: {
          INDIVIDUAL: "Individual",
          BIRTHDAY: "Birthday",
          SUMMARY: "Summary"
        },
        unreadState: {
          NONE: "none",
          PASSIVE: "PassiveOnly",
          ACTIVE: "ActiveOnly",
          BOTH: "Both"
        },
        displayType: {
          REMINDER: "reminder",
          NORMAL: "normal",
          SUMMARY: "summary"
        },
        ignore: {
          TIMEOUT: 86400000,
          TIMEOUT_KEY: "IgnoreSessionToastMs"
        }
      },
      sendContacts: {
        TYPE: "message_contactInfo_send",
        cta: { MEDIABAR: "mediabar" },
        action: {
          CANCELED: "canceled",
          CONFIRMED: "confirmed"
        }
      },
      urlPreviewShown: { TYPE: "message_urlpreview_show" },
      urlPreviewClicked: { TYPE: "message_urlpreview_action" },
      contactInfo: {
        TYPE: "message_contactinfo_receive",
        action: {
          SHOW: "showed",
          CLICK: "clicked"
        }
      },
      menuItemClicked: { TYPE: "menu_item_clicked" },
      messageSent: { TYPE: "kpi_message_sent" },
      conversationOrigin: {
        GUEST_HOST: "guestHost",
        NORMAL: "normal"
      },
      mediaBarEvent: { TYPE: "media_bar_event" },
      timelineLoadEvent: { TYPE: "chat_timeline_load" },
      conversationHistoryLoadEvent: { TYPE: "chat_conversation_historyLoad" },
      splashScreenEvent: { TYPE: "experience_load_times" },
      splashScreenSignInEvent: {
        TYPE: "splash_screen_sign_in",
        STATE: {
          APP_READY: "appReady",
          SIGN_IN_FAILED: "signInFailed",
          REAUTH_NEEDED: "reauthNeeded",
          SIGNING_OUT: "signingOut",
          SIGNED_OUT: "signedOut"
        }
      },
      eduCarouselEvents: {
        telemetry: {
          START: "educational_carousel_start",
          FINISH: "educational_carousel_finish"
        },
        action: { HIDE: "educational_carousel_hide" }
      },
      notificationActionsEvent: {
        TYPE: "notificationActions",
        action: {
          accept: "accept",
          decline: "decline",
          open: "open"
        }
      },
      skypeTokenEvent: { TYPE: "skype_token_fetched" },
      swiftCard: {
        swiftCardActionEventName: "kpi_swift_cards_button_pressed",
        swiftCardInvalidEventName: "kpi_swift_cards_invalid_card",
        swiftCardUnsupportedEventName: "kpi_swift_cards_unsupported_card",
        invalidCardReasons: {
          MissingActionType: "Missing action type",
          MissinActionTitle: "Missing action title",
          MissinActionValue: "Missing action value",
          CardMissingContent: "Missing content in card",
          InvalidButton: "Content buttons are not valid",
          MainSectionNotValid: "Invalid main section in Content",
          SignInMissingButtons: "SignIn missing buttons",
          SignInMissingText: "SignIn missing text",
          ReceiptMissingTotal: "Receipt missing total",
          ReceiptInvalidButton: "Receipt invalid buttons",
          MediaCardMissingSrc: "Media card has no SD/HD source",
          SwiftMissingType: "Swift missing type",
          SwiftMissingCards: "Swift missing cards"
        },
        unsupportedCardReasons: {
          CardUnsupportedType: "Card has unsupported type",
          ContentUnsupportedButton: "Content contains unsupported button",
          ReceiptUnsupportedButton: "Receipt contains unsupported button",
          SwiftUnknownType: "Swift has unknown type"
        }
      },
      translator: {
        eventType: {
          OUTGOING: "translator_message_outgoing",
          INCOMING: "translator_message_incoming",
          SETTINGS_SHOW: "translator_settings_show",
          SETTINGS_HIDE: "translator_settings_hide",
          SETTINGS_BUTTON_ENABLED: "translator_settings_button_enabled",
          ME_LANGUAGE_CHANGED: "translator_me_language_changed",
          PARTICIPANT_LANGUAGE_CHANGED: "translator_participant_language_changed"
        },
        action: {
          CLICK_SEE_ORIGINAL: "click_see_original",
          CLICK_SEE_TRANSLATION: "click_see_translation",
          TRANSLATE: "translate",
          RETRANSLATE: "re-translate",
          SHOW: "show"
        },
        initiator: {
          ESCAPE_KEY: "escape_key",
          CLICK_GLOBE_BUTTON: "click_globe_button"
        }
      },
      performanceMarks: {
        EXPERIENCE: {
          INIT_START: "swx_timeline_initStart",
          INIT_END_OK: "swx_timeline_initEnd_ok",
          INIT_END_404: "swx_timeline_initEnd_404",
          INIT_END_ERROR: "swx_timeline_initEnd_err",
          TTL_START: "swx_experience_ttl_start",
          CONTENT_INIT: "swx_content_initStart"
        },
        TIMELINE: {
          RENDER_END: "swx_timeline_renderEnd",
          SYNC_START: "swx_timeline_syncStart",
          SYNC_END_OK: "swx_timeline_syncEnd_ok",
          SYNC_END_404: "swx_timeline_syncEnd_404",
          SYNC_END_ERROR: "swx_timeline_syncEnd_err"
        },
        CONVERSATION: { TTP: "swx_conversation_ttp" },
        NEW_CONVERSATION: {
          FLOW_START: "swx_newConversation_flowStart",
          CREATION_START: "swx_newConversation_creationStart",
          CREATION_END_OK: "swx_newConversation_creationEnd_ok",
          CREATION_END_404: "swx_newConversation_creationEnd_404",
          CREATION_END_ERROR: "swx_newConversation_creationEnd_err",
          RENDER_END: "swx_newConversation_renderEnd"
        },
        CONVERSATION_UPDATE: {
          UPDATE_START: "swx_conversationupdate_start",
          UPDATE_END: "swx_conversationupdate_end",
          SYNC_END: "swx_conversationupdate_syncEnd"
        },
        IM_SEND: {
          POST_START: "swx_imSend_postStart",
          POST_END_OK: "swx_imSend_postEnd_ok",
          POST_END_404: "swx_imSend_postEnd_404",
          POST_END_ERROR: "swx_imSend_postEnd_err"
        },
        CONTACTS: {
          LIST_LOAD: "swx_contact_list_load",
          REMOVE_CONTACT: "swx_contact_remove_contact",
          SEND_REQUEST: "swx_contact_send_request",
          ACCEPT_REQUEST: "swx_contact_accept_request",
          DECLINE_REQUEST: "swx_contact_decline_request",
          QUERY_INVITATION_LIST: "swx_contact_query_invitation_list",
          ADD_CONTACT: "swx_contact_add_contact",
          BLOCK_CONTACT: "swx_contact_block_contact",
          UNBLOCK_CONTACT: "swx_contact_unblock_contact",
          ADD_TO_FAVORITES: "swx_contact_add_contact_to_favorites",
          REMOVE_FROM_FAVORITES: "swx_contact_remove_contact_from_favorites",
          SESSION_SEARCH: "swx_contact_session_search",
          SEARCH_CONTACT: "swx_contact_search",
          PAGE: {
            OPENED: "swx_contacts_page_opened",
            INITIALIZED: "swx_contacts_page_initialized",
            RENDERED: "swx_contacts_page_rendered"
          }
        },
        DISCOVER_AGENTS: {
          LIST_LOAD: {
            START: "swx_discover_agents_list_load",
            END: "swx_discover_agents_list_end"
          },
          PAGE: {
            OPENED: "swx_discover_agents_page_opened",
            INITIALIZED: "swx_discover_agents_page_initialized",
            RENDERED: "swx_discover_agents_page_rendered"
          }
        },
        SEARCH: {
          LOCAL: {
            START: "swx_search_local_start",
            END: "swx_search_local_end",
            RESULTS_RENDERED: "swx_search_local_results_rendered"
          },
          GLOBAL: {
            START: "swx_search_global_start",
            END: "swx_search_global_end",
            RESULTS_RENDERED: "swx_search_global_results_rendered"
          }
        },
        SKYPEOUT: { PAGE: { OPENED: "swx_skypeout_page_opened" } },
        USER_SETTINGS: { PAGE: { OPENED: "swx_settings_page_opened" } }
      },
      measurements: {
        EXPERIENCE: {
          TTL: "swx_experience_ttl",
          TTL404: "swx_experience_ttl",
          SPLASH_TIME: "swx_experience_splash_screen_time"
        },
        TIMELINE: {
          TTL: "swx_timeline_ttl",
          TTL404: "swx_timeline_ttl",
          TTR: "swx_timeline_ttr"
        },
        NEW_CONVERSATION: {
          TTC: "swx_newConversation_ttc",
          TTS: "swx_newConversation_tts",
          TTR: "swx_newConversation_ttr"
        },
        CONVERSATION_UPDATE: {
          TTC: "swx_conversationupdate_ttc",
          TTS: "swx_conversationupdate_tts"
        },
        IM_SEND: {
          TTS: "swx_imsend_tts",
          TTS404: "swx_imsend_tts_404",
          TTR: "swx_imsend_ttr"
        },
        CONTACTS: {
          LIST_LOAD: { TTC: "swx_contacts_list_load_ttc" },
          PAGE: {
            TTC: "swx_contacts_page_ttc",
            TTR: "swx_contacts_page_ttr"
          }
        },
        DISCOVER_AGENTS: {
          LIST_LOAD: { TTC: "swx_discover_agents_list_load_ttc" },
          PAGE: {
            TTC: "swx_discover_agents_page_ttc",
            TTR: "swx_discover_agents_page_ttr"
          }
        },
        SEARCH: {
          LOCAL: { TTR: "swx_search_local_ttr" },
          GLOBAL: { TTR: "swx_search_global_ttr" }
        }
      },
      stages: {
        NEW_CONVERSATION: {
          STARTED: 1,
          CREATED: 2,
          REDIRECTED: 3,
          ABANDONED: 4
        },
        CONVERSATION_UPDATE: {
          COMPLETED: 1,
          CANCELLED: 2,
          ABANDONED: 3
        }
      },
      conversationType: {
        UNKNOWN: -1,
        DIALOG: 0,
        GROUP: 1
      },
      persona: {
        NEWBEE: 1,
        RETURNING: 2,
        CLASSIC_IM: 3,
        POWER_IM: 4
      },
      historyLoadOrigin: {
        TIMELINE_INIT: 1,
        NOTIFICATION_CONV: 2,
        NOTIFICATION_AGGR: 3,
        CONTACT_SEARCH: 4,
        GROUP_SEARCH: 5,
        DIRECTORY_SEARCH: 6,
        NEW_CHAT_OPEN_EXISTING: 7,
        PAGING: 8,
        CALLING: 9,
        AUTHOR_SWITCH: 10,
        ROSTER: 11,
        CONVERSATION_TO_THREAD: 12,
        NEW_CHAT_CREATION: 13,
        TIMELINE_CLICK: 14,
        CONTACT_REQUEST_DECLINED: 15,
        NEW_CHAT_DUMMY: 16,
        NEW_CHAT_API_START_CONVERSATION: 17,
        CONTACTS_PAGE: 18,
        SKYPEOUT_PAGE: 19,
        NEW_CONVERSATION_API: 20,
        CONVERSATION_HEADER_BUTTON: 21,
        CREATE_CONVERSATION_FOR_SCHEDULED_CALL: 22,
        DISCOVER_AGENTS_PAGE: 23,
        SKYPEOUT_PAGE_API: 24,
        UNANSWERED_CALL_UI: 25,
        MENTION_ME: 99,
        SKYPE_URI: 100
      },
      timelineLoadOrigin: {
        LOAD: 1,
        RELOAD: 2,
        RESSURECT: 3
      },
      messageTypes: {
        MEDIA_VIDEO: 1,
        MEDIA_PICTURE: 2,
        MEDIA_LOCATION: 4,
        CALLING_OTHER: 8,
        FILES_MASK: 4080,
        FILES_PICTURE: 16,
        FILES_VIDEO: 32,
        FILES_OFFICE: 64,
        FILES_ARCHIVE: 128,
        FILES_BINARY: 256,
        FILES_PDF: 512,
        FILES_OTHER: 1024,
        FILES_AUDIO: 2048,
        RICHTEXT_MASK: 61440,
        RICHTEXT_FORMAT: 4096,
        RICHTEXT_EMOTICONS: 8192,
        RICHTEXT_ME: 16384,
        RICHTEXT_OTHER: 32768,
        CONTACT_OTHER: 65536,
        TEXT_MASK: 15728640,
        TEXT_ME: 1048576,
        TEXT_OTHER: 2097152,
        OTHER_TYPES: 16777216
      },
      subCategories: {
        LOCAL_CONTACT_SEARCH: "LocalContactSearch",
        GLOBAL_CONTACT_SEARCH: "GlobalContactSearch",
        LOAD_CONTACTS: "LoadContacts"
      },
      poll: {
        eventName: {
          DESIGNER_OPENED: "poll_ui_designer_opened",
          STICKY_MESSAGE_CLICKED: "poll_ui_sticky_message_clicked",
          AVATAR_ELIPSIS_CLICKED: "poll_ui_avatar_elipsis_clicked",
          ERROR: "poll_error",
          ANSWER_LENGTH: "poll_ui_answer_length",
          ACTIVITY: "poll_activity"
        },
        activityType: {
          SEND: "send",
          VOTE: "vote",
          QUOTE: "quote",
          EDIT: "edit",
          REMOVE: "remove",
          CLOSE: "close"
        },
        errorType: {
          PARSING: "parsing",
          SEND: "send",
          OTHER: "other"
        },
        property: {
          CONVERSATION_ID: "conversation_id",
          MESSAGE_ID: "message_id",
          ACTIVITY_TYPE: "activity_type",
          ERROR_TYPE: "error_type",
          XMM_TYPE: "xmm_type",
          QUESTION_LENGTH: "question_length",
          ANSWER_LENGTH: "answer_length",
          ANSWERS_COUNT: "answers_count",
          MULTI_VOTE: "multi_vote",
          IS_NEW_VOTE: "is_new_vote",
          TOTAL_VOTES: "total_votes",
          TIME_SINCE_CREATION: "time_since_creation"
        }
      },
      userSettings: {
        eventName: {
          PREFERENCE_FETCHED: "user_settings_preference_fetched",
          PREFERENCE_CHANGED: "user_settings_preference_changed",
          PANEL_SHOWN: "user_settings_panel_shown",
          PAGE_DISMISSED: "user_settings_page_dismissed"
        },
        outcomeNames: {
          SUCCESS: "success",
          FAILURE: "failure"
        },
        property: {
          ITEM_NAME: "name",
          ITEM_VALUE: "value",
          OPERATION_OUTCOME: "outcome",
          OPERATION_DURATION: "duration"
        },
        UNKNOWN: "N/A"
      },
      inappActivity: {
        KPI_INAPP_ACTIVITY_START: "kpi_inapp_activity_start",
        KPI_INAPP_ACTIVITY_END: "kpi_inapp_activity_end"
      },
      pstn: {
        eventName: {
          PSTN_BUTTON_CLICKED: "kpi_pstn_button_clicked",
          PSTN_CALL_INITIATED: "kpi_pstn_call_initiated",
          ADD_CREDIT: "kpi_pstn_add_credit",
          ADD_SUBSCRIPTION: "kpi_pstn_add_subscription",
          CREDIT_BALANCE_UPDATE_CALL_END: "kpi_pstn_credit_balance_latency_call_end"
        },
        entryPoint: {
          CONTACT_LIST: "Contact List",
          SKYPE_OUT_PAGE: "Skype Out Page",
          CONVERSATION: "Conversation",
          RECENTS: "Recents",
          SEARCH: "Search Results",
          NO_CREDIT_CALL_START: "No Credit Call Start",
          NO_CREDIT_CALL_END: "No Credit Call End",
          NO_SUBSCRIPTION_CALL_START: "No Subscription Call Start",
          NO_SUBSCRIPTION_CALL_END: "No Subscription Call End"
        },
        cssClasses: {
          ADD_CREDIT: "js-addCredit",
          ADD_SUBSCRIPTION: "js-addSubscription"
        }
      },
      endpoints: { TYPE: "endpoints" },
      reopenSidebar: {
        REOPENED: "sidebar_reopened",
        CLOSE_TIMEOUT: "sidebar_close_timeout"
      },
      idleUsersAnalytics: {
        localKeys: {
          signInData: "swx|signInData",
          sidebarActivity: "swx|sidebarActivity"
        },
        TYPE: "idleUsersAnalytics"
      },
      usersAnalytics: { TYPE: "usersAnalytics" },
      themeEvent: {
        TYPE: "current_theme",
        theme: {
          DEFAULT: "default",
          DARK: "dark"
        }
      }
    },
    globalizationFormatKeys: {
      time: {
        CALL_DURATION: "duration",
        SHORT: "short"
      },
      date: {
        DAY_MONTH: "dayMonth",
        DAY_MONTH_YEAR: "dayMonthYear",
        DAY_ABBREVIATION: "dayAbbr",
        DAY_NAME: "dayName",
        DATE_ABBREVIATION: "dateAbbr",
        SHORT_DATE_ABBREVIATION: "shortDateAbbr"
      }
    },
    api: {
      renderConversation: {
        errorMessages: {
          CONTAINER_UNDEFINED: "Container is undefined",
          CONTAINER_NOT_ELEMENT_NOT_SELECTOR: "Container is not a DOM element or CSS selector",
          PARTICIPANTS_WRONG_FORMAT: "Participants are expected to be an array",
          CONVERSATION_ID_WRONG_FORMAT: "Conversation ID is expected to be a string",
          PARTICIPANTS_AND_CONVERSATION_ID_UNDEFINED: "Participants or Conversation ID can't be undefined"
        }
      },
      conversation: {
        errorMessages: {
          NO_PARTICIPANTS: "Cannot start, at least one participant is required",
          SEARCH_FAILED: "Search for Person failed",
          URI_NOT_VALID: "Uri not a string",
          SUCCESS_CALLBACK_ERROR: "Unexpected error in success callback"
        }
      },
      modality: {
        errorMessages: {
          INVALID_MODALITIES: "Invalid modalities format provided",
          MODALITY_TYPE_NOT_SUPPORTED: "Modality type not supported",
          MODALITY_START_FAILED: "Modality cannot be started",
          ERROR_CALLBACK_ERROR: "Unexpected error in error callback"
        }
      },
      auth: {
        errorTypes: {
          TOO_MANY_CONNECTIONS_ERROR: "TooManyConnectionsError",
          NOT_LINKED: "AccountNotLinkedError",
          AGE_RESTRICTION_ERROR: "underage",
          OAUTH_FAILED_ERROR: "OAuthFailed",
          LOGIN_REQUIRED_ERROR: "login_required",
          SIGN_IN_CANCELED_ERROR: "Canceled",
          SIGNED_OUT_ERROR: "SignedOut",
          REAUTH_NEEDED: "ReauthenticationNeeded",
          TIMEOUT: "timeout"
        },
        errorMessages: {
          AUTH_DISABLED: "authentication disabled",
          ALREADY_SIGNED_IN: "user already signed in",
          ALREADY_SIGNED_OUT: "user already signed out",
          NOT_LINKED: "not-linked"
        },
        accountLinking: {
          WELCOME_FLOW: "welcome",
          RELINK_FLOW: "relink",
          INLINE_NEW_USER_FLOW: "inlineNewUser"
        },
        authProviderType: {
          SKYPE_TOKEN: "skypeToken",
          IMPLICIT_AUTH: "implicitOAuth",
          PASSWORD: "password",
          ANONYMOUS: "anonymous"
        },
        DEFAULT_SIGNIN_TIMEOUT: 65000
      }
    },
    silentLogin: {
      errorMessages: {
        NOT_LINKED: "not_linked",
        TIMED_OUT: "timed_out",
        INVALID_GRANT: "invalid_grant"
      }
    },
    conversation: {
      TOPIC_DELIMITER: ", ",
      NUMBER_OF_PARTICIPANT_NAMES_IN_TOPIC: 4
    },
    uiMode: { NARROW: "narrow" },
    cache: {
      VERSION: "1.9",
      PREFIX_KEYWORD: "swx",
      INTERNAL_KEYS: {
        VERSION: "version",
        ENCRYPTION_KEY: "encryptionKey",
        KEYS_MAP: "keysMap"
      },
      DEFAULT_BUFFER_TIMEOUT: 300
    },
    experience: { RENDERER_CLASS: "swx" },
    disposableGroups: {
      PUB_SUB: "PUB_SUB",
      GENERIC_DISPOSABLE: "GENERIC_DISPOSABLE",
      INTERVAL: "INTERVAL",
      TIMEOUT: "TIMEOUT",
      DOM_EVENT: "DOM_EVENT"
    },
    urlValidator: { ALLOW_EMPTY: {} },
    i18n: { EMBEDDED_LOCALE: "en-us" },
    mentions: {
      "class": "mention(?: me)?",
      meIdentifier: /class\s?=\s?["']mention me["']/
    },
    fileTransfer: {
      MAX_RESOLUTION: 16000,
      MAX_FILE_SIZE: 314572800,
      SUPPORTED_PICTURE_TYPES: "image/x-png, image/png, image/jpeg",
      MAX_PHOTO_SIZE: 20971520,
      FILE_DOWNLOAD_WARNING_FLAG_API_ID: 19
    },
    messageDestination: {
      SKYPE_NETWORK: "destination:skype",
      SMS_NETWORK: "destination:sms"
    },
    annotationType: { EMOTIONS: "emotions" },
    emotionTypes: { HEART: "heart" },
    sidebar: {
      position: {
        LEFT: "left",
        RIGHT: "right"
      },
      cssClasses: {
        SLIDE_LEFT_TO_RIGHT: "slideLeftToRight",
        SLIDE_RIGHT_TO_LEFT: "slideRightToLeft"
      }
    },
    textarea: { MAX_LENGTH: 2000 },
    urlPreviewType: {
      WWW: "urlp-www",
      YT: "utlp-yt",
      GIF: "urlp-gif"
    },
    userSettings: {
      categories: {
        IM_SETTINGS: "im_settings",
        IM_APPEARANCE: "im_appearance",
        PRIVACY: "privacy",
        UNLISTED: "unlisted",
        CONTACTS: "contacts",
        AUDIO_VIDEO: "audio_video",
        NOTIFICATIONS: "notifications",
        PERSONALIZATION: "personalization"
      },
      preferences: {
        URL_PREVIEWS: "urlPreviews",
        YOUTUBE_PLAYER: "youTubePlayer",
        MENTIONS: "mentions",
        FILE_PASTE: "filePaste",
        TYPING_INDICATOR: "typingIndicator",
        SKYPE_CALL_POLICY_SUPPORT: "skypeCallPolicySupport",
        SKYPE_VIDEO_CALLING_POLICY_SUPPORT: "skypeVideoCallingPolicySupport",
        READ_RECEIPT: "readReceipt",
        AUTO_BUDDY: "autoBuddy",
        AUTO_BUDDY_DISCOVERY: "autoBuddyDiscovery",
        DYNAMIC_DISCOVERY: "dynamicDiscovery",
        NOTIFICATIONS: "notifications",
        NOTIFICATIONS_SOUND: "notificationsSound",
        CHAT_NOTIFICATIONS_SOUND: "chatNotificationsSound",
        CALL_NOTIFICATIONS: "callNotifications",
        CALL_NOTIFICATIONS_SOUND: "callNotificationsSound",
        DEFER_RINGING_SOUND: "deferRingingSound",
        EMOTICON_SUGGESTIONS: "emoticonSuggestions",
        SHOW_EMOTICONS: "showEmoticons",
        SHOW_ANIMATED_EMOTICONS: "showAnimatedEmoticons",
        SHOW_LARGE_EMOTICONS: "showLargeEmoticons",
        DARK_THEME: "darkTheme",
        VIDEO_AUTOPLAY: "videoAutoPlayback"
      }
    },
    proofTypes: {
      EMAIL: "email",
      PHONE: "phone"
    },
    shortCircuit: {
      scenarios: {
        ADD_VERIFIED_PHONE: "settingspnv",
        MANAGE_ADDRESSBOOKS: "settingsaddressbooks"
      }
    },
    window: { BLANK_NAME: "_blank" },
    educationBubbles: {
      ORIENTATION: {
        TOP: "TOP",
        BOTTOM: "BOTTOM",
        LEFT: "LEFT",
        RIGHT: "RIGHT"
      },
      SIZE: { LARGE: "LARGE" }
    },
    classes: {
      WHITE_THEME: "themeWhiteCompliant",
      BLUE_THEME: "themeBlue",
      WHITE_COLOR: "white"
    },
    modalDialog: { ALLOW_BROWSER_NOTIFICATIONS_CONTAINER_ID: "overlayAllowBrowserNotifications" },
    rtlLanguages: [
      "ar-sa",
      "fa-ir",
      "he-il",
      "ku-arab-iq",
      "ur-pk"
    ]
  };
}));
