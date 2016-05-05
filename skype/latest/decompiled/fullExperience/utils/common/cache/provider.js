define("utils/common/cache/provider", [
  "require",
  "constants/common",
  "services/serviceLocator",
  "constants/common",
  "browser/window",
  "utils/common/settablePromise",
  "utils/common/encryption",
  "utils/common/cache/keyHasher",
  "lodash-compat"
], function (e) {
  function l() {
    function b(e, t, n) {
      if (!l.log)
        return;
    }
    function w(t) {
      if (l.plainData) {
        var n = s.build();
        return n.resolve(JSON.stringify(t)), n;
      }
      return o.encrypt(e, t);
    }
    function E(t) {
      if (l.plainData) {
        var n = s.build();
        return n.resolve(JSON.parse(t)), n;
      }
      return o.decrypt(e, t);
    }
    function S() {
      y.getSensitiveItem(t.INTERNAL_KEYS.KEYS_MAP).then(m.fillMap).then(c.resolve, c.resolve);
    }
    function x(e) {
      return i.localStorage.getItem(C(e));
    }
    function T(e) {
      return i.localStorage.removeItem(C(e));
    }
    function N(e, t) {
      return i.localStorage.setItem(C(e), t);
    }
    function C(e) {
      return h + e;
    }
    function k(e) {
      return i.localStorage.hasOwnProperty(e) && p.test(e);
    }
    function L(e, t) {
      return Object.keys(i.localStorage).reduce(function (n, r) {
        var i = m.getKeyByHash(r.replace(p, ""));
        return A(r, i, e, t) ? n.concat(i) : n;
      }, []);
    }
    function A(e, n, r, i) {
      var s = i ? i.test(n) : !0;
      return k(e) && s && (r || e !== C(t.INTERNAL_KEYS.VERSION));
    }
    function O(e) {
      L(e).forEach(function (e) {
        i.localStorage.removeItem(C(e));
      });
    }
    var e, f, l = {
        log: !1,
        showKeys: !1,
        plainData: !1
      }, c = s.build(), h = t.PREFIX_KEYWORD + "|", p = new RegExp("^" + t.PREFIX_KEYWORD + "\\|"), d = n.resolve(r.serviceLocator.FEATURE_FLAGS).isFeatureOn(r.featureFlags.DEACTIVATE_CACHE), v = {}, m, g = {}, y = this;
    y.init = function (n, r) {
      function w(n) {
        function u(t) {
          o.importEncryptionKey(t.response).then(function (t) {
            e = t, p("Key decrypted -> initialization completed"), n();
          }, l);
        }
        function a(e) {
          N(t.INTERNAL_KEYS.ENCRYPTION_KEY, e.response);
        }
        function f(t) {
          e = t, o.exportEncryptionKey(e).then(function (e) {
            s.encrypt(e).then(a);
          }), p("New key generated -> initialization completed"), n();
        }
        function l() {
          p("KES not reachable, deactivating cache and completing initialization"), d = !0, n();
        }
        function c() {
          p("Starting with fresh cache"), i && O(), o.generateEncryptionKey().then(f, l);
        }
        var r;
        if (d) {
          p("Cache is deactivated -> initialization completed"), n();
          return;
        }
        r = x(t.INTERNAL_KEYS.ENCRYPTION_KEY), r ? (p("Getting key from KES"), s.decrypt(r).then(u, c)) : c();
      }
      var i = !0, s, h, p = b.bind(y, "[Init]"), v = t.VERSION;
      a.merge(l, r);
      if (f)
        return f;
      a.forEach(l, function (e, t) {
        if (t === "log")
          return;
        e && (v += "|" + t);
      }), m = u.build(y.setSensitiveItem, l.showKeys), h = x(t.INTERNAL_KEYS.VERSION), s = new n();
      if (h !== v) {
        h ? (p("Version changed from " + h + " to " + v), O()) : (p("Version not found"), O(!0)), i = !1;
        try {
          N(t.INTERNAL_KEYS.VERSION, v);
        } catch (g) {
          if (g.name !== "QuotaExceededError")
            throw g;
          p("Deactivating cache as storage is locked"), d = !0;
        }
      }
      return f = new Promise(w).then(S).then(c), f;
    }, y.isDeactivated = function () {
      return d;
    }, y.destroy = function (e) {
      !d && e && f && O(), f = null, v = {}, g = {};
    }, y.getAllKeys = function (e) {
      return new Promise(function (t) {
        if (d) {
          t([]);
          return;
        }
        c.then(function () {
          t(L(!1, e));
        });
      });
    }, y.setSensitiveItem = function (e, t, n) {
      function u() {
        function n(t) {
          var n = m.getHashByKey(e);
          N(n, JSON.stringify(t)), o("encrypted"), s.resolvePromise(), delete v[e];
        }
        o("encrypting", t), w(g[e]).then(n, function (e) {
          o("Encryption failed"), s.rejectPromise(e);
        });
      }
      function a() {
        o("Starting new writing operation with delay of " + n + "ms"), s.promise = new Promise(function (e, t) {
          s.resolvePromise = e, s.rejectPromise = t, s.timeout = i.setTimeout(function () {
            c.then(u);
          }, n);
        }), v[e] = s;
      }
      function f() {
        o("Resetting writing operation timeout"), i.clearTimeout(s.timeout), s.timeout = i.setTimeout(function () {
          c.then(u);
        }, n);
      }
      var s = v[e] || {}, o = b.bind(y, "[SetSensitiveItem: " + e + "]");
      return isNaN(n) && (n = r.cache.DEFAULT_BUFFER_TIMEOUT), g[e] = t, d ? new Promise(function (e) {
        o("Cache deactivated, resolving"), e();
      }) : (s.promise ? f() : a(), s.promise);
    }, y.setItem = function (e, t) {
      var n = b.bind(y, "[SetItem: " + e + "]");
      return new Promise(function (r, i) {
        c.then(function () {
          g[e] = t;
          if (d) {
            n("Cache deactivated, resolving"), r();
            return;
          }
          try {
            var s = m.getHashByKey(e);
            N(s, JSON.stringify(t)), n("stored"), r();
          } catch (o) {
            n("storage failed", o), i(o);
          }
        });
      });
    }, y.getSensitiveItem = function (e) {
      function r(t, r) {
        var i;
        n("Getting");
        if (d) {
          n("Cache deactivated, returning internal value", g[e]), t(g[e] || null);
          return;
        }
        if (typeof g[e] != "undefined") {
          n("Retrieved value already before, returning it", g[e]), t(g[e]);
          return;
        }
        var s = m.getHashByKey(e);
        i = x(s);
        if (!i) {
          n("No data found in storage"), t(null);
          return;
        }
        try {
          i = JSON.parse(i);
        } catch (o) {
          n("Parsing of stored data failed"), r(o);
        }
        E(i).then(function (r) {
          g[e] = r, n("Decrypted", r), t(r);
        }, function (e) {
          n("Decryption failed", e), r(e);
        });
      }
      var n = b.bind(y, "[GetSensitiveItem: " + e + "]");
      return new Promise(function (n, i) {
        e === t.INTERNAL_KEYS.KEYS_MAP ? r(n, i) : c.then(r.bind(null, n, i));
      });
    }, y.getSensitiveItems = function (e) {
      var t = s.build();
      return y.getAllKeys(e).then(function (e) {
        var n = e.reduce(function (e, t) {
          return e.concat(y.getSensitiveItem(t));
        }, []);
        Promise.all(n).then(t.resolve, t.reject);
      }).catch(t.reject), t;
    }, y.getItem = function (e) {
      function n(n, r) {
        var i;
        t("Getting");
        if (d) {
          t("Cache deactivated, returning internal value", g[e]), n(g[e] || null);
          return;
        }
        if (typeof g[e] != "undefined") {
          t("Retrieved value already before, returning it", g[e]), n(g[e]);
          return;
        }
        var s = m.getHashByKey(e);
        i = x(s);
        if (!i) {
          t("No data found in storage"), n(null);
          return;
        }
        try {
          i = JSON.parse(i), t("Found", i), n(i);
        } catch (o) {
          t("Parsing of stored data failed"), r(o);
        }
      }
      var t = b.bind(y, "[GetItem: " + e + "]");
      return new Promise(function (e, t) {
        c.then(n.bind(null, e, t));
      });
    }, y.removeItem = function (e) {
      var t = b.bind(y, "[RemoveItem: " + e + "]");
      return new Promise(function (n) {
        c.then(function () {
          delete g[e], d || (T(m.getHashByKey(e)), m.removeKeyFromMap(e), typeof v[e] != "undefined" && (t("Item is removed prior encryption timeout finished. Cancelling encryption."), i.clearTimeout(v[e].timeout), v[e].rejectPromise(), delete v[e])), t("Removed"), n();
        });
      });
    };
  }
  var t = e("constants/common").cache, n = e("services/serviceLocator"), r = e("constants/common"), i = e("browser/window"), s = e("utils/common/settablePromise"), o = e("utils/common/encryption"), u = e("utils/common/cache/keyHasher"), a = e("lodash-compat"), f = "[CacheProvider]";
  return l;
})
