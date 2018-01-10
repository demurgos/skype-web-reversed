(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/preferences/proofProvider", [
      "require",
      "exports",
      "../../../lib/services/ABCHProfile/instance",
      "../../../lib/modelHelpers/contacts/dataHandlers/factory"
    ], e);
}(function (e, t) {
  function s(e) {
    return new i(e);
  }
  var n = e("../../../lib/services/ABCHProfile/instance"), r = e("../../../lib/modelHelpers/contacts/dataHandlers/factory"), i = function () {
      function e(e) {
        var t = this;
        this.read = function () {
          return Promise.resolve(t.creationParams.isSearchable);
        };
        this.update = function (e) {
          var i = r.getProfilePhoneNumberUpdateHandlers(), s = n.get();
          return e === null ? s.deletePhoneNumber(t.creationParams).then(i.onSuccess, i.onError) : (t.creationParams.isSearchable = e, s.updatePhoneNumber(t.creationParams).then(i.onSuccess, i.onError));
        };
        this.creationParams = e;
      }
      return e;
    }();
  t.ProofProvider = i;
  t.build = s;
}));
