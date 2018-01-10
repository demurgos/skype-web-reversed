(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/meData", [
      "require",
      "exports",
      "./contacts/dataHandlers/factory",
      "./contacts/invitesListGetter",
      "../services/stratus/instance",
      "jcafe-property-model"
    ], e);
}(function (e, t) {
  function o() {
    var e = n.getMeProfileHandlers(), t, o;
    return t = i.get().getProfile().then(e.onSuccess, e.onError), o = r.get(), s.task.waitAll([
      t,
      o
    ]);
  }
  var n = e("./contacts/dataHandlers/factory"), r = e("./contacts/invitesListGetter"), i = e("../services/stratus/instance"), s = e("jcafe-property-model");
  t.initialize = o;
}));
