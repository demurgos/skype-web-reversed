function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("msr-crypto/lib/BigInt", [
      "require",
      "exports",
      "./StringBuilder"
    ], e);
}(function (e) {
  var t = e("./StringBuilder");
  return function () {
    var e = "0123456789abcdef", n = 16, r = 3, i = function (t, n) {
        this._elements = [], this._radix = t, this._elements.splice(0, 0, n), this._length = 1, this._normalize();
      };
    return i.hexRadix = 16, i.decRadix = 1000, i._createDec = function (t) {
      return new i(i.decRadix, t);
    }, i._createHex = function (t) {
      return new i(i.hexRadix, t);
    }, i._computeHexNegative = function (t, r) {
      var s, o = [];
      for (s = 0; s < r; s++)
        o.splice(s, 0, t[s]);
      for (s = 0; s < o.length; s++)
        o[s] > 0 && (o[s] = i.hexRadix - o[s], s + 1 < o.length ? o[s + 1] = o[s + 1] + 1 : o.length < n && o.splice(s + 1, 0, 1));
      return o;
    }, i.parseDecInt = function (t, n) {
      switch (t) {
      case i.decRadix:
        return i._parseDecIntToDecRadixBigInt(n);
      case i.hexRadix:
        return i._parseDecIntToHexRadixBigInt(n);
      default:
        return null;
      }
    }, i._parseDecIntToHexRadixBigInt = function (n) {
      if (t.isNullOrEmpty(n))
        return null;
      var r = n.charAt(0) === "-";
      r && (n = n.substr(1));
      var s = 9, o = i._createHex(1000000000), u = i._createHex(0), a = Math.ceil(n.length / s), f = i._createHex(1), l = n.length;
      for (var c = 0; c < a; c++) {
        var h = l - s < 0 ? 0 : l - s, p = parseInt(n.substr(h, l - h), 10), d = i._createHex(p);
        d.multiply(f), u.add(d), f.multiply(o), l -= s;
      }
      return u._isNegative = r, u;
    }, i._parseDecIntToDecRadixBigInt = function (t) {
      if (t.length === 0)
        return i._createDec(0);
      var n = !1, s = [];
      t.charAt(0) === "-" && (n = !0, t = t.substr(1, t.length - 1));
      var o;
      for (o = 0; r * (o + 1) <= t.length; o++)
        s.splice(o, 0, parseInt(t.substring(t.length - r * (o + 1), t.length - r * o), 10));
      0 !== t.length % r && s.splice(o++, 0, parseInt(t.substring(0, t.length % r), 10));
      var u = i._createDec(0);
      return u._elements = s, u._length = o, u._isNegative = n, u;
    }, i._getHexValues = function (t) {
      var n = new Array(t.length);
      for (var r = 0; r < t.length; r++) {
        n[r] = i._hexCharValue(t.charAt(r));
        if (n[r] < 0)
          return null;
      }
      return n;
    }, i._hexCharValue = function (t) {
      if (t >= "0" && t <= "9")
        return t - "0";
      switch (t) {
      case "a":
        return 10;
      case "b":
        return 11;
      case "c":
        return 12;
      case "d":
        return 13;
      case "e":
        return 14;
      case "f":
        return 15;
      default:
        return -1;
      }
    }, i._toNegativeValues = function (t) {
      for (var n = t.length - 1; n >= 0; n--)
        t[n] > 0 && (t[n] = 16 - t[n], n > 0 && (t[n - 1] += 1));
      return t;
    }, i.prototype = {
      _isNegative: !1,
      _length: 0,
      _radix: 0,
      _normalize: function () {
        var t;
        for (t = this._length - 1; t >= 0; t--) {
          if (this._elements[t] !== 0)
            break;
          this._length--;
        }
        for (var n = 0; n < 2; n++)
          if (this._length === 0)
            this._isNegative = !1;
          else {
            if (this._elements[this._length - 1] < 0) {
              for (t = 0; t < this._length; t++)
                this._elements[t] = -this._elements[t];
              this._isNegative = !this._isNegative;
            }
            for (t = 0; t < this._length - 1; t++) {
              var r;
              this._elements[t] < 0 && (r = Math.ceil(-this._elements[t] / this._radix), this._elements[t] = this._elements[t] + this._radix * r, this._elements[t + 1] = this._elements[t + 1] - r), this._elements[t] >= this._radix && (r = Math.floor(this._elements[t] / this._radix), this._elements[t] = this._elements[t] % this._radix, this._elements[t + 1] = this._elements[t + 1] + r);
            }
            while (this._elements[this._length - 1] >= this._radix)
              this._ensureCapacity(), this._elements[this._length] = Math.floor(this._elements[this._length - 1] / this._radix), this._elements[this._length - 1] = this._elements[this._length - 1] % this._radix, this._length++;
            if (!(this._elements[this._length - 1] < 0))
              break;
            for (t = 0; t < this._length; t++)
              this._elements[t] = -this._elements[t];
            this._isNegative = !this._isNegative;
          }
      },
      _ensureCapacity: function () {
        this._length === this._elements.length && this._elements.push(0);
      },
      add: function (t) {
        var n;
        for (n = 0; n < this._length - t._length; n++)
          t._elements.splice(t._length + n, 0, 0);
        for (n = 0; n < t._length - this._length; n++)
          this._elements.splice(this._length + n, 0, 0);
        this._length = Math.max(t._length, this._length);
        if (this._isNegative === t._isNegative)
          for (n = 0; n < this._length; n++)
            this._elements[n] = this._elements[n] + t._elements[n];
        else
          for (n = 0; n < this._length; n++)
            this._elements[n] = this._elements[n] - t._elements[n];
        this._normalize();
      },
      multiply: function (t) {
        var n, r = new i(this._radix, 0);
        for (n = 0; n < t._length + this._length; n++)
          n < r._elements.length ? r._elements[n] = 0 : r._elements.splice(n, 0, 0);
        for (n = 0; n < t._length; n++) {
          for (var s = 0; s < this._length; s++)
            r._elements[n + s] = r._elements[n + s] + t._elements[n] * this._elements[s], r._elements[n + s] !== 0 && (r._length = Math.max(r._length, n + s + 1));
          r._normalize();
        }
        r._isNegative = t._isNegative !== this._isNegative, this._elements = r._elements, this._isNegative = r._isNegative, this._length = r._length;
      },
      modulus: function (t) {
        for (;;) {
          if (t._length === 0 || this._length === 0)
            break;
          var n = this._length - t._length;
          if (n < 0)
            break;
          var r = this._elements[this._length - 1], i = t._elements[t._length - 1];
          if (r >= i) {
            var s = Math.floor(r / i);
            for (var o = 0; o < t._length; o++)
              this._elements[o + n] = this._elements[o + n] - s * t._elements[o];
            this._normalize();
            continue;
          }
          if (n === 0)
            break;
          this._elements[this._length - 2] = this._elements[this._length - 2] + this._radix * this._elements[this._length - 1], this._length--;
        }
        this._isNegative && (t._isNegative ? (t._isNegative = !1, this.add(t), t._isNegative = !0) : this.add(t)), this._normalize();
      },
      toString: function () {
        switch (this._radix) {
        case i.hexRadix:
          return this._toHexString();
        case i.decRadix:
          return this._toDecString();
        default:
          return "";
        }
      },
      _toHexString: function () {
        if (this._elements.length === 0)
          return "0";
        var r = this._elements;
        this._isNegative && (r = i._computeHexNegative(r, this._length));
        var s = new t.StringBuilder(), o = !1;
        for (var u = r.length - 1; u >= 0; u--)
          o || r[u] !== 0 && (o = !0), o && s.append(e.charAt(r[u]));
        return s.toString();
      },
      _toDecString: function () {
        if (this._length === 0)
          return "0";
        var t = "";
        for (var n = 0; n < this._length; n++) {
          t = this._elements[n] + t;
          if (n < this._length - 1)
            for (var r = 10; r < this._radix; r *= 10)
              this._elements[n] < r && (t = 0 + t);
        }
        return this._isNegative && (t = "-" + t), t;
      }
    }, i;
  }();
})
