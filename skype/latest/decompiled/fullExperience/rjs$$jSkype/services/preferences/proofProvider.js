define("jSkype/services/preferences/proofProvider", [
  "require",
  "exports",
  "module",
  "jSkype/services/serviceFactory",
  "jSkype/modelHelpers/contacts/dataHandlers/factory"
], function (e, t) {
  function i(e) {
    var t = this;
    t.read = function () {
      return Promise.resolve(e.isSearchable);
    };
    t.update = function (t) {
      var i = r.getProfilePhoneNumberUpdateHandlers();
      return t === null ? n.getABCHProfileService().deletePhoneNumber(e).then(i.onSuccess, i.onError) : (e.isSearchable = t, n.getABCHProfileService().updatePhoneNumber(e).then(i.onSuccess, i.onError));
    };
  }
  var n = e("jSkype/services/serviceFactory"), r = e("jSkype/modelHelpers/contacts/dataHandlers/factory");
  t.build = function (e) {
    return new i(e);
  };
});
