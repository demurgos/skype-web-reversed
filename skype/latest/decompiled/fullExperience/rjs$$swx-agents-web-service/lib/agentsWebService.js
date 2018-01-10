(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-agents-web-service/lib/agentsWebService", [
      "require",
      "exports",
      "lodash-compat",
      "swx-xhr-dispatcher"
    ], e);
}(function (e, t) {
  function i(e, t) {
    function s(n) {
      return e().then(function (e) {
        var r = {
          headers: {
            "X-SkypeToken": e,
            "X-Client-Version": t.clientVersion,
            "X-Host-System-Version": t.hostSystemVersion,
            "X-Client-UI-Language": t.clientUILanguage
          },
          reporting: { serviceName: "agents-" + n },
          params: {}
        };
        return r;
      });
    }
    function o(e) {
      return s("add").then(function (t) {
        return i.put("relationship/me/" + e, t);
      });
    }
    function u(e) {
      return s("search").then(function (r) {
        if (!e || !e.agentId)
          r.params.clientCountry = t.countryCode;
        return i.get("agents", n.merge(r, { params: e }));
      });
    }
    var i = r.build(t);
    return {
      add: o,
      search: u
    };
  }
  var n = e("lodash-compat"), r = e("swx-xhr-dispatcher");
  t.build = i;
}));
