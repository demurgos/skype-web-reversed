define("utils/chat/dateTime", [
  "require",
  "swx-i18n",
  "services/g11n/globalization",
  "constants/common",
  "browser/window",
  "services/pubSub/pubSub"
], function (e) {
  function d(e) {
    return e === 0 || e > 0;
  }
  function v(e, t) {
    var r = p.getDate(e);
    return n.formatDate(r, t);
  }
  function m(e, t) {
    var n = l.time.SHORT, r = e < E(6, t), i = e < t;
    return r ? n = l.date.DAY_MONTH : i && (n = l.date.DAY_ABBREVIATION), n;
  }
  function g(e) {
    var t = p.getDate(e).getFullYear(), n = p.getDate().getFullYear();
    return t === n ? l.date.SHORT_DATE_ABBREVIATION : l.date.DATE_ABBREVIATION;
  }
  function y() {
    var e = p.getDate(), t = e.getTime(), n = e.setHours(24, 0, 0, 0);
    return n - t;
  }
  function b() {
    var e = p.getDate();
    e.setHours(0, 0, 0, 0);
    var t = h < e;
    return t && (h = e), t;
  }
  function w() {
    i.setTimeout(function () {
      b() && s.publish(c);
      w();
    }, y() + o);
  }
  function E(e, t) {
    var n = t ? p.getDate(t) : p.getDate(), r = n.setDate(n.getDate() - e);
    return p.getDate(r).setHours(0, 0, 0, 0);
  }
  var t = e("swx-i18n").localization, n = e("services/g11n/globalization"), r = e("constants/common"), i = e("browser/window"), s = e("services/pubSub/pubSub"), o = 1000, u = o * 60, a = u * 60, f = a * 24, l = r.globalizationFormatKeys, c = r.events.system.DATE_CHANGED, h, p;
  return p = {
    amNotifyingDayChange: !1,
    now: function () {
      return i.Date.now();
    },
    getDate: function () {
      return arguments.length === 1 ? new i.Date(arguments[0]) : new i.Date();
    },
    formatDate: function (e) {
      return d(e) ? v(e, g(e)) : "";
    },
    formatTimestampShort: function (e) {
      return d(e) ? v(e, l.time.SHORT) : "";
    },
    formatTimestamp: function (e, t) {
      if (d(e)) {
        var n = t || this.getMidnight(p.getDate().getTime()), r = m(e, n);
        return v(e, r);
      }
      return "";
    },
    getDateGroup: function (e) {
      if (d(e)) {
        var r = p.getDate(e), i = this.getMidnight(e), s = p.getDate().setHours(0, 0, 0, 0), o = E(1), u = E(7);
        return i === s ? t.fetch({ key: "today" }) : i === o ? t.fetch({ key: "yesterday" }) : i < u ? t.fetch({ key: "olderThanAWeek" }) : n.formatDate(r, l.date.DAY_NAME);
      }
      return "";
    },
    getMidnight: function (e) {
      return d(e) ? p.getDate(e).setHours(0, 0, 0, 0) : 0;
    },
    formatCallDuration: function (e) {
      return n.formatDuration(e, l.time.CALL_DURATION);
    },
    notifyOnDayChange: function () {
      this.amNotifyingDayChange || (this.amNotifyingDayChange = !0, h = p.getDate(), h.setHours(0, 0, 0, 0), w());
    },
    getTimeSinceTimestamp: function (e, n) {
      n = n || {};
      n.now = n.now || p.now();
      n.key = n.key || "duration";
      if (d(e) && d(n.now)) {
        var r = n.now - e;
        return Math.floor(r / f) > 0 ? t.fetch({
          key: n.key + "_days",
          count: Math.floor(r / f),
          params: n.params
        }) : Math.floor(r / a) > 0 ? t.fetch({
          key: n.key + "_hours",
          count: Math.floor(r / a),
          params: n.params
        }) : Math.floor(r / u) > 0 ? t.fetch({
          key: n.key + "_minutes",
          count: Math.floor(r / u),
          params: n.params
        }) : t.fetch({
          key: n.key + "_moment",
          params: n.params
        });
      }
      return "";
    }
  }, p;
});
