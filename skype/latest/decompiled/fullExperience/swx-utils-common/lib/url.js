function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/url", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function r(e, t, n) {
    return e.length ? e.push("&") : e = ["?"], t == null ? e.push(encodeURIComponent(n)) : e = e.concat([
      encodeURIComponent(n),
      "=",
      encodeURIComponent(t)
    ]), e;
  }
  function i(e) {
    var t = [];
    for (var i = 1; i < arguments.length; i++)
      t[i - 1] = arguments[i];
    var s = [e].concat(t), o = n.takeWhile(s, n.isString);
    s.splice(0, o.length);
    if (o.length === 0 || s.length > 1)
      throw new RangeError("Query arguments object should be the last parameter");
    var u = n.head(s), a = n.reduce(o, function (e, t, r) {
        var i = n.last(e);
        return i && !n.endsWith(i, "/") && !n.startsWith(t, "/") && e.push("/"), e.push(t), e;
      }, []);
    return a = a.concat(n.flatten(n.reduce(u, r, []))), a.join("");
  }
  var n = e("lodash-compat");
  t.buildUrl = i;
})
