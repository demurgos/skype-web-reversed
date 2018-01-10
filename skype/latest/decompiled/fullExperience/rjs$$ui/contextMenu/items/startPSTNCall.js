define("ui/contextMenu/items/startPSTNCall", [
  "require",
  "ui/contextMenu/items/baseCallingMenuItem",
  "swx-i18n",
  "swx-service-locator-instance",
  "swx-constants",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "constants/cssClasses",
  "swx-enums",
  "swx-cafe-application-instance",
  "telemetry/calling/pstn/pstn",
  "swx-constants",
  "swx-utils-common",
  "lodash-compat"
], function (e) {
  function d(e, n, h, p) {
    var m, g, y = this;
    m = v(n);
    g = u.contextMenu.items.START_PSTN_CALL;
    t.call(y, d.TYPE, m, g, e, h, p);
    y.featuresAreEnabled = function () {
      var e = r.resolve(i.serviceLocator.FEATURE_FLAGS);
      return e.isFeatureOn(i.featureFlags.PSTN_ENABLED);
    };
    y.mePersonHasCallingCapability = function () {
      return f.get().personsAndGroupsManager.mePerson.capabilities.audio();
    };
    y.personHasSkypeCallingCapability = function () {
      return !0;
    };
    y.getCallingService = function (e) {
      return e.audioService;
    };
    y.getDefaultTelemetrySource = function () {
      return o.contextMenuItem.startPSTNCall;
    };
    y.getTelemetryActionName = function () {
      return s.audioVideo.pstnCall;
    };
    y.addTelemetryContextData = function (e) {
      if (!e.phoneNumberType) {
        var t = n.type() || a.phoneType.Other;
        e.phoneNumberType = t;
      }
    };
    y.setCallingServiceEndpoint = function (e) {
      var t = e.participants(0);
      t.audio.endpoint(n.telUri());
    };
    y.sendFeatureTelemetry = function () {
      var e;
      p.parent === o.conversation.header.button ? e = c.entryPoint.CONVERSATION : p.parent === o.contactsPage.contact ? e = c.entryPoint.CONTACT_LIST : p.parent === o.recentItem ? e = c.entryPoint.RECENTS : p.parent === o.searchItem.addressBook && (e = c.entryPoint.SEARCH);
      l.initiatingPSTNCall(e);
    };
  }
  function v(e) {
    var t = e.type(), r = h.forceLTREmbedding(e.displayString());
    return t && m(t) && t !== a.phoneType.Other ? n.fetch({
      key: "label_text_call_phone_number_" + t.toLowerCase(),
      params: { phoneNumber: r }
    }) : n.fetch({
      key: "label_text_call_phone_number",
      params: { phoneNumber: r }
    });
  }
  function m(e) {
    var t = !1;
    return p.forOwn(a.phoneType, function (n) {
      n === e && (t = !0);
    }), t;
  }
  var t = e("ui/contextMenu/items/baseCallingMenuItem"), n = e("swx-i18n").localization, r = e("swx-service-locator-instance").default, i = e("swx-constants").COMMON, s = e("ui/telemetry/actions/actionNames"), o = e("ui/telemetry/actions/actionSources"), u = e("constants/cssClasses"), a = e("swx-enums"), f = e("swx-cafe-application-instance"), l = e("telemetry/calling/pstn/pstn"), c = e("swx-constants").COMMON.telemetry.pstn, h = e("swx-utils-common").stringUtils, p = e("lodash-compat");
  return d.prototype = Object.create(t.prototype), d.TYPE = "StartPSTNCallMenuItem", d;
});
