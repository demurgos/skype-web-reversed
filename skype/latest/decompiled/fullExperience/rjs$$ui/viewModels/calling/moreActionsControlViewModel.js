define("ui/viewModels/calling/moreActionsControlViewModel", [
  "require",
  "lodash-compat",
  "utils/common/eventMixin",
  "vendor/knockout",
  "ui/viewModels/calling/baseCallControlViewModel",
  "ui/telemetry/actions/actionNames",
  "swx-constants",
  "swx-constants",
  "swx-service-locator-instance",
  "ui/contextMenu/items/all",
  "ui/contextMenu/contextMenu",
  "ui/telemetry/actions/actionSources",
  "utils/common/cafeObservable",
  "swx-enums",
  "swx-i18n"
], function (e) {
  function v(e) {
    function k() {
      return n.isFeatureOn(o.featureFlags.AUDIO_VIDEO_SETTINGS_SUPPORT);
    }
    function L(e) {
      var t = a.resolve(o.serviceLocator.ACTION_TELEMETRY);
      t.recordAction(e);
    }
    function A() {
      l.hide();
    }
    function O() {
      t.dispatchEvent(o.events.callScreen.TOGGLE_MODAL_DIALOG, u.CALL_SCREEN_DIALOG.NAME.SCREEN_SHARING_PREVIEW, t.DIRECTION.PARENT);
      L(s.audioVideo.shareScreenPreview);
    }
    function M() {
      e.screenSharingService.start();
      L(s.audioVideo.shareScreen);
    }
    function _() {
      e.screenSharingService.stop();
      L(s.audioVideo.stopSharingScreen);
    }
    var t = this, n = a.resolve(o.serviceLocator.FEATURE_FLAGS), v = r.observable(!0), m = h.newObservableProperty(e.selfParticipant.audio.state), g = h.newObservableProperty(e.participants.add.enabled), y = h.newObservableProperty(e.screenSharingService.start.enabled), b = h.newObservableProperty(e.screenSharingService.stop.enabled), w, E, S, x, T = d.fetch({ key: "callscreen_text_shareScreens" }), N = d.fetch({ key: "callscreen_text_stopSharingScreen" });
    i.call(t, e, v);
    t.addParticipantText = d.fetch({ key: "callscreen_text_addParticipants" });
    t.moreActionsText = d.fetch({ key: "callscreen_text_plusButton" });
    t.screenShareText = r.pureComputed(function () {
      return y() || !b() ? T : N;
    });
    t.avSettingsText = d.fetch({ key: "callscreen_text_showAVSettings" });
    t.isAddingParticipantsAllowed = r.pureComputed(function () {
      return g() && m() === p.callConnectionState.Connected;
    });
    t.isScreenSharingAllowed = r.pureComputed(function () {
      return y() || b();
    });
    t.isMoreActionsButtonEnabled = r.pureComputed(function () {
      return (t.isAddingParticipantsAllowed() || t.isScreenSharingAllowed() || k()) && t.isCallControlEnabled();
    });
    t.showMoreActionsMenu = function (r, i) {
      var u = 5, a = [
          f.AddParticipantsMenuItem.build(function () {
            return !t.isAddingParticipantsAllowed();
          }, t.addParticipants),
          f.ShareScreen.build(function () {
            return !t.isScreenSharingAllowed();
          }, y(), t.shareScreen),
          f.AVSettings.build(function () {
            return !k();
          }, t.avSettings),
          f.TransferCall.build(function () {
            return !n.isFeatureOn(o.featureFlags.TRANSFER_CALL);
          }, t.transferCall)
        ], h = {
          source: c.recentItem,
          isGroupConversation: e.isGroupConversation()
        };
      i.customClientOptions = {
        offsetElement: i.target,
        position: p.contextMenuPosition.Top,
        offset: u
      };
      l.show(a, i, h);
      L(s.audioVideo.moreActions);
    };
    t.addParticipants = function () {
      t.dispatchEvent(o.events.callScreen.TOGGLE_MODAL_DIALOG, u.CALL_SCREEN_DIALOG.NAME.ADD_PARTICIPANTS, t.DIRECTION.PARENT);
      L(s.audioVideo.addParticipants);
    };
    t.shareScreen = function () {
      y() ? n.isFeatureOn(o.featureFlags.OUTGOING_SCREEN_SHARING_PREVIEW) ? O() : M() : b() && _();
    };
    t.avSettings = function () {
      t.dispatchEvent(o.events.callScreen.TOGGLE_MODAL_DIALOG, u.CALL_SCREEN_DIALOG.NAME.AV_SETTINGS, t.DIRECTION.PARENT);
    };
    t.transferCall = function () {
      t.dispatchEvent(o.events.callScreen.TOGGLE_MODAL_DIALOG, u.CALL_SCREEN_DIALOG.NAME.TRANSFER_CALL, t.DIRECTION.PARENT);
    };
    w = g.subscribe(A);
    E = y.subscribe(A);
    S = b.subscribe(A);
    x = l.isVisible.subscribe(function (e) {
      e ? t.dispatchEvent(o.events.callScreen.MORE_ACTION_MENU_VISIBLE, null, t.DIRECTION.PARENT) : t.dispatchEvent(o.events.callScreen.MORE_ACTION_MENU_HIDDEN, null, t.DIRECTION.PARENT);
    });
    var C = t.dispose;
    t.dispose = function () {
      w && w.dispose();
      E && E.dispose();
      S && S.dispose();
      m.dispose();
      g.dispose();
      y.dispose();
      b.dispose();
      x.dispose();
      C.call(t);
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/eventMixin"), r = e("vendor/knockout"), i = e("ui/viewModels/calling/baseCallControlViewModel"), s = e("ui/telemetry/actions/actionNames"), o = e("swx-constants").COMMON, u = e("swx-constants").CALLING, a = e("swx-service-locator-instance").default, f = e("ui/contextMenu/items/all"), l = e("ui/contextMenu/contextMenu"), c = e("ui/telemetry/actions/actionSources"), h = e("utils/common/cafeObservable"), p = e("swx-enums"), d = e("swx-i18n").localization;
  return v.prototype = Object.create(i.prototype), v.prototype.constructor = v, t.assign(v.prototype, n), {
    build: function (e) {
      return new v(e);
    }
  };
});
