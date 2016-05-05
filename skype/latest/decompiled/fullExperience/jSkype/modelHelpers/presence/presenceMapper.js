define("jSkype/modelHelpers/presence/presenceMapper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-enums",
  "jSkype/settings",
  "constants/common"
], function (e, t) {
  var n = e("lodash-compat"), r = e("swx-enums"), i = e("jSkype/settings"), s = e("constants/common"), o = {
      online: r.onlineStatus.Online,
      offline: r.onlineStatus.Offline,
      hidden: r.onlineStatus.Hidden,
      away: r.onlineStatus.Online,
      idle: r.onlineStatus.Online,
      busy: r.onlineStatus.Busy,
      unknown: r.onlineStatus.Unknown,
      berightback: r.onlineStatus.Online,
      donotdisturb: r.onlineStatus.Busy,
      onthephone: r.onlineStatus.Busy,
      outtolunch: r.onlineStatus.Online
    };
  t.map = function (e) {
    if (n.isString(e)) {
      var t = o[e.toLowerCase()];
      return t === r.onlineStatus.Unknown ? undefined : t;
    }
  }, t.toCafeStatus = function (e) {
    return r.onlineStatus[n.capitalize(e)];
  }, t.canMapToOnline = function (e) {
    var t = r.onlineStatus.Offline.toLowerCase(), n = r.onlineStatus.Idle.toLowerCase();
    return e = e.toLowerCase(), t === e || n === e;
  }, t.mapToSelf = function (e) {
    if (!n.isString(e))
      return r.onlineStatus.Hidden;
    if (i.isFeatureOn(s.featureFlags.NEW_SELF_PRESENCE)) {
      var t = o[e.toLowerCase()];
      return t === undefined || t === r.onlineStatus.Unknown || t === r.onlineStatus.Offline ? r.onlineStatus.Hidden : t;
    }
    return e.toLowerCase() === r.onlineStatus.Online.toLowerCase() ? r.onlineStatus.Online : r.onlineStatus.Hidden;
  };
})
