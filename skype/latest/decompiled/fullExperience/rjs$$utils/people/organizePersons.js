define("utils/people/organizePersons", [
  "require",
  "exports",
  "module",
  "swx-utils-common",
  "utils/common/array",
  "swx-i18n"
], function (e, t) {
  function s(e) {
    var t, n = [], s = i.fetch({ key: "message_bucketName_other" });
    return Object.keys(e).sort().forEach(function (i) {
      var a;
      i === s ? t = {
        name: i,
        contacts: e[i]
      } : (a = e[i].map(o), a = r.sortByProperty(a, "sortValue"), n.push({
        name: i,
        contacts: a.map(u)
      }));
    }), t && n.push(t), n;
  }
  function o(e) {
    return {
      sortValue: n.clean(n.normalize(e.displayName())),
      person: e
    };
  }
  function u(e) {
    return e.person;
  }
  var n = e("swx-utils-common").stringUtils, r = e("utils/common/array"), i = e("swx-i18n").localization;
  return t.getBucketName = function (e) {
    var t, r = e.displayName() || e.id() || "", s = n.clean(n.normalize(r))[0];
    return n.isNotEmpty(s) ? t = s.toUpperCase() : t = i.fetch({ key: "message_bucketName_other" }), t;
  }, t.byAlphabet = function (e) {
    var n = {};
    return e.forEach(function (e) {
      var r = t.getBucketName(e);
      n[r] || (n[r] = []);
      n[r].push(e);
    }), s(n);
  }, t;
});
