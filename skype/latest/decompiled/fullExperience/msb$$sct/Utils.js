module.exports = function () {
  function e() {
  }
  return e.IsSafari = function () {
    return e._isSafari === null && e._DetectBrowser(), e._isSafari;
  }, e.ajax = function (t) {
    var n = e._createConnection();
    if (t.headers) {
      var r = "qsp=true";
      for (var i in t.headers)
        r += "&", r += encodeURIComponent(i), r += "=", r += encodeURIComponent(t.headers[i]);
      t.url.indexOf("?") < 0 ? t.url += "?" : t.url += "&";
      t.url += r;
    }
    n.open(t.type, t.url);
    t.complete && (n.onload = function () {
      typeof n.status == "undefined" && (n.status = 200);
      t.complete(n);
    }, n.ontimeout = function () {
      typeof n.status == "undefined" && (n.status = 500);
      t.complete(n);
    }, n.onerror = function () {
      t.complete(n);
    });
    n.send(t.data);
  }, e.keys = function (e) {
    if (Object.keys)
      return Object.keys(e);
    var t = [];
    for (var n in e)
      e.hasOwnProperty(n) && t.push(n);
    return t;
  }, e.IsUsingXDomainRequest = function () {
    if (e._usingXDomainRequest == null) {
      var t = new XMLHttpRequest();
      typeof t.withCredentials == "undefined" && typeof XDomainRequest != "undefined" ? e._usingXDomainRequest = !0 : e._usingXDomainRequest = !1;
    }
    return e._usingXDomainRequest;
  }, e._createConnection = function () {
    var t = new XMLHttpRequest();
    return e.IsUsingXDomainRequest() ? new XDomainRequest() : t;
  }, e._DetectBrowser = function () {
    var t = navigator.userAgent.toLowerCase();
    t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 ? e._isSafari = !0 : e._isSafari = !1;
  }, e._isSafari = null, e._usingXDomainRequest = null, e;
}()
