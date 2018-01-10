(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-constants/lib/calling", [
      "require",
      "exports",
      "swx-enums"
    ], e);
}(function (e, t) {
  var n = e("swx-enums");
  t.__esModule = !0;
  t["default"] = {
    DOM_ELEMENT: {
      ID: {
        CHAT_COMPONENT: "chatComponent",
        CONTENT_WRAPPER: "contentWrapper",
        CALL_SCREEN: "callScreen",
        CALL_SCREEN_RESIZE: "callScreenResize",
        LOCAL_VIDEO_CONTAINER: "local-video-ui"
      }
    },
    SELECTORS: {
      CONTAINER: ".av .middle",
      MAIN: ".av .main",
      VIDEO: ".video",
      TOP: ".top",
      BOTTOM: ".bottom",
      STAGE: ".stage",
      ROSTER: "swx-call-roster"
    },
    CLASSES: {
      VIDEO_ON: "videoOn",
      LOCAL_PIP_IN_ROSTER: "localPipInRoster",
      PLUGINLESS: "pluginless",
      ASPECT_RATIO_1BY1: "ratio1by1",
      ASPECT_RATIO_4BY3: "ratio4by3",
      ASPECT_RATIO_16BY9: "ratio16by9",
      SCREEN_SHARING: "screenSharing",
      SMALL_PREVIEW: "smallPreview"
    },
    CONTROLS: {
      CALL_SCREEN: "av",
      END_CALL_CONTROL: "endCallControl",
      MUTE_CONTROL: "muteControl"
    },
    EVENTS: {
      START_CALL: "calling.startCall",
      RINGING_IN: "calling.ringingIn",
      ANSWER: "calling.answer",
      REJECT: "calling.reject",
      INCOMING_CALL_TOAST_TIMEOUT: "calling.incomingCallToastTimeout",
      INCOMING_INIT_ERROR: "IncomingInitialisationError",
      INCOMING_INIT_SUCCESS: "IncomingInitialisationSuccess",
      STOP_RINGING: "calling.stopRinging",
      FULLSCREEN_CHANGED: "calling.fullscreenChanged",
      CALL_SCREEN_CLOSE: "calling.callScreenClose",
      CALL_SCREEN_HEIGHT_CHANGED: "calling.callScreenChanged",
      START_RINGING: "calling.startRinging",
      CALLSESSION_STARTING: "calling.callsession.starting",
      CALLSESSION_ENDED: "calling.callsession.ended",
      PARICIPANT_VOICE_STATUS: "calling.participantVoiceStatus",
      PARICIPANT_JOINED: "calling.participantJoined",
      CALL_STATUS_CHANGED: "calling.callStatusChanged",
      ERROR_INCOMING_CALL: "calling.error.incomingCall",
      ERROR_OUTGOING_CALL: "calling.error.outgoingCall",
      CQF_SCREEN_CLOSE: "calling.cqfScreenClose",
      CQF_CANCEL: "calling.cqfCancel",
      UNANSWERED_CALL_CLOSE: "unansweredCall:close",
      UNANSWERED_CALL_SEND_MESSAGE: "unansweredCall:sendMessage"
    },
    TELEMETRY_EVENTS: {
      PLUGIN_INSTALL_STARTED: "PluginInstallStarted",
      PLUGIN_INSTALL_ENDED: "PluginInstallEnded"
    },
    PLUGIN_INSTALL_EXIT_METHOD: {
      CLOSE: "close",
      PLUGIN_DETECTED: "pluginDetected",
      CALL_STARTED: "callStarted"
    },
    NA: "n/a",
    CALLING_SETUP_STEPS: {
      OVERLAY_PLUGIN_CALLBACK: "overlayPluginCallback",
      CLOSE_CALLING_SETUP: "closeCallingSetup",
      OVERLAY_PLUGIN_STEPS: "overlayPluginSteps",
      OVERLAY_EXTENSION_INSTALLED: "overlayExtensionInstalled",
      OVERLAY_EXTENSION_INSTALL: "overlayExtensionInstall",
      OVERLAY_EXTENSION_INSTALL_FAILED: "overlayExtensionInstallFailed",
      OVERLAY_EXTENSION_START: "overlayExtensionStart",
      OVERLAY_PLUGIN_START: "overlayPluginStart",
      OVERLAY_PLUGIN_UNBLOCK: "overlayPluginUnblock",
      OVERLAY_PLUGIN_FIREFOX_UNABLE_TO_CALL: "overlayPluginFirefoxUnableToCall"
    },
    SOUND_LEVEL_EVENT_MODE: {
      None: "None",
      Boolean: "Boolean",
      Full: "Full"
    },
    SOUND_LEVEL_DEFAULT_THRESHOLD: 4,
    PLUGIN_MAX_SOUND_LEVEL: 10,
    PARTICIPANT_REMOVE_FROM_CALLSCREEN_TIMEOUT: 10000,
    CALL_STATES: {
      CONNECTING: "connecting",
      CALLING: "calling",
      EARLY_MEDIA: "earlyMedia",
      CONNECTED: "connected",
      ENDING: "ending",
      ENDED: "ended"
    },
    NOTIFICATION_ACTIONS: {
      AUDIO: "audio",
      VIDEO: "video",
      REJECT: "reject",
      INSTALL_PLUGIN: "installPlugin"
    },
    PLUGIN_EVENT_RESULTS: {
      LOAD_SUCCESSFUL: "LoadSuccessful",
      LOGIN_SUCCESS: "LoggedIn",
      VIDEO_STATUS: {
        AVAILABLE: "Available",
        NOT_AVAILABLE: "NotAvailable"
      }
    },
    PLUGIN_COMPONENT: {
      MANAGER_ID: "__pluginFx",
      CORE_ID: "SkypeCore",
      VIDEO_ID: "VideoUI"
    },
    PLUGIN_VIDEO_MODES: {
      STRETCH: 1,
      CROP: 2,
      FIT: 3
    },
    PLUGIN_MEDIA_TYPES: {
      VIDEO: "Video",
      SCREEN_SHARING: "ScreenSharing"
    },
    SHELL_APP_PRELOAD_ENABLED_VERSION: "7.4",
    SHELL_APP_METHODS: {
      GET_VERSION: "getVersion",
      SHOW_WINDOW: "showWindow",
      HIDE_WINDOW: "hideWindow",
      CLOSE_WINDOW: "closeWindow"
    },
    SHELL_APP_EVENTS: { WINDOW_CLOSING: "windowClosing" },
    ERRORS: { CALL_ABORTED: "callAborted" },
    ERROR_CODES: {
      TPC_INIT: 1,
      REGISTRAR_INIT: 2,
      UNSUPPORTED_BROWSER: 3,
      UNSUPPORTED_OS: 4
    },
    FEATURE_FLAGS: {
      RESIZE_CALL_AND_CHAT: "resizeCallAndChat",
      CALLING: "calling",
      GVC: "GVC"
    },
    CQF: {
      THANKS_TIMEOUT: 3000,
      STEPS: {
        INTRO: "intro",
        QUESTIONNAIRE: "questionnaire",
        THANKS: "thanks"
      }
    },
    DEVICE_TYPE: {
      CAMERA: "camera",
      MICROPHONE: "microphone",
      SPEAKER: "speaker"
    },
    UNANSWERED_CALL_REASONS: {
      BUSY: "BUSY",
      MISSED: "NO_ANSWER",
      UNAVAILABLE: "UNAVAILABLE"
    },
    UNANSWERED_CALL_ACTIONS: {
      CANCEL: "CANCEL",
      CHAT: "CHAT",
      RETRY: "RETRY",
      MESSAGE_CALLEE: "MESSAGE_CALLEE",
      OTHER_DISMISS: "OTHER_DISMISS"
    },
    UNANSWERED_CALL_RETRY_ACTIONS: {
      SKYPE: "SKYPE",
      PSTN: "PSTN",
      DIAL_PAD: "DIAL_PAD"
    },
    DEVICE_SELECTION_REASON: {
      USER: "UserAction",
      CACHE: "RestoredFromCache"
    },
    PARTICIPANT_MENU: {
      ANIMATION_ELEMENT_SELECTOR: ".participantMenuPill",
      ANIMATION_NAME: "av-participant-menu-move-up",
      ANIMATION_OFFSET: 70,
      DEFAULT_OFFSET: 4
    },
    CALL_SCREEN_DIALOG: {
      ALLOWED_FOCUS_SELECTORS: [
        ".Me",
        ".toasts",
        ".footer",
        ".notifications",
        "swx-sidebar",
        ".conversationHistory",
        ".swx-chat-input"
      ],
      NAME: {
        ADD_PARTICIPANTS: "addParticipants",
        TRANSFER_CALL: "transferCall",
        AV_SETTINGS: "avSettings",
        SCREEN_SHARING_PREVIEW: "screenSharingPreview",
        PSTN_WARNING: "pstnWarning"
      }
    },
    PLUGINLESS_PSTN: {
      END_REASONS: {
        SUBCODE_RANGE: {
          MIN: 200000,
          MAX: 299999
        },
        REASON_MAP: {
          403: {
            6423: n.callDisconnectionReason.InsufficientFunds,
            8403: n.callDisconnectionReason.ForbiddenNumber,
            9402: n.callDisconnectionReason.InsufficientFunds,
            10403: n.callDisconnectionReason.ForbiddenNumber
          },
          404: { 10404: n.callDisconnectionReason.InvalidNumber },
          480: {
            6422: n.callDisconnectionReason.InsufficientFunds,
            6432: n.callDisconnectionReason.InvalidNumber
          }
        }
      }
    }
  };
}));
