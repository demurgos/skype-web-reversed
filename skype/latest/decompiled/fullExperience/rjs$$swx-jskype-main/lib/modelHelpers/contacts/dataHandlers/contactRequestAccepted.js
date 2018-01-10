(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/contactRequestAccepted", [
      "require",
      "exports",
      "../../../modelHelpers/contacts/authorizationChange",
      "jskype-constants"
    ], e);
}(function (e, t) {
  function o() {
    return new s();
  }
  var n = e("../../../modelHelpers/contacts/authorizationChange"), r = e("jskype-constants"), i = r.PEOPLE.authorizationStates, s = function () {
      function e() {
      }
      return e.prototype.onSuccess = function (e) {
        n.setAuthorization(e, i.AUTHORIZED);
      }, e.prototype.onError = function (e) {
      }, e;
    }();
  t.ContactRequestAcceptedHandlers = s;
  t.build = o;
}));
