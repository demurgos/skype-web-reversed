(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/presence/presenceMapper", [
      "require",
      "exports",
      "lodash-compat",
      "swx-enums"
    ], e);
}(function (e, t) {
  function s(e) {
    if (n.isString(e)) {
      var t = i[e.toLowerCase()];
      return t === r.onlineStatus.Unknown ? undefined : t;
    }
    return undefined;
  }
  function o(e) {
    var t = r.onlineStatus.Offline.toString().toLowerCase(), n = r.onlineStatus.Idle.toString().toLowerCase(), i = e.toString().toLowerCase();
    return t === i || n === i;
  }
  function u(e) {
    if (!n.isString(e))
      return r.onlineStatus.Hidden;
    var t = i[e.toString().toLowerCase()];
    return t === undefined || t === r.onlineStatus.Unknown || t === r.onlineStatus.Offline ? r.onlineStatus.Hidden : t;
  }
  var n = e("lodash-compat"), r = e("swx-enums"), i = {
      online: r.onlineStatus.Online,
      offline: r.onlineStatus.Offline,
      hidden: r.onlineStatus.Hidden,
      away: r.onlineStatus.Away,
      idle: r.onlineStatus.Idle,
      busy: r.onlineStatus.DoNotDisturb,
      unknown: r.onlineStatus.Unknown,
      berightback: r.onlineStatus.Away,
      donotdisturb: r.onlineStatus.DoNotDisturb,
      onthephone: r.onlineStatus.DoNotDisturb,
      outtolunch: r.onlineStatus.Away
    };
  t.map = s;
  t.canMapToOnline = o;
  t.mapToSelf = u;
}));
