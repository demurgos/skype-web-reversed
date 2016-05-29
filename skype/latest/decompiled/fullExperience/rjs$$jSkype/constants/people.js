define("jSkype/constants/people", {
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
});
