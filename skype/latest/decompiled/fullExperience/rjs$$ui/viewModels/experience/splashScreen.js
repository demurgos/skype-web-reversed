define("ui/viewModels/experience/splashScreen", [
  "require",
  "vendor/knockout",
  "swx-cafe-application-instance",
  "utils/common/accessibility",
  "swx-service-locator-instance",
  "swx-constants",
  "swx-enums",
  "ui/telemetry/actions/actionNames",
  "text!views/experience/splashScreen.html",
  "experience/api/authentication",
  "experience/authContext",
  "experience/settings",
  "swx-browser-detect",
  "browser/window",
  "browser/document",
  "lodash-compat",
  "swx-i18n",
  "telemetry/chat/splashScreenEvent",
  "utils/common/feedback",
  "utils/common/signInNotificationHandler",
  "utils/common/styleModeHelper",
  "ui/telemetry/telemetryClient"
], function (e) {
  function T() {
    function H(t) {
      return it(e.useBusinessWording ? B(t) : t);
    }
    function B(e) {
      return e + "_4b";
    }
    function j() {
      var n = document.createElement("div");
      n.id = "splashScreenElement";
      n.innerHTML = a;
      t.applyBindings(e, n);
      C && C.appendChild(n);
    }
    function F(t) {
      var n = t || "n/a";
      e.showLoader(!1);
      e.showSignIn(!1);
      e.showEducationCarousel(!1);
      O.publish();
      P && N.publish(x.action.HIDE, n);
    }
    function I(t) {
      var n = v.assign({ text: m.fetch({ key: "splashScreen_text_loading" }) }, t);
      if (P) {
        q();
        return;
      }
      e.showSignIn(!1);
      e.showLoader(!0);
      r.updateAriaLiveHtml(e.loadingText, n.text);
    }
    function q() {
      e.showLoader(!1);
      e.showSignIn(!1);
      e.showEducationCarousel(!0);
    }
    function R(t, n) {
      function i() {
        return {
          isSignInEnabled: e.isSignInEnabled(),
          isSignInExternalEnabled: e.isSignInExternalEnabled(),
          isLearnMoreLinkVisible: e.isLearnMoreLinkVisible(),
          isFeedbackEnabled: e.isFeedbackEnabled(),
          isSignInPopupEnabled: u.isSignInPopupEnabled,
          isSignInNotificationEnabled: e.isSignInNotificationEnabled(),
          hasTitle: t && !!t.title,
          hasDescription: !!u.description,
          state: n || s.telemetry.NOT_AVAILABLE,
          isSideBarOpened: w.get().appIsVisible()
        };
      }
      var o = l.get().implicitSignIn || l.get().implicitSignOut, u = v.assign({
          title: o ? "" : it("splashScreen_signedOut_title"),
          description: "",
          showButton: !1,
          isSignInExternalEnabled: !1,
          isSignInPopupEnabled: !1,
          showLearnMore: !1,
          isFeedbackEnabled: !1
        }, t);
      e.showEducationCarousel() && N.publish(x.action.HIDE);
      e.showLoader(!1);
      e.showEducationCarousel(!1);
      e.showSignIn(!0);
      e.signInTitle("");
      e.signInDescription("");
      u.title && r.updateAriaLiveHtml(e.signInTitle, u.title);
      u.description && r.updateAriaLiveHtml(e.signInDescription, u.description);
      e.isSignInEnabled(u.showButton);
      e.isSignInExternalEnabled(u.isSignInExternalEnabled);
      e.isLearnMoreLinkVisible(u.showLearnMore);
      e.isFeedbackEnabled(u.isFeedbackEnabled);
      M.setSignInPopup(u.isSignInPopupEnabled);
      e.isSignInNotificationEnabled(M.isEnabled());
      E.get().sendEvent(c.telemetry.uiTenantToken, S.TYPE, i());
    }
    function U() {
      R(null, S.STATE.APP_READY);
      O.startSplashScreenMeasure(e.showSignIn(), e.isLearnMoreLinkVisible());
      var t = n.get().signInManager.state;
      t.when(o.loginState.SigningIn, function () {
        I({ text: it("splashScreen_text_signingIn") });
      });
      t.when(o.loginState.SigningOut, V);
      t.when(o.loginState.SignedOut, $);
    }
    function z() {
      var e = h.getBrowserInfo();
      return e.isIeEngine || e.isEdge;
    }
    function W(e) {
      var t = {
        title: it("splashScreen_signInFailed_title"),
        description: it("splashScreen_signInFailed_description"),
        isFeedbackEnabled: T.isFeatureOn(s.featureFlags.HAS_FEEDBACK_LINK_ON_ERROR)
      };
      if (Q(e))
        return;
      G(e) && (t.title = m.fetch({ key: "splashScreen_signInFailed_description_age_restriction" }), t.description = "", t.isFeedbackEnabled = !1);
      L && (t.description = m.fetch({ key: "skypeUnavailable_title" }), t.isFeedbackEnabled = !1);
      Y(e) && (t.description = m.fetch({ key: "splashScreen_signInFailed_description_exceeded_endpoints" }), t.isFeedbackEnabled = !1);
      Z(e) && (t.title = m.fetch({ key: "splashScreen_signInFailed_title_security_validation" }), t.description = "", t.isSignInExternalEnabled = !0, t.isFeedbackEnabled = !1);
      et(e) && (t.description = m.fetch({ key: "splashScreen_signInFailed_aad_description" }), t.isFeedbackEnabled = !1, t.isSignInPopupEnabled = !0);
      tt(e) && !L && (t.showButton = T.isFeatureOn(s.featureFlags.SHOW_SIGN_IN_BUTTON_ON_TIMEOUT));
      t.showLearnMore = !!c.splashScreen.learnMoreUrl && !!z();
      R(t, S.STATE.SIGN_IN_FAILED);
    }
    function X(e, t) {
      L = !1;
      R(e, t);
      N.publish(s.apiUIEvents.SWX_ON_SIGN_OUT);
    }
    function V() {
      st() ? X({
        isSignInExternalEnabled: !0,
        title: m.fetch({ key: "splashScreen_signedOut_reauth_needed_title" }),
        description: m.fetch({ key: "splashScreen_signedOut_reauth_needed_description" })
      }, S.STATE.REAUTH_NEEDED) : T.isFeatureOn(s.featureFlags.SHOW_SIGN_IN_BUTTON_ON_SIGNOUT) ? X({ isSignInExternalEnabled: !0 }, S.STATE.SIGNING_OUT) : X({ showButton: !1 }, S.STATE.SIGNING_OUT);
    }
    function $(e, t) {
      if (!t || t !== o.loginState.SignedIn)
        return;
      X({
        title: m.fetch({ key: "splashScreen_disconnected_title" }),
        description: it("splashScreen_disconnected_description")
      }, S.STATE.SIGNED_OUT);
    }
    function J() {
      if (!A) {
        N.subscribe(s.apiUIEvents.SWX_TIMELINE_LOADED, F.bind(null, "timelineLoaded"));
        return;
      }
      N.subscribe(s.apiUIEvents.SWX_SINGLE_CONVERSATION, function (n) {
        if (!n) {
          e.showLoader(!1);
          e.showSignIn(!1);
          e.showEducationCarousel(!1);
          return;
        }
        R({
          title: it("splashScreen_signInFailed_title"),
          description: it("splashScreen_signInFailed_description")
        }, S.STATE.SIGN_IN_FAILED);
      });
    }
    function K() {
      N.subscribe(s.events.system.EXPERIENCE_READY, U);
      N.subscribe(s.events.auth.SIGNIN_FAILED, W);
      J();
    }
    function Q(e) {
      try {
        return e.message === s.api.auth.errorTypes.SIGN_IN_CANCELED_ERROR && JSON.parse(e.details.reason).code === s.api.auth.errorTypes.SIGNED_OUT_ERROR;
      } catch (t) {
      }
    }
    function G(e) {
      var t = new RegExp(s.api.auth.errorTypes.AGE_RESTRICTION_ERROR + "$"), n = "error_description";
      if (e && e[n])
        return t.test(e[n]);
    }
    function Y(e) {
      return e && e.name === s.api.auth.errorTypes.TOO_MANY_CONNECTIONS_ERROR;
    }
    function Z(e) {
      return e && e.message === s.silentLogin.errorMessages.INVALID_GRANT;
    }
    function et(e) {
      var t;
      if (e && e.message === s.api.auth.errorTypes.LOGIN_REQUIRED_ERROR)
        return !0;
      try {
        return t = JSON.parse(e.details.reason), t.code === s.api.auth.errorTypes.OAUTH_FAILED_ERROR && t.error === s.api.auth.errorTypes.LOGIN_REQUIRED_ERROR;
      } catch (n) {
      }
    }
    function tt(e) {
      return e && e.message === s.api.auth.errorTypes.TIMEOUT;
    }
    function nt() {
      var e = c.webLoginClientId, t = c.uiVersion, n = c.appBaseUrl + "/assets/externalSignInHandler.html?origin=" + d.location.origin, r = "999";
      return c.webLoginUrl + "?client_id=" + p.encodeURIComponent(e) + "&clientVersion=" + p.encodeURIComponent(t) + "&redirect_uri=" + p.encodeURIComponent(n) + "&partner=" + p.encodeURIComponent(r);
    }
    function rt(e) {
      var t = i.resolve(s.serviceLocator.ACTION_TELEMETRY);
      t.recordAction(e);
    }
    function it(e) {
      return m.fetch({ key: A ? e + "_wac" : e });
    }
    function st() {
      return n.get().signInManager.getSignOutContext && n.get().signInManager.getSignOutContext() && n.get().signInManager.getSignOutContext().reason === s.api.auth.errorTypes.REAUTH_NEEDED;
    }
    var e = this, T = i.resolve(s.serviceLocator.FEATURE_FLAGS), N = i.resolve(s.serviceLocator.PUBSUB), C, k = "swx-container", L = !1, A = T.isFeatureOn(s.featureFlags.SINGLE_CONVERSATION_MODE), O = g.build(), M = b.build(), D = T.isFeatureOn(s.featureFlags.SPLASH_SCREEN_WHITE_THEME), P = T.isFeatureOn(s.featureFlags.SHOW_EDU_CAROUSEL);
    this.showLoader = t.observable(!1);
    this.showSignIn = t.observable(!1);
    this.showEducationCarousel = t.observable(!1);
    this.isVisible = t.computed(function () {
      return e.showLoader() || e.showSignIn() || e.showEducationCarousel();
    });
    this.isSignInEnabled = t.observable(!1);
    this.isSignInExternalEnabled = t.observable(!1);
    this.isSignInNotificationEnabled = t.observable(!1);
    this.isLearnMoreLinkVisible = t.observable(!1);
    this.isFeedbackEnabled = t.observable(!1);
    this.useBusinessWording = T.isFeatureOn(s.featureFlags.USE_BUSINESS_WORDING);
    this.showLogo = !A;
    this.narratorText = t.observable("").extend({ rateLimit: 200 });
    this.loadingText = t.observable("");
    this.signInTitle = t.observable("");
    this.signInDescription = t.observable("");
    this.signInLearnMoreText = m.fetch({ key: "splashScreen_learn_more" });
    this.learnMoreUrl = c.splashScreen.learnMoreUrl;
    this.theme = t.computed(function () {
      return D ? s.classes.WHITE_THEME : s.classes.BLUE_THEME;
    });
    this.spinnerColor = t.computed(function () {
      return D ? "" : s.classes.WHITE_COLOR;
    });
    this.signIn = function (e) {
      f.signIn(F.bind(null, "signIn"), W, e);
      L = !0;
    };
    this.signInExternal = function () {
      var t, n, r = nt();
      rt(u.externalSignIn.signIn);
      t = p.open(r);
      n = p.setInterval(function () {
        t.closed && (e.signIn({ isExternalSignIn: !0 }), p.clearInterval(n));
      }, 100);
    };
    this.notifySignIn = function () {
      M.isSignInPopupEnabled() && R({
        title: m.fetch({ key: "splashScreen_signInExternal_title" }),
        description: m.fetch({ key: "splashScreen_signInExternal_description" }),
        isSignInPopupEnabled: !0
      });
      M.notify(I.bind(null, { text: m.fetch({ key: "splashScreen_text_signingIn" }) }));
    };
    this.getSignInButtonText = it.bind(null, "splashScreen_signIn_button");
    this.feedbackPageUrl = t.pureComputed(function () {
      return y.getFeedbackPageUrl();
    });
    this.feedbackPageTarget = function () {
      return y.getFeedbackPageTarget();
    };
    this.init = function (n) {
      if (!n)
        return;
      C = n;
      C.classList.add(k);
      var r = document.getElementById("splashScreenElement");
      r && t.removeNode(r);
      j();
      e.showLoader() || e.showSignIn() || e.showEducationCarousel() || I();
      e.showLoader() && (e.loadingText().indexOf(it("splashScreen_text_signingIn")) > -1 ? e.narratorText(H("splashScreen_text_signing_into_skype")) : e.narratorText(H("splashScreen_text_loading_skype")));
      L = !1;
      N.publish(s.apiUIEvents.SWX_SPLASHSCREEN_LOADED);
    };
    K();
  }
  var t = e("vendor/knockout"), n = e("swx-cafe-application-instance"), r = e("utils/common/accessibility"), i = e("swx-service-locator-instance").default, s = e("swx-constants").COMMON, o = e("swx-enums"), u = e("ui/telemetry/actions/actionNames"), a = e("text!views/experience/splashScreen.html"), f = e("experience/api/authentication"), l = e("experience/authContext"), c = e("experience/settings"), h = e("swx-browser-detect").default, p = e("browser/window"), d = e("browser/document"), v = e("lodash-compat"), m = e("swx-i18n").localization, g = e("telemetry/chat/splashScreenEvent"), y = e("utils/common/feedback"), b = e("utils/common/signInNotificationHandler"), w = e("utils/common/styleModeHelper"), E = e("ui/telemetry/telemetryClient"), S = s.telemetry.splashScreenSignInEvent, x = s.telemetry.eduCarouselEvents;
  return T;
});
