define("ui/viewModels/people/blockContactModal", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-i18n",
  "utils/common/eventMixin",
  "ui/modalDialog/modalDialog",
  "swx-constants",
  "ui/modelHelpers/personHelper",
  "ui/viewModels/people/properties/displayNameText",
  "ui/modelHelpers/personActionsHelper",
  "swx-service-locator-instance"
], function (e) {
  function h(e, t) {
    function y() {
      s.hide(c);
      i.actionsInProgress(!1);
    }
    function b() {
      i.actionsInProgress(!1);
    }
    function w() {
      var e = { key: i.isAgent ? "modal_block_agent_text_reportAbuse" : "modal_blockContact_text_reportAbuse" };
      return r.fetch(e);
    }
    function E() {
      return !h.isFeatureOn(o.featureFlags.USE_BUSINESS_WORDING) && i.reportAbuse();
    }
    var i = this, h = l.resolve(o.serviceLocator.FEATURE_FLAGS), p = {
        value: "spam",
        name: r.fetch({ key: "report_abuse_reason_option_spam" }),
        description: ""
      }, d = {
        value: "pornography",
        name: r.fetch({ key: "report_abuse_reason_option_pornography" }),
        description: ""
      }, v = {
        value: "child-exploitation",
        name: r.fetch({ key: "report_abuse_reason_option_child_exploitation" }),
        description: ""
      }, m = {
        value: "harassment",
        name: r.fetch({ key: "report_abuse_reason_option_harassment" }),
        description: ""
      }, g = [
        p,
        d,
        v,
        m
      ];
    t = t || {};
    i.isAgent = u.isAgent(e);
    i.displayName = a.format(e.id(), e.displayName());
    i.avatar = e.avatarUrl();
    i.reportAbuse = n.observable(!1);
    i.reportAbuseText = n.computed(w);
    i.showReportAbuseReason = n.computed(E);
    i.reason = n.observable(p);
    i.reasons = n.observableArray(g);
    i.actionsInProgress = n.observable(!1);
    i.cancel = function () {
      s.hide(c);
    };
    i.blockContact = function () {
      var n, r = { value: i.reportAbuse() };
      return r.value && (r.reason = i.reason().value), i.actionsInProgress(!0), n = f.blockPerson(e, r, t, y, b), n;
    };
    i.dispose = function () {
      i.reportAbuseText.dispose();
      i.showReportAbuseReason.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("utils/common/eventMixin"), s = e("ui/modalDialog/modalDialog"), o = e("swx-constants").COMMON, u = e("ui/modelHelpers/personHelper"), a = e("ui/viewModels/people/properties/displayNameText"), f = e("ui/modelHelpers/personActionsHelper"), l = e("swx-service-locator-instance").default, c = "swx-overlayBlockContact";
  return h.ELEMENT_ID = c, t.assign(h.prototype, i), h;
});
