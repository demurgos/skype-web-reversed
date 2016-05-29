define("jSkype/services/serviceAccessLayer/builders/headerBuilder", [], function () {
  function e() {
    var e = {};
    this.get = function (t) {
      return t ? e[t] : e;
    };
    this.set = function (t, n) {
      var r = /\s/;
      if (!t || !n)
        throw new Error("incorrect number of arguments supplied - expecting \"key\" and \"value\"");
      if (typeof t != "string" || typeof n != "string")
        throw new TypeError("\"key\" and \"value\" arguments must be of type String");
      if (r.test(t))
        throw new SyntaxError("header name cannot contain any whitespace");
      e[t] = n;
    };
    this.populate = function (e) {
      function r() {
        for (var t in e)
          e.hasOwnProperty(t) && n.set(t, e[t]);
      }
      var n = this;
      t(e) && r();
    };
    this.build = function (t) {
      function n() {
        for (var n in e)
          e.hasOwnProperty(n) && t(n, e[n]);
      }
      if (typeof t != "function")
        throw new TypeError("argument must be a callback function");
      n();
    };
  }
  function t(e) {
    var t = {}.toString.call(e) === "[object Object]";
    return !!e && t;
  }
  return e;
});
