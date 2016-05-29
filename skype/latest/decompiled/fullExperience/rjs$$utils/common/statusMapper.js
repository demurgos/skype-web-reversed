define("utils/common/statusMapper", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "swx-i18n",
  "services/serviceLocator",
  "constants/common"
], function (e, t) {
  function o() {
    return i.resolve(s.serviceLocator.FEATURE_FLAGS).isFeatureOn(s.featureFlags.ENABLE_BUSINESS_PRESENCE_MAPPING);
  }
  function u(e, t) {
    return e.toLowerCase() === t.toLowerCase();
  }
  function a(e, t, r) {
    return e && t === n.endpointType.Mobile && f(r);
  }
  function f(e) {
    return u(e, n.onlineStatus.Online);
  }
  function l(e) {
    return u(e, n.onlineStatus.Hidden) || u(e, n.onlineStatus.Offline);
  }
  function c(e) {
    return u(e, n.onlineStatus.Busy) || u(e, n.onlineStatus.DoNotDisturb) || u(e, n.onlineStatus.OnThePhone);
  }
  function h(e) {
    return u(e, n.onlineStatus.Idle) || u(e, n.onlineStatus.Away) || u(e, n.onlineStatus.BeRightBack) || u(e, n.onlineStatus.OutForLunch);
  }
  function p(e) {
    return u(e, n.onlineStatus.Online);
  }
  var n = e("swx-enums"), r = e("swx-i18n").localization, i = e("services/serviceLocator"), s = e("constants/common");
  t.getStatusIconClass = function (e, t, r) {
    var i;
    return e ? (a(r, t, e) ? i = n.endpointType.Mobile.toLowerCase() : p(e) ? o() ? i = n.onlineStatus.Online.toLowerCase() + "withtick" : i = n.onlineStatus.Online.toLowerCase() : l(e) ? i = n.onlineStatus.Offline.toLowerCase() : h(e) ? i = n.onlineStatus.Idle.toLowerCase() : c(e) ? o() && u(e, n.onlineStatus.Busy) ? i = n.onlineStatus.DoNotDisturb.toLowerCase() : i = n.onlineStatus.Busy.toLowerCase() : i = e.toLowerCase(), i) : "";
  };
  t.getAvailabilityText = function (e) {
    switch (e) {
    case n.onlineStatus.Online:
      return r.fetch({ key: "message_text_presenceAvailable" });
    case n.onlineStatus.Offline:
    case n.onlineStatus.Hidden:
      return r.fetch({ key: "message_text_presenceNotAvailable" });
    case n.onlineStatus.BeRightBack:
    case n.onlineStatus.OutForLunch:
    case n.onlineStatus.Away:
    case n.onlineStatus.Idle:
      return r.fetch({ key: "message_text_presenceAway" });
    case n.onlineStatus.DoNotDisturb:
      if (o())
        return r.fetch({ key: "message_text_presenceDoNotDisturb" });
      return r.fetch({ key: "message_text_presenceBusy" });
    case n.onlineStatus.OnThePhone:
    case n.onlineStatus.Busy:
      return r.fetch({ key: "message_text_presenceBusy" });
    case n.onlineStatus.Unknown:
      return r.fetch({ key: "message_text_presenceUnknown" });
    default:
      return null;
    }
  };
});
