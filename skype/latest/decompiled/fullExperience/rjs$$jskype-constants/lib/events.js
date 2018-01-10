(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("jskype-constants/lib/events", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.__esModule = !0;
  t["default"] = {
    actions: {
      subscriptionCreation: "subscriptioncreation",
      getUserPresence: "getuserpresence",
      setUserPresence: "setuserpresence",
      getSelfProperties: "getselfproperties",
      messageSubmitted: "messagesubmitted"
    },
    contacts: { CONTACTS_LOADED: "contactsLoaded" },
    resourceTypes: { USER_PRESENCE: "userpresence" }
  };
}));
