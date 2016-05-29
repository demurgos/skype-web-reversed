define("ui/viewModels/calling/callScreenViewModel/participantViewModel", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "swx-enums",
  "constants/common",
  "constants/calling",
  "constants/keys",
  "utils/common/eventMixin",
  "ui/telemetry/actions/actionNames",
  "services/serviceLocator"
], function (e, t) {
  function c(e) {
    function E(e) {
      !t.isScreenSharing && t.isGroupConversation && g && A(g, !!e);
    }
    function S(e) {
      e && t.isZoomedIn() && t.isZoomedIn(!1);
    }
    function x() {
      t.videoIsAllowed() && t.dispatchEvent(s.events.callScreen.VIDEO_ZOOMED_IN, t.isZoomedIn(), t.DIRECTION.PARENT);
    }
    function T(e) {
      t.videoIsAllowed() && (D(t.videoElement()), t.dispatchEvent(s.events.callScreen.VIDEO_STATE_CHANGED, e, t.DIRECTION.PARENT), t.isSelfParticipant || t.isZoomedIn(e === i.mediaStreamState.Active));
    }
    function N(e) {
      D(e ? t.videoElement() : null);
    }
    function C(e) {
      var n = e === i.callConnectionState.Connecting || e === i.callConnectionState.Ringing, r = e === i.callConnectionState.Disconnecting || e === i.callConnectionState.Disconnected;
      t.isConnecting(n);
      t.isDisconnecting(r);
    }
    function k(n) {
      e.isGroupConversation && n.audio.isSpeaking.changed(t.isSpeaking);
      n.audio.state.changed(C);
      n.video.channels.added(O);
      n.video.channels.removed(M);
      t.isScreenSharing && _(n.screenSharing.stream);
      v = t.videoElement.subscribe(D);
    }
    function L(n) {
      !n || (n.audio.state.changed.off(C), n.video.channels.added.off(O), n.video.channels.removed.off(M), e.isGroupConversation && n.audio.isSpeaking.changed.off(t.isSpeaking), a && (a.state.changed.off(c), H()));
    }
    function A(e, t) {
      e.isStarted() !== t && e.isStarted.set.enabled() && e.isStarted(t);
    }
    function O(e) {
      g = e;
      t.isScreenSharing || (!t.isSelfParticipant && t.isGroupConversation && A(g, t.videoIsAllowed()), _(g.stream));
    }
    function M() {
      t.dispose();
    }
    function _(e) {
      a = e;
      D(t.videoElement());
      P(a);
      a.state.changed(c);
    }
    function D(e) {
      if (a) {
        var t = c() !== i.mediaStreamState.Stopped ? e || null : null;
        a.source.sink.container() !== t && a.source.sink.container(t);
      }
    }
    function P(e) {
      b = e.width.changed(function () {
        j(e);
      });
      w = e.height.changed(function () {
        j(e);
      });
    }
    function H() {
      b && b.dispose();
      w && w.dispose();
    }
    function B(e) {
      var t = (e.width() / e.height()).toFixed(2);
      switch (t) {
      case "1.78":
        n(o.CLASSES.ASPECT_RATIO_16BY9);
        break;
      default:
        n(o.CLASSES.ASPECT_RATIO_4BY3);
      }
    }
    function j(e) {
      t.videoIsAllowed() && t.dispatchEvent(s.events.callScreen.VIDEO_SIZE_CHANGED, null, t.DIRECTION.PARENT);
      e.width() && e.height() && B(e);
    }
    function F(e) {
      return e.keyCode || e.which;
    }
    var t = this, n = r.observable(o.CLASSES.ASPECT_RATIO_1BY1), a, c = r.observable(), h, p, d, v, m, g, y, b, w;
    t.participant = r.observable();
    t.isSelfParticipant = Boolean(e.isSelfParticipant);
    t.isGroupConversation = Boolean(e.isGroupConversation);
    t.isScreenSharing = Boolean(e.isScreenSharing);
    t.videoIsAllowed = e.videoIsAllowed;
    t.isVisible = e.isVisible;
    t.isZoomedIn = r.observable(!1);
    t.videoElement = r.observable();
    t.isSpeaking = r.observable(!1);
    t.isFocused = r.observable();
    t.avatarVisible = r.computed(function () {
      return !!t.participant() && (!t.videoIsAllowed() || c() === i.mediaStreamState.Stopped);
    });
    t.isVideoLoading = r.computed(function () {
      return !!t.participant() && t.videoIsAllowed() && (c() === i.mediaStreamState.Started || c() === i.mediaStreamState.Inactive);
    });
    t.isVideoActive = r.computed(function () {
      return !!t.participant() && t.videoIsAllowed() && c() === i.mediaStreamState.Active;
    });
    t.cssClasses = r.computed(function () {
      var e = [];
      return t.isVideoLoading() || t.isVideoActive() ? (e.push(o.CLASSES.VIDEO_ON), e.push(n())) : e.push(o.CLASSES.ASPECT_RATIO_1BY1), t.isSelfParticipant && e.push(o.CLASSES.LOCAL_PIP), e.join(" ");
    });
    t.isConnecting = r.observable(!1);
    t.isDisconnecting = r.observable(!1);
    t.init = function () {
      p = t.participant.subscribe(k);
      d = t.participant.subscribe(L, this, "beforeChange");
      m = t.isVisible.subscribe(N);
      t.participant(e.participant);
      t.isVisible(e.isVisible);
      h = c.subscribe(T);
      t.avatarVisible.subscribe(S);
      t.isZoomedIn.subscribe(x);
      y = t.videoIsAllowed.subscribe(E);
    };
    t.toggleZoom = function () {
      var e = l.resolve(s.serviceLocator.ACTION_TELEMETRY);
      t.isZoomedIn(!t.isZoomedIn());
      e.recordAction(f.audioVideo.zoomInOut);
    };
    t.onZoomToggleKeyUp = function (e, n) {
      var r = F(n);
      return r === u.TAB && t.isFocused(!0), !0;
    };
    t.onZoomToggleKeyDown = function (e, n) {
      var r = F(n);
      return (r === u.ENTER || r === u.SPACE) && t.toggleZoom(), r === u.TAB && t.isFocused(!1), !0;
    };
    t.onZoomToggleBlur = function () {
      t.isFocused(!1);
    };
    t.dispose = function () {
      L(t.participant());
      E(!1);
      g && ((t.isSelfParticipant || t.isGroupConversation) && A(g, !1), g = null);
      a && (a.source.sink.container(null), a.state.changed.off(c), a = null);
      v && v.dispose();
      h && h.dispose();
      p && p.dispose();
      d && d.dispose();
      m && m.dispose();
      y && y.dispose();
      t.avatarVisible.dispose();
      t.isVideoLoading.dispose();
    };
  }
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("swx-enums"), s = e("constants/common"), o = e("constants/calling"), u = e("constants/keys"), a = e("utils/common/eventMixin"), f = e("ui/telemetry/actions/actionNames"), l = e("services/serviceLocator");
  n.assign(c.prototype, a);
  t.build = function (e) {
    return new c(e);
  };
});
