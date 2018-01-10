define("ui/viewModels/calling/callScreenViewModel/callScreenContentViewModel", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/eventMixin",
  "swx-enums",
  "utils/common/cafeObservable",
  "swx-constants",
  "services/calling/participantManager",
  "services/calling/screenSharingHandler",
  "ui/viewModels/calling/callScreenViewModel/participantLayoutItem",
  "ui/viewModels/calling/helpers/textFormatter",
  "swx-constants",
  "swx-i18n",
  "ui/viewModels/chat/conversationTile",
  "ui/viewModels/chat/conversationTopic",
  "ui/viewModels/calling/callScreenViewModel/callScreenLayoutHelper",
  "ui/viewModels/calling/callScreenViewModel/renderer",
  "swx-service-locator-instance"
], function (e) {
  function y(e) {
    function _(e) {
      w.push(e.stream.state.changed(function (e) {
        t.isLocalVideoOn(e !== i.mediaStreamState.Stopped);
      }));
    }
    function D(e, n) {
      var r = b.state() === o.CALL_STATES.CONNECTED;
      r && t.participantNotification(h.fetch({
        key: e,
        params: { name: n }
      }));
    }
    function P(e, n) {
      var r = H(e, n);
      T.push(r);
      n ? Y(r, !0) : t.updateLayout();
    }
    function H(n, r) {
      var i = e.selfParticipant === n;
      return f.build({
        conversation: e,
        participant: n,
        isSelfParticipant: i,
        isScreenSharing: r,
        isGroupConversation: e.isGroupConversation,
        isVisible: t.isVisible,
        importance: n.audio.importance,
        contextElement: t.stageElement
      });
    }
    function B(e, n) {
      var r, i;
      T = T.filter(function (t) {
        return t.participant === e && t.isScreenSharing === n ? (N === t ? i = !0 : r = !0, t.dispose(), !1) : !0;
      });
      i && Y(null);
      r && (C && !N.isScreenSharing ? Y(null) : t.updateLayout());
    }
    function j(e) {
      P(e, !1);
      D("callscreen_text_participant_joined_notification", e.person.displayName());
    }
    function F(e) {
      P(e, !0);
      D("callscreen_text_participant_screen_shared_notification", e.person.displayName());
    }
    function I(e) {
      B(e, !1);
      B(e, !0);
      D("callscreen_text_participant_left_notification", e.person.displayName());
    }
    function q(e) {
      B(e, !0);
      D("callscreen_text_participant_screen_unshared_notification", e.person.displayName());
    }
    function R() {
      b.totalCallDuration && t.duration(l.getFormattedDuration(b.totalCallDuration));
    }
    function U() {
      return e.autoCall && e.autoCall();
    }
    function z() {
      return e.autoCall && !e.autoCall();
    }
    function W() {
      var e = U() ? h.fetch({ key: "callscreen_text_autoCallConnectingMessage" }) : "";
      t.callScreenMessageText(e);
    }
    function X() {
      t.callScreenMessageText("");
    }
    function V() {
      z() ? e.autoCall.reason === i.callDisconnectionReason.AutoCallFailed ? t.callScreenMessageText(h.fetch({ key: "callscreen_text_autoCallFailedMessage" })) : e.autoCall.reason === i.callDisconnectionReason.AutoCallTimeout && t.callScreenMessageText(h.fetch({ key: "callscreen_text_autoCallTimeoutMessage" })) : t.callScreenMessageText("");
    }
    function $(e) {
      switch (e) {
      case o.CALL_STATES.CONNECTING:
        t.isCallConnected(!1), W();
        break;
      case o.CALL_STATES.ENDING:
        t.isCallConnected(!1), V(), R();
        break;
      case o.CALL_STATES.CONNECTED:
        t.isCallConnected(!0), L(), X();
      }
    }
    function J() {
      function n(t) {
        return !t || t && (t.width !== e.offsetWidth || t.height !== e.offsetHeight);
      }
      var e = t.stageParticipantsContainer();
      e ? (n(k()) && k({
        width: e.offsetWidth,
        height: e.offsetHeight
      }), t.updateLayout(), t.updateContentWidth(), t.dispatchEvent(c.events.callScreen.VIDEO_CONTAINER_SIZE_CHANGED, null, t.DIRECTION.CHILD)) : k(null);
    }
    function K() {
      t.isVisible(!0);
      L();
    }
    function Q() {
      var e = [];
      return t.canFit() && e.push("fit"), t.avatarSizeClass() && e.push(t.avatarSizeClass()), t.selfParticipantLayoutItem.isInRoster() && e.push(o.CLASSES.LOCAL_PIP_IN_ROSTER), e.join(" ");
    }
    function G() {
      var n = N;
      T.sort(function (e, t) {
        return e === n ? -1 : t === n ? 1 : e.isScreenSharing && !t.isScreenSharing ? -1 : !e.isScreenSharing && t.isScreenSharing ? 1 : e.importance && t.importance ? t.importance - e.importance : e.order < t.order ? 1 : e.order > t.order ? -1 : 0;
      });
      var r, i = T.slice(0);
      i.some(function (e) {
        return e.isScreenSharing ? (r = e.participant, !0) : !1;
      });
      var s = M.getGrid({
        stageDimensions: k(),
        items: i,
        pinnedItem: n,
        selfParticipantLayoutItem: t.selfParticipantLayoutItem,
        conversation: e,
        maxVideos: e.videoService.maxVideos()
      });
      n !== s.itemToPin && Y(s.itemToPin, !0, !1);
      M.update({
        participantsInStage: t.participantsInStage,
        participantsInRoster: t.participantsInRoster,
        grid: s,
        screenSharingParticipant: r
      });
      t.participantsInStage().forEach(function (e) {
        e.appendParticipantComponentToNewContainer(t.stageParticipantsContainer);
      });
      v.arrangeGridItems(s, t.avatarSizeClass);
    }
    function Y(e, n, r) {
      e || (e = null);
      r === undefined && (r = !0);
      N !== e && (N && N.isPinned(!1), e && e.isPinned(!0), N = e, C = e ? !!n : !1, r && t.updateLayout(), t.dispatchEvent(c.events.callScreen.PINNED_PARTICIPANT_CHANGED, e ? e.participant : null, t.DIRECTION.PARENT));
    }
    function Z(e) {
      e = e || {};
      var n = e.shouldBePinned ? e.participant : null;
      t.setPinnedParticipant(n, e.isScreenSharing);
    }
    function et() {
      var t = e.videoService.videoMode();
      return (t === i.videoMode.ActiveSpeaker || t === i.videoMode.Both) && e.isGroupConversation();
    }
    function tt(e) {
      var t = N && C && !N.isScreenSharing;
      if (e && et() && t) {
        var n;
        T.some(function (t) {
          return !t.isScreenSharing && t.participant === e ? (n = t, !0) : !1;
        });
        if (!n)
          return;
        Y(n, !0);
      }
    }
    function nt() {
      t.updateLayout();
    }
    var t = this, r, y, b, w = [], E, S = d.build(e), x = p.build(e), T = [], N, C, k = n.observable(), L = v.executeInAnimationFrame(J), A = g.resolve(c.serviceLocator.PUBSUB), O = n.observable(), M = m.getRenderer(e, O);
    t.conversation = e;
    t.participantsInStage = n.observableArray();
    t.participantsInRoster = n.observableArray();
    t.stageElement = O;
    t.stageParticipantsContainer = n.observable();
    t.isCallConnected = n.observable(!1);
    t.showEndCall = n.observable(!1);
    t.avatarUrl = s.newObservableProperty(e.avatarUrl);
    t.topic = S.topic;
    t.displayName = S.displayName;
    t.isPstn = x.isPstn;
    t.callScreenMessageText = n.observable("");
    t.duration = n.observable("");
    t.participantNotification = n.observable("");
    t.isVisible = n.observable(!0);
    t.selfParticipantLayoutItem = H(e.selfParticipant, !1);
    t.selfParticipantLayoutItem.isInRoster(!0);
    t.isLocalVideoOn = t.selfParticipantLayoutItem.isVideoActive;
    t.isLocalVideoAllowed = t.selfParticipantLayoutItem.videoIsAllowed;
    t.canFit = n.observable(!1);
    t.avatarSizeClass = n.observable("");
    t.mainClass = n.computed(Q);
    t.rosterWidth = n.observable(50);
    t.init = function (n, i, s) {
      E = n;
      E.init(L);
      b = i;
      t.footerButtonsWidth = s;
      e.selfParticipant.video.channels.added(_);
      w.push(t.stageParticipantsContainer.subscribe(L));
      t.selfParticipantLayoutItem.appendParticipantComponentToNewContainer(t.stageElement);
      r = u.build(e);
      r.onParticipantAddedToCall(j);
      r.onParticipantRemovedFromCall(I);
      r.init();
      y = a.build(e);
      y.onScreenSharingStarted(F);
      y.onScreenSharingStopped(q);
      y.init();
      t.forwardEvent(c.events.callScreen.TOGGLE_FULLSCREEN, t.DIRECTION.CHILD, L);
      t.registerEvent(c.events.callScreen.SHOW_CHAT, L);
      t.registerEvent(c.events.callScreen.HIDE_CHAT, L);
      t.registerEvent(c.events.navigation.FRAGMENT_SHOW, K);
      t.registerEvent(c.events.navigation.FRAGMENT_BEFORE_HIDE, t.isVisible.bind(t, !1));
      t.registerEvent(c.events.callScreen.SIDEBAR_TOGGLED, L);
      t.registerEvent(c.events.callScreen.VIDEO_STATE_CHANGED, L);
      t.registerEvent(c.events.callScreen.TOGGLE_NARROW_MENU, L);
      t.registerEvent(c.events.callScreen.ROSTER_WIDTH_CHANGED, t.rosterWidth.bind(t));
      t.registerEvent(c.events.callScreen.TOGGLE_GRID_VIEW, Z.bind(t, null));
      w.push(b.state.subscribe($));
      $(b.state());
      w.push(s.subscribe(t.updateContentWidth));
      w.push(t.rosterWidth.subscribe(t.updateContentWidth));
      w.push(t.participantsInStage.subscribe(function () {
        L();
      }));
      A.subscribe(c.events.callScreen.PINNED_PARTICIPANT_CHANGED, Z);
      et() && w.push(t.conversation.videoService.activeSpeaker.participant.changed(tt));
      w.push(t.conversation.videoService.maxVideos.changed(nt));
      t.updateContentWidth();
      M.setUpdateLayoutCallback(t.updateLayout);
    };
    t.updateLayout = function () {
      b.state() === o.CALL_STATES.CONNECTED && v.executeInAnimationFrame(G)();
    };
    t.updateContentWidth = v.executeInAnimationFrame(function () {
      var e = (E.getContentWidth() - t.footerButtonsWidth()) / 2;
      t.canFit(e > t.rosterWidth());
    });
    t.setPinnedParticipant = function (e, t) {
      var n;
      e && (n = T.filter(function (n) {
        return n.participant === e && n.isScreenSharing === !!t;
      })[0]);
      Y(n);
    };
    t.dispose = function () {
      e.selfParticipant.video.channels.added.off(_);
      E.dispose();
      w.forEach(function (e) {
        e.dispose();
      });
      w = [];
      A.unsubscribe(c.events.callScreen.PINNED_PARTICIPANT_CHANGED, Z);
      r && r.dispose();
      T.forEach(function (e) {
        e.dispose();
      });
      t.selfParticipantLayoutItem.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/eventMixin"), i = e("swx-enums"), s = e("utils/common/cafeObservable"), o = e("swx-constants").CALLING, u = e("services/calling/participantManager"), a = e("services/calling/screenSharingHandler"), f = e("ui/viewModels/calling/callScreenViewModel/participantLayoutItem"), l = e("ui/viewModels/calling/helpers/textFormatter"), c = e("swx-constants").COMMON, h = e("swx-i18n").localization, p = e("ui/viewModels/chat/conversationTile"), d = e("ui/viewModels/chat/conversationTopic"), v = e("ui/viewModels/calling/callScreenViewModel/callScreenLayoutHelper"), m = e("ui/viewModels/calling/callScreenViewModel/renderer"), g = e("swx-service-locator-instance").default;
  return t.assign(y.prototype, r), {
    build: function (e) {
      return new y(e);
    }
  };
});
