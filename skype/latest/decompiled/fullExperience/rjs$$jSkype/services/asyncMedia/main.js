define("jSkype/services/asyncMedia/main", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "reqwest",
  "jSkype/settings"
], function (e, t) {
  function d(e, i, s, u, a, f) {
    function p(t) {
      var n = t.scan && t.scan.status !== "in progress" && t.scan.status !== "ready", r = t.view_state === "ready" && !t.scan, c = t.view_state === "ready" && t.scan && t.scan.status === "passed";
      t.status_location && !t.view_state ? (e = t.status_location.replace("/views/" + i + "/status", ""), d(e, i, s, u, a, f)) : r || c ? a(l) : t.view_state === "failed" || n ? f() : t.content_state !== "expired" ? d(e, i, o, u, a, f) : f();
    }
    function v(r) {
      r.status === 401 || r.status === 403 ? (u--, n.get().signInManager._skypeToken().then(function (n) {
        t.authenticate(n).then(d.bind(null, e, i, s, u, a, f));
      })) : f();
    }
    var l = e + "/views/" + i, c = l + "/status", h = {
        url: c,
        dataType: "json",
        crossOrigin: !0,
        withCredentials: !0
      };
    if (u === 0) {
      f();
      return;
    }
    setTimeout(function () {
      r.compat(h).then(p, v);
    }, s);
  }
  function v(e, t, n) {
    var s, o = n.isImage(), u = {}, a = y(n);
    return u[e] = ["read"], s = {
      type: a.type,
      permissions: u
    }, o || (s.filename = n.name), r.compat({
      method: "post",
      dataType: "json",
      url: i.settings.amdServiceHost + "/v1/objects",
      data: JSON.stringify(s),
      headers: { Authorization: "skype_token " + t },
      contentType: "application/json",
      crossOrigin: !0,
      withCredentials: !0
    });
  }
  function m() {
    return {
      type: "pish/image",
      thumbnail: a,
      content: l,
      original: f
    };
  }
  function g() {
    return {
      type: "sharing/file",
      thumbnail: h,
      content: c,
      original: c
    };
  }
  function y(e) {
    return e.isImage() ? m() : g();
  }
  function b(e, t, n, r, s, o, u) {
    function c(e) {
      o(e, f);
    }
    var a = i.settings.amdServiceHost + "/v1/objects/" + e, f = new XMLHttpRequest(), l = y(t);
    f.upload.addEventListener("progress", c);
    f.open("PUT", a + "/content/" + l.content, !0);
    f.setRequestHeader("Authorization", "skype_token " + n);
    f.setRequestHeader("Content-Type", "multipart/form-data");
    f.send(t);
    f.onreadystatechange = function () {
      f.readyState === 4 && (f.status === 201 ? E(t, a, function () {
        u(a + "/views/" + l.thumbnail);
        r(e);
      }, function () {
        s("Unsupported Media Type");
      }) : s("Can't upload file"));
    };
  }
  function w(e, t, n, s) {
    var o = i.settings.amdServiceHost + "/v1/objects/" + e, u = {
        url: o,
        method: "DELETE",
        crossOrigin: !0,
        dataType: "json",
        headers: { Authorization: "skype_token " + t }
      };
    r.compat(u).then(n, s);
  }
  function E(e, t, n, r) {
    d(t, y(e).thumbnail, s, u, n, r);
  }
  var n = e("jSkype/client"), r = e("reqwest"), i = e("jSkype/settings"), s = 0, o = 500, u = 3, a = "imgt1", f = "imgpsh_fullsize", l = "imgpsh", c = "original", h = "thumbnail", p = "video";
  t.getThumbnailStatus = function (e, t, n) {
    d(e, a, s, u, t, n);
  };
  t.getPictureStatus = function (e, t, n) {
    d(e, f, s, u, t, n);
  };
  t.getVideoStatus = function (e, t, n) {
    d(e, p, s, u, t, n);
  };
  t.authenticate = function (e) {
    var t;
    return t = {
      method: "post",
      dataType: "json",
      url: i.settings.amdServiceHost + "/v1/skypetokenauth",
      data: "skypetoken=" + e,
      contentType: "application/x-www-form-urlencoded",
      crossOrigin: !0,
      withCredentials: !0
    }, r.compat(t);
  };
  t.sendFile = function (e, t, r, i, s, o) {
    n.get().signInManager._skypeToken().then(function (n) {
      v(e, n, t).then(function (e) {
        b(e.id, t, n, r, i, s, o);
      }, function () {
        i("Can't retrieve documentId");
      });
    }, function () {
      i("Can't retrieve Skype token");
    });
  };
  t.deleteFile = function (e, t, r) {
    n.get().signInManager._skypeToken().then(function (n) {
      w(e, n, t, r);
    }, function () {
      r("Can't retrieve Skype token");
    });
  };
});
