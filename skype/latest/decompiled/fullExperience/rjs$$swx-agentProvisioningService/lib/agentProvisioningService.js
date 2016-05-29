(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-agentProvisioningService/lib/agentProvisioningService", [
      "require",
      "exports",
      "reqwest",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function i(e, t) {
    function i(r) {
      var i = e().then(function (e) {
        var i = {
          url: t.host + "relationship/me/" + r,
          type: "PUT",
          crossOrigin: !0,
          headers: { "X-SkypeToken": e }
        };
        return n.compat(i);
      });
      return Promise.resolve(i);
    }
    function s(i) {
      var s = e().then(function (e) {
        var s = t.host + "agents", o = r.reduce(r.keys(i), function (e, t) {
            return e.concat([
              t,
              i[t]
            ].join("="));
          }, []).join("&"), u = {
            url: s + (o ? "?" + o : ""),
            type: "GET",
            crossOrigin: !0,
            headers: { "X-SkypeToken": e }
          };
        return n.compat(u);
      });
      return Promise.resolve(s);
    }
    return {
      add: i,
      search: s
    };
  }
  var n = e("reqwest"), r = e("lodash-compat");
  t.build = i;
}));
