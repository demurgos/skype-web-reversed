define("jSkype/modelHelpers/presence/cache/local", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "utils/common/cache/instance",
  "jSkype/constants/data",
  "jSkype/constants/data",
  "jSkype/modelHelpers/personHelper",
  "jSkype/modelHelpers/personsAndGroupsHelper"
], function (e, t) {
  function a(e) {
    return i.CONTACT_PRESENCE + "|" + e;
  }
  function f() {
    return r.get().getAllKeys(s.CONTACT_PRESENCE);
  }
  function l(e) {
    return e.forEach(function (e) {
      var t = e[1], n = u.getPerson(o.getId(e[0]));
      if (t.status) {
        var r = u.getDefaultPresence(n);
        n.status._set(r ? r : t.status);
      }
      t.lastSeenAt && n.lastSeenAt(t.lastSeenAt);
      t.endpointType && n.endpointType._set(t.endpointType);
    }), e;
  }
  var n = e("lodash-compat"), r = e("utils/common/cache/instance"), i = e("jSkype/constants/data").storageKeys, s = e("jSkype/constants/data").storageKeyRegExp, o = e("jSkype/modelHelpers/personHelper"), u = e("jSkype/modelHelpers/personsAndGroupsHelper");
  t.set = function (e, t) {
    var i = a(e), s = r.get();
    return s.getItem(i).then(function (e) {
      var r = n.merge(e || {}, t);
      return s.setItem(i, r);
    });
  };
  t.remove = function (e) {
    return r.get().removeItem(a(e));
  };
  t.restore = function () {
    return f().then(function (e) {
      var t = e.reduce(function (e, t) {
        var n = t.split("|")[1];
        return e.concat(Promise.all([
          n,
          r.get().getItem(t)
        ]));
      }, []);
      return Promise.all(t).then(l);
    });
  };
  t.destroy = function () {
    return f().then(function (e) {
      var t = e.reduce(function (e, t) {
        return e.concat(r.get().removeItem(t));
      }, []);
      return Promise.all(t);
    });
  };
});
