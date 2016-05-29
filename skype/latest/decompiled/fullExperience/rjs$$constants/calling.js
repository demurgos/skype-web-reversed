define("constants/calling", [], function () {
  return {
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
      STAGE: ".stage"
    },
    CLASSES: {
      VIDEO_ON: "videoOn",
      LOCAL_PIP: "localPip",
      ASPECT_RATIO_1BY1: "ratio1by1",
      ASPECT_RATIO_4BY3: "ratio4by3",
      ASPECT_RATIO_16BY9: "ratio16by9"
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
      CQF_CANCEL: "calling.cqfCancel"
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
      OVERLAY_PLUGIN_UNBLOCK: "overlayPluginUnblock"
    },
    LAYOUT_TYPES: {
      GALLERY: "gallery",
      ACTIVE_SPEAKER: "activeSpeaker"
    },
    SOUND_LEVEL_EVENT_MODE: {
      None: "None",
      Boolean: "Boolean",
      Full: "Full"
    },
    SOUND_LEVEL_DEFAULT_THRESHOLD: 4,
    PLUGIN_MAX_SOUND_LEVEL: 10,
    PARTICIPANT_REMOVE_FROM_CALLSCREEN_TIMEOUT: 20000,
    PLUGIN_INIT_TIMEOUT: 25000,
    LAYOUT_PLACES: {
      STAGE: "stage",
      ROSTER: "roster"
    },
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
    PLUGIN_ERROR: {
      NOT_INSTALLED: "pluginNotInstalled",
      INIT_TIMEOUT: "pluginInitializationTimeout"
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
    ERRORS: { P2P_FALLBACK: "p2pFallback" },
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
    }
  };
});
