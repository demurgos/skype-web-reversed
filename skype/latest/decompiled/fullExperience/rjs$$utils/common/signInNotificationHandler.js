define("utils/common/signInNotificationHandler", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "experience/settings",
  "lodash-compat",
  "ui/telemetry/actions/actionNames",
  "browser/window",
  "browser/document",
  "notifications/common/notification",
  "swx-service-locator-instance",
  "notifications/common/notificationHub",
  "swx-utils-common"
], function (e, t) {
  function h(e, t, n) {
    function l() {
      var e = r.loginPopup, t = e.redirectUrl + "?origin=" + u.location.origin;
      return e.loginUrl + "?response_type=token" + "&client_id=" + o.encodeURIComponent(e.clientId) + "&redirect_uri=" + o.encodeURIComponent(t) + "&resource=" + o.encodeURIComponent(e.resourceUrl);
    }
    function c(e, t) {
      e = e || r.loginPopup.defaultWidth;
      t = t || r.loginPopup.defaultHeight;
      var n = o.screenLeft !== undefined ? o.screenLeft : screen.left, i = o.screenTop !== undefined ? o.screenTop : screen.top, s = o.innerWidth ? o.innerWidth : u.documentElement.clientWidth ? u.documentElement.clientWidth : screen.width, a = o.innerHeight ? o.innerHeight : u.documentElement.clientHeight ? u.documentElement.clientHeight : screen.height, f = s / 2 - e / 2 + n, l = a / 2 - t / 2 + i;
      return "scrollbars=1,status=0,menubar=0,toolbar=0,resizable=1,width=" + e + ",height=" + t + ",left=" + f + ",top=" + l;
    }
    function h() {
      var e = o.open(i.url, i.name, i.props);
      if (!e) {
        e = o.open(i.url, i.name);
        if (!e)
          throw new Error("Creating external sign in page has failed");
      }
      return e;
    }
    var i = this, a = null, f = null;
    i.url = e || l();
    i.name = t || "O365_ExternalSignInWindow";
    i.props = n || c();
    i.open = function (e) {
      if (!e)
        throw new Error("\"callback\" parameter is required");
      if (f === null || f.closed || !f.focus)
        try {
          f = h();
        } catch (t) {
          return;
        }
      else
        f.focus();
      d(s.externalSignIn.openSignInWindow);
      a && o.clearInterval(a);
      a = o.setInterval(function () {
        f.closed && (e(), o.clearInterval(a), a = null);
      }, 100);
    };
  }
  function p() {
    function p() {
      return r.initParams && !!r.initParams.resigninAllowed;
    }
    var e = this, t = r.splashScreen.signInNotificationEnabled, o = new a(n.notifications.SIGN_IN_REQUEST), u = new h(), f = !1;
    e.isEnabled = function () {
      return t && p();
    };
    e.isSignInPopupEnabled = function () {
      return f;
    };
    e.setSignInPopup = function (e) {
      f = e;
    };
    e.notify = function (t) {
      function r(e) {
        i.isFunction(t) && t();
        d(e);
        l.notify(o);
      }
      if (!e.isEnabled())
        return;
      if (f)
        try {
          u.open(function () {
            r(s.externalSignIn.signInRequestAfterTokenRefresh);
            c.set(n.storageKeys.AAD_TOKEN_EXPIRED, !0);
          });
        } catch (a) {
        }
      else
        r(s.externalSignIn.signInRequest);
    };
  }
  function d(e) {
    var t = f.resolve(n.serviceLocator.ACTION_TELEMETRY);
    t.recordAction(e);
  }
  var n = e("swx-constants").COMMON, r = e("experience/settings"), i = e("lodash-compat"), s = e("ui/telemetry/actions/actionNames"), o = e("browser/window"), u = e("browser/document"), a = e("notifications/common/notification"), f = e("swx-service-locator-instance").default, l = e("notifications/common/notificationHub"), c = e("swx-utils-common").sessionStorage;
  t.build = function () {
    return new p();
  };
});
