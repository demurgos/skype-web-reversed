(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/batchProfiles", [
      "require",
      "exports",
      "lodash-compat",
      "swx-constants",
      "jskype-settings-instance",
      "../../propertyModelHelper",
      "../dataMappers/profileToPerson",
      "swx-jskype-internal-application-instance"
    ], e);
}(function (e, t) {
  function f(e) {
    return new a(o, e);
  }
  var n = e("lodash-compat"), r = e("swx-constants"), i = e("jskype-settings-instance"), s = e("../../propertyModelHelper"), o = e("../dataMappers/profileToPerson"), u = e("swx-jskype-internal-application-instance"), a = function () {
      function e(e, t) {
        var o = this;
        this.onSuccess = function (e) {
          var t = e && e.response && e.response.length ? e.response : [];
          return t.forEach(o.mapProfileToPerson), o.publishBatchCountOnFirstLoad(e), s.createResolvedPromise();
        };
        this.onError = function (e) {
          return s.createRejectedPromise(e);
        };
        this.mapProfileToPerson = function (e) {
          var t = o.registryInstance.getOrCreate(e.username);
          o.dataMapperInstance.map(e, t);
        };
        this.publishBatchProfilesLoaded = function (e) {
          var t = u.get()._telemetryManager, n = e && e.response ? e.response.length : 0, s = r.COMMON.telemetry.contacts.type.CONTACTS, o = {
              name: r.COMMON.telemetry.contacts.name.GET_PROFILES,
              batchCount: n
            };
          t.sendEvent(i.settings.telemetry.jSkypeTenantToken, s, o);
        };
        this.dataMapperInstance = e;
        this.registryInstance = t;
        this.publishBatchCountOnFirstLoad = n.once(this.publishBatchProfilesLoaded);
      }
      return e;
    }();
  t.build = f;
}));
