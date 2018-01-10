(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/contactAdder", [
      "require",
      "exports",
      "../../../lib/modelHelpers/contacts/dataMappers/contactToPerson",
      "../../../lib/modelHelpers/personsAndGroupsHelper",
      "../../../lib/modelHelpers/presence/presenceDataStorage",
      "../../../lib/modelHelpers/contacts/dataProcessors/agents",
      "swx-constants",
      "swx-mri",
      "swx-mri/lib/mriMaps",
      "jskype-settings-instance",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function h() {
    return new c();
  }
  var n = e("../../../lib/modelHelpers/contacts/dataMappers/contactToPerson"), r = e("../../../lib/modelHelpers/personsAndGroupsHelper"), i = e("../../../lib/modelHelpers/presence/presenceDataStorage"), s = e("../../../lib/modelHelpers/contacts/dataProcessors/agents"), o = e("swx-constants"), u = e("swx-mri"), a = e("swx-mri/lib/mriMaps"), f = e("jskype-settings-instance"), l = e("lodash-compat"), c = function () {
      function e() {
        var e = this;
        this.dataMapper = n;
        this.cache = i.getCache();
        this.add = function (t) {
          var n = l.reduce(t, e.createPersonsAndReturnAgents.bind(e), []);
          return l.forEach(n, e.savePresenceToCache.bind(e)), s.process(n);
        };
      }
      return e.prototype.addContact = function (e) {
        var t = u.getId(e.mri), n = u.getTypeFromKey(e.mri), i = r.getPersonById(t);
        return i ? this.dataMapper.map(e, i, !1) : (i = r.getPerson(t, n), this.dataMapper.map(e, i, !0)), i;
      }, e.prototype.createPersonsAndReturnAgents = function (e, t) {
        if (this.shouldProcess(t)) {
          var n = u.getTypeFromKey(t.mri), r = this.addContact(t);
          n === a.contactMriTypes.agent && e.push(r);
        }
        return e;
      }, e.prototype.shouldProcess = function (e) {
        var t = u.getId(e.mri), n = u.getTypeFromKey(e.mri);
        return r.isMePerson(t) ? !1 : n === a.contactMriTypes.pstn && !f.isFeatureOn(o.COMMON.featureFlags.PSTN_ENABLED) ? !1 : n === a.contactMriTypes.agent && !f.isFeatureOn(o.COMMON.featureFlags.AGENTS_ENABLED) ? !1 : !0;
      }, e.prototype.savePresenceToCache = function (e) {
        this.cache.set(e.id(), { status: e.status() });
      }, e;
    }();
  t.ContactAdder = c;
  t.build = h;
}));
