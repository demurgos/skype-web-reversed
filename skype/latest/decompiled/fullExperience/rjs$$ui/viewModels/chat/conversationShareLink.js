define("ui/viewModels/chat/conversationShareLink", [
  "require",
  "lodash-compat",
  "utils/common/eventMixin",
  "vendor/knockout",
  "constants/common",
  "services/serviceLocator",
  "utils/common/cafeObservable",
  "swx-i18n",
  "ui/telemetry/actions/actionNames",
  "utils/common/outsideClickHandler"
], function (e) {
  function c(e) {
    function p() {
      t.isTooltipOpened(!0);
      f.add("conversationShareLink", d);
      h.recordAction(a.invites.shareButton, e.telemetryContext);
    }
    function d() {
      t.isTooltipOpened(!1);
      f.remove("conversationShareLink");
    }
    function v() {
      return t.conversationModel.uri;
    }
    var t = this, n = s.resolve(i.serviceLocator.FEATURE_FLAGS), c = n.isFeatureOn(i.featureFlags.SPACES), h = s.resolve(i.serviceLocator.ACTION_TELEMETRY);
    t.isTooltipOpened = r.observable(!1);
    t.conversationModel = e.conversationModel;
    t.isJoiningEnabled = t.conversationModel.isJoiningEnabled ? o.newObservableProperty(t.conversationModel.isJoiningEnabled) : r.observable(!0);
    t.telemetryContext = e.telemetryContext;
    t.share = function () {
      t.isJoiningEnabled() && !v() && t.dispatchEvent(l.conversation.SHARED, function (e) {
        t.conversationModel = e;
        t.isJoiningEnabled(c);
        t.conversationModel.uri.get();
      });
      p();
    };
    t.joiningDisabledTextStart = function () {
      return u.fetch({ key: "spaces_joining_disabled_message_start" });
    };
    t.joiningDisabledAnchorText = function () {
      return u.fetch({ key: "spaces_joining_disabled_anchor_text" });
    };
    t.joiningDisabledTextEnd = function () {
      return u.fetch({ key: "spaces_joining_disabled_message_end" });
    };
    t.showSettings = function () {
      t.dispatchEvent(l.conversation.OPEN_PROFILE, { editTopic: !1 }, t.DIRECTION.PARENT);
      d();
    };
    t.dispose = function () {
      t.isTooltipOpened() && d();
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/eventMixin"), r = e("vendor/knockout"), i = e("constants/common"), s = e("services/serviceLocator"), o = e("utils/common/cafeObservable"), u = e("swx-i18n").localization, a = e("ui/telemetry/actions/actionNames"), f = e("utils/common/outsideClickHandler"), l = i.events;
  return t.assign(c.prototype, n), c;
});
