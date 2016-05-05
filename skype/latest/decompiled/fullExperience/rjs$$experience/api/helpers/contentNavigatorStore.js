define("experience/api/helpers/contentNavigatorStore", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "experience/api/helpers/contentNavigator",
  "browser/dom"
], function (e, t) {
  function o() {
    if (s.length > 0)
      return s[0].navigator;
  }
  var n = e("lodash-compat"), r = e("experience/api/helpers/contentNavigator"), i = e("browser/dom"), s = [];
  t.add = function (e) {
    var t = i.getElement(e), n = r.build(t);
    s.push({
      contentContainer: t,
      navigator: n
    });
  }, t.get = function (e) {
    var t = i.getElement(e);
    return t ? n.find(s, function (e) {
      return e.contentContainer === t;
    }).navigator : o();
  }, t.clear = function () {
    s = [];
  };
})
