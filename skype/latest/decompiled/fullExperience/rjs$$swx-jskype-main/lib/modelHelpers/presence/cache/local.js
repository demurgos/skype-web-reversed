(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/presence/cache/local", [
      "require",
      "exports",
      "lodash-compat",
      "../../../services/cache/instance",
      "../../../modelHelpers/contacts/presenceHelper",
      "../../personsAndGroupsHelper",
      "swx-mri",
      "jskype-constants/lib/data"
    ], e);
}(function (e, t) {
  function l(e, t) {
    var i = d(e), s = r.get();
    return s.getItem(i).then(function (e) {
      var r = n.merge(e || {}, t);
      return s.setItem(i, r);
    });
  }
  function c(e) {
    return r.get().removeItem(d(e));
  }
  function h() {
    return v().then(function (e) {
      var t = e.reduce(function (e, t) {
        var n = t.split("|")[1];
        return e.concat(Promise.all([
          n,
          r.get().getItem(t)
        ]));
      }, []);
      return Promise.all(t).then(m);
    });
  }
  function p() {
    return v().then(function (e) {
      var t = e.reduce(function (e, t) {
        return e.concat(r.get().removeItem(t));
      }, []);
      return Promise.all(t);
    });
  }
  function d(e) {
    return a.CONTACT_PRESENCE + "|" + e;
  }
  function v() {
    return r.get().getAllKeys(f.CONTACT_PRESENCE);
  }
  function m(e) {
    return e.forEach(function (e) {
      var t = e[1], n = s.getPerson(o.getId(e[0]));
      if (t.status) {
        var r = i.getDefaultPresence(n);
        n.status._set(r ? r : t.status);
      }
      t.lastSeenAt && n.lastSeenAt(t.lastSeenAt);
      t.endpointType && n.endpointType._set(t.endpointType);
    }), e;
  }
  var n = e("lodash-compat"), r = e("../../../services/cache/instance"), i = e("../../../modelHelpers/contacts/presenceHelper"), s = e("../../personsAndGroupsHelper"), o = e("swx-mri"), u = e("jskype-constants/lib/data"), a = u["default"].storageKeys, f = u["default"].storageKeyRegExp;
  t.set = l;
  t.remove = c;
  t.restore = h;
  t.destroy = p;
}));
