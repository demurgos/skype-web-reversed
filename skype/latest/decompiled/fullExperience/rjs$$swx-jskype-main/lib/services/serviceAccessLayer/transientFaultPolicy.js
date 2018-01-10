(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/serviceAccessLayer/transientFaultPolicy", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function r(e) {
    return e.status === 0;
  }
  function i(e) {
    return e instanceof XMLHttpRequest;
  }
  function s(e, t) {
    return t.test(e.status);
  }
  function o(e) {
    return i(e) ? s(e, n.success) || s(e, n.redirection) : !1;
  }
  function u(e) {
    return i(e) ? r(e) || s(e, n.serverError) : !1;
  }
  var n = {
    success: /^(2)\d{2}/,
    redirection: /^(3)\d{2}/,
    serverError: /^(5)\d{2}/
  };
  t.isWebApiSuccess = o;
  t.isTransientFailure = u;
}));
