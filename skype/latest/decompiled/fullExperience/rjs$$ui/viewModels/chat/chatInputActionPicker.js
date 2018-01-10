define("ui/viewModels/chat/chatInputActionPicker", [
  "require",
  "lodash-compat",
  "swx-cafe-application-instance",
  "ui/modelHelpers/personHelper",
  "utils/common/eventMixin",
  "vendor/knockout",
  "swx-service-locator-instance",
  "swx-constants",
  "telemetry/chat/mediaPickerTelemetry",
  "utils/common/styleModeHelper",
  "swx-constants",
  "utils/common/eventHelper",
  "utils/common/outsideClickHandler",
  "ui/modelHelpers/conversationHelper",
  "utils/common/accessibility"
], function (e) {
  function m(e) {
    function k(e) {
      e ? v.announce({ key: "accessibility_close_picker" }) : v.announce({ key: "accessibility_open_picker" });
    }
    function L() {
      E && t.isFunction(E.capabilities._contactSend) && E.capabilities._contactSend.changed.off(X);
    }
    function A() {
      E && t.isFunction(E.capabilities._photoSend) && E.capabilities._photoSend.changed.off(V);
    }
    function O() {
      E && t.isFunction(E.capabilities._fileSend) && E.capabilities._fileSend.changed.off($);
    }
    function M() {
      i.conversationModel.participants.changed.off(W);
      E = null;
    }
    function D() {
      p.remove(N);
    }
    function P() {
      i.isActionPickerOpened(!1);
    }
    function H(e) {
      i.isActionPickerCollapsed(!!e);
      i.isActionPickerCollapsed() && P();
    }
    function B() {
      S || (g.subscribe(u.events.textarea.HAS_INPUT, H), S = !S);
    }
    function j() {
      S && (g.unsubscribe(u.events.textarea.HAS_INPUT, H), S = !S);
    }
    function F() {
      return y && !i.__internal.isGuestUser() && (!i.isOneToOneConversationWithAgent() || i.isOneToOneConversationWithAgent() && i.agentHasSendContactsCapability());
    }
    function I() {
      return b && (!i.isOneToOneConversationWithAgent() || i.isOneToOneConversationWithAgent() && i.agentHasSendPhotosCapability());
    }
    function q() {
      return w && (!i.isOneToOneConversationWithAgent() || i.isOneToOneConversationWithAgent() && i.agentHasSendFilesCapability());
    }
    function R() {
      return i.canSendPhotos() || i.canTransferFiles();
    }
    function U() {
      if (i.canSendPhotos() && i.canTransferFiles())
        return "media";
      if (i.canSendPhotos())
        return "picture";
      if (i.canTransferFiles())
        return "file";
    }
    function z() {
      if (i.canSendPhotos() && i.canTransferFiles())
        return "file_transfer_send_photos_and_files";
      if (i.canSendPhotos())
        return "button_text_filePicker";
      if (i.canTransferFiles())
        return "file_transfer_share_file";
    }
    function W() {
      var e;
      L();
      A();
      O();
      e = d.isOneToOneConversationWithAgent(i.conversationModel);
      i.isOneToOneConversationWithAgent(e);
      if (!e) {
        i.agentHasSendContactsCapability(!1);
        i.agentHasSendPhotosCapability(!1);
        i.agentHasSendFilesCapability(!1);
        return;
      }
      E = i.conversationModel.participants()[0].person;
      E && (t.isFunction(E.capabilities._contactSend) && E.capabilities._contactSend.changed(X), t.isFunction(E.capabilities._photoSend) && E.capabilities._photoSend.changed(V), t.isFunction(E.capabilities._fileSend) && E.capabilities._fileSend.changed($));
    }
    function X() {
      E && t.isFunction(E.capabilities._contactSend) && i.agentHasSendContactsCapability(E.capabilities._contactSend());
    }
    function V() {
      E && t.isFunction(E.capabilities._photoSend) && i.agentHasSendPhotosCapability(E.capabilities._photoSend());
    }
    function $() {
      E && t.isFunction(E.capabilities._fileSend) && i.agentHasSendFilesCapability(E.capabilities._fileSend());
    }
    var i = this, m = o.resolve(u.serviceLocator.FEATURE_FLAGS), g = o.resolve(u.serviceLocator.PUBSUB), y = m.isFeatureOn(u.featureFlags.SEND_CONTACT_CARD_ENABLED), b = m.isFeatureOn(u.featureFlags.PHOTO_SHARING_ENABLED), w = m.isFeatureOn(u.featureFlags.FILE_TRANSFER_ENABLED), E, S = !1, x, T, N = "chatInputActionPicker", C;
    i.__internal = { isGuestUser: r.isGuest.bind(null, n.get().personsAndGroupsManager.mePerson) };
    i.isActionPickerOpened = s.observable(!1).extend({ rateLimit: 100 });
    i.isActionPickerCollapsed = s.observable(!1);
    i.conversationModel = e.conversationModel;
    i.isDisabled = e.isDisabled;
    i.isCollapsible = e.isCollapsible;
    i.mediaPickerTelemetryEvent = a.build();
    i.isPollsFeatureEnabled = s.observable(!1);
    i.isOneToOneConversationWithAgent = s.observable(!1);
    i.agentHasSendContactsCapability = s.observable(!1);
    i.canSendContactCard = s.computed(F);
    i.agentHasSendPhotosCapability = s.observable(!1);
    i.canSendPhotos = s.computed(I);
    i.agentHasSendFilesCapability = s.observable(!1);
    i.canTransferFiles = s.computed(q);
    i.isPhotoSharingOrFileTransferEnabled = s.computed(R);
    i.filePickerIcon = s.computed(U);
    i.filePickerText = s.computed(z);
    i.init = function () {
      i.registerEvent(u.events.mediaPicker.CLOSE_PICKER, P);
      i.forwardEvent(u.events.mediaPicker.POLL_BUTTON_SELECTED, i.DIRECTION.CHILD);
      f.get().currentMode() === l.WIDE && B();
      x = f.get().currentMode.subscribe(function (e) {
        e === l.WIDE ? B() : j();
      });
      C = i.isActionPickerOpened.subscribe(function (e) {
        if (f.get().currentMode() === l.WIDE)
          return;
        e ? p.add(N, P) : D();
      });
      i.conversationModel.participants.changed(W);
      i.conversationModel.sendPollMessage && (T = i.conversationModel.sendPollMessage.enabled.changed(function (e) {
        i.isPollsFeatureEnabled(e);
      }));
    };
    i.triggerActionMenu = function () {
      var e = i.isActionPickerOpened();
      k(e);
      i.isActionPickerOpened(!e);
      i.isActionPickerOpened() && (i.isActionPickerCollapsed(!1), i.mediaPickerTelemetryEvent.data.paperclipButtonClicked = !0);
    };
    i.handleKeyDown = function (e, t) {
      var n = h.getKeyCode(t);
      if (n === c.ESCAPE && i.isActionPickerOpened()) {
        t.stopPropagation();
        P();
        return;
      }
      return !0;
    };
    i.dispose = function () {
      D();
      j();
      x.dispose();
      C.dispose();
      T && T.dispose();
      L();
      A();
      O();
      M();
      i.canSendContactCard.dispose();
      i.canSendPhotos.dispose();
      i.canTransferFiles.dispose();
      i.isPhotoSharingOrFileTransferEnabled.dispose();
      i.filePickerIcon.dispose();
      i.filePickerText.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("swx-cafe-application-instance"), r = e("ui/modelHelpers/personHelper"), i = e("utils/common/eventMixin"), s = e("vendor/knockout"), o = e("swx-service-locator-instance").default, u = e("swx-constants").COMMON, a = e("telemetry/chat/mediaPickerTelemetry"), f = e("utils/common/styleModeHelper"), l = u.styleMode, c = e("swx-constants").KEYS, h = e("utils/common/eventHelper"), p = e("utils/common/outsideClickHandler"), d = e("ui/modelHelpers/conversationHelper"), v = e("utils/common/accessibility").narrator;
  return t.assign(m.prototype, i), {
    build: function (e) {
      return new m(e);
    }
  };
});
