define("ui/viewModels/calling/addParticipantsViewModel", [
  "require",
  "lodash-compat",
  "swx-utils-common",
  "swx-constants",
  "swx-constants",
  "swx-utils-chat",
  "utils/common/eventMixin",
  "swx-i18n",
  "vendor/knockout",
  "ui/telemetry/actions/actionNames",
  "swx-service-locator-instance"
], function (e) {
  function c(e, n) {
    function h(e) {
      var t = l.resolve(i.serviceLocator.ACTION_TELEMETRY), n = e ? f.audioVideo.submitParticipantsInGroup : f.audioVideo.submitParticipantsIn1to1;
      t.recordAction(n);
    }
    function p(e) {
      o.closeAddParticipantsDialog();
      n.audioService.transfer(e.id());
    }
    var o = this, c;
    o.DIALOG_NAME = e;
    o.conversation = n;
    o.addParticipantsTitle = u.fetch({ key: "button_text_addParticipants" });
    o.cancelAddParticipantsTitle = u.fetch({ key: "button_text_cancelAddParticipants" });
    o.selectedParticipantsCount = a.observable(0);
    o.setParticipantProvider = function (e) {
      c = e;
      c.selectedContacts.subscribe(function () {
        c && o.DIALOG_NAME === r.CALL_SCREEN_DIALOG.NAME.ADD_PARTICIPANTS && o.selectedParticipantsCount(c.selectedContacts().length);
      });
    };
    o.submitSelectedParticipants = function () {
      var e = c.selectedContacts;
      e().length > 0 && (h(n.isGroupConversation()), s.addPersonsToConversation(e(), n));
      o.closeAddParticipantsDialog();
    };
    o.closeAddParticipantsDialog = function () {
      o.dispatchEvent(i.events.callScreen.TOGGLE_MODAL_DIALOG, o.DIALOG_NAME, o.DIRECTION.PARENT);
    };
    o.init = function () {
      if (e === r.CALL_SCREEN_DIALOG.NAME.TRANSFER_CALL) {
        var n = t.once(p);
        o.registerEvent(i.events.roster.PICKER_CONTACT_SELECTED, n);
      }
      o.forwardEvent(i.events.callScreen.TOGGLE_MODAL_DIALOG, o.DIRECTION.PARENT);
      o.forwardEvent(i.events.roster.ROSTER_QUERY_CHANGED, o.DIRECTION.CHILD);
      o.forwardEvent(i.events.roster.ROSTER_QUERY_EXECUTED, o.DIRECTION.CHILD);
      o.forwardEvent(i.events.roster.ROSTER_SELECTION_REMOVED, o.DIRECTION.CHILD);
      o.forwardEvent(i.events.roster.PICKER_CONTACT_SELECTED, o.DIRECTION.CHILD);
      o.forwardEvent(i.events.roster.PICKER_CONTACT_DESELECTED, o.DIRECTION.CHILD);
    };
    o.dispose = function () {
      c = null;
    };
  }
  var t = e("lodash-compat"), n = e("swx-utils-common").builderMixin, r = e("swx-constants").CALLING, i = e("swx-constants").COMMON, s = e("swx-utils-chat").conversation, o = e("utils/common/eventMixin"), u = e("swx-i18n").localization, a = e("vendor/knockout"), f = e("ui/telemetry/actions/actionNames"), l = e("swx-service-locator-instance").default;
  return t.assign(c, n), t.assign(c.prototype, o), c;
});
