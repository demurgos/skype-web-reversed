(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataProcessors/blocklistDataProcessor", [
      "require",
      "exports",
      "../../../../lib/modelHelpers/personsRegistry/instance",
      "../../../../lib/modelHelpers/contacts/blockedGroupCleaner",
      "../../../../lib/modelHelpers/contacts/authorizationChange",
      "swx-mri",
      "jskype-constants",
      "swx-constants",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function l(e) {
    return !e || !e.blocklist ? Promise.resolve() : e.scope === u.PEOPLE.scopes.FULL ? c(e) : h(e);
  }
  function c(e) {
    return p(e).then(function () {
      r.clean(e.blocklist);
    });
  }
  function h(e) {
    return p(e);
  }
  function p(e) {
    var t = [];
    return a.forEach(e.blocklist, function (e) {
      var r = s.getId(e.mri), o = s.getTypeFromKey(e.mri), u = n.build().get(r);
      u || (u = n.build().create(r, o, f.UNAUTHORIZED), n.build().add(u, !0));
      e.deleted ? i.setUnblocked(u) : t.push(i.setBlocked(u));
    }), Promise.all(t);
  }
  var n = e("../../../../lib/modelHelpers/personsRegistry/instance"), r = e("../../../../lib/modelHelpers/contacts/blockedGroupCleaner"), i = e("../../../../lib/modelHelpers/contacts/authorizationChange"), s = e("swx-mri"), o = e("jskype-constants"), u = e("swx-constants"), a = e("lodash-compat"), f = o.PEOPLE.authorizationStates;
  t.process = l;
}));
