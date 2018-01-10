(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-invite-web-service/lib/inviteWebService", [
      "require",
      "exports",
      "swx-xhr-dispatcher"
    ], e);
}(function (e, t) {
  function r(e, t) {
    function i(i) {
      return e().then(function (e) {
        var s = {
          headers: {
            "X-SkypeToken": e,
            Version: "1.0",
            "X-Skype-Caller": t.skypeCaller
          },
          contentType: n.contentTypes.JSON_V1_0,
          payload: JSON.stringify({ Id: i }),
          reporting: { serviceName: "invite" }
        };
        return r.post("/contact/add", s);
      });
    }
    var r = n.build(t);
    return { autoBuddy: i };
  }
  var n = e("swx-xhr-dispatcher");
  t.build = r;
}));
