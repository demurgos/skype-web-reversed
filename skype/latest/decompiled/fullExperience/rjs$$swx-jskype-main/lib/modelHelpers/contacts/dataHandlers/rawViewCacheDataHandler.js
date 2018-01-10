(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/rawViewCacheDataHandler", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-constants",
      "../../../../lib/services/cache/instance",
      "../../../../lib/modelHelpers/contacts/dataMappers/cacheToPerson",
      "../../../../lib/modelHelpers/contacts/groupHelper",
      "swx-mri",
      "../../../../lib/modelHelpers/personsAndGroupsHelper",
      "../../../../lib/modelHelpers/personsRegistry/instance",
      "../../../../lib/modelHelpers/contacts/dataProcessors/agents",
      "../../../../lib/modelHelpers/contacts/authorizationChange",
      "lodash-compat",
      "jskype-constants"
    ], e);
}(function (e, t) {
  function m() {
    var e = {}, t = y(), n = b();
    return e.contacts = t || [], e.blocklist = n || [], i.get().setSensitiveItem(d.CONTACTS_RAW_VIEW_DATA, e);
  }
  function g() {
    return i.get().getSensitiveItem(d.CONTACTS_RAW_VIEW_DATA).then(function (e) {
      if (!w(e))
        throw new Error("Empty raw view data cache; force service delta ETag reset");
      var t = h.reduce(e.contacts, E, []);
      return S(e.blocklist).then(function () {
        return l.process(t).then(function () {
          return m();
        });
      });
    });
  }
  function y() {
    var e = n.get().personsAndGroupsManager.all.persons() || [];
    return e.map(s.mapPersonToCacheData);
  }
  function b() {
    var e = o.getBlockedGroup().persons() || [];
    return e.map(function (e) {
      return { mri: u.getKey(e.id(), e._type()) };
    });
  }
  function w(e) {
    if (!e || !e.contacts || !e.contacts.length)
      return !1;
    var t = h.reject(e.contacts, { isAgent: !0 });
    return !!t.length;
  }
  function E(e, t) {
    var n = a.getPerson(t.id, t._type);
    return s.mapCacheDataToPerson(n, t), o.updateGroups(n, t.affiliatedGroups), t.isAgent && e.push(n), e;
  }
  function S(e) {
    var t = [];
    return h.forEach(e, function (e) {
      var n = u.getId(e.mri), r = u.getTypeFromKey(e.mri), i = f.build().getOrCreate(n, r, v.UNAUTHORIZED, !0);
      t.push(c.setBlocked(i));
    }), Promise.all(t);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-constants"), i = e("../../../../lib/services/cache/instance"), s = e("../../../../lib/modelHelpers/contacts/dataMappers/cacheToPerson"), o = e("../../../../lib/modelHelpers/contacts/groupHelper"), u = e("swx-mri"), a = e("../../../../lib/modelHelpers/personsAndGroupsHelper"), f = e("../../../../lib/modelHelpers/personsRegistry/instance"), l = e("../../../../lib/modelHelpers/contacts/dataProcessors/agents"), c = e("../../../../lib/modelHelpers/contacts/authorizationChange"), h = e("lodash-compat"), p = e("jskype-constants"), d = r.DATA.storageKeys, v = p.PEOPLE.authorizationStates;
  t.update = m;
  t.restore = g;
}));
