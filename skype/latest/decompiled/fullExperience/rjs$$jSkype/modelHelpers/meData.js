define("jSkype/modelHelpers/meData", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/contacts/dataHandlers/factory",
  "jSkype/modelHelpers/contacts/incomingContactRequestsHelper",
  "jSkype/services/serviceFactory",
  "jcafe-property-model"
], function (e, t) {
  var n = e("jSkype/modelHelpers/contacts/dataHandlers/factory"), r = e("jSkype/modelHelpers/contacts/incomingContactRequestsHelper"), i = e("jSkype/services/serviceFactory"), s = e("jcafe-property-model");
  t.initialize = function () {
    var e = i.getStratusService(), t = n.getMeProfileHandlers(), o, u;
    return o = e.getProfile().then(t.onSuccess, t.onError), u = r.get(), s.task.waitAll([
      o,
      u
    ]);
  };
})
