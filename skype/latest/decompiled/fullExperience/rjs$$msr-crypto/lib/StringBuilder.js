function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("msr-crypto/lib/StringBuilder", [
      "require",
      "exports"
    ], e);
}(function () {
  return function () {
    function t(e) {
      return this._parts.push(e), this;
    }
    function n(e) {
      return this._parts.push(typeof e == "undefined" || e === null || e === "" ? "\r\n" : e + "\r\n"), this;
    }
    function r() {
      if (arguments.length !== 0)
        throw new Error("InvalidParameterCount");
      this._parts = [], this._value = {}, this._len = 0;
    }
    function i() {
      if (arguments.length !== 0)
        throw new Error("InvalidParameterCount");
      return this._parts.length === 0 ? !0 : this.toString() === "";
    }
    function s(e) {
      e = e || "";
      var t = this._parts;
      this._len !== t.length && (this._value = {}, this._len = t.length);
      var n = this._value;
      if (typeof n[e] == "undefined") {
        if (e !== "")
          for (var r = 0; r < t.length;)
            typeof t[r] == "undefined" || t[r] === "" || t[r] === null ? t.splice(r, 1) : r++;
        n[e] = this._parts.join(e);
      }
      return n[e];
    }
    var e = {};
    return e.StringBuilder = function (n) {
      this._parts = e.isNullOrEmpty(n) ? [] : [n.toString()], this._value = {}, this._len = 0;
    }, e.StringBuilder.prototype = {
      append: t,
      appendLine: n,
      clear: r,
      isEmpty: i,
      toString: s
    }, e.isNullOrEmpty = function (t) {
      return !t || !t.length;
    }, e;
  }();
})
