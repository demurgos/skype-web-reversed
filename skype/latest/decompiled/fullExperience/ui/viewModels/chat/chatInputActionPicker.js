define("ui/viewModels/chat/chatInputActionPicker", [
  "require",
  "lodash-compat",
  "cafe/applicationInstance",
  "ui/modelHelpers/personHelper",
  "utils/common/eventMixin",
  "vendor/knockout",
  "services/serviceLocator",
  "constants/common",
  "telemetry/chat/mediaPickerTelemetry",
  "services/pubSub/pubSub",
  "utils/common/styleModeHelper",
  "utils/common/outsideClickHandler"
], function (e) {
  function p(e) {
    function b() {
      h.remove("chatInputActionPicker");
    }
    function w() {
      h.add("chatInputActionPicker", E);
    }
    function E() {
      t.isActionPickerOpened(!1);
    }
    function S(e) {
      t.isActionPickerCollapsed(!!e), t.isActionPickerCollapsed() && E();
    }
    function x() {
      v || (f.subscribe(u.events.textarea.HAS_INPUT, S), v = !v);
    }
    function T() {
      v && (f.unsubscribe(u.events.textarea.HAS_INPUT, S), v = !v);
    }
    var t = this, i = o.resolve(u.serviceLocator.FEATURE_FLAGS), p = i.isFeatureOn(u.featureFlags.PHOTO_SHARING_ENABLED), d = i.isFeatureOn(u.featureFlags.FILE_TRANSFER_ENABLED), v = !1, m, g, y;
    t.__internal = { isGuestUser: r.isGuest.bind(null, n.get().personsAndGroupsManager.mePerson) }, t.isActionPickerOpened = s.observable(!1), t.isActionPickerCollapsed = s.observable(!1), t.conversationModel = e.conversationModel, t.isDisabled = e.isDisabled, t.mediaPickerTelemetryEvent = a.build(), t.isPollsFeatureEnabled = s.observable(!1), t.init = function () {
      t.registerEvent(u.events.mediaPicker.CLOSE_PICKER, E), t.forwardEvent(u.events.mediaPicker.POLL_BUTTON_SELECTED, t.DIRECTION.CHILD), l.get().currentMode() === c.WIDE && x(), m = l.get().currentMode.subscribe(function (e) {
        e === c.WIDE ? x() : T();
      }), y = t.isActionPickerOpened.subscribe(function () {
        if (l.get().currentMode() === c.WIDE)
          return;
        t.isActionPickerOpened() ? w() : b();
      }), t.conversationModel.sendPollMessage && (g = t.conversationModel.sendPollMessage.enabled.changed(function (e) {
        t.isPollsFeatureEnabled(e);
      }));
    }, t.triggerActionMenu = function () {
      t.isActionPickerOpened(!t.isActionPickerOpened()), t.isActionPickerOpened() && (t.isActionPickerCollapsed(!1), t.mediaPickerTelemetryEvent.data.paperclipButtonClicked = !0);
    }, t.isPhotoSharingOrFileTransferEnabled = function () {
      return p || d;
    }, t.filePickerIcon = function () {
      if (p && d)
        return "media";
      if (p)
        return "picture";
      if (d)
        return "file";
    }, t.filePickerText = function () {
      if (p && d)
        return "file_transfer_send_photos_and_files";
      if (p)
        return "button_text_filePicker";
      if (d)
        return "file_transfer_share_file";
    }, t.canSendContactCard = function () {
      return i.isFeatureOn(u.featureFlags.SEND_CONTACT_CARD_ENABLED) && !t.__internal.isGuestUser();
    }, t.dispose = function () {
      b(), T(), m.dispose(), y.dispose(), g && g.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("cafe/applicationInstance"), r = e("ui/modelHelpers/personHelper"), i = e("utils/common/eventMixin"), s = e("vendor/knockout"), o = e("services/serviceLocator"), u = e("constants/common"), a = e("telemetry/chat/mediaPickerTelemetry"), f = e("services/pubSub/pubSub"), l = e("utils/common/styleModeHelper"), c = u.styleMode, h = e("utils/common/outsideClickHandler");
  return t.assign(p.prototype, i), {
    build: function (e) {
      return new p(e);
    }
  };
})
