define("utils/common/statusMapper", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "swx-i18n",
  "swx-service-locator-instance",
  "swx-constants"
], function (e, t) {
  function o() {
    return i.resolve(s.serviceLocator.FEATURE_FLAGS).isFeatureOn(s.featureFlags.USE_BUSINESS_WORDING);
  }
  function u(e, t) {
    return e.toLowerCase() === t.toLowerCase();
  }
  function a(e, t) {
    return e && t === n.endpointType.Mobile;
  }
  function f(e) {
    return u(e, n.onlineStatus.Hidden) || u(e, n.onlineStatus.Offline);
  }
  function l(e) {
    return u(e, n.onlineStatus.Busy) || u(e, n.onlineStatus.OnThePhone);
  }
  function c(e) {
    return u(e, n.onlineStatus.DoNotDisturb);
  }
  function h(e) {
    return u(e, n.onlineStatus.Idle) || u(e, n.onlineStatus.Away) || u(e, n.onlineStatus.BeRightBack) || u(e, n.onlineStatus.OutForLunch);
  }
  function p(e) {
    return u(e, n.onlineStatus.Online);
  }
  var n = e("swx-enums"), r = e("swx-i18n").localization, i = e("swx-service-locator-instance").default, s = e("swx-constants").COMMON;
  t.getStatusIconClass = function (e, t, r) {
    var i;
    return e ? (p(e) ? i = n.onlineStatus.Online.toLowerCase() : f(e) ? i = n.onlineStatus.Offline.toLowerCase() : h(e) ? i = a(r, t) ? n.endpointType.Mobile.toLowerCase() : n.onlineStatus.Idle.toLowerCase() : l(e) ? i = n.onlineStatus.Busy.toLowerCase() : c(e) ? i = n.onlineStatus.DoNotDisturb.toLowerCase() : i = e.toLowerCase(), i) : "";
  };
  t.getAvailabilityText = function (e, t, i) {
    switch (e) {
    case n.onlineStatus.Online:
      return o() ? r.fetch({ key: "message_text_presenceAvailable" }) : r.fetch({ key: "message_text_presenceOnline" });
    case n.onlineStatus.Offline:
    case n.onlineStatus.Hidden:
      return r.fetch({ key: "message_text_presenceOffline" });
    case n.onlineStatus.BeRightBack:
    case n.onlineStatus.OutForLunch:
    case n.onlineStatus.Away:
    case n.onlineStatus.Idle:
      return a(i, t) ? r.fetch({ key: "message_text_presenceMobile" }) : r.fetch({ key: "message_text_presenceAway" });
    case n.onlineStatus.DoNotDisturb:
      return r.fetch({ key: "message_text_presenceDoNotDisturb" });
    case n.onlineStatus.OnThePhone:
    case n.onlineStatus.Busy:
      return r.fetch({ key: "message_text_presenceBusy" });
    case n.onlineStatus.Unknown:
      return r.fetch({ key: "message_text_presenceUnknown" });
    default:
      return null;
    }
  };
  t.getMeAvailabilityText = function (e) {
    switch (e) {
    case n.onlineStatus.Online:
      return r.fetch({ key: "message_text_presenceOnline" });
    case n.onlineStatus.Offline:
      return r.fetch({ key: "message_text_presenceOffline" });
    case n.onlineStatus.Hidden:
      return r.fetch({ key: "message_text_presenceHidden" });
    case n.onlineStatus.BeRightBack:
    case n.onlineStatus.OutForLunch:
    case n.onlineStatus.Away:
    case n.onlineStatus.Idle:
      return r.fetch({ key: "message_text_presenceAway" });
    case n.onlineStatus.DoNotDisturb:
      return r.fetch({ key: "message_text_presenceDoNotDisturb" });
    case n.onlineStatus.OnThePhone:
    case n.onlineStatus.Busy:
      return r.fetch({ key: "message_text_presenceBusy" });
    default:
      return null;
    }
  };
  t.isNotificationOn = function (e) {
    return p(e) || h(e);
  };
});
