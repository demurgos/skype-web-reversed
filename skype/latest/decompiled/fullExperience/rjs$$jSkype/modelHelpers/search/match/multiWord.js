define("jSkype/modelHelpers/search/match/multiWord", [
  "require",
  "exports",
  "module",
  "swx-utils-common"
], function (e, t) {
  function s(e, t) {
    var n = new RegExp("(^|\\s|\\b)" + t, "i");
    return e.match(n);
  }
  var n = e("swx-utils-common").stringUtils, r = 10, i = /\s?\b\s?/;
  t.func = function (e, t) {
    function l(e, t) {
      if (s(e, f))
        return o = { rank: t / r }, !0;
    }
    var o = null, u = n.clean(t), a = n.clean(e), f;
    return s(a, u) && (f = u.split(i)[0], a.split(i).some(l)), o;
  };
})
