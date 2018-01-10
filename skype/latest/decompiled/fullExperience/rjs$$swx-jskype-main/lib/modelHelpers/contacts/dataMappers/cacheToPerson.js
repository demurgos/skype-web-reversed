(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataMappers/cacheToPerson", [
      "require",
      "exports",
      "../../../modelHelpers/contacts/groupHelper",
      "../../../models/phoneNumber",
      "jcafe-property-model",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function o(e, t) {
    a(e, t);
    a(e.note, t.note);
    a(e.location, t.location);
    a(e.capabilities, t.capabilities);
    a(e.agentDetails, t.agentDetails);
    f(e, t.phoneNumbers);
  }
  function u(e) {
    var t = l(e);
    return t.note = l(e.note), t.location = l(e.location), t.capabilities = l(e.capabilities), t.agentDetails = l(e.agentDetails), t.affiliatedGroups = n.getAffiliatedGroupUris(e), t;
  }
  function a(e, t) {
    for (var n in e)
      e.hasOwnProperty(n) && i.isProperty(e[n]) && e[n]._set(t[n]);
  }
  function f(e, t) {
    var n = e.phoneNumbers(0);
    s.forEach(t, function (t) {
      if (n && n.telUri() === t.telUri)
        a(n, t);
      else {
        var i = new r["default"]();
        a(i, t);
        e.phoneNumbers.add(i, t.telUri);
      }
    });
  }
  function l(e) {
    function n(e, t, n) {
      var r = i.isProperty(t), o = !r && i.isCollection(t), u = r || o ? t() : t;
      r && !s.isUndefined(u) ? n[e] = u : o && (n[e] = u.reduce(function (e, t) {
        return e.concat(l(t));
      }, []));
    }
    var t = {};
    return s.forIn(e, function (e, r) {
      n(r, e, t);
    }), t;
  }
  var n = e("../../../modelHelpers/contacts/groupHelper"), r = e("../../../models/phoneNumber"), i = e("jcafe-property-model"), s = e("lodash-compat");
  t.mapCacheDataToPerson = o;
  t.mapPersonToCacheData = u;
}));
