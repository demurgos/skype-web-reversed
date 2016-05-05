define("jSkype/constants/data", [], function () {
  function t(e) {
    return new RegExp("^" + e + "\\|");
  }
  var e = "contactPresence";
  return {
    storageKeys: {
      ENDPOINT_ID: "endpointId",
      SKYPE_ID_REG_TOKEN: "skypeIdRegistrationToken",
      PRESENCE_DATA: "presenceData",
      RESURECTION_KEY: "isResurected",
      CONTACT_PROFILES: "contacts",
      CONTACT_PRESENCE: e,
      ETAG: "etagContacts"
    },
    storageKeyRegExp: {
      CONTACT_PRESENCE: t(e),
      CONVERSATION: t("conv")
    }
  };
})
