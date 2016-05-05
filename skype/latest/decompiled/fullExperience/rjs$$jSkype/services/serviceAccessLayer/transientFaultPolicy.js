define("jSkype/services/serviceAccessLayer/transientFaultPolicy", [], function () {
  function t(e) {
    return e.status === 0;
  }
  function n(e) {
    return e instanceof XMLHttpRequest;
  }
  function r(e, t) {
    return t.test(e.status);
  }
  var e = {
    success: /^(2)\d{2}/,
    redirection: /^(3)\d{2}/,
    serverError: /^(5)\d{2}/
  };
  return {
    isWebApiSuccess: function (t) {
      return n(t) ? r(t, e.success) || r(t, e.redirection) : !1;
    },
    isTransientFailure: function (i) {
      return n(i) ? t(i) || r(i, e.serverError) : !1;
    }
  };
})
