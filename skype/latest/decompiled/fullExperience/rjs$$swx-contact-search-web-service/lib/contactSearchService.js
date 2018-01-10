(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-contact-search-web-service/lib/contactSearchService", [
      "require",
      "exports",
      "lodash-compat",
      "swx-xhr-dispatcher",
      "swx-utils-common"
    ], e);
}(function (e, t) {
  function s(e, t) {
    function a(r) {
      return e().then(function (e) {
        var u = [
            t.appName,
            t.appVersion,
            i.guid.create()
          ].join("-"), a = {
            headers: { "X-SkypeToken": e },
            reporting: { serviceName: "contactSearch" }
          }, f = "?requestid=" + u + "&searchstring=" + encodeURIComponent(r) + "&locale=" + t.locale;
        t.includeLync && (f += "&includeLync=true");
        if (o) {
          var l = n.cloneDeep(a);
          l.reporting.serviceName = "contactSearchMirror";
          o.get(f, l);
        }
        return s.get(f, a);
      });
    }
    var s = r.build(t), o;
    if (t.mirroringHost) {
      var u = n.clone(t);
      u.host = u.mirroringHost;
      o = r.build(u);
    }
    return { searchDirectory: a };
  }
  var n = e("lodash-compat"), r = e("swx-xhr-dispatcher"), i = e("swx-utils-common");
  t.build = s;
}));
