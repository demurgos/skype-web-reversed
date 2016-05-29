define("experience/api/auth/authEventHandler", [
  "require",
  "exports",
  "module",
  "constants/common",
  "services/pubSub/pubSub"
], function (e, t) {
  function s(e) {
    return e && e.name === n.api.auth.errorTypes.NOT_LINKED;
  }
  function o(e) {
    r.publish(n.events.auth.SIGNIN_FAILED, e);
  }
  function u() {
    i = !0;
    r.unsubscribe(n.apiUIEvents.SWX_SPLASHSCREEN_LOADED, u);
  }
  var n = e("constants/common"), r = e("services/pubSub/pubSub"), i;
  t.init = function () {
    r.subscribe(n.apiUIEvents.SWX_SPLASHSCREEN_LOADED, u);
  };
  t.destroy = function () {
    r.unsubscribe(n.apiUIEvents.SWX_SPLASHSCREEN_LOADED, u);
  };
  t.deferActionOnSplashscreen = function (e, t) {
    function s() {
      typeof e == "function" && e(t);
    }
    i ? (s(), r.unsubscribe(n.apiUIEvents.SWX_SPLASHSCREEN_LOADED, s)) : r.subscribe(n.apiUIEvents.SWX_SPLASHSCREEN_LOADED, s);
  };
  t.setErrorType = function (e) {
    e.message === n.silentLogin.errorMessages.NOT_LINKED && (e.name = n.api.auth.errorTypes.NOT_LINKED, e.reason = n.api.auth.errorMessages.NOT_LINKED);
  };
  t.startAuthFailedFlow = function (e, n, r) {
    if (!s(e)) {
      t.deferActionOnSplashscreen(o, e);
      return;
    }
    r ? n() : t.deferActionOnSplashscreen(n);
  };
});
