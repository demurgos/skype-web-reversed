define("ui/viewModels/experience/splashScreen", [
  "require",
  "vendor/knockout",
  "cafe/applicationInstance",
  "utils/common/accessibility",
  "services/serviceLocator",
  "constants/common",
  "swx-enums",
  "ui/telemetry/actions/actionNames",
  "text!views/experience/splashScreen.html",
  "experience/api/authentication",
  "experience/authContext",
  "experience/settings",
  "browser/detect",
  "browser/window",
  "browser/document",
  "lodash-compat",
  "swx-i18n",
  "telemetry/chat/splashScreenEvent",
  "utils/common/feedback",
  "utils/common/signInNotificationHandler"
], function (e) {
  function w() {
    function L() {
      var n = document.createElement("div");
      n.id = "splashScreenElement";
      n.innerHTML = a;
      t.applyBindings(e, n);
      S && S.appendChild(n);
    }
    function A() {
      e.showLoader(!1);
      e.showSignIn(!1);
      C.publish();
    }
    function O(t) {
      var n = v.assign({ text: m.fetch({ key: "splashScreen_text_loading" }) }, t);
      e.showSignIn(!1);
      e.showLoader(!0);
      r.updateAriaLiveHtml(e.loadingText, n.text);
    }
    function M(t) {
      var n = l.get().implicitSignIn || l.get().implicitSignOut, i = v.assign({
          title: n ? "" : J("splashScreen_signedOut_title"),
          description: "",
          showButton: !1,
          isSignInExternalEnabled: !1,
          isSignInPopupEnabled: !1,
          showLearnMore: !1,
          isFeedbackEnabled: !1
        }, t);
      e.showLoader(!1);
      e.showSignIn(!0);
      e.signInTitle("");
      e.signInDescription("");
      i.title && r.updateAriaLiveHtml(e.signInTitle, i.title);
      i.description && r.updateAriaLiveHtml(e.signInDescription, i.description);
      e.isSignInEnabled(i.showButton);
      e.isSignInExternalEnabled(i.isSignInExternalEnabled);
      e.isLearnMoreLinkVisible(i.showLearnMore);
      e.isFeedbackEnabled(i.isFeedbackEnabled);
      k.setSignInPopup(i.isSignInPopupEnabled);
      e.isSignInNotificationEnabled(k.isEnabled());
    }
    function D() {
      M();
      C.startSplashScreenMeasure(e.showSignIn(), e.isLearnMoreLinkVisible());
      var t = n.get().signInManager.state;
      t.when(o.loginState.SigningIn, function () {
        O({ text: J("splashScreen_text_signingIn") });
      });
      t.when(o.loginState.SigningOut, j);
      t.when(o.loginState.SignedOut, F);
    }
    function P() {
      var e = h.getBrowserInfo();
      return e.isIeEngine || e.isEdge;
    }
    function H(e) {
      var t = {
        title: J("splashScreen_signInFailed_title"),
        description: J("splashScreen_signInFailed_description"),
        isFeedbackEnabled: w.isFeatureOn(s.featureFlags.HAS_FEEDBACK_LINK_ON_ERROR)
      };
      if (R(e))
        return;
      U(e) && (t.title = m.fetch({ key: "splashScreen_signInFailed_description_age_restriction" }), t.description = "", t.isFeedbackEnabled = !1);
      T && (t.description = m.fetch({ key: "skypeUnavailable_title" }), t.isFeedbackEnabled = !1);
      z(e) && (t.description = m.fetch({ key: "splashScreen_signInFailed_description_exceeded_endpoints" }), t.isFeedbackEnabled = !1);
      W(e) && (t.title = m.fetch({ key: "splashScreen_signInFailed_title_security_validation" }), t.description = "", t.isSignInExternalEnabled = !0, t.isFeedbackEnabled = !1);
      X(e) && (t.description = m.fetch({ key: "splashScreen_signInFailed_aad_description" }), t.isFeedbackEnabled = !1, t.isSignInPopupEnabled = !0);
      t.showLearnMore = !!c.splashScreen.learnMoreUrl && !!P();
      M(t);
    }
    function B(e) {
      T = !1;
      M(e);
      E.publish(s.apiUIEvents.SWX_ON_SIGN_OUT);
    }
    function j() {
      B({ showButton: w.isFeatureOn(s.featureFlags.RE_AUTH_ENABLED) && !k.isEnabled() });
    }
    function F(e, t) {
      if (!t || t !== o.loginState.SignedIn)
        return;
      B({
        title: m.fetch({ key: "splashScreen_disconnected_title" }),
        description: J("splashScreen_disconnected_description")
      });
    }
    function I() {
      if (!N) {
        E.subscribe(s.apiUIEvents.SWX_TIMELINE_LOADED, A);
        return;
      }
      E.subscribe(s.apiUIEvents.SWX_SINGLE_CONVERSATION, function (n) {
        if (!n) {
          e.showLoader(!1);
          e.showSignIn(!1);
          return;
        }
        M({
          title: J("splashScreen_signInFailed_title"),
          description: J("splashScreen_signInFailed_description")
        });
      });
    }
    function q() {
      E.subscribe(s.events.system.EXPERIENCE_READY, D);
      E.subscribe(s.events.auth.SIGNIN_FAILED, H);
      I();
    }
    function R(e) {
      try {
        return e.message === s.api.auth.errorTypes.SIGN_IN_CANCELED_ERROR && JSON.parse(e.details.reason).code === s.api.auth.errorTypes.SIGNED_OUT_ERROR;
      } catch (t) {
      }
    }
    function U(e) {
      var t = new RegExp(s.api.auth.errorTypes.AGE_RESTRICTION_ERROR + "$"), n = "error_description";
      if (e && e[n])
        return t.test(e[n]);
    }
    function z(e) {
      return e && e.name === s.api.auth.errorTypes.TOO_MANY_CONNECTIONS_ERROR;
    }
    function W(e) {
      return e && e.message === s.silentLogin.errorMessages.INVALID_GRANT;
    }
    function X(e) {
      var t;
      if (e && e.message === s.api.auth.errorTypes.LOGIN_REQUIRED_ERROR)
        return !0;
      try {
        return t = JSON.parse(e.details.reason), t.code === s.api.auth.errorTypes.OAUTH_FAILED_ERROR && t.error === s.api.auth.errorTypes.LOGIN_REQUIRED_ERROR;
      } catch (n) {
      }
    }
    function V() {
      var e = c.webLoginClientId, t = c.appBaseUrl + "/assets/externalSignInHandler.html?origin=" + d.location.origin, n = "999";
      return c.webLoginUrl + "?client_id=" + p.encodeURIComponent(e) + "&redirect_uri=" + p.encodeURIComponent(t) + "&partner=" + p.encodeURIComponent(n);
    }
    function $(e) {
      var t = i.resolve(s.serviceLocator.ACTION_TELEMETRY);
      t.recordAction(e);
    }
    function J(e) {
      return m.fetch({ key: N ? e + "_wac" : e });
    }
    var e = this, w = i.resolve(s.serviceLocator.FEATURE_FLAGS), E = i.resolve(s.serviceLocator.PUBSUB), S, x = "swx-container", T = !1, N = w.isFeatureOn(s.featureFlags.SINGLE_CONVERSATION_MODE), C = g.build(), k = b.build();
    this.showLoader = t.observable(!1);
    this.showSignIn = t.observable(!1);
    this.isVisible = t.computed(function () {
      return e.showLoader() || e.showSignIn();
    });
    this.isSignInEnabled = t.observable(!1);
    this.isSignInExternalEnabled = t.observable(!1);
    this.isSignInNotificationEnabled = t.observable(!1);
    this.isLearnMoreLinkVisible = t.observable(!1);
    this.isFeedbackEnabled = t.observable(!1);
    this.useBusinessWording = w.isFeatureOn(s.featureFlags.USE_BUSINESS_WORDING);
    this.showLogo = !N;
    this.loadingText = t.observable("");
    this.signInTitle = t.observable("");
    this.signInDescription = t.observable("");
    this.signInLearnMoreText = m.fetch({ key: "splashScreen_learn_more" });
    this.learnMoreUrl = c.splashScreen.learnMoreUrl;
    this.signIn = function (e) {
      f.signIn(A, H, e);
      T = !0;
    };
    this.signInExternal = function () {
      var t, n, r = V();
      $(u.externalSignIn.signIn);
      t = p.open(r);
      n = p.setInterval(function () {
        t.closed && (e.signIn({ isExternalSignIn: !0 }), p.clearInterval(n));
      }, 100);
    };
    this.notifySignIn = k.notify;
    this.getSignInButtonText = J.bind(null, "splashScreen_signIn_button");
    this.feedbackPageUrl = t.pureComputed(function () {
      return y.getFeedbackPageUrl();
    });
    this.feedbackPageTarget = function () {
      return y.getFeedbackPageTarget();
    };
    this.init = function (n) {
      if (!n)
        return;
      S = n;
      S.classList.add(x);
      var r = document.getElementById("splashScreenElement");
      r && t.removeNode(r);
      L();
      !e.showLoader() && !e.showSignIn() && O();
      T = !1;
      E.publish(s.apiUIEvents.SWX_SPLASHSCREEN_LOADED);
    };
    q();
  }
  var t = e("vendor/knockout"), n = e("cafe/applicationInstance"), r = e("utils/common/accessibility"), i = e("services/serviceLocator"), s = e("constants/common"), o = e("swx-enums"), u = e("ui/telemetry/actions/actionNames"), a = e("text!views/experience/splashScreen.html"), f = e("experience/api/authentication"), l = e("experience/authContext"), c = e("experience/settings"), h = e("browser/detect"), p = e("browser/window"), d = e("browser/document"), v = e("lodash-compat"), m = e("swx-i18n").localization, g = e("telemetry/chat/splashScreenEvent"), y = e("utils/common/feedback"), b = e("utils/common/signInNotificationHandler");
  return w;
});
