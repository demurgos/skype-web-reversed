(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("green-id/lib/greenId", [
      "require",
      "exports",
      "swx-browser-globals",
      "reqwest",
      "swx-utils-common",
      "msr-crypto"
    ], e);
}(function (e, t) {
  function o(e, t) {
    var n = s.aes.utilities.stringToBytes(e), r = s.aes.sha512.computeHash(n), i = s.aes.utilities.bytesToHexString(r);
    return u(t.registerUrl, e).then(function () {
    })["catch"](function () {
    }), a(e, i, t);
  }
  function u(e, t, n) {
    var s = {
      method: "POST",
      url: i.url.buildUrl(e, n ? { location: n } : {}),
      headers: { "X-Skypetoken": t },
      crossOrigin: !0
    };
    return r.compat(s);
  }
  function a(e, t, r) {
    return new Promise(function (s, o) {
      function p(t) {
        c && t.origin === r.iframeUrl && (f.removeEventListener("message", p), l = u(r.registerUrl, e, t.data), l.then(s)["catch"](o).always(d));
      }
      function d() {
        h && (f.clearTimeout(h), h = null);
        f.removeEventListener("message", p);
        c && (a.body.removeChild(c), c = null);
        l && (l.abort(), l = null);
      }
      var a = n.getDocument(), f = n.getWindow(), l = null, c = null, h = null;
      h = f.setTimeout(r.timeout, function () {
        d();
        o(new Error("timeout"));
      });
      c = a.createElement("iframe");
      c.style.cssText = "display: none";
      a.body.appendChild(c);
      f.addEventListener("message", p);
      c.src = i.url.buildUrl(r.iframeUrl, "tags", { session_id: t });
    });
  }
  var n = e("swx-browser-globals"), r = e("reqwest"), i = e("swx-utils-common"), s = e("msr-crypto");
  t.registerGreenId = o;
}));
