define("ui/viewModels/chat/shareControl", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "utils/common/eventMixin",
  "constants/common",
  "lodash-compat",
  "constants/keys",
  "services/serviceLocator",
  "utils/common/eventHelper"
], function (e, t) {
  function l(e) {
    function h() {
      var e = r ? r.selectedContacts().length : 0;
      t.isSendButtonDisabled(e === 0);
    }
    if (!e.conversationModel)
      throw new Error("Conversation is not provided");
    var t = this, r = null, o = e.onConfirm, l = e.onCancel, c = a.resolve(i.serviceLocator.PUBSUB);
    t.conversationModel = e.conversationModel;
    t.title = e.title;
    t.description = e.description;
    t.confirmButtonTitleKey = e.confirmButtonTitleKey;
    t.isSendButtonDisabled = n.observable(!0);
    t.setParticipantProvider = function (e) {
      t.selectedContactsSubscription && t.selectedContactsSubscription.dispose();
      r = e;
      t.selectedContactsSubscription = r.selectedContacts.subscribe(h);
      h();
    };
    t.cancel = function () {
      l && l();
      c.publish(s.shareControl.SHARE_CONTROL_HIDE);
    };
    t.confirm = function () {
      var e = [];
      r && r !== null && (e = r.selectedContacts());
      o && o(e);
      c.publish(s.shareControl.SHARE_CONTROL_HIDE);
    };
    t.handleKeyDown = function (e, t) {
      var n = f.getKeyCode(t);
      return n === u.ESCAPE && (e.cancel(), t.stopPropagation()), !0;
    };
    t.forwardEvent(s.roster.PICKER_CONTACT_SELECTED);
    t.forwardEvent(s.roster.PICKER_CONTACT_DESELECTED);
    t.forwardEvent(s.roster.ROSTER_QUERY_CHANGED);
    t.forwardEvent(s.roster.ROSTER_QUERY_EXECUTED);
    t.forwardEvent(s.roster.ROSTER_SELECTION_REMOVED);
  }
  var n = e("vendor/knockout"), r = e("utils/common/eventMixin"), i = e("constants/common"), s = i.events, o = e("lodash-compat"), u = e("constants/keys"), a = e("services/serviceLocator"), f = e("utils/common/eventHelper");
  t.build = function (e) {
    return new l(e);
  };
  o.assign(l.prototype, r);
});
