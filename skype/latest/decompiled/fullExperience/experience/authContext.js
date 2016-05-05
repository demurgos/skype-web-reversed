define("experience/authContext", [
  "require",
  "lodash-compat"
], function (e) {
  function i() {
    return r;
  }
  function s() {
    t.assign(r, n);
  }
  var t = e("lodash-compat"), n = {
      implicitSignIn: !1,
      implicitSignOut: !1
    }, r = t.clone(n);
  return {
    get: i,
    reset: s
  };
})
