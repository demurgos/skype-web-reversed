function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("msr-crypto/lib/sha256Auth", [
      "require",
      "exports",
      "./msrcrypto.aes",
      "./StringBuilder",
      "./BigInt",
      "./ConvertHelper"
    ], e);
}(function (e) {
  var t = e("./msrcrypto.aes"), n = e("./StringBuilder"), r = e("./BigInt"), i = e("./ConvertHelper");
  return function (e) {
    function o(e) {
      var n = t.utilities.stringToBytes(e), r = t.sha256.computeHash(n);
      return t.utilities.bytesToHexString(r);
    }
    function u(e, t) {
      var r = e.toString(2), i = t.toString(2), s = new n.StringBuilder(), o = new n.StringBuilder(), u = Math.abs(r.length - i.length), a;
      for (a = 0; a < u; a++)
        o.append("0");
      r.length < i.length ? (o.append(r), r = o.toString()) : i.length < r.length && (o.append(i), i = o.toString());
      for (a = 0; a < r.length; a++)
        s.append(r.charAt(a) === i.charAt(a) ? "0" : "1");
      return parseInt(s.toString(), 2);
    }
    function a(e, t, n) {
      return e.length < t ? (n = n || " ", e + f(n, t - e.length)) : e.valueOf();
    }
    function f(e, t) {
      var n = e;
      for (var r = 1; r < t; r++)
        n += e;
      return n;
    }
    var s = e.MSP || {};
    return s._sha256Auth = function () {
    }, s._sha256Auth.prototype = {
      _int32ToHexString: function (t) {
        var r = "0123456789abcdef", i = new n.StringBuilder();
        for (var s = 0; s <= 3; s++)
          i.append(r.charAt(t >> s * 8 + 4 & 15)), i.append(r.charAt(t >> s * 8 & 15));
        return i.toString();
      },
      getMacHash: function (t, n, r) {
        var s = t + n, f = s, l = 8 - f.length % 8;
        l !== 8 && (f = a(f, f.length + l, "0"));
        var c = f.length / 4, h = [], p, d;
        for (p = 0, d = 0; p < c; p++)
          h.splice(p, 0, 0), h[p] = h[p] + f.charCodeAt(d++) * 1, h[p] = h[p] + f.charCodeAt(d++) * 256, h[p] = h[p] + f.charCodeAt(d++) * 65536, h[p] = h[p] + f.charCodeAt(d++) * 16777216;
        var v = new Array(4), m = o(t + r);
        for (p = 0, d = 0; p < v.length; p++)
          v[p] = 0, v[p] += i.parseHexInt(m.substr(d, 2)) * 1, d += 2, v[p] += i.parseHexInt(m.substr(d, 2)) * 256, d += 2, v[p] += i.parseHexInt(m.substr(d, 2)) * 65536, d += 2, v[p] += i.parseHexInt(m.substr(d, 2)) * 16777216, d += 2;
        var g = new Array(2);
        this._cS64_C(h, v, g);
        var y = u(v[0], g[0]), b = u(v[1], g[1]), w = u(v[2], g[0]), E = u(v[3], g[1]);
        return this._int32ToHexString(y) + this._int32ToHexString(b) + this._int32ToHexString(w) + this._int32ToHexString(E);
      },
      _cS64_C: function (t, n, i) {
        var s = 2147483647;
        if (t.length < 2 || (t.length & 1) === 1)
          return !1;
        var o = n[0] & s, u = n[1] & s, a = n[2] & s, f = n[3] & s, l = 242854337, c = r.parseDecInt(r.decRadix, o.toString()), h = r.parseDecInt(r.decRadix, u.toString()), p = r.parseDecInt(r.decRadix, a.toString()), d = r.parseDecInt(r.decRadix, f.toString()), v = r.parseDecInt(r.decRadix, l.toString()), m = 0, g = r.parseDecInt(r.decRadix, s.toString()), y = r.parseDecInt(r.decRadix, "0"), b = r.parseDecInt(r.decRadix, "0"), w = r.parseDecInt(r.decRadix, "0");
        for (var E = 0; E < t.length / 2; E++)
          y = r.parseDecInt(r.decRadix, t[m++].toString()), y.multiply(v), y.modulus(g), b.add(y), b.multiply(c), b.add(h), b.modulus(g), w.add(b), b.add(r.parseDecInt(r.decRadix, t[m++].toString())), b.multiply(p), b.add(d), b.modulus(g), w.add(b);
        return b.add(h), b.modulus(g), w.add(d), w.modulus(g), i[0] = parseInt(b.toString(), 10), i[1] = parseInt(w.toString(), 10), !0;
      }
    }, s._sha256Auth;
  }(window);
})
