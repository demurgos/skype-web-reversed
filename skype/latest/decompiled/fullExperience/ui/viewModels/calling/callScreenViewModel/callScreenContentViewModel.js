define("ui/viewModels/calling/callScreenViewModel/callScreenContentViewModel", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/eventMixin",
  "browser/window",
  "swx-enums",
  "utils/common/cafeObservable",
  "constants/calling",
  "services/calling/activeSpeakerManager",
  "services/calling/participantManager",
  "services/calling/screenSharingHandler",
  "ui/viewModels/calling/callScreenViewModel/participantLayoutWrapper",
  "ui/viewModels/calling/helpers/textFormatter",
  "ui/viewModels/calling/helpers/stageResizer",
  "services/calling/layouts/galleryLayout",
  "constants/common",
  "swx-i18n"
], function (e) {
  function w(e) {
    function A(e) {
      N = e.stream.state.changed(function (e) {
        t.isLocalVideoOn(e !== s.mediaStreamState.Stopped);
      });
    }
    function O(e, n) {
      var r = x.state() === u.CALL_STATES.CONNECTED;
      r && t.participantNotification(y.fetch({
        key: e,
        params: { name: n }
      }));
    }
    function M(e, i) {
      var s = p.build({
        participant: e,
        isScreenSharing: i,
        videoIsAllowed: n.observable(!1)
      });
      r.addItem(s), t.updateContentWidth();
    }
    function _(e) {
      t.participantsInStage.remove(e), t.participantsInRoster.remove(e), r.removeItems(e), t.updateContentWidth();
    }
    function D(e) {
      M(e, !1), w.onParticipantAdded(e), O("callscreen_text_participant_joined_notification", e.person.displayName());
    }
    function P(e) {
      M(e, !0), w.pause(), O("callscreen_text_participant_screen_shared_notification", e.person.displayName());
    }
    function H(e) {
      _(function (t) {
        return t.participant === e && t.isScreenSharing;
      }), w.unpause(), O("callscreen_text_participant_screen_unshared_notification", e.person.displayName());
    }
    function B(e) {
      _(function (t) {
        return t.participant === e;
      }), w.onParticipantRemoved(e), O("callscreen_text_participant_left_notification", e.person.displayName());
    }
    function j(e) {
      e.layoutPosition === c.ROSTER ? (t.participantsInStage.remove(e), t.participantsInRoster.unshift(e), e.videoIsAllowed(F(e.participant))) : (t.participantsInRoster.remove(e), t.participantsInStage.unshift(e), e.videoIsAllowed(!0));
    }
    function F(e) {
      return e.screenSharing.stream.state() !== s.mediaStreamState.Stopped;
    }
    function I() {
      x.totalCallDuration && t.duration(d.getFormattedDuration(x.totalCallDuration));
    }
    function q() {
      x.state() === u.CALL_STATES.CONNECTED && t.stageResizer.recalculateLayout();
    }
    function R() {
      return e.autoCall && e.autoCall();
    }
    function U() {
      return e.autoCall && !e.autoCall();
    }
    function z() {
      var e = R() ? y.fetch({ key: "callscreen_text_autoCallConnectingMessage" }) : "";
      t.callScreenMessageText(e);
    }
    function W() {
      t.callScreenMessageText("");
    }
    function X() {
      U() ? e.autoCall.reason === s.callDisconnectionReason.AutoCallFailed ? t.callScreenMessageText(y.fetch({ key: "callscreen_text_autoCallFailedMessage" })) : e.autoCall.reason === s.callDisconnectionReason.AutoCallTimeout && t.callScreenMessageText(y.fetch({ key: "callscreen_text_autoCallTimeoutMessage" })) : t.callScreenMessageText("");
    }
    function V(e) {
      switch (e) {
      case u.CALL_STATES.CONNECTING:
        t.isCallConnected(!1), z();
        break;
      case u.CALL_STATES.ENDING:
        t.isCallConnected(!1), X(), I();
        break;
      case u.CALL_STATES.CONNECTED:
        t.isCallConnected(!0), q(), W();
      }
    }
    function $(e) {
      t.stageResizer.isVideoFullScreenRequested = e, q();
    }
    function J() {
      t.stageContainer() && r.onWidthChanged(t.stageContainer().parentNode.offsetWidth), q(), t.updateContentWidth();
    }
    function K() {
      t.stageResizer.setStageContainer(t.stageContainer()), J();
    }
    function Q() {
      t.isVisible(!0), J();
    }
    function G() {
      var e = {}, n = t.layoutName();
      return e.fit = t.canFit(), e[n] = n, e;
    }
    var t = this, r = m.build(j, b), w, E, S, x, T, N, C, k, L;
    t.conversation = e, t.participantsInStage = n.observableArray(), t.participantsInRoster = n.observableArray(), t.layoutName = n.observable(h.ACTIVE_SPEAKER), t.stageContainer = n.observable(), t.isCallConnected = n.observable(!1), t.showEndCall = n.observable(!1), t.avatarUrl = o.newObservableProperty(e.avatarUrl), t.callScreenMessageText = n.observable(""), t.duration = n.observable(""), t.isVisible = n.observable(!0), t.isLocalVideoOn = n.observable(!1), t.isLocalVideoAllowed = n.observable(!0), t.participantNotification = n.observable(""), t.canFit = n.observable(!1), t.mainClass = n.computed(G), t.rosterWidth = n.observable(50), t.participantRendered = function () {
      i.setTimeout(q, 100);
    }, t.init = function (n, i, s) {
      C = n, C.init(J), x = i, t.footerButtonsWidth = s, e.selfParticipant.video.channels.added(A), t.stageResizer = v.build(t.participantsInStage), t.stageContainer.subscribe(K), w = a.build(b, r.onActiveSpeakerChanged), E = f.build(e), E.onParticipantAddedToCall(D), E.onParticipantRemovedFromCall(B), E.init(), S = l.build(e), S.onScreenSharingStarted(P), S.onScreenSharingStopped(H), S.init(), t.forwardEvent(g.events.callScreen.TOGGLE_FULLSCREEN, t.DIRECTION.CHILD, J), t.registerEvent(g.events.navigation.FRAGMENT_SHOW, Q), t.registerEvent(g.events.navigation.FRAGMENT_BEFORE_HIDE, t.isVisible.bind(t, !1)), t.registerEvent(g.events.callScreen.VIDEO_ZOOMED_IN, $), t.registerEvent(g.events.callScreen.CONTROLS_VISIBLE, q), t.registerEvent(g.events.callScreen.SIDEBAR_TOGGLED, J), t.registerEvent(g.events.callScreen.VIDEO_STATE_CHANGED, q), t.registerEvent(g.events.callScreen.VIDEO_SIZE_CHANGED, q), t.registerEvent(g.events.callScreen.TOGGLE_FULLSCREEN, t.updateContentWidth), t.registerEvent(g.events.callScreen.TOGGLE_NARROW_MENU, t.updateContentWidth), t.registerEvent(g.events.callScreen.ROSTER_WIDTH_CHANGED, t.rosterWidth.bind(t)), T = x.state.subscribe(V), V(x.state()), k = s.subscribe(t.updateContentWidth), L = t.rosterWidth.subscribe(t.updateContentWidth), t.updateContentWidth();
    }, t.updateContentWidth = function () {
      var e = (C.getContentWidth() - t.footerButtonsWidth()) / 2;
      t.canFit(e > t.rosterWidth());
    }, t.dispose = function () {
      e.selfParticipant.video.channels.added.off(A), C.dispose(), N && N.dispose(), k && k.dispose(), L && L.dispose(), w && w.dispose(), E && E.dispose(), T.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/eventMixin"), i = e("browser/window"), s = e("swx-enums"), o = e("utils/common/cafeObservable"), u = e("constants/calling"), a = e("services/calling/activeSpeakerManager"), f = e("services/calling/participantManager"), l = e("services/calling/screenSharingHandler"), c = u.LAYOUT_PLACES, h = u.LAYOUT_TYPES, p = e("ui/viewModels/calling/callScreenViewModel/participantLayoutWrapper"), d = e("ui/viewModels/calling/helpers/textFormatter"), v = e("ui/viewModels/calling/helpers/stageResizer"), m = e("services/calling/layouts/galleryLayout"), g = e("constants/common"), y = e("swx-i18n").localization, b = 3;
  return t.assign(w.prototype, r), {
    build: function (e) {
      return new w(e);
    }
  };
})
