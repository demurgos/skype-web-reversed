(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("ecs-client/lib/ecsClient", [
      "require",
      "exports",
      "swx-browser-globals",
      "./httpRequest",
      "./jsonp"
    ], e);
}(function (e, t) {
  function s(e, t, s) {
    function x() {
      var t = [], n = e.queryParams || {};
      return e.userId && t.push("id=" + encodeURIComponent(e.userId)), e.clientId && t.push("clientId=" + encodeURIComponent(e.clientId)), Object.keys(n).sort().forEach(function (e) {
        t.push([
          encodeURIComponent(e),
          encodeURIComponent(n[e])
        ].join("="));
      }), t.length === 0 ? "" : "?" + t.join("&");
    }
    function T() {
      function n() {
        if (typeof t != "function")
          throw new Error("success callback is required and must be a function");
        if (s && typeof s != "function")
          throw new Error("failure callback must be a function if provided");
      }
      function r() {
        function t(e) {
          return e instanceof Array && e.length !== 0 && e.every(function (e) {
            return e && typeof e == "string";
          });
        }
        function n(e) {
          return typeof e == "object" && e && Object.keys(e).length;
        }
        function r(e) {
          return e && typeof e == "string";
        }
        function i(e) {
          return e && typeof e == "object";
        }
        function s(e) {
          return e === void 0;
        }
        function o() {
          switch (e.endpoints) {
          case "int":
            return;
          case "prod":
            return;
          default:
            if (!t(e.endpoints))
              throw new Error("options.endpoints must be \"int\", \"prod\", or an array of endpoint URIs");
          }
        }
        function u(t) {
          t.forEach(function (t) {
            var n = e[t.name];
            if (!s(n) && (typeof n != "number" || n < t.min || n > t.max || n !== (n | 0)))
              throw new Error("if defined, options." + t.name + " must be an integer between " + t.min + " and " + t.max + ", inclusive");
          });
        }
        function a(t) {
          t.forEach(function (t) {
            var n = e[t];
            if (n !== void 0 && !r(n))
              throw new Error("if defined, options." + t + " must be a non-empty string");
          });
        }
        function f() {
          var t = e.queryParams;
          if (!s(t) && (!n(t) || Object.keys(t).some(function (e) {
              switch (e) {
              case "id":
              case "clientId":
              case "fingerprint":
                throw new Error("id, clientId, and fingerprint are forbidden as queryParams. Use the userId and clientId options instead");
              default:
                return !r(t[e]);
              }
            })))
            throw new Error("if defined, options.queryParams must be a non-empty object with only non-empty string properties");
        }
        function l(t) {
          t.forEach(function (t) {
            if (!r(e[t]))
              throw new Error("options." + t + " must be a non-empty string");
          });
        }
        function c() {
          switch (e.requestType) {
          case void 0:
            return;
          case "jsonp":
            return;
          case "xhr":
            return;
          default:
            throw new Error("if defined, options.requestType must be either \"jsonp\" or \"xhr\"");
          }
        }
        function h() {
          if (!s(e.requestTypeOptions) && !i(e.requestTypeOptions))
            throw new Error("If defined, options.requestTypeOptions must be a non-null object");
        }
        if (typeof e != "object" || !e)
          throw new Error("options must be a non-null object");
        l([
          "clientName",
          "clientVersion"
        ]);
        a([
          "teamName",
          "userId",
          "clientId",
          "localStoragePrefix"
        ]);
        u([
          {
            max: 10,
            min: 1,
            name: "retryAttempts"
          },
          {
            max: 120000,
            min: 1,
            name: "requestTimeout"
          }
        ]);
        o();
        f();
        c();
        h();
      }
      n();
      r();
    }
    function N(e) {
      var t = new Error(e);
      if (!s)
        throw t;
      s(t);
    }
    function C(t) {
      b++;
      var n;
      switch (h) {
      case "jsonp":
        n = i.request;
        break;
      case "xhr":
        n = r.get;
        break;
      default:
        throw new Error("unknown request type " + h);
      }
      n(t, f, O, A, e.requestTypeOptions || {});
    }
    function A(e, t) {
      if (b / d.length < a && !t) {
        if (b % d.length === 0 && !L) {
          k = !0;
          return;
        }
        b % d.length === 0 && (L = !1, k = !1, S = setTimeout(M, l * Math.pow(l, b / d.length)));
        C(d[++y % d.length]);
      } else
        B() || N("Configuration service is unreachable and no valid cached config is available: " + e.message);
    }
    function O(n) {
      clearTimeout(S);
      k = !1;
      if (w)
        return;
      var r = _(n);
      r && (w = !0, H(r), e.teamName ? t(r[e.teamName] || {}) : t(r));
    }
    function M() {
      clearTimeout(S);
      k && !w ? (k = !1, L = !1, S = setTimeout(M, l * Math.pow(c, b / d.length)), C(d[++y % d.length])) : L = !0;
    }
    function _(e) {
      if (typeof e == "object")
        return e;
      try {
        return JSON.parse(e);
      } catch (t) {
        B() || N("Malformed response and no valid cached config for team is available");
      }
    }
    function D() {
      switch (e.endpoints) {
      case "int":
        return [
          "https://a.config.skype.net",
          "https://b.config.skype.net"
        ];
      case "prod":
        return [
          "https://a.config.skype.com",
          "https://b.config.skype.com"
        ];
      default:
        return e.endpoints;
      }
    }
    function P() {
      if (E === void 0) {
        E = !1;
        try {
          if (m && g && g.localStorage) {
            var e = g.localStorage.getItem(m) || "{}";
            g.localStorage.setItem(m, e);
            E = !0;
          }
        } catch (t) {
        }
      }
      return E;
    }
    function H(e) {
      P() && g.localStorage.setItem(m, JSON.stringify(e));
    }
    function B() {
      if (!P())
        return !1;
      var n;
      try {
        n = JSON.parse(g.localStorage.getItem(m));
      } catch (r) {
        return !1;
      }
      return n ? (e.teamName ? t(n[e.teamName] || {}) : t(n), !0) : !1;
    }
    T();
    var o = D(), u = x(), a = e.retryAttempts || 3, f = e.requestTimeout || 7500, l = 500, c = 1.2, h = e.requestType || "xhr", p = encodeURIComponent(e.clientName) + "/" + encodeURIComponent(e.clientVersion) + u, d = o.map(function (e) {
        return encodeURI(e) + "/config/v1/" + p;
      }), v = e.endpoints === "prod" ? "" : e.endpoints === "int" ? "int|" : "custom|", m = e.localStoragePrefix ? e.localStoragePrefix + "|" + v + p : "", g = n.getWindow(), y = Math.floor(Math.random() * d.length), b = 0, w = !1, E;
    C(d[y]);
    var S = setTimeout(M, l), k, L;
  }
  var n = e("swx-browser-globals"), r = e("./httpRequest"), i = e("./jsonp");
  t.fetchConfig = s;
}));
