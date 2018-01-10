(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/contactDeleted", [
      "require",
      "exports",
      "../../../../lib/modelHelpers/contacts/authorizationChange",
      "../../../../lib/modelHelpers/presence/presenceDataStorage",
      "jskype-constants"
    ], e);
}(function (e, t) {
  function u() {
    return new o();
  }
  var n = e("../../../../lib/modelHelpers/contacts/authorizationChange"), r = e("../../../../lib/modelHelpers/presence/presenceDataStorage"), i = e("jskype-constants"), s = i.PEOPLE.authorizationStates, o = function () {
      function e() {
      }
      return e.prototype.onSuccess = function (e) {
        r.getCache().remove(e.id());
        n.setAuthorization(e, s.UNAUTHORIZED);
      }, e.prototype.onError = function (e) {
      }, e;
    }();
  t.ContactDeletedHandlers = o;
  t.build = u;
}));
