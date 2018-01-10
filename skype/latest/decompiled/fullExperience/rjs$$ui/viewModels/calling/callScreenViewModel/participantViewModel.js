define("ui/viewModels/calling/callScreenViewModel/participantViewModel", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "ui/telemetry/actions/actionNames",
  "swx-constants",
  "swx-util-calling-stack",
  "swx-constants",
  "swx-enums",
  "utils/common/eventMixin",
  "swx-constants",
  "vendor/knockout",
  "ui/modelHelpers/personHelper",
  "swx-service-locator-instance",
  "ui/viewModels/calling/callScreenViewModel/callScreenLayoutHelper"
], function (e, t) {
  function g(e) {
    function _() {
      y.forEach(function (e) {
        e.dispose && e.dispose();
      });
      y.length = 0;
    }
    function D(e) {
      !A.isScreenSharing && A.isGroupConversation() && b && X(b, !!e);
    }
    function P(e) {
      e && A.isZoomedIn() && A.isZoomedIn(!1);
    }
    function H() {
      var e = t.videoElement(), n = t.participantElement(), r;
      A.videoIsAllowed() && e && n && a && a.width() && a.height() && (r = p.calculateVideoStyles(a.width(), a.height(), n.offsetWidth, n.offsetHeight, A.isZoomedIn(), A.isScreenSharing), r !== N && (N = r, e.style.cssText = N));
    }
    function B() {
      A.videoIsAllowed() && (k(t.videoElement()), L(), t.dispatchEvent(o.events.callScreen.VIDEO_STATE_CHANGED, null, t.DIRECTION.PARENT));
    }
    function j(e) {
      k(e ? t.videoElement() : null);
    }
    function F(e) {
      var n = e === u.callConnectionState.Connecting || e === u.callConnectionState.Ringing, r = e === u.callConnectionState.Disconnecting || e === u.callConnectionState.Disconnected;
      t.isConnecting(n);
      t.isDisconnecting(r);
    }
    function I(e) {
      e.audio.isSpeaking.changed(t.isSpeaking);
      e.audio.isMuted.changed(t.isMuted);
      e.audio.state.changed(F);
      e.video.channels.added($);
      e.video.channels.removed(J);
      A.isScreenSharing && K(e.screenSharing.stream);
      y.push(t.videoElement.subscribe(k));
    }
    function q(e) {
      !e || (e.audio.state.changed.off(F), e.video.channels.added.off($), e.video.channels.removed.off(J), e.audio.isSpeaking.changed.off(t.isSpeaking), e.audio.isMuted.changed.off(t.isMuted), a && (a.state.changed.off(g), Z()));
    }
    function R(e) {
      t.isParticipantMenuVisible(e);
    }
    function U(e) {
      t.isParticipantMenuFocused(e);
    }
    function z(e, n, r) {
      e === !0 && r === !1 && !!t.participant() && !A.isScreenSharing && !A.isSelfParticipant && b && V(b);
    }
    function W(e, t) {
      if (!e.isStarted.set.enabled())
        return;
      t ? (A._dfdStopVideo ? A._dfdStartVideo = A._dfdStopVideo.then(function () {
        return e.isStarted.set(!0);
      }) : A._dfdStartVideo || (A._dfdStartVideo = e.isStarted.set(!0)), A._dfdStartVideo.finally(function () {
        A._dfdStartVideo = null;
      })) : (A._dfdStartVideo ? A._dfdStopVideo = A._dfdStartVideo.then(function () {
        return e.isStarted.set(!1);
      }) : A._dfdStopVideo || (A._dfdStopVideo = e.isStarted.set(!1)), A._dfdStopVideo.finally(function () {
        A._dfdStopVideo = null;
      }));
    }
    function X(e, t) {
      var n = A._dfdSetContainer || A._dfdRemoveContainer;
      n ? n.then(function () {
        W(e, t);
      }) : W(e, t);
    }
    function V(e) {
      var t = e.isVideoOn.subscribe(), n = e.isVideoOn.changed(function (t) {
          t && A.videoIsAllowed() ? S ? X(e, !0) : x = !0 : (X(e, !1), x = !1);
        });
      y.push(t);
      y.push(n);
    }
    function $(e) {
      b = e;
      A.isScreenSharing || (A.isSelfParticipant || V(e), K(b.stream));
    }
    function J() {
      t.dispose();
    }
    function K(e) {
      a = e;
      k(t.videoElement());
      Y(a);
      a.state.changed(g);
    }
    function Q(e) {
      if (!a)
        return;
      var t = e || null;
      t ? (A._dfdRemoveContainer ? A._dfdSetContainer = A._dfdRemoveContainer.then(function () {
        return a.source.sink.container.set(t);
      }) : A._dfdSetContainer || (A._dfdSetContainer = a.source.sink.container.set(t)), A._dfdSetContainer.finally(function () {
        S = !0;
        A._dfdSetContainer = null;
        x && (X(b, A.videoIsAllowed()), x = !1);
      })) : (A._dfdSetContainer ? A._dfdRemoveContainer = A._dfdSetContainer.then(function () {
        return a.source.sink.container.set(null);
      }) : A._dfdRemoveContainer || (A._dfdRemoveContainer = a.source.sink.container.set(null)), A._dfdRemoveContainer.finally(function () {
        S = !1;
        A._dfdRemoveContainer = null;
      }));
    }
    function G(e) {
      var t = A._dfdStartVideo || A._dfdStopVideo;
      t ? t.then(function () {
        Q(e);
      }) : Q(e);
    }
    function Y(e) {
      var t = p.executeInAnimationFrame(function () {
        tt(e);
      });
      w = e.width.changed(t);
      E = e.height.changed(t);
    }
    function Z() {
      w && w.dispose();
      E && E.dispose();
    }
    function et(e) {
      switch (e) {
      case "1.8":
        n(i.CLASSES.ASPECT_RATIO_16BY9);
        break;
      default:
        n(i.CLASSES.ASPECT_RATIO_4BY3);
      }
    }
    function tt(e) {
      if (e.width() && e.height()) {
        var n = (e.width() / e.height()).toFixed(1);
        et(n);
        T !== n && (T = n, L(), t.dispatchEvent(o.events.callScreen.VIDEO_STATE_CHANGED, null, t.DIRECTION.PARENT));
      }
    }
    function nt() {
      a && t.participantElement() && a.width() && a.height() && t.isVideoActive() && (A.isZoomedIn(p.canAutoZoom(a.width(), a.height(), t.participantElement().offsetWidth, t.participantElement().offsetHeight)), C());
    }
    function rt(e) {
      return e.keyCode || e.which;
    }
    function it() {
      O && (window.clearTimeout(O), O = null);
      nt();
      t.inTransition(!1);
    }
    function st() {
      var e = t.videoElement();
      e && (M && window.clearTimeout(M), M = window.setTimeout(function () {
        M = null;
        ot();
      }, v), e.classList.add(m), C());
    }
    function ot() {
      var e = t.videoElement();
      e && (M && (window.clearTimeout(M), M = null), e.classList.remove(m), H());
    }
    var t = this, n = l.observable(i.CLASSES.ASPECT_RATIO_1BY1), a, g = l.observable(), y = [], b, w, E, S, x, T, N, C = p.executeInAnimationFrame(H), k = p.executeInAnimationFrame(G), L = p.executeInAnimationFrame(nt), A = e.layoutItemModel, O, M;
    t.layoutItemModel = e.layoutItemModel;
    t.participant = l.observable();
    t.participantElement = l.observable();
    t.videoElement = l.observable();
    t.isSpeaking = l.observable(!1);
    t.isMuted = l.observable(!1);
    t.isFocused = l.observable();
    t.isParticipantMenuVisible = l.observable(!1);
    t.isParticipantMenuFocused = l.observable(!1);
    t.isPstn = !1;
    t.inTransition = l.observable(!1);
    t.avatarVisible = l.computed(function () {
      return !!t.participant() && (!A.videoIsAllowed() || g() === u.mediaStreamState.Stopped || t.inTransition());
    });
    t.isVideoLoading = l.computed(function () {
      return !!t.participant() && A.videoIsAllowed() && (g() === u.mediaStreamState.Started || g() === u.mediaStreamState.Inactive);
    });
    t.isVideoActive = l.computed(function () {
      var e = !!t.participant() && A.videoIsAllowed() && g() === u.mediaStreamState.Active;
      return A.isVideoActive(e), e;
    });
    t.cssClasses = l.computed(function () {
      var e = [];
      return t.isVideoLoading() || t.isVideoActive() ? A.aspectRatioClasses(i.CLASSES.VIDEO_ON + " " + n()) : A.aspectRatioClasses(i.CLASSES.ASPECT_RATIO_1BY1), e.push(A.aspectRatioClasses()), s.get().isPluginlessEnabledInCurrentBrowser() && e.push(i.CLASSES.PLUGINLESS), A.isScreenSharing && e.push(i.CLASSES.SCREEN_SHARING), t.inTransition() && e.push("inTransition"), A.isParticipantAtTheBottom() || e.push(i.CLASSES.SMALL_PREVIEW), e.join(" ");
    });
    t.isConnecting = l.observable(!1);
    t.isDisconnecting = l.observable(!1);
    t.handleTransitionStart = function () {
      O && window.clearTimeout(O);
      O = window.setTimeout(function () {
        O = null;
        it();
      }, d);
      t.inTransition(!0);
    };
    t.handleTransitionEnd = function (e) {
      e.target.classList.contains("participant-wrapper") && t.inTransition() ? it() : e.target.classList.contains("videoElement") && ot();
    };
    t.init = function () {
      t.registerEvent(o.events.callScreen.VIDEO_CONTAINER_SIZE_CHANGED, L);
      t.registerEvent(o.events.callScreen.PARTICIPANT_MENU_VISIBILITY_CHANGED, R);
      t.registerEvent(o.events.callScreen.PARTICIPANT_MENU_FOCUSED, U);
      y.push(t.participant.subscribe(I));
      y.push(t.participant.subscribe(q, this, "beforeChange"));
      y.push(A.isVisible.subscribe(j));
      A.isGroupConversation.changed(z);
      t.participant(A.participant);
      y.push(A.positionInGrid.subscribe(t.handleTransitionStart));
      y.push(g.subscribe(B));
      y.push(A.isZoomedIn.subscribe(st));
      t.avatarVisible.subscribe(P);
      !t.participant() || (t.isPstn = c.isPstn(t.participant().person));
      y.push(A.videoIsAllowed.subscribe(D));
      e.isVideoActive && y.push(t.isVideoActive.subscribe(function () {
        e.isVideoActive(t.isVideoActive());
      }));
    };
    t.toggleZoom = function () {
      if (A.isZoomable()) {
        var e = h.resolve(o.serviceLocator.ACTION_TELEMETRY);
        A.isZoomedIn(!A.isZoomedIn());
        e.recordAction(r.audioVideo.zoomInOut);
      }
    };
    t.onZoomToggleKeyUp = function (e, n) {
      var r = rt(n);
      return r === f.TAB && t.isFocused(!0), !0;
    };
    t.onZoomToggleKeyDown = function (e, n) {
      var r = rt(n);
      return (r === f.ENTER || r === f.SPACE) && t.toggleZoom(), r === f.TAB && t.isFocused(!1), !0;
    };
    t.onZoomToggleBlur = function () {
      t.isFocused(!1);
    };
    t.showContextMenu = function (e, n) {
      if (n.altKey)
        return !0;
      t.dispatchEvent(o.events.callScreen.PARTICIPANT_ITEM_CONTEXT_MENU, {
        layoutItemModel: A,
        event: n
      }, t.DIRECTION.CHILD);
    };
    t.dispose = function () {
      B(u.mediaStreamState.Stopped);
      q(t.participant());
      a && (G(null), a.state.changed.off(g), a = null);
      D(!1);
      b && (X(b, !1), b = null);
      _();
      A.isGroupConversation.changed.off(z);
      t.avatarVisible.dispose();
      t.isVideoLoading.dispose();
      S = !1;
      x = !1;
    };
  }
  var n = e("lodash-compat"), r = e("ui/telemetry/actions/actionNames"), i = e("swx-constants").CALLING, s = e("swx-util-calling-stack"), o = e("swx-constants").COMMON, u = e("swx-enums"), a = e("utils/common/eventMixin"), f = e("swx-constants").KEYS, l = e("vendor/knockout"), c = e("ui/modelHelpers/personHelper"), h = e("swx-service-locator-instance").default, p = e("ui/viewModels/calling/callScreenViewModel/callScreenLayoutHelper"), d = 700, v = 400, m = "zoomChanging";
  n.assign(g.prototype, a);
  t.build = function (e) {
    return new g(e);
  };
});
