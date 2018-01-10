(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/factory", [
      "require",
      "exports",
      "../../../../lib/modelHelpers/contacts/dataHandlers/meProfile",
      "../../../../lib/modelHelpers/contacts/dataHandlers/userInfo",
      "../../../../lib/modelHelpers/contacts/dataHandlers/peopleSettings",
      "../../../../lib/modelHelpers/contacts/dataHandlers/ABCHProfileService",
      "../../../../lib/modelHelpers/contacts/dataHandlers/phoneUpdate",
      "../../../../lib/modelHelpers/contacts/dataHandlers/contactDeleted",
      "../../../../lib/modelHelpers/contacts/dataHandlers/contactRequestAccepted",
      "../../../../lib/modelHelpers/contacts/dataHandlers/contactRequestSent",
      "../../../../lib/modelHelpers/contacts/dataHandlers/contactAutoBuddy"
    ], e);
}(function (e, t) {
  function c() {
    return n.build();
  }
  function h() {
    return r.build();
  }
  function p() {
    return i.build();
  }
  function d() {
    return s.build();
  }
  function v() {
    return o.build();
  }
  function m() {
    return u.build();
  }
  function g() {
    return a.build();
  }
  function y() {
    return f.build();
  }
  function b() {
    return l.build();
  }
  var n = e("../../../../lib/modelHelpers/contacts/dataHandlers/meProfile"), r = e("../../../../lib/modelHelpers/contacts/dataHandlers/userInfo"), i = e("../../../../lib/modelHelpers/contacts/dataHandlers/peopleSettings"), s = e("../../../../lib/modelHelpers/contacts/dataHandlers/ABCHProfileService"), o = e("../../../../lib/modelHelpers/contacts/dataHandlers/phoneUpdate"), u = e("../../../../lib/modelHelpers/contacts/dataHandlers/contactDeleted"), a = e("../../../../lib/modelHelpers/contacts/dataHandlers/contactRequestAccepted"), f = e("../../../../lib/modelHelpers/contacts/dataHandlers/contactRequestSent"), l = e("../../../../lib/modelHelpers/contacts/dataHandlers/contactAutoBuddy");
  t.getMeProfileHandlers = c;
  t.getUserInfoHandlers = h;
  t.getPeopleSettingsHandlers = p;
  t.getABCHProfileServiceHandlers = d;
  t.getProfilePhoneNumberUpdateHandlers = v;
  t.getContactDeletedHandlers = m;
  t.getContactRequestAcceptedHandlers = g;
  t.getContactRequestSentHandlers = y;
  t.getContactAutoBuddyHandlers = b;
}));
