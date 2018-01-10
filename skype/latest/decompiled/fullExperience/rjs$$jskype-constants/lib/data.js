(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("jskype-constants/lib/data", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e) {
    return new RegExp("^" + e + "\\|");
  }
  var r = "contactPresence";
  t.__esModule = !0;
  t["default"] = {
    storageKeys: {
      ENDPOINT_ID: "endpointId",
      SKYPE_ID_REG_TOKEN: "skypeIdRegistrationToken",
      PRESENCE_DATA: "presenceData",
      RESURECTION_KEY: "isResurected",
      CONTACT_PROFILES: "contacts",
      CONTACT_PRESENCE: r,
      CONTACT_LIST_ETAG: "etagContacts",
      CONTACTS_RAW_VIEW_ETAG: "etagContactsRawView",
      CONTACTS_RAW_VIEW_DATA: "contactsRawViewData",
      CALLING_DEVICES: "callingDevices"
    },
    storageKeyRegExp: {
      CONTACT_PRESENCE: n(r),
      CONVERSATION: n("conv")
    }
  };
}));
