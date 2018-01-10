define("ui/viewModels/chat/conversationShareLink", [
  "require",
  "lodash-compat",
  "utils/common/eventMixin",
  "vendor/knockout",
  "swx-constants",
  "swx-service-locator-instance",
  "utils/common/cafeObservable",
  "swx-i18n",
  "ui/telemetry/actions/actionNames",
  "utils/common/outsideClickHandler",
  "swx-utils-chat"
], function (e) {
  function p(e) {
    function v() {
      t.isTooltipOpened(!0);
      l.add("conversationShareLink", m);
      d.recordAction(f.invites.shareButton, e.telemetryContext);
    }
    function m() {
      t.isTooltipOpened(!1);
      l.remove("conversationShareLink");
    }
    function g(e) {
      return e = e || {}, e.conversationOrigin = c.isGuestHostConversation(t.conversationModel.conversationId) ? s.GUEST_HOST : s.NORMAL, e.participantsCount = t.conversationModel.participantsCount(), e;
    }
    function y() {
      return t.conversationModel.uri;
    }
    var t = this, n = o.resolve(i.serviceLocator.FEATURE_FLAGS), p = n.isFeatureOn(i.featureFlags.SPACES), d = o.resolve(i.serviceLocator.ACTION_TELEMETRY);
    t.isTooltipOpened = r.observable(!1);
    t.conversationModel = e.conversationModel;
    t.isJoiningEnabled = t.conversationModel.isJoiningEnabled ? u.newObservableProperty(t.conversationModel.isJoiningEnabled) : r.observable(!0);
    t.telemetryContext = g(e.telemetryContext);
    t.share = function () {
      t.isJoiningEnabled() && !y() && t.dispatchEvent(h.conversation.SHARED, function (e) {
        t.conversationModel = e;
        t.isJoiningEnabled(p);
        t.conversationModel.uri.get();
      });
      v();
    };
    t.joiningDisabledTextStart = function () {
      return a.fetch({ key: "spaces_joining_disabled_message_start" });
    };
    t.joiningDisabledAnchorText = function () {
      return a.fetch({ key: "spaces_joining_disabled_anchor_text" });
    };
    t.joiningDisabledTextEnd = function () {
      return a.fetch({ key: "spaces_joining_disabled_message_end" });
    };
    t.showSettings = function () {
      t.dispatchEvent(h.conversation.OPEN_PROFILE, { editTopic: !1 }, t.DIRECTION.PARENT);
      m();
    };
    t.dispose = function () {
      t.isTooltipOpened() && m();
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/eventMixin"), r = e("vendor/knockout"), i = e("swx-constants").COMMON, s = i.telemetry.conversationOrigin, o = e("swx-service-locator-instance").default, u = e("utils/common/cafeObservable"), a = e("swx-i18n").localization, f = e("ui/telemetry/actions/actionNames"), l = e("utils/common/outsideClickHandler"), c = e("swx-utils-chat").conversation, h = i.events;
  return t.assign(p.prototype, n), p;
});
