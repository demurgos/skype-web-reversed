define("utils/common/version", [
  "require",
  "exports",
  "module"
], function (e, t) {
  function n(e) {
    function i() {
      if (!e) {
        t = [
          n,
          n
        ], r = !1;
        return;
      }
      var i = o();
      i ? (t = e.split(i), s()) : (t = [
        e,
        n
      ], r = !1);
    }
    function s() {
      var e = 0;
      for (e = 0; e < t.length; ++e)
        if (!t[e] || isNaN(t[e])) {
          t.push(n), r = !1;
          break;
        }
    }
    function o() {
      return e.indexOf(".") > -1 ? "." : e.indexOf("_") > -1 ? "_" : null;
    }
    var t, n = "U", r = !0;
    i(), this.getMajor = function () {
      return t[0];
    }, this.getMinor = function () {
      return t[1];
    }, this.getAllComponents = function () {
      return t;
    }, this.getOriginalString = function () {
      return e;
    }, this.isValid = function () {
      return r;
    }, this.compareTo = function (e) {
      var n = 0, r = 0, i = 0, s = e.getAllComponents();
      if (!this.isValid() || !e.isValid())
        throw new Error("Invalid version cannot be compared");
      for (n = 0; n < s.length; ++n) {
        r = parseInt(t[n], 10), i = parseInt(s[n], 10);
        if (!r || r < i)
          return -1;
        if (r > i)
          return 1;
      }
      return 0;
    };
  }
  t.parse = function (e) {
    return new n(e);
  };
})
