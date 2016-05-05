define("constants/outOfBrowser", {
  SHELL_APP_ID: "com.skype.shellapp",
  SHELL_APP_MIME_TYPE: "application/x-skype-shellapp",
  commandTypes: {
    REQUEST: "REQUEST",
    RESPONSE: "RESPONSE"
  },
  commands: {
    SHELL_APP_READY_FOR_BOOTSTRAP: "SHELL_APP_READY_FOR_BOOTSTRAP",
    BOOTSTRAP: "BOOTSTRAP",
    INIT: "INIT",
    SHELL_APP_INITIALISED: "SHELL_APP_INITIALISED",
    SHOW: "SHOW",
    HIDE: "HIDE",
    HOST_CALL: "HOST_CALL",
    JOIN_CALL: "JOIN_CALL",
    START: "START",
    ACCEPT: "ACCEPT",
    UPDATE_INCOMING_PAYLOAD: "UPDATE_INCOMING_PAYLOAD",
    REJECT: "REJECT",
    STOP: "STOP",
    MUTE: "MUTE",
    UNMUTE: "UNMUTE",
    CALL_INFO: "CALL_INFO",
    CONTACTS_DATA_REQUEST: "CONTACTS_DATA_REQUEST",
    CONTACTS_DATA_RESPONSE: "CONTACTS_DATA_RESPONSE",
    CHANGE_STATE: "CHANGE_STATE",
    PSTN_EVENT: "PSTN_EVENT",
    SHELL_APP_LOG: "SHELL_APP_LOG",
    PLUGIN_ERROR: "PLUGIN_ERROR",
    ESCALATE_CONVERSATION: "ESCALATE_CONVERSATION",
    SETTINGS_UPDATE: "SETTINGS_UPDATE"
  },
  shellAppIndexPagePath: "/shellApp/index.html",
  shellAppPreloadEnabledVersion: "7.4",
  shellAppMethods: {
    PostMessage: "postMessage",
    GetVersion: "getVersion",
    ShowWindow: "showWindow",
    HideWindow: "hideWindow",
    CloseWindow: "closeWindow"
  },
  shellAppEvents: {
    MessageReceived: "message",
    WindowShown: "windowShown",
    WindowHidden: "windowHidden",
    WindowClosing: "windowClosing"
  }
})
