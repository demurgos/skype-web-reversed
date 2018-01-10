(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-people/lib/organizePersons", [
      "require",
      "exports",
      "swx-utils-common",
      "swx-i18n"
    ], e);
}(function (e, t) {
  function i(e) {
    var t, i = e.displayName() || e.id() || "", s = n.stringUtils.clean(n.stringUtils.normalize(i))[0];
    return n.stringUtils.isNotEmpty(s) ? t = s.toUpperCase() : t = r.localization.fetch({ key: "message_bucketName_other" }), t;
  }
  function s(e) {
    var t = {};
    return e.forEach(function (e) {
      var n = i(e);
      t[n] || (t[n] = []);
      t[n].push(e);
    }), o(t);
  }
  function o(e) {
    var t, i = [], s = r.localization.fetch({ key: "message_bucketName_other" });
    return Object.keys(e).sort().forEach(function (r) {
      if (r === s)
        t = {
          name: r,
          contacts: e[r]
        };
      else {
        var o = e[r].map(u);
        o = n.array.sortByProperty(o, "sortValue");
        i.push({
          name: r,
          contacts: o.map(a)
        });
      }
    }), t && i.push(t), i;
  }
  function u(e) {
    return {
      sortValue: n.stringUtils.clean(n.stringUtils.normalize(e.displayName())),
      person: e
    };
  }
  function a(e) {
    return e.person;
  }
  var n = e("swx-utils-common"), r = e("swx-i18n");
  t.getBucketName = i;
  t.byAlphabet = s;
}));
