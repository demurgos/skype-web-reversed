define("utils/common/signInNotificationHandler", [
  "require",
  "exports",
  "module",
  "constants/common",
  "experience/settings",
  "ui/telemetry/actions/actionNames",
  "browser/window",
  "browser/document",
  "notifications/common/notification",
  "services/serviceLocator",
  "notifications/common/notificationHub"
], function (e, t) {
  function l(e, t, n) {
    function l() {
      var e = r.loginPopup, t = e.redirectUrl + "?origin=" + o.location.origin;
      return e.loginUrl + "?response_type=token" + "&client_id=" + s.encodeURIComponent(e.clientId) + "&redirect_uri=" + s.encodeURIComponent(t) + "&resource=" + s.encodeURIComponent(e.resourceUrl);
    }
    function c(e, t) {
      e = e || r.loginPopup.defaultWidth;
      t = t || r.loginPopup.defaultHeight;
      var n = s.screenLeft !== undefined ? s.screenLeft : screen.left, i = s.screenTop !== undefined ? s.screenTop : screen.top, u = s.innerWidth ? s.innerWidth : o.documentElement.clientWidth ? o.documentElement.clientWidth : screen.width, a = s.innerHeight ? s.innerHeight : o.documentElement.clientHeight ? o.documentElement.clientHeight : screen.height, f = u / 2 - e / 2 + n, l = a / 2 - t / 2 + i;
      return "scrollbars=1,status=0,menubar=0,toolbar=0,resizable=1,width=" + e + ",height=" + t + ",left=" + f + ",top=" + l;
    }
    function p() {
      var e = s.open(u.url, u.name, u.props);
      if (!e) {
        e = s.open(u.url, u.name);
        if (!e)
          throw new Error("Creating external sign in page has failed");
      }
      return e;
    }
    var u = this, a = null, f = null;
    u.url = e || l();
    u.name = t || "O365_ExternalSignInWindow";
    u.props = n || c();
    u.open = function (e) {
      if (!e)
        throw new Error("\"callback\" parameter is required");
      if (f === null || f.closed || !f.focus)
        try {
          f = p();
        } catch (t) {
          return;
        }
      else
        f.focus();
      h(i.externalSignIn.openSignInWindow);
      a && s.clearInterval(a);
      a = s.setInterval(function () {
        f.closed && (e(), s.clearInterval(a), a = null);
      }, 100);
    };
  }
  function c() {
    function c() {
      return r.initParams && !!r.initParams.resigninAllowed;
    }
    var e = this, t = r.splashScreen.signInNotificationEnabled, s = new u(n.notifications.SIGN_IN_REQUEST), o = new l(), a = !1;
    e.isEnabled = function () {
      return t && c();
    };
    e.setSignInPopup = function (e) {
      a = e;
    };
    e.notify = function () {
      function t(e) {
        h(e);
        f.notify(s);
      }
      if (!e.isEnabled())
        return;
      if (a)
        try {
          o.open(t.bind(null, i.externalSignIn.signInRequestAfterTokenRefresh));
        } catch (n) {
        }
      else
        t(i.externalSignIn.signInRequest);
    };
  }
  function h(e) {
    var t = a.resolve(n.serviceLocator.ACTION_TELEMETRY);
    t.recordAction(e);
  }
  var n = e("constants/common"), r = e("experience/settings"), i = e("ui/telemetry/actions/actionNames"), s = e("browser/window"), o = e("browser/document"), u = e("notifications/common/notification"), a = e("services/serviceLocator"), f = e("notifications/common/notificationHub");
  t.build = function () {
    return new c();
  };
});
