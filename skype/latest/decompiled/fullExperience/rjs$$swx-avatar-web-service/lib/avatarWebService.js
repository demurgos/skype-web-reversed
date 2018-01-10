(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-avatar-web-service/lib/avatarWebService", [
      "require",
      "exports",
      "lodash-compat",
      "swx-utils-common",
      "swx-xhr-dispatcher"
    ], e);
}(function (e, t) {
  function s(e, t) {
    function o(n) {
      return e().then(function (e) {
        return {
          headers: {
            "X-Skypetoken": e,
            "X-Skype-Caller": t.appName,
            "X-Skype-Request-Id": r.guid.create().substring(0, 8)
          },
          reporting: { serviceName: n }
        };
      });
    }
    function u(e, t, r) {
      return o("updateAvatarV1").then(function (i) {
        var o = "avatars/" + encodeURIComponent(e), u = n.merge(i, {
            contentType: r,
            payload: t,
            processData: !1
          });
        return s.put(o, u);
      });
    }
    function a(e) {
      return o("deleteAvatarV1").then(function (t) {
        var n = "avatars/" + encodeURIComponent(e);
        return s.remove(n, t);
      });
    }
    var s = i.build(t);
    return {
      updateAvatar: u,
      deleteAvatar: a
    };
  }
  var n = e("lodash-compat"), r = e("swx-utils-common"), i = e("swx-xhr-dispatcher");
  t.build = s;
}));
