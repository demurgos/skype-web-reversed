(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-chat/lib/dateTime", [
      "require",
      "exports",
      "swx-i18n",
      "swx-g11n",
      "swx-constants",
      "swx-browser-globals",
      "swx-pubsub-instance"
    ], e);
}(function (e, t) {
  function d(e) {
    return e === 0 || e > 0 && e !== !0;
  }
  function v(e, n) {
    var i = t.getDate(e);
    return r.globalization.formatDate(i, n);
  }
  function m(e, t) {
    var n = c.time.SHORT, r = e < E(6, t), i = e < t;
    return r ? n = c.date.DAY_MONTH : i && (n = c.date.DAY_ABBREVIATION), n;
  }
  function g(e) {
    var n = t.getDate(e).getFullYear(), r = t.getDate().getFullYear();
    return n === r ? c.date.SHORT_DATE_ABBREVIATION : c.date.DATE_ABBREVIATION;
  }
  function y() {
    var e = t.getDate(), n = e.getTime(), r = e.setHours(24, 0, 0, 0);
    return r - n;
  }
  function b() {
    var e = t.getDate();
    e.setHours(0, 0, 0, 0);
    var n = p < e;
    return n && (p = e), n;
  }
  function w() {
    s.getWindow().setTimeout(function () {
      b() && o["default"].publish(h, null);
      w();
    }, y() + u);
  }
  function E(e, n) {
    n === void 0 && (n = null);
    var r = n ? t.getDate(n) : t.getDate(), i = r.setDate(r.getDate() - e);
    return t.getDate(i).setHours(0, 0, 0, 0);
  }
  var n = e("swx-i18n"), r = e("swx-g11n"), i = e("swx-constants"), s = e("swx-browser-globals"), o = e("swx-pubsub-instance"), u = 1000, a = u * 60, f = a * 60, l = f * 24, c = i.COMMON.globalizationFormatKeys, h = i.COMMON.events.system.DATE_CHANGED, p;
  t.amNotifyingDayChange = !1;
  t.now = function () {
    return s.getWindow().Date.now();
  };
  t.getDate = function (e) {
    e === void 0 && (e = null);
    var t = s.getWindow().Date;
    return e !== null ? new t(e) : new t();
  };
  t.formatDate = function (e) {
    return d(e) ? v(e, g(e)) : "";
  };
  t.formatTimestampShort = function (e) {
    return d(e) ? v(e, c.time.SHORT) : "";
  };
  t.formatTimestamp = function (e, n) {
    n === void 0 && (n = null);
    if (d(e)) {
      var r = n || t.getMidnight(t.getDate().getTime()), i = m(e, r);
      return v(e, i);
    }
    return "";
  };
  t.formatTimestampLong = function (e, r) {
    r === void 0 && (r = null);
    if (d(e)) {
      var i = t.formatTimestampShort(e), s = r || t.getMidnight(t.getDate().getTime());
      return e < s ? n.localization.fetch({
        key: "message_text_longTimeStamp",
        params: {
          date: t.formatDate(e),
          time: i
        }
      }) : i;
    }
    return "";
  };
  t.formatTimestampForceLong = function (e) {
    if (d(e)) {
      var r = t.formatTimestampShort(e);
      return n.localization.fetch({
        key: "message_text_longTimeStamp",
        params: {
          date: t.formatDate(e),
          time: r
        }
      });
    }
    return "";
  };
  t.getDateGroup = function (e) {
    if (d(e)) {
      var i = t.getDate(e), s = t.getMidnight(e), o = t.getDate().setHours(0, 0, 0, 0), u = E(1), a = E(7);
      return s === o ? n.localization.fetch({ key: "today" }) : s === u ? n.localization.fetch({ key: "yesterday" }) : s < a ? n.localization.fetch({ key: "olderThanAWeek" }) : r.globalization.formatDate(i, c.date.DAY_NAME);
    }
    return "";
  };
  t.getMidnight = function (e) {
    return d(e) ? t.getDate(e).setHours(0, 0, 0, 0) : 0;
  };
  t.formatCallDuration = function (e) {
    return r.globalization.formatDuration(e, c.time.CALL_DURATION);
  };
  t.notifyOnDayChange = function () {
    t.amNotifyingDayChange || (t.amNotifyingDayChange = !0, p = t.getDate(), p.setHours(0, 0, 0, 0), w());
  };
  t.getTimeSinceTimestamp = function (e, r) {
    r === void 0 && (r = null);
    r = r || {};
    r.now = r.now || t.now();
    r.key = r.key || "duration";
    if (e && d(e.getTime()) && d(r.now)) {
      var i = r.now - e.getTime();
      return Math.floor(i / l) > 0 ? n.localization.fetch({
        key: r.key + "_days",
        count: Math.floor(i / l),
        params: r.params
      }) : Math.floor(i / f) > 0 ? n.localization.fetch({
        key: r.key + "_hours",
        count: Math.floor(i / f),
        params: r.params
      }) : Math.floor(i / a) > 0 ? n.localization.fetch({
        key: r.key + "_minutes",
        count: Math.floor(i / a),
        params: r.params
      }) : n.localization.fetch({
        key: r.key + "_moment",
        params: r.params
      });
    }
    return "";
  };
}));
