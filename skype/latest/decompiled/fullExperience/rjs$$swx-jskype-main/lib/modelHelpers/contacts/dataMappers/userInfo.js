(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataMappers/userInfo", [
      "require",
      "exports",
      "../../../modelHelpers/contacts/dataMappers/mappers"
    ], e);
}(function (e, t) {
  function r(e, t) {
    n.mapRegistrationDate(e.registrationDate, t);
  }
  var n = e("../../../modelHelpers/contacts/dataMappers/mappers");
  t.map = r;
}));
