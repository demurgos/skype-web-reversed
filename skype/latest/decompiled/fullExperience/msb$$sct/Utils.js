module.exports = function () {
  function t() {
  }
  return t.IsSafari = function () {
    if (t._isSafari === null)
      if (typeof navigator != "undefined" && navigator.userAgent) {
        var e = navigator.userAgent.toLowerCase();
        e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 ? t._isSafari = !0 : t._isSafari = !1;
      } else
        t._isSafari = !1;
    return t._isSafari;
  }, t.IsReactNative = function () {
    return t._isReactNative === null && (typeof navigator != "undefined" && navigator.product ? t._isReactNative = navigator.product === "ReactNative" : t._isReactNative = !1), t._isReactNative;
  }, t.IsUint8ArrSupported = function () {
    return !e.Utils.IsSafari() && typeof Uint8Array != "undefined" && !e.Utils.IsReactNative();
  }, t.ajax = function (e, n) {
    var r = t._createConnection();
    if (e.headers) {
      var i = "qsp=true";
      for (var s in e.headers)
        i += "&", i += encodeURIComponent(s), i += "=", i += encodeURIComponent(e.headers[s]);
      e.url.indexOf("?") < 0 ? e.url += "?" : e.url += "&";
      e.url += i;
    }
    r.open(e.type, e.url, !n);
    e.complete && (r.onload = function () {
      typeof r.status == "undefined" && (r.status = 200);
      e.complete(r);
    }, r.ontimeout = function () {
      typeof r.status == "undefined" && (r.status = 500);
      e.complete(r);
    }, r.onerror = function () {
      e.complete(r);
    });
    r.send(e.data);
  }, t.keys = function (e) {
    if (Object.keys)
      return Object.keys(e);
    var t = [];
    for (var n in e)
      e.hasOwnProperty(n) && t.push(n);
    return t;
  }, t.IsUsingXDomainRequest = function () {
    if (t._usingXDomainRequest == null) {
      var e = new XMLHttpRequest();
      typeof e.withCredentials == "undefined" && typeof XDomainRequest != "undefined" ? t._usingXDomainRequest = !0 : t._usingXDomainRequest = !1;
    }
    return t._usingXDomainRequest;
  }, t._createConnection = function () {
    var e = new XMLHttpRequest();
    return t.IsUsingXDomainRequest() ? new XDomainRequest() : e;
  }, t._isSafari = null, t._isReactNative = null, t._usingXDomainRequest = null, t;
}()
