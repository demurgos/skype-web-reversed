(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-constants/lib/pluginConst", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.__esModule = !0;
  t["default"] = {
    PERSISTENT_REQUIRED_VERSION: "7.2",
    NATIVE_ARGUMENTS_REQUIRED_VERSION: "7.6",
    LOGIN_STATUS: {
      LOGGED_OUT: "LoggedOut",
      LOGGED_IN: "LoggedIn",
      LOGGING_IN: "LoggingIn",
      LOGGING_OUT: "LoggingOut",
      INVALID_CREDENTIALS: "InvalidCredentials",
      IMPRINT_FAILURE: "ImprintFailure",
      LOGIN_FAILURE: "LoginFailure",
      LOGIN_SUCCESS: "LoginSuccess",
      UNKNOWN: "Unknown"
    },
    LOGIN_FAILURE_STOP_GAP: 5,
    LOAD_RESULT: {
      LOAD_SUCCESSFUL: "LoadSuccessful",
      NO_INSTANCE_MANAGER: "NoInstanceManager",
      COMPONENT_NOT_FOUND: "ComponentNotFound",
      COMPONENT_LOAD_FAILED: "ComponentLoadFailed",
      COMPONENT_INIT_FAILED: "ComponentInitFailed",
      COMPONENT_LOAD_CANCELLED: "ComponentLoadCancelled"
    },
    VOICE_STATUS: {
      NOT_AVAILABLE: "NotAvailable",
      AVAILABLE: "Available",
      RINGING: "Ringing",
      JOINING: "Joining",
      LISTENING: "Listening",
      SPEAKING: "Speaking",
      ONHOLD: "OnHold",
      LEAVING: "Leaving",
      UNKNOWN: "Unknown"
    },
    VIDEO_STATUS: {
      NOT_AVAILABLE: "NotAvailable",
      AVAILABLE: "Available",
      STARTING: "Starting",
      RENDERING: "Rendering",
      STOPPING: "Stopping",
      SWITCHING_DEVICE: "SwitchingDevice",
      UNKNOWN: "Unknown"
    },
    VIDEO_MODE: {
      STRETCH: "Stretch",
      CROP: "Crop",
      FIT: "Fit"
    },
    PROGID_VERSION: "SkypePlugin.VersionQuery",
    MIME_TYPE: "application/x-skype-nativeplugin7.0",
    OBJECT_CLASS_ID: "CLSID:20BEBD18-11D0-4470-AAE1-F34B9E8D9761",
    PLUGIN_ERRORS: {
      REASON_CANNOT_CAPTURE: "CannotCapture",
      REASON_ALREADY_EXISTS: "AlreadyExists",
      NOT_INSTALLED: "pluginNotInstalled",
      INIT_TIMEOUT: "pluginInitializationTimeout",
      MANAGER_LOAD_ERROR: "pluginManagerLoadError",
      MANAGER_LOAD_TIMEOUT: "pluginManagerLoadTimeout",
      LOGIN_ABORTED: "pluginLoginAborted"
    },
    MAX_RESPONSE_LOG_LENGTH: 500
  };
}));
