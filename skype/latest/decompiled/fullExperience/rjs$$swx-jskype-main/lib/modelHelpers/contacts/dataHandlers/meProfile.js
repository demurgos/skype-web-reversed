(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/meProfile", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../modelHelpers/propertyModelHelper",
      "../../../modelHelpers/contacts/dataMappers/profileToPerson",
      "jskype-settings-instance",
      "swx-constants"
    ], e);
}(function (e, t) {
  function a(e) {
    var t = n.get()._telemetryManager, r = {
        name: o.COMMON.telemetry.contacts.name.GET_PROFILES,
        batchCount: 1,
        source: e
      };
    t.sendEvent(s.settings.telemetry.jSkypeTenantToken, o.COMMON.telemetry.contacts.type.CONTACTS, r);
  }
  function f() {
    return new u(i);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../modelHelpers/propertyModelHelper"), i = e("../../../modelHelpers/contacts/dataMappers/profileToPerson"), s = e("jskype-settings-instance"), o = e("swx-constants"), u = function () {
      function e(e) {
        var t = this;
        this.onSuccess = function (e) {
          return t.mapProfile(e, o.COMMON.telemetry.contacts.source.INITIALIZED, !1);
        };
        this.onUpdate = function (e) {
          return t.mapProfile(e, o.COMMON.telemetry.contacts.source.UPDATED, !0);
        };
        this.dataMapper = e;
      }
      return e.prototype.onError = function (e) {
        return r.createRejectedPromise(e);
      }, e.prototype.mapProfile = function (e, t, i) {
        return this.dataMapper.map(e.response, n.get().personsAndGroupsManager.mePerson, i), a(t), r.createResolvedPromise();
      }, e;
    }();
  t.build = f;
}));
