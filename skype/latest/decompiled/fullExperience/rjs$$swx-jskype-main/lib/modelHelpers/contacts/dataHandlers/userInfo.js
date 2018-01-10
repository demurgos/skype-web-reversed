(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/userInfo", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../../lib/modelHelpers/propertyModelHelper",
      "../../../../lib/modelHelpers/contacts/dataMappers/userInfo"
    ], e);
}(function (e, t) {
  function o() {
    return new s();
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../../lib/modelHelpers/propertyModelHelper"), i = e("../../../../lib/modelHelpers/contacts/dataMappers/userInfo"), s = function () {
      function e() {
      }
      return e.prototype.onSuccess = function (e) {
        return i.map(e.response, n.get().personsAndGroupsManager.mePerson), r.createResolvedPromise();
      }, e.prototype.onError = function (e) {
        return r.createRejectedPromise(e);
      }, e;
    }();
  t.UserInfoHandlers = s;
  t.build = o;
}));
