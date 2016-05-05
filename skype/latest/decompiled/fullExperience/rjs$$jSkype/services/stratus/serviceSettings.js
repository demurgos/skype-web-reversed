define("jSkype/services/stratus/serviceSettings", [
  "require",
  "exports",
  "module",
  "jSkype/settings",
  "constants/common"
], function (e, t) {
  function i(e) {
    return "${" + e + "}";
  }
  var n = e("jSkype/settings"), r = e("constants/common");
  t.getHost = function () {
    return n.settings.stratusService.host;
  }, t.getAvatarEndPoint = function (e) {
    return t.getHost() + n.settings.stratusService.avatarUrl.replace(t.tokens.contactId, encodeURIComponent(e));
  }, t.getAvatarUpdateEndPoint = function (e) {
    return n.settings.stratusService.avatarUpdateUrl.replace(t.tokens.contactId, e);
  }, t.getProfileEndPoint = function () {
    return n.settings.stratusService.profileEndpoint;
  }, t.getProfilesEndPoint = function () {
    return n.settings.stratusService.profilesEndpoint;
  }, t.getProfilesEndPointV2 = function () {
    return n.settings.stratusService.batchProfilesEndpoint;
  }, t.getUserInfoEndPoint = function () {
    return n.settings.stratusService.userInfoEndpoint;
  }, t.getContactsEndPoint = function () {
    return n.settings.stratusService.contactsEndpoint;
  }, t.getBlockContactEndpoint = function (e) {
    return n.settings.stratusService.blockContactEndpoint.replace(t.tokens.contactId, encodeURIComponent(e));
  }, t.getUnblockContactEndpoint = function (e) {
    return n.settings.stratusService.unblockContactEndpoint.replace(t.tokens.contactId, encodeURIComponent(e));
  }, t.getDeleteContactEndpoint = function (e) {
    return n.settings.stratusService.deleteContactEndpoint.replace(t.tokens.contactId, encodeURIComponent(e));
  }, t.getContactRequestEndpoint = function () {
    return n.settings.stratusService.contactRequestEndpoint;
  }, t.getTimeIntervalForContactRequests = function () {
    return n.settings.stratusService.contactRequestTimeInterval;
  }, t.getDelayForFirstContactRequest = function () {
    return n.settings.stratusService.firstContactRequestDelay;
  }, t.getDirectorySearchEndpoint = function (e) {
    return n.isFeatureOn(r.featureFlags.DIRECTORY_SEARCH_SKYPE_AND_LYNC) ? n.settings.stratusService.directorySearchEndpoint.replace(t.tokens.keyword, encodeURIComponent(e)) : n.settings.stratusService.directorySearchEndpointSkypeOnly.replace(t.tokens.keyword, encodeURIComponent(e));
  }, t.getDirectorySearchByIdEndpoint = function (e) {
    return n.settings.stratusService.directorySearchByIdEndpoint.replace(t.tokens.skypeName, encodeURIComponent(e));
  }, t.getRetryPolicy = function () {
    return n.settings.stratusService.retry;
  }, t.tokens = {
    id: i("id"),
    contactId: i("contactId"),
    version: i("version"),
    keyword: i("keyword"),
    skypeName: i("skypeName"),
    reason: i("reason")
  };
})
