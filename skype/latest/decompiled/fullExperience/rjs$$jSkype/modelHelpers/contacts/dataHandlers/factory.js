define("jSkype/modelHelpers/contacts/dataHandlers/factory", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/contacts/dataHandlers/meProfile",
  "jSkype/modelHelpers/contacts/dataHandlers/userInfo",
  "jSkype/modelHelpers/contacts/dataHandlers/peopleSettings",
  "jSkype/modelHelpers/contacts/dataHandlers/ABCHProfileService",
  "jSkype/modelHelpers/contacts/dataHandlers/phoneUpdate",
  "jSkype/modelHelpers/contacts/dataHandlers/batchProfiles",
  "jSkype/modelHelpers/contacts/dataHandlers/contactList",
  "jSkype/modelHelpers/contacts/dataHandlers/contactBlocked",
  "jSkype/modelHelpers/contacts/dataHandlers/contactUnblocked",
  "jSkype/modelHelpers/contacts/dataHandlers/contactDeleted",
  "jSkype/modelHelpers/contacts/dataHandlers/contactRequestAccepted",
  "jSkype/modelHelpers/contacts/dataHandlers/contactRequestSent",
  "jSkype/modelHelpers/contacts/dataHandlers/contactRequestsIncoming"
], function (e, t) {
  var n = {
    meProfile: e("jSkype/modelHelpers/contacts/dataHandlers/meProfile"),
    userInfo: e("jSkype/modelHelpers/contacts/dataHandlers/userInfo"),
    peopleSettings: e("jSkype/modelHelpers/contacts/dataHandlers/peopleSettings"),
    ABCHProfileService: e("jSkype/modelHelpers/contacts/dataHandlers/ABCHProfileService"),
    phoneUpdate: e("jSkype/modelHelpers/contacts/dataHandlers/phoneUpdate"),
    batchProfiles: e("jSkype/modelHelpers/contacts/dataHandlers/batchProfiles"),
    contactList: e("jSkype/modelHelpers/contacts/dataHandlers/contactList"),
    contactBlocked: e("jSkype/modelHelpers/contacts/dataHandlers/contactBlocked"),
    contactUnblocked: e("jSkype/modelHelpers/contacts/dataHandlers/contactUnblocked"),
    contactDeleted: e("jSkype/modelHelpers/contacts/dataHandlers/contactDeleted"),
    contactRequestAccepted: e("jSkype/modelHelpers/contacts/dataHandlers/contactRequestAccepted"),
    contactRequestSent: e("jSkype/modelHelpers/contacts/dataHandlers/contactRequestSent"),
    contactRequestsIncoming: e("jSkype/modelHelpers/contacts/dataHandlers/contactRequestsIncoming")
  };
  t.getMeProfileHandlers = function () {
    return n.meProfile.build();
  };
  t.getUserInfoHandlers = function () {
    return n.userInfo.build();
  };
  t.getPeopleSettingsHandlers = function () {
    return n.peopleSettings.build();
  };
  t.getABCHProfileServiceHandlers = function () {
    return n.ABCHProfileService.build();
  };
  t.getProfilePhoneNumberUpdateHandlers = function () {
    return n.phoneUpdate.build();
  };
  t.getBatchProfileHandlers = function () {
    return n.batchProfiles.build();
  };
  t.getContactListHandlers = function () {
    return n.contactList.build();
  };
  t.getContactBlockedHandlers = function () {
    return n.contactBlocked.build();
  };
  t.getContactUnblockedHandlers = function () {
    return n.contactUnblocked.build();
  };
  t.getContactDeletedHandlers = function () {
    return n.contactDeleted.build();
  };
  t.getContactRequestAcceptedHandlers = function () {
    return n.contactRequestAccepted.build();
  };
  t.getContactRequestSentHandlers = function () {
    return n.contactRequestSent.build();
  };
  t.getContactRequestsIncomingHandlers = function () {
    return n.contactRequestsIncoming.build();
  };
});
