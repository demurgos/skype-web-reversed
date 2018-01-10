(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("msr-crypto/lib/msrcrypto.aes", [
      "require",
      "exports"
    ], e);
}(function () {
  var e = "1.3", t = t || function () {
      function p(e, t, n, r, i) {
        return [];
      }
      function E() {
        function u(e) {
          var t;
          for (t = e.length - 1; t >= 0; t -= 1) {
            e[t] += 1;
            e[t] >= 256 && (e[t] = 0);
            if (e[t])
              break;
          }
        }
        function a() {
          t = l.getVector(32);
          n = l.getVector(16);
          r = 32;
          i = 48;
          s = 1;
        }
        function f(e, t) {
          t = t || [0];
          if (t.length > i)
            throw new Error("Incorrect entropy or additionalEntropy length");
          t = t.concat(l.getVector(i - t.length));
          e = e.concat(l.getVector((i - e.length % i) % i));
          for (var n = 0; n < e.length; n += i) {
            var r = l.xorVectors(e.slice(n, n + i), t);
            c(r);
          }
          s = 1;
        }
        function c(e) {
          var s = [], o = new g.aes(t);
          while (s.length < i) {
            u(n);
            var a = n.slice(0, 16), f = o.encrypt(a);
            s = s.concat(f);
          }
          s = l.xorVectors(s, e);
          t = s.slice(0, r);
          n = s.slice(r);
        }
        function h(e, r) {
          if (e >= 65536)
            throw new Error("too much random requested");
          if (s > o)
            throw new Error("Reseeding is required");
          if (r && r.length > 0) {
            while (r.length < i)
              r = r.concat(l.getVector(i - r.length));
            c(r);
          } else
            r = l.getVector(i);
          var a = [], f = new g.aes(t);
          while (a.length < e) {
            u(n);
            var h = n.slice(0, n.length), p = f.encrypt(h);
            a = a.concat(p);
          }
          return a = a.slice(0, e), c(r), s += 1, a;
        }
        if (this instanceof E) {
          var e = !1, t, n, r, i, s = 1, o = 1 << 24;
          return a(), {
            reseed: f,
            init: function (t, n) {
              if (t.length < i)
                throw new Error("Initial entropy length too short");
              a();
              f(t, n);
              e = !0;
            },
            getBytes: function (t, n) {
              if (!e)
                throw new Error("can't get randomness before initialization");
              return h(t, n);
            },
            getNonZeroBytes: function (t, n) {
              if (!e)
                throw new Error("can't get randomness before initialization");
              var r = [], i;
              while (r.length < t) {
                i = h(t, n);
                for (var s = 0; s < i.length; s += 1)
                  i[s] !== 0 && r.push(i[s]);
              }
              return r.slice(0, t);
            }
          };
        }
        throw new Error("create MsrcryptoPrng object with new keyword");
      }
      function x() {
        function a() {
          var n, r = [];
          for (n = 0; n < e; n += 1)
            r[n] = Math.floor(Math.random() * 256);
          var a = window.crypto || window.msCrypto;
          if (a && typeof a.getRandomValues == "function" && window.Uint8Array) {
            var f = new window.Uint8Array(e);
            a.getRandomValues(f);
            r = r.concat(Array.apply(null, f));
            o = !0;
          }
          var h = new XMLHttpRequest();
          for (n = 0; n < u.length; n += 1)
            try {
              var p = h.getResponseHeader(u[n]);
              if (p) {
                var d = l.stringToBytes(p);
                r = r.concat(d);
              }
            } catch (v) {
            }
          o || (r = r.concat(t.splice(0, t.length)), c.startCollectors());
          s ? i.reseed(r) : i.init(r);
          s = !0;
        }
        function f(e) {
          for (var r = 0; r < e.length; ++r)
            t.push(e[r]);
          t.length >= n && c.stopCollectors();
        }
        var e = 48, t = [], n = 128, r = 0, i = new E(), s = !1, o = !1, u = [
            "Cookie",
            "RedirectUri",
            "ETag",
            "x-ms-client-antiforgery-id",
            "x-ms-client-request-id",
            "x-ms-client-session-id",
            "SubscriptionPool"
          ], c = function () {
            return {
              startCollectors: function () {
                if (!this.collectorsRegistered) {
                  if (window.addEventListener)
                    window.addEventListener("mousemove", this.MouseEventCallBack, !0), window.addEventListener("load", this.LoadTimeCallBack, !0);
                  else {
                    if (!document.attachEvent)
                      throw new Error("Can't attach events for entropy collection");
                    document.attachEvent("onmousemove", this.MouseEventCallBack);
                    document.attachEvent("onload", this.LoadTimeCallBack);
                  }
                  this.collectorsRegistered = 1;
                }
              },
              stopCollectors: function () {
                this.collectorsRegistered && (window.removeEventListener ? (window.removeEventListener("mousemove", this.MouseEventCallBack, 1), window.removeEventListener("load", this.LoadTimeCallBack, 1)) : window.detachEvent && (window.detachEvent("onmousemove", this.MouseEventCallBack), window.detachEvent("onload", this.LoadTimeCallBack)), this.collectorsRegistered = 0);
              },
              MouseEventCallBack: function (e) {
                var t = new Date().valueOf(), n = e.x || e.clientX || e.offsetX || 0, r = e.y || e.clientY || e.offsetY || 0, i = [
                    t & 255,
                    t >> 8 & 255,
                    t >> 16 & 255,
                    t >> 24 & 255,
                    n & 255,
                    n >> 8 & 255,
                    r & 255,
                    r >> 8 & 255
                  ];
                f(i);
              },
              LoadTimeCallBack: function () {
                var e = new Date().valueOf(), t = [
                    e & 255,
                    e >> 8 & 255,
                    e >> 16 & 255,
                    e >> 24 & 255
                  ];
                f(t);
              }
            };
          }();
        return {
          init: function () {
            a();
            if (!o && !r)
              try {
                c.startCollectors();
              } catch (e) {
              }
          },
          reseed: function (e) {
            i.reseed(e);
          },
          read: function (e) {
            if (!s)
              throw new Error("Entropy pool is not initialized.");
            var t = i.getBytes(e);
            return a(), t;
          }
        };
      }
      var e = {};
      e.register = function (t, n, r) {
        e[t] || (e[t] = {});
        var i = e[t];
        i[n] || (i[n] = r);
      };
      e.exists = function (t, n) {
        return e[t] ? e[t][n] ? !0 : !1 : !1;
      };
      var t = function () {
          if (typeof document != "undefined")
            try {
              throw new Error();
            } catch (e) {
              if (e.stack) {
                var t = /\w+:\/\/(.+?\/)*.+\.js/.exec(e.stack);
                return t && t.length > 0 ? t[0] : null;
              }
            }
          else if (typeof self != "undefined")
            return self.location.href;
          return null;
        }(), n = !1, r = typeof Worker != "undefined", i = typeof importScripts != "undefined", s = typeof Uint8Array != "undefined", o = function () {
          try {
            return Object.defineProperty({}, "oncomplete", {}), !0;
          } catch (e) {
            return !1;
          }
        }(), u = r, a = function (e, t, n, r, i) {
          if (!o) {
            e[t] = n;
            return;
          }
          var s = {};
          r && (s.get = r);
          i && (s.set = i);
          Object.defineProperty(e, t, s);
        }, f = {}, l = function () {
          function n(n, r) {
            var i = "";
            r || (r = !1);
            if (n.pop || n.subarray)
              n = String.fromCharCode.apply(null, n);
            if (t)
              i = btoa(n);
            else {
              var s, o, u, a, f, l, c, h;
              for (h = 0; h < n.length; h += 3)
                s = n.charCodeAt(h), o = n.charCodeAt(h + 1), u = n.charCodeAt(h + 2), a = s >> 2, f = (s & 3) << 4 | o >> 4, l = (o & 15) << 2 | u >> 6, c = u & 63, isNaN(o) ? l = c = 64 : isNaN(u) && (c = 64), i = i + e.charAt(a) + e.charAt(f) + e.charAt(l) + e.charAt(c);
            }
            return r ? i.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "") : i;
          }
          function r(e) {
            if (t) {
              e = e.replace(/-/g, "+").replace(/_/g, "/");
              while (e.length % 4 !== 0)
                e += "=";
              return atob(e);
            }
            return String.fromCharCode.apply(null, i(e));
          }
          function i(t) {
            t = t.replace(/-/g, "+").replace(/_/g, "/");
            while (t.length % 4 !== 0)
              t += "=";
            var n = [], r, i, s, o, u, a, f, l;
            t = t.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            for (l = 0; l < t.length; l += 4)
              o = e.indexOf(t.charAt(l)), u = e.indexOf(t.charAt(l + 1)), a = e.indexOf(t.charAt(l + 2)), f = e.indexOf(t.charAt(l + 3)), r = o << 2 | u >> 4, i = (u & 15) << 4 | a >> 2, s = (a & 3) << 6 | f, n.push(r), a !== 64 && n.push(i), f !== 64 && n.push(s);
            return n;
          }
          function s(e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          }
          function o(e, t) {
            var n = "";
            typeof t == "undefined" && (t = !1);
            for (var r = 0; r < e.length; r++) {
              t && r % 4 === 0 && r !== 0 && (n += "-");
              var i = e[r].toString(16).toUpperCase();
              i.length === 1 && (n += "0");
              n += i;
            }
            return n;
          }
          function u(e, t) {
            return t = t || 0, e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
          }
          function a(e) {
            var t = new Array(e.length);
            for (var n = 0; n < t.length; n++)
              t[n] = e.charCodeAt(n);
            return t;
          }
          function f(e) {
            e = e.replace(/\-/g, "");
            var t = [];
            while (e.length >= 2)
              t.push(parseInt(e.substring(0, 2), 16)), e = e.substring(2, e.length);
            return t;
          }
          function l(e) {
            var t = {};
            for (var n in e)
              e.hasOwnProperty(n) && (t[n] = e[n]);
            return t;
          }
          function c(e, t, n) {
            var r = i(e), s = [], o;
            if (isNaN(t))
              return r;
            for (o = 0; o < r.length; o += t)
              s.push(r.slice(o, o + t));
            if (n)
              for (o = 0; o < s.length; o++)
                s[o] = (s[o][0] << 24) + (s[o][1] << 16) + (s[o][2] << 8) + s[o][3];
            return s;
          }
          function h(e) {
            return [
              e >>> 24 & 255,
              e >>> 16 & 255,
              e >>> 8 & 255,
              e & 255
            ];
          }
          function p(e) {
            var t = [];
            for (var n = 0; n < e.length; n++)
              t = t.concat(h(e[n]));
            return t;
          }
          function d(e, t) {
            var n = Math.min(e.length, t.length), r = new Array(n);
            for (var i = 0; i < n; i += 1)
              r[i] = e[i] ^ t[i];
            return r;
          }
          function v(e, t) {
            t || (t = 0);
            var n = new Array(e);
            for (var r = 0; r < e; r += 1)
              n[r] = t;
            return n;
          }
          function m(e) {
            function t() {
              var t = 60000, n = [], r = [];
              if (e.length <= t)
                return Array.apply(null, e);
              for (var i = 0, s = e.length; i < s; i += t)
                n.push(e.subarray(i, i + t));
              return n.forEach(function (e) {
                r = r.concat(Array.apply(null, e));
              }), r;
            }
            return e.pop ? e : e.length === 1 ? [e[0]] : t();
          }
          function g(e, t, n) {
            while (e.length < n)
              e.push(t);
            return e;
          }
          function y(e, t, n) {
            while (e.length < n)
              e.unshift(t);
            return e;
          }
          function b(e, t) {
            var n = !0;
            e.length !== t.length && (n = !1);
            for (var r = 0; r < e.length; r++)
              e[r] !== t[r] && (n = !1);
            return n;
          }
          function w(e) {
            if (s(e) !== "Array")
              return !1;
            var t;
            for (var n = 0; n < e.length; n++) {
              t = e[n];
              if (isNaN(t) || t < 0 || t > 255)
                return !1;
            }
            return !0;
          }
          var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", t = typeof btoa != "undefined";
          return {
            toBase64: n,
            base64ToString: r,
            base64ToBytes: i,
            getObjectType: s,
            bytesToHexString: o,
            bytesToInt32: u,
            stringToBytes: a,
            unpackData: c,
            hexToBytesArray: f,
            int32ToBytes: h,
            int32ArrayToBytes: p,
            toArray: m,
            arraysEqual: b,
            clone: l,
            xorVectors: d,
            padEnd: g,
            padFront: y,
            getVector: v,
            verifyByteArray: w
          };
        }(), c = function () {
          function t(e) {
            return i && self.postMessage(e), e;
          }
          return {
            jsCryptoRunner: function (n) {
              var r = n.data.operationType, i;
              if (!e.exists(r, n.data.algorithm.name))
                throw new Error("unregistered algorithm.");
              var s = e[r][n.data.algorithm.name], o = n.data;
              return o.operationSubType === "process" ? (s(o), i = t({ type: "process" })) : i = t(s(o)), i;
            }
          };
        }();
      i && (self.onmessage = function (e) {
        if (e.data.prngSeed) {
          var t = e.data.prngSeed;
          S.init(t);
          return;
        }
        c.jsCryptoRunner(e);
      });
      var h = function () {
          function t(e) {
            var t = [];
            for (var n = 0; n < e.length; n++)
              t[n] = e.charCodeAt(n);
            return t[t.length - 1] === 0 && t.pop(), t;
          }
          function n(e) {
            var t = e.algorithm.name.slice(0, 3).toLowerCase();
            return t === "rsa" ? "RSA" : t === "ecd" ? "EC" : "oct";
          }
          function r(r, i) {
            var s = {};
            s.kty = n(r);
            s.extractable = r.extractable;
            if (i.pop)
              s.k = e.toBase64(i, !0);
            else
              for (var o in i)
                i[o].pop && (s[o] = e.toBase64(i[o], !0));
            r.algorithm.namedCurve && (s.crv = r.algorithm.namedCurve);
            var u = JSON.stringify(s, null, "\t");
            return t(u);
          }
          function i(t, n, r) {
            var i = String.fromCharCode.apply(null, t), s = JSON.parse(i);
            for (var o = 0; o < r.length; o += 1) {
              var u = s[r[o]];
              u && (s[r[o]] = e.base64ToBytes(u));
            }
            return s;
          }
          var e = l;
          return {
            keyToJwk: r,
            jwkToKey: i
          };
        }(), d = function (e, t, n, r, i, s, o) {
          function p(e) {
            var t = Math.floor(e.length / i);
            for (var n = 0; n < t; n++)
              s(e, n, a, r, f);
            return h += t, e.slice(t * i);
          }
          function d() {
            var e = [];
            for (var t = 0; t < a.length; t++)
              e = e.concat(u.int32ToBytes(a[t]));
            return e.length = o / 8, e;
          }
          function v(e) {
            var t = i - e.length % i;
            t <= i / 8 && (t += i);
            var n = u.getVector(t);
            n[0] = 128;
            var r = (e.length + h * i) * 8;
            return n[t - 4] = r >>> 24 & 255, n[t - 3] = r >>> 16 & 255, n[t - 2] = r >>> 8 & 255, n[t - 1] = r & 255, e.concat(n);
          }
          function m(e) {
            return c = p(e), y();
          }
          function g(e) {
            c = c.concat(e);
            c.length >= i && (c = p(c));
            return;
          }
          function y() {
            if (p(v(c)).length !== 0)
              throw new Error("buffer.length !== 0");
            var e = d();
            return c = [], a = n.slice(), h = 0, e;
          }
          var u = l, a = n.slice(), f = new Array(i), c = [], h = 0;
          return {
            name: e,
            computeHash: m,
            process: g,
            finish: y,
            der: t,
            hashLen: o,
            maxMessageSize: 4294967295
          };
        }, v = function () {
          function t(t, n, r, i, s) {
            var o, u, a, f, l, c = 64, h = 4294967295, p = r[0], d = r[1], v = r[2], m = r[3], g = r[4], y = r[5], b = r[6], w = r[7];
            for (u = 0; u < 16; u++)
              s[u] = e.bytesToInt32(t, n * c + u * 4);
            for (o = 16; o < 64; o++)
              f = s[o - 15], l = s[o - 2], s[o] = ((l >>> 17 | l << 15) ^ (l >>> 19 | l << 13) ^ l >>> 10) + s[o - 7] + ((f >>> 7 | f << 25) ^ (f >>> 18 | f << 14) ^ f >>> 3) + s[o - 16], s[o] = s[o] & h;
            for (u = 0; u < 64; u++)
              a = w + ((g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7)) + (g & y ^ ~g & b) + i[u] + s[u], m += a, a += ((p >>> 2 | p << 30) ^ (p >>> 13 | p << 19) ^ (p >>> 22 | p << 10)) + (p & (d ^ v) ^ d & v), w = b, b = y, y = g, g = m, m = v, v = d, d = p, p = a;
            return r[0] += p & h, r[1] += d & h, r[2] += v & h, r[3] += m & h, r[4] += g & h, r[5] += y & h, r[6] += b & h, r[7] += w & h, r;
          }
          var e = l, n, r, i, s, o, u = e.unpackData;
          return r = u("wQWe2DZ81QcwcN0X9w5ZOf/ACzFoWBURZPmPp776T6Q", 4, 1), i = u("agnmZ7tnroU8bvNypU/1OlEOUn+bBWiMH4PZq1vgzRk", 4, 1), n = u("QoovmHE3RJG1wPvP6bXbpTlWwltZ8RHxkj+CpKscXtXYB6qYEoNbASQxhb5VDH3Dcr5ddIDesf6b3AanwZvxdOSbacHvvkeGD8GdxiQMocwt6SxvSnSEqlywqdx2+YjamD5RUqgxxm2wAyfIv1l/x8bgC/PVp5FHBspjURQpKWcntwqFLhshOE0sbfxTOA0TZQpzVHZqCruBwskuknIshaK/6KGoGmZLwkuLcMdsUaPRkugZ1pkGJPQONYUQaqBwGaTBFh43bAgnSHdMNLC8tTkcDLNO2KpKW5zKT2gub/N0j4LueKVjb4TIeBSMxwIIkL7/+qRQbOu++aP3xnF48g", 4, 1), s = u("MC0wDQYJYIZIAWUDBAIEBQAEHA"), o = u("MDEwDQYJYIZIAWUDBAIBBQAEIA"), {
            sha224: d("SHA-224", s, r, n, 64, t, 224),
            sha256: d("SHA-256", o, i, n, 64, t, 256)
          };
        }();
      typeof e != "undefined" && (v.hash256 = function (e) {
        if (e.operationSubType === "process") {
          v.sha256.process(e.buffer);
          return;
        }
        return e.operationSubType === "finish" ? v.sha256.finish() : v.sha256.computeHash(e.buffer);
      }, v.hash224 = function (e) {
        if (e.operationSubType === "process") {
          v.sha224.process(e.buffer);
          return;
        }
        return e.operationSubType === "finish" ? v.sha224.finish() : v.sha224.computeHash(e.buffer);
      }, e.register("digest", "sha-224", v.hash224), e.register("digest", "sha-256", v.hash256));
      f["sha-224"] = v.sha224;
      f["sha-256"] = v.sha256;
      var m = function () {
        function t(e, t, n, r, i) {
          var s = t + r | 0, o = s >>> 0 < r >>> 0;
          i[0] = e + n + o | 0;
          i[1] = s;
          return;
        }
        function n(e, n, r, i, s) {
          var o, u, a = 128, f, l, c, h, p, d, v = [], m = [], g = [], y, b = r[0], w = r[1], E = r[2], S = r[3], x = r[4], T = r[5], N = r[6], C = r[7], k = r[8], L = r[9], A = r[10], O = r[11], M = r[12], _ = r[13], D = r[14], P = r[15];
          for (o = 0; o < 32; o++)
            y = n * a + o * 4, s[o] = e.slice(y, y + 4), s[o] = s[o][0] << 24 | s[o][1] << 16 | s[o][2] << 8 | s[o][3];
          for (o = 32; o < 160; o += 2)
            p = s[o - 30], d = s[o - 29], f = (p >>> 1 | d << 31) ^ (p >>> 8 | d << 24) ^ p >>> 7, l = (d >>> 1 | p << 31) ^ (d >>> 8 | p << 24) ^ (d >>> 7 | p << 25), p = s[o - 4], d = s[o - 3], c = (p >>> 19 | d << 13) ^ (d >>> 29 | p << 3) ^ p >>> 6, h = (d >>> 19 | p << 13) ^ (p >>> 29 | d << 3) ^ (d >>> 6 | p << 26), t(c, h, s[o - 14], s[o - 13], v), t(f, l, v[0], v[1], v), t(s[o - 32], s[o - 31], v[0], v[1], v), s[o] = v[0], s[o + 1] = v[1];
          for (u = 0; u < 160; u += 2)
            f = (k >>> 14 | L << 18) ^ (k >>> 18 | L << 14) ^ (L >>> 9 | k << 23), l = (L >>> 14 | k << 18) ^ (L >>> 18 | k << 14) ^ (k >>> 9 | L << 23), c = k & A ^ M & ~k, h = L & O ^ _ & ~L, t(D, P, f, l, v), t(c, h, i[u], i[u + 1], m), t(v[0], v[1], s[u], s[u + 1], g), t(m[0], m[1], g[0], g[1], g), t(g[0], g[1], N, C, v), N = v[0], C = v[1], l = (w >>> 28 | b << 4) ^ (b >>> 2 | w << 30) ^ (b >>> 7 | w << 25), f = (b >>> 28 | w << 4) ^ (w >>> 2 | b << 30) ^ (w >>> 7 | b << 25), h = w & (S ^ T) ^ S & T, c = b & (E ^ x) ^ E & x, t(g[0], g[1], f, l, v), f = v[0], l = v[1], t(c, h, f, l, v), f = v[0], l = v[1], D = M, P = _, M = A, _ = O, A = k, O = L, k = N, L = C, N = x, C = T, x = E, T = S, E = b, S = w, b = f, w = l;
          return t(r[0], r[1], b, w, v), r[0] = v[0], r[1] = v[1], t(r[2], r[3], E, S, v), r[2] = v[0], r[3] = v[1], t(r[4], r[5], x, T, v), r[4] = v[0], r[5] = v[1], t(r[6], r[7], N, C, v), r[6] = v[0], r[7] = v[1], t(r[8], r[9], k, L, v), r[8] = v[0], r[9] = v[1], t(r[10], r[11], A, O, v), r[10] = v[0], r[11] = v[1], t(r[12], r[13], M, _, v), r[12] = v[0], r[13] = v[1], t(r[14], r[15], D, P, v), r[14] = v[0], r[15] = v[1], r;
        }
        var e = l, r, i, s, o, u, a, f, c = e.unpackData;
        return r = c("y7udXcEFnthimikqNnzVB5FZAVowcN0XFS/s2PcOWTlnMyZn/8ALMY60SodoWBUR2wwuDWT5j6dHtUgdvvpPpA==", 4, 1), i = c("agnmZ/O8yQi7Z66FhMqnOzxu83L+lPgrpU/1Ol8dNvFRDlJ/reaC0ZsFaIwrPmwfH4PZq/tBvWtb4M0ZE34heQ", 4, 1), s = c("QoovmNcoriJxN0SRI+9lzbXA+8/sTTsv6bXbpYGJ27w5VsJb80i1OFnxEfG2BdAZkj+CpK8ZT5urHF7V2m2BGNgHqpijAwJCEoNbAUVwb74kMYW+TuSyjFUMfcPV/7Ticr5ddPJ7iW+A3rH+OxaWsZvcBqclxxI1wZvxdM9pJpTkm2nBnvFK0u++R4Y4TyXjD8GdxouM1bUkDKHMd6ycZS3pLG9ZKwJ1SnSEqm6m5INcsKncvUH71Hb5iNqDEVO1mD5RUu5m36uoMcZtLbQyELADJ8iY+yE/v1l/x77vDuTG4AvzPaiPwtWnkUeTCqclBspjUeADgm8UKSlnCg5ucCe3CoVG0i/8LhshOFwmySZNLG38WsQq7VM4DROdlbPfZQpzVIuvY952agq7PHeyqIHCyS5H7a7mknIshRSCNTuiv+ihTPEDZKgaZku8QjABwkuLcND4l5HHbFGjBlS+MNGS6BnW71IY1pkGJFVlqRD0DjWFV3EgKhBqoHAyu9G4GaTBFrjS0MgeN2wIUUGrUydId0zfjuuZNLC8teGbSKg5HAyzxclaY07YqkrjQYrLW5zKT3dj43NoLm/z1rK4o3SPgu5d77L8eKVjb0MXL2CEyHgUofCrcozHAggaZDnskL7/+iNjHiikUGzr3oK96b75o/eyxnkVxnF48uNyUyvKJz7O6iZhnNGGuMchwMIH6tp91s3g6x71fU9/7m7ReAbwZ6pyF2+6CmN9xaLImKYRP5gEvvkNrhtxCzUTHEcbKNt39SMEfYQyyqt7QMckkzyevgoVyb68Qx1nxJwQDUxMxdS+yz5Ctll/KZz8ZX4qX8tvqzrW+uxsRBmMSkdYFw==", 4, 1), o = c("MEEwDQYJYIZIAWUDBAICBQAEMA"), u = c("MFEwDQYJYIZIAWUDBAIDBQAEQA"), a = c("MC0wDQYJYIZIAWUDBAIFBQAEHA"), f = c("MDEwDQYJYIZIAWUDBAIGBQAEIA"), {
          sha384: d("SHA-384", o, r, s, 128, n, 384),
          sha512: d("SHA-512", u, i, s, 128, n, 512),
          sha512_224: d("SHA-512.224", a, i, s, 128, n, 224),
          sha512_256: d("SHA-512.256", f, i, s, 128, n, 256)
        };
      }();
      typeof e != "undefined" && (m.hash384 = function (e) {
        if (e.operationSubType === "process") {
          m.sha384.process(e.buffer);
          return;
        }
        return e.operationSubType === "finish" ? m.sha384.finish() : m.sha384.computeHash(e.buffer);
      }, m.hash512 = function (e) {
        if (e.operationSubType === "process") {
          m.sha512.process(e.buffer);
          return;
        }
        return e.operationSubType === "finish" ? m.sha512.finish() : m.sha512.computeHash(e.buffer);
      }, e.register("digest", "sha-384", m.hash384), e.register("digest", "sha-512", m.hash512));
      f["sha-384"] = m.sha384;
      f["sha-512"] = m.sha512;
      var g = function () {
          var e, t, n, r, i, s, o, u, a, f;
          return {
            aes: function (c) {
              e || (e = l.unpackData("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v0CjnoHz1/t84zmCmy//hzSOQ0TE3unLVHuUMqbCIz3uTJULQvrDTgguoWYo2SSydluiSW2L0SVy+PZkhmiYFtSkXMxdZbaSbHBIUP3tudpeFUZXp42dhJDYqwCMvNMK9+RYBbizRQbQLB6Pyj8PAsGvvQMBE4prOpERQU9n3OqX8s/O8LTmc5asdCLnrTWF4vk36Bx1325H8RpxHSnFiW+3Yg6qGL4b/FY+S8bSeSCa28D+eM1a9B/dqDOIB8cxsRIQWSeA7F9gUX+pGbVKDS3lep+TyZzvoOA7Ta4q9bDI67s8g1OZYRcrBH66d9Ym4WkUY1UhDH2NAQIECBAgQIAbNmzYq02aL168Y8aXNWrUs33678WROXLk071hwp8lSpQzZsyDHTp06MuNAQIECBAgQIAbNmzYq02aL168Y8aXNWrUs33678WROXLk071hwp8lSpQzZsyDHTp06MuNAQIECBAgQIAbNmzYq02aL168Y8aXNWrUs33678WROXLk071hwp8lSpQzZsyDHTp06MuNAQIECBAgQIAbNmzYq02aL168Y8aXNWrUs33678WROXLk071hwp8lSpQzZsyDHTp06MuNAQIECBAgQIAbNmzYq02aL168Y8aXNWrUs33678WROXLk071hwp8lSpQzZsyDHTp06MuN", 256, !1), t = e[0], n = e[1], r = e[2], i = e[3], s = e[4], o = e[5], u = e[6], a = e[7], f = e[8]);
              var h = 128, p, d, v = 4, m, g;
              switch (c.length * 8) {
              case 128:
                p = 128, d = 4, m = 10;
                break;
              case 192:
                p = 192, d = 6, m = 12;
                break;
              case 256:
                p = 256, d = 8, m = 14;
                break;
              default:
                throw new Error("Unsupported keyLength");
              }
              var y = function (e) {
                  var t = e[1];
                  e[1] = e[5];
                  e[5] = e[9];
                  e[9] = e[13];
                  e[13] = t;
                  t = e[2];
                  e[2] = e[10];
                  e[10] = t;
                  t = e[6];
                  e[6] = e[14];
                  e[14] = t;
                  t = e[15];
                  e[15] = e[11];
                  e[11] = e[7];
                  e[7] = e[3];
                  e[3] = t;
                }, b = function (e) {
                  var t = e[13];
                  e[13] = e[9];
                  e[9] = e[5];
                  e[5] = e[1];
                  e[1] = t;
                  t = e[10];
                  e[10] = e[2];
                  e[2] = t;
                  t = e[14];
                  e[14] = e[6];
                  e[6] = t;
                  t = e[3];
                  e[3] = e[7];
                  e[7] = e[11];
                  e[11] = e[15];
                  e[15] = t;
                }, w = function (e) {
                  var r = e[0], i = e[1], s = e[2], o = e[3], u = e[4], a = e[5], f = e[6], l = e[7], c = e[8], h = e[9], p = e[10], d = e[11], v = e[12], m = e[13], g = e[14], y = e[15];
                  e[0] = t[r] ^ n[i] ^ s ^ o;
                  e[1] = r ^ t[i] ^ n[s] ^ o;
                  e[2] = r ^ i ^ t[s] ^ n[o];
                  e[3] = n[r] ^ i ^ s ^ t[o];
                  e[4] = t[u] ^ n[a] ^ f ^ l;
                  e[5] = u ^ t[a] ^ n[f] ^ l;
                  e[6] = u ^ a ^ t[f] ^ n[l];
                  e[7] = n[u] ^ a ^ f ^ t[l];
                  e[8] = t[c] ^ n[h] ^ p ^ d;
                  e[9] = c ^ t[h] ^ n[p] ^ d;
                  e[10] = c ^ h ^ t[p] ^ n[d];
                  e[11] = n[c] ^ h ^ p ^ t[d];
                  e[12] = t[v] ^ n[m] ^ g ^ y;
                  e[13] = v ^ t[m] ^ n[g] ^ y;
                  e[14] = v ^ m ^ t[g] ^ n[y];
                  e[15] = n[v] ^ m ^ g ^ t[y];
                }, E = function (e) {
                  var t = e[0], n = e[1], u = e[2], a = e[3], f = e[4], l = e[5], c = e[6], h = e[7], p = e[8], d = e[9], v = e[10], m = e[11], g = e[12], y = e[13], b = e[14], w = e[15];
                  e[0] = r[t] ^ s[n] ^ i[u] ^ o[a];
                  e[1] = o[t] ^ r[n] ^ s[u] ^ i[a];
                  e[2] = i[t] ^ o[n] ^ r[u] ^ s[a];
                  e[3] = s[t] ^ i[n] ^ o[u] ^ r[a];
                  e[4] = r[f] ^ s[l] ^ i[c] ^ o[h];
                  e[5] = o[f] ^ r[l] ^ s[c] ^ i[h];
                  e[6] = i[f] ^ o[l] ^ r[c] ^ s[h];
                  e[7] = s[f] ^ i[l] ^ o[c] ^ r[h];
                  e[8] = r[p] ^ s[d] ^ i[v] ^ o[m];
                  e[9] = o[p] ^ r[d] ^ s[v] ^ i[m];
                  e[10] = i[p] ^ o[d] ^ r[v] ^ s[m];
                  e[11] = s[p] ^ i[d] ^ o[v] ^ r[m];
                  e[12] = r[g] ^ s[y] ^ i[b] ^ o[w];
                  e[13] = o[g] ^ r[y] ^ s[b] ^ i[w];
                  e[14] = i[g] ^ o[y] ^ r[b] ^ s[w];
                  e[15] = s[g] ^ i[y] ^ o[b] ^ r[w];
                }, S = function (e, t) {
                  return [
                    e[0] ^ t[0],
                    e[1] ^ t[1],
                    e[2] ^ t[2],
                    e[3] ^ t[3]
                  ];
                }, x = function (e, t, n) {
                  for (var r = 0; r < e.length; r += 1)
                    e[r] ^= t[r + n];
                }, T = function (e) {
                  var t = e[0];
                  e[0] = e[1];
                  e[1] = e[2];
                  e[2] = e[3];
                  e[3] = t;
                }, N = function (e) {
                  for (var t = 0; t < e.length; t += 1)
                    e[t] = u[e[t]];
                }, C = function (e) {
                  for (var t = 0; t < e.length; t += 1)
                    e[t] = a[e[t]];
                }, k = function (e, t) {
                  return [
                    e[4 * t],
                    e[4 * t + 1],
                    e[4 * t + 2],
                    e[4 * t + 3]
                  ];
                }, L = function (e, t, n, r) {
                  e[4 * n] = t[4 * r];
                  e[4 * n + 1] = t[4 * r + 1];
                  e[4 * n + 2] = t[4 * r + 2];
                  e[4 * n + 3] = t[4 * r + 3];
                }, A = function (e) {
                  var t, n = [], r = 0;
                  while (r < 4 * d)
                    n.push(e[r++]);
                  r = d;
                  while (r < v * (m + 1)) {
                    t = k(n, r - 1);
                    if (r % d === 0) {
                      var i = r / d, s = [
                          f[i],
                          0,
                          0,
                          0
                        ];
                      T(t);
                      N(t);
                      t = S(t, s);
                    } else
                      d > 6 && r % d === 4 && N(t);
                    var o = S(k(n, r - d), t);
                    L(n, o, r, 0);
                    r += 1;
                  }
                  return n;
                };
              return g = A(c), {
                encrypt: function (e) {
                  var t = e, n;
                  x(t, g, 0);
                  for (n = 1; n <= m - 1; n += 1)
                    N(t), y(t), w(t), x(t, g, 4 * n * v);
                  return N(t), y(t), x(t, g, 4 * m * v), t;
                },
                decrypt: function (e) {
                  var t = e, n;
                  x(t, g, 4 * m * v);
                  for (n = m - 1; n >= 1; n -= 1)
                    b(t), C(t), x(t, g, 4 * n * v), E(t);
                  return b(t), C(t), x(t, g, 0), t;
                },
                clear: function () {
                },
                keyLength: p,
                blockSize: h
              };
            }
          };
        }(), y = y || {};
      y.pkcsv7 = function (e) {
        function t(t) {
          var n = t.length - 1 >= 0 ? t.length - 1 : 0, r = t[n], i = r.length, s = i === e;
          if (s) {
            var o = [], u;
            for (u = 0; u < e; u += 1)
              o.push(e);
            t.push(o);
          } else {
            var a = e - i & 255;
            while (r.length !== e)
              r.push(a);
          }
        }
        function n(t) {
          var n = !0;
          t.length % e !== 0 && (n = !1);
          var r = t.slice(-e), i = r[r.length - 1];
          for (var s = 0; s < e; s++) {
            var o = e - s <= i, u = r[s] === i;
            n = (o ? u : !0) && n;
          }
          var a = n ? i : 0;
          return t.length -= a, n;
        }
        return {
          pad: t,
          unpad: n
        };
      };
      var b = function (e) {
          function i(e) {
            var n = [];
            a = a.concat(e);
            var r = Math.floor(a.length / t);
            for (var i = 0; i < r; i++)
              n.push(a.slice(i * t, (i + 1) * t));
            return a = a.slice(r * t), n;
          }
          function s(t) {
            var n = [], r;
            for (var i = 0; i < t.length; i++)
              r = l.xorVectors(c, t[i]), n.push(e.encrypt(r)), c = n[i];
            return n;
          }
          function o(t) {
            var n = [], r, i;
            for (var s = 0; s < t.length; s += 1)
              r = t[s].slice(0, t[s].length), i = e.decrypt(r), n.push(l.xorVectors(c, i)), c = t[s];
            return n;
          }
          function u() {
            a = [];
            f = [];
            c = null;
          }
          var t = e.blockSize / 8, n = y.pkcsv7(t), r = function (e) {
              var t = [], n, r;
              for (n = 0; n < e.length; n += 1) {
                var i = e[n];
                for (r = 0; r < i.length; r += 1)
                  t.push(i[r]);
              }
              return t;
            }, a = [], f = [], c;
          return {
            init: function (e) {
              if (e.length !== t)
                throw new Error("Invalid iv size");
              c = e.slice();
            },
            encrypt: function (e) {
              return this.processEncrypt(e), this.finishEncrypt();
            },
            processEncrypt: function (e) {
              var t = s(i(e));
              f = f.concat(r(t));
              return;
            },
            finishEncrypt: function () {
              var e = a.length === 1 ? [[a[0]]] : [a];
              n.pad(e);
              var t = f.concat(r(s(e)));
              return u(), t;
            },
            decrypt: function (e) {
              return this.processDecrypt(e), this.finishDecrypt();
            },
            processDecrypt: function (e) {
              var t = o(i(e));
              f = f.concat(r(t));
              return;
            },
            finishDecrypt: function () {
              var e = f, t = n.unpad(e);
              return u(), e;
            }
          };
        }, w = null;
      typeof e != "undefined" && (b.workerEncrypt = function (e) {
        var t;
        w || (w = b(g.aes(e.keyData)), w.init(e.algorithm.iv));
        if (e.operationSubType === "process") {
          w.processEncrypt(e.buffer);
          return;
        }
        return e.operationSubType === "finish" ? (t = w.finishEncrypt(), w = null, t) : (t = w.encrypt(e.buffer), w = null, t);
      }, b.workerDecrypt = function (e) {
        var t;
        w || (w = b(g.aes(e.keyData)), w.init(e.algorithm.iv));
        if (e.operationSubType === "process") {
          w.processDecrypt(e.buffer);
          return;
        }
        return e.operationSubType === "finish" ? (t = w.finishDecrypt(), w = null, t) : (t = w.decrypt(e.buffer), w = null, t);
      }, b.generateKey = function (e) {
        if (e.algorithm.length % 8 !== 0)
          throw new Error();
        return {
          type: "keyGeneration",
          keyData: S.getBytes(Math.floor(e.algorithm.length / 8)),
          keyHandle: {
            algorithm: e.algorithm,
            extractable: e.extractable,
            keyUsage: e.keyUsage,
            type: "secret"
          }
        };
      }, b.importKey = function (e) {
        var t = h.jwkToKey(e.keyData, e.algorithm, ["k"]);
        return {
          type: "keyImport",
          keyData: t.k,
          keyHandle: {
            algorithm: e.algorithm,
            extractable: e.extractable || t.extractable,
            keyUsage: e.keyUsage,
            type: "secret"
          }
        };
      }, b.exportKey = function (e) {
        var t = h.keyToJwk(e.keyHandle, e.keyData);
        return {
          type: "keyExport",
          keyHandle: t
        };
      }, e.register("importKey", "aes-cbc", b.importKey), e.register("exportKey", "aes-cbc", b.exportKey), e.register("generateKey", "aes-cbc", b.generateKey), e.register("encrypt", "aes-cbc", b.workerEncrypt), e.register("decrypt", "aes-cbc", b.workerDecrypt));
      var S = new E(), T;
      i || (T = function () {
        function n() {
          function t(t) {
            try {
              e = c.jsCryptoRunner({ data: t });
              (!t.operationSubType || t.operationSubType !== "process") && this.onmessage({ data: e });
            } catch (n) {
              this.onerror({
                data: n.description,
                type: "error"
              });
            }
          }
          var e;
          return {
            postMessage: t,
            onmessage: null,
            onerror: null,
            terminate: function () {
            }
          };
        }
        function o(e) {
          function s(e, t) {
          }
          function o(e, t) {
          }
          function u(e) {
            n = e;
            this.result && n({ target: this });
          }
          function f(e) {
            r = e;
          }
          function l() {
            return n;
          }
          function c() {
            return r;
          }
          function h(t) {
            if (t.type === "error") {
              this.onerror && this.onerror(t);
              return;
            }
            if (t.type === "process")
              return;
            this.result = e(t.data);
            this.oncomplete && this.oncomplete({ target: this });
            return;
          }
          var t = null, n = null, r = null, i;
          return i = {
            dispatchEvent: h,
            addEventListener: s,
            removeEventListener: o,
            result: null
          }, a(i, "oncomplete", null, l, u), a(i, "onerror", null, c, f), i;
        }
        function f() {
          function e(e) {
            switch (e.type) {
            case "keyGeneration":
            case "keyImport":
            case "keyDerive":
              return v.add(e.keyHandle, e.keyData), e.keyHandle;
            case "keyExport":
              return p(e.keyHandle);
            case "keyPairGeneration":
              return v.add(e.keyPair.publicKey.keyHandle, e.keyPair.publicKey.keyData), v.add(e.keyPair.privateKey.keyHandle, e.keyPair.privateKey.keyData), {
                publicKey: e.keyPair.publicKey.keyHandle,
                privateKey: e.keyPair.privateKey.keyHandle
              };
            default:
              throw new Error("Unknown key operation");
            }
            return;
          }
          return o(e);
        }
        function h(e) {
          function t(e) {
            return e = p(e), e;
          }
          var n = o(t);
          return n.process = function (t) {
            e.operationSubType = "process";
            e.buffer = g.toArray(t);
            m.continueJob(this, g.clone(e));
          }, n.finish = function () {
            e.operationSubType = "finish";
            e.buffer = [];
            m.continueJob(this, g.clone(e));
          }, n.abort = function () {
            m.abortJob(this);
          }, n.onabort = null, n.onprogress = null, n.algorithm = e.algorithm || null, n.key = e.keyHandle || null, n;
        }
        function p(e) {
          return s && e.pop ? new Uint8Array(e).buffer : e;
        }
        function d(e) {
          e.oncomplete ? e.oncomplete({ target: e }) : setTimeout(function () {
            d(e);
          }, i);
        }
        function y(t, n) {
          if (!e.exists(t, n))
            throw new Error("unsupported algorithm");
        }
        function E(e) {
          var t = v.lookup(e);
          if (!t)
            throw new Error("key not found");
          return t;
        }
        function x(e, t) {
          var n = { operationType: e }, r = w[e];
          for (var i = 0; i < r.length; i += 1) {
            var s = b[r[i]], o = t[i];
            if (!o) {
              if (s.required)
                throw new Error(s.name);
              continue;
            }
            o.subarray && (o = g.toArray(o));
            if (l.getObjectType(o) !== s.type)
              throw new Error(s.name);
            s.name === "algorithm" && (o.name = o.name.toLowerCase(), o.iv && (o.iv = g.toArray(o.iv)), o.salt && (o.salt = g.toArray(o.salt)), o.additionalData && (o.additionalData = g.toArray(o.additionalData)), o.hash && !o.hash.name && l.getObjectType(o.hash) === "String" && (o.hash = { name: o.hash }));
            n.hasOwnProperty(s.name) ? n[s.name + "1"] = o : n[s.name] = o;
          }
          return n;
        }
        function T(e, t, n) {
          var r = x(e, t);
          y(e, r.algorithm.name);
          r.keyHandle && (r.keyData = E(r.keyHandle));
          r.keyHandle1 && (r.keyData1 = E(r.keyHandle1));
          r.algorithm && r.algorithm.publicKey && (r.additionalKeyData = E(r.algorithm.publicKey));
          var i = n ? f(r) : h(r);
          return (n || r.buffer || e === "deriveBits" || e === "wrapKey") && m.runJob(i, r), i;
        }
        var i = 100, v = [];
        v.add = function (e, t) {
          v.push({
            keyHandle: e,
            keyData: t
          });
        };
        v.remove = function (e) {
          for (var t = 0; t < v.length; t++)
            if (v[t].keyHandle === e) {
              v = v.splice(t, 1);
              return;
            }
        };
        v.lookup = function (e) {
          for (var t = 0; t < v.length; t++)
            if (v[t].keyHandle === e)
              return v[t].keyData;
          return null;
        };
        var m = function () {
            function f() {
              l(!u);
              for (var e = 0; e < s.length; e++)
                if (!s[e].busy)
                  return s[e];
              return null;
            }
            function l(e) {
              for (var t = s.length - 1; t >= 0; t -= 1)
                s[t].isWebWorker === e && (s[t].terminate(), s.splice(t, 1));
            }
            function c() {
              var e = 0;
              for (var t = 0; t < s.length; t++)
                s[t].busy || (e += 1);
              return e;
            }
            function h(e) {
              s.push(e);
            }
            function p(e) {
              for (var t = 0; t < s.length; t++)
                if (s[t] === e) {
                  e.terminate();
                  s.splice(t, 1);
                  return;
                }
            }
            function d(e) {
              for (var t = 0; t < s.length; t++)
                if (s[t].operation === e)
                  return s[t];
              return null;
            }
            function v(e, t) {
              o.push({
                operation: e,
                data: t,
                id: a++
              });
            }
            function m(e) {
              e.busy = !1;
              e.operation = null;
              if (u)
                if (o.length > 0) {
                  var t = o.shift();
                  w(t.operation, t.data);
                } else
                  c() > i && p(e);
            }
            function g(e) {
              var r;
              if (u)
                try {
                  r = new Worker(t);
                  r.postMessage({ prngSeed: S.getBytes(48) });
                  r.isWebWorker = !0;
                } catch (i) {
                  u = !1;
                  N.forceSync = !0;
                  r = n();
                  r.isWebWorker = !1;
                }
              else
                r = n(), r.isWebWorker = !1;
              return r.operation = e, r.busy = !1, r.onmessage = function (e) {
                var t = r.operation;
                for (var n = 0; n < o.length; n++)
                  if (o[n].operation === r.operation) {
                    var i = o[n];
                    o.splice(n, 1);
                    E(r, i.data);
                    return;
                  }
                t && e.data.type !== "process" && (m(r), t.dispatchEvent(e));
              }, r.onerror = function (e) {
                var t = r.operation;
                m(r);
                t.dispatchEvent(e);
              }, h(r), r;
            }
            function y(e) {
              var t = d(e);
              t && p(t);
            }
            function b(t, n) {
              var i = null;
              u = r && !N.forceSync;
              i = f();
              if (u && i === null && s.length >= e) {
                v(t, n);
                return;
              }
              i === null && (i = g(t));
              if (i === null)
                throw v(t, n), new Error("could not create new worker");
              i.operation = t;
              i.busy = !0;
              E(i, n);
            }
            function w(e, t) {
              var n = d(e);
              if (n) {
                E(n, t);
                return;
              }
              b(e, t);
            }
            function E(e, t) {
              u ? (e.data = t, e.postMessage(t)) : setTimeout(function () {
                e.postMessage(t);
              }, 0);
            }
            var e = 15, i = 4, s = [], o = [], a = 0;
            return {
              runJob: b,
              continueJob: w,
              abortJob: y
            };
          }(), g = l, b = [
            {
              name: "algorithm",
              type: "Object",
              required: !0
            },
            {
              name: "keyHandle",
              type: "Object",
              required: !0
            },
            {
              name: "buffer",
              type: "Array",
              required: !1
            },
            {
              name: "signature",
              type: "Array",
              required: !0
            },
            {
              name: "format",
              type: "String",
              required: !0
            },
            {
              name: "keyData",
              type: "Array",
              required: !0
            },
            {
              name: "extractable",
              type: "Boolean",
              required: !1
            },
            {
              name: "keyUsages",
              type: "Array",
              required: !1
            },
            {
              name: "derivedKeyType",
              type: "Object",
              required: !0
            },
            {
              name: "length",
              type: "Number",
              required: !1
            }
          ], w = {
            encrypt: [
              0,
              1,
              2
            ],
            decrypt: [
              0,
              1,
              2
            ],
            sign: [
              0,
              1,
              2
            ],
            verify: [
              0,
              1,
              3,
              2
            ],
            digest: [
              0,
              2
            ],
            generateKey: [
              0,
              6,
              7
            ],
            importKey: [
              4,
              5,
              0,
              6,
              7
            ],
            exportKey: [
              0,
              4,
              1,
              6,
              7
            ],
            deriveKey: [
              0,
              1,
              8,
              6,
              7
            ],
            deriveBits: [
              0,
              1,
              9
            ],
            wrapKey: [
              1,
              1,
              0
            ],
            unwrapKey: [
              2,
              0,
              1,
              6,
              7
            ]
          }, N = {
            encrypt: function (e, t, n) {
              return T("encrypt", arguments, 0);
            },
            decrypt: function (e, t, n) {
              return T("decrypt", arguments, 0);
            },
            sign: function (e, t, n) {
              return T("sign", arguments, 0);
            },
            verify: function (e, t, n, r) {
              return T("verify", arguments, 0);
            },
            digest: function (e, t) {
              return T("digest", arguments, 0);
            },
            generateKey: function (e, t, n) {
              return T("generateKey", arguments, 1);
            },
            deriveKey: function (e, t, n, r, i) {
              return T("deriveKey", arguments, 1);
            },
            deriveBits: function (e, t, n) {
              return T("deriveBits", arguments, 0);
            },
            importKey: function (e, t, n, r, i) {
              return T("importKey", arguments, 1);
            },
            exportKey: function (e, t) {
              return T("exportKey", [
                t.algorithm,
                e,
                t
              ], 1);
            },
            wrapKey: function (e, t, n) {
              return T("wrapKey", arguments, 0);
            },
            unwrapKey: function (e, t, n, r, i) {
              return T("unwrapKey", arguments, 1);
            }
          };
        return N;
      }());
      var N = {
        subtle: T,
        getRandomValues: function (e) {
          var t, n = S.getBytes(e.length);
          for (t = 0; t < e.length; t += 1)
            e[t] = n[t];
          return e;
        },
        initPrng: function (e) {
          var t = Object.prototype.toString.call(e);
          if (t !== "[object Array]" && t !== "[object Uint8Array]")
            throw new Error("entropyData must be a Array or Uint8Array");
          C && C.reseed(e);
          S.reseed(C.read(48));
          n = !0;
        },
        toBase64: function (e, t) {
          return l.toBase64(e, !1);
        },
        base64ToString: function (e) {
          return l.base64ToString(e);
        },
        utilities: l,
        sha256: v.sha256,
        sha512: m.sha512,
        url: t
      };
      typeof cryptoMath != "undefined" && (N.cryptoMath = cryptoMath);
      typeof testInterface != "undefined" && (N.testInterface = testInterface);
      var C;
      if (!i) {
        C = C || new x();
        C.init();
        var k = C.read(48);
        S.init(k);
      }
      return N;
    }();
  return t;
}));
