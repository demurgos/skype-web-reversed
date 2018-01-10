(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-constants/lib/people", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.__esModule = !0;
  t["default"] = {
    SELF: "self",
    ECHO_CONTACT_ID: "echo123",
    searchLimit: 20,
    contactTypes: {
      USER: "8",
      AGENT: "28",
      PSTN: "4"
    },
    contactList: {
      className: {
        LOCAL: "people",
        DIRECTORY: "directory"
      }
    },
    contactPicker: {
      states: {
        STATE_DEFAULT: "default",
        STATE_SEARCH: "search"
      }
    },
    authorizationStates: {
      UNKNOWN: "UNKNOWN",
      UNAUTHORIZED: "UNAUTHORIZED",
      PENDING_OUTGOING: "PENDING_OUTGOING",
      PENDING_INCOMING: "PENDING_INCOMING",
      AUTHORIZED: "AUTHORIZED",
      SUGGESTED: "SUGGESTED"
    },
    showStrategies: {
      ALL: "ALL",
      AVAILABLE_ONLY: "AVAILABLE_ONLY",
      AGENTS_ONLY: "AGENTS_ONLY"
    },
    contactPageTabIds: {
      AVAILABLE_TAB: "availableTab",
      ALL_CONTACTS_TAB: "allContactsTab",
      AGENTS_TAB: "agentsTab"
    },
    scopes: {
      FULL: "full",
      DELTA: "delta"
    }
  };
}));
