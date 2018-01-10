(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("jskype-constants/lib/people", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.__esModule = !0;
  t["default"] = {
    SELF: "self",
    SUGGESTED_CONTACT_ACTIVITY_MESSAGE: "Skype",
    batch: {
      MAX_ITEMS: 100,
      MAX_DELAY: 500
    },
    contactList: { retry: { TIMEOUT: 30000 } },
    endpoints: { MOBILE: "isMobile" },
    authorizationStates: {
      UNKNOWN: "UNKNOWN",
      UNAUTHORIZED: "UNAUTHORIZED",
      PENDING_OUTGOING: "PENDING_OUTGOING",
      PENDING_INCOMING: "PENDING_INCOMING",
      AUTHORIZED: "AUTHORIZED",
      SUGGESTED: "SUGGESTED"
    }
  };
}));
