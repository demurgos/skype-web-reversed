(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-skypeuri-parser/lib/skypeUriParser", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function s(e) {
    if (!o(e))
      return;
    var t = a(e), s = t.queryString.split("&"), u = s[0], f = c(s), p, d = l(u);
    return n.has(r, t.queryString) && (p = r[t.queryString], d = i.Navigate), {
      activityType: d,
      participants: t.resourceIdentifiers,
      navigationId: p,
      activityParameters: h(d, f)
    };
  }
  function o(e) {
    return /^skype:\??([a-zA-Z0-9;:_\-\+]){1,}\??[a-zA-Z0-9=?&]*$/i.test(e);
  }
  function u(e) {
    return /skype:\??(\S+;?){1,}\??.*/i.test(e);
  }
  function a(e) {
    var t = f(e, ":"), n = t[0], r = f(t[1], "?"), i = r[0], s = i.split(";").filter(function (e) {
        return e !== "";
      }), o = r[1] || "";
    return {
      scheme: n,
      resourceIdentifiers: s,
      queryString: o
    };
  }
  function f(e, t) {
    var n = e.indexOf(t);
    return n > -1 ? [
      e.substr(0, n),
      e.substr(n + 1)
    ] : [e];
  }
  function l(e) {
    switch (e) {
    case "chat":
      return i.Chat;
    default:
      return i.Call;
    }
  }
  function c(e) {
    return e.reduce(function (e, t) {
      var n = t.split("="), r = n[0], i = n[1];
      return e[r] = i, e;
    }, {});
  }
  function h(e, t) {
    switch (e) {
    case i.Call:
      return p(t);
    case i.Chat:
      return d(t);
    default:
      return null;
    }
  }
  function p(e) {
    var t = e.video, n = e.token, r = e.topic, i = e.origin;
    return {
      video: t === "true",
      token: n,
      topic: r,
      origin: i
    };
  }
  function d(e) {
    var t = e.topic;
    return { topic: t };
  }
  var n = e("lodash-compat"), r = { discoverbots: "swx-discover-agents" }, i;
  (function (e) {
    e[e.Call = 0] = "Call";
    e[e.Chat = 1] = "Chat";
    e[e.Navigate = 2] = "Navigate";
    e[e.Unknown = 3] = "Unknown";
  }(i = t.ActivityType || (t.ActivityType = {})));
  t.parse = s;
  t.isValidSkypeUri = o;
  t.containsSkypeUri = u;
}));
