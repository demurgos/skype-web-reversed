define("utils/people/lastSeenConverter", [
  "require",
  "exports",
  "module",
  "swx-i18n",
  "services/g11n/globalization",
  "constants/common",
  "utils/chat/dateTime"
], function (e, t) {
  function f(e) {
    return s.getDate(parseInt(s.now() - e * 60000, 10));
  }
  function l(e) {
    return e.getFullYear() === s.getDate().getFullYear();
  }
  function c(e) {
    return e > u.SEVEN_DAYS;
  }
  function h(e) {
    var t, n, r, i = {};
    for (t = 0; t < o.length; t++) {
      n = o[t];
      i = {};
      if (e > n.max)
        continue;
      r = n.recalculate !== undefined ? Math.floor(e / n.recalculate) : e;
      i.key = n.msg;
      i.params = { number: r };
      break;
    }
    return i;
  }
  var n = e("swx-i18n").localization, r = e("services/g11n/globalization"), i = e("constants/common"), s = e("utils/chat/dateTime"), o = [
      {
        max: 2,
        msg: "presence_lastseen_moments"
      },
      {
        max: 59,
        msg: "presence_lastseen_minutes"
      },
      {
        max: 1439,
        msg: "presence_lastseen_hours",
        recalculate: 60
      },
      {
        max: 10080,
        msg: "presence_lastseen_days",
        recalculate: 1440
      }
    ], u = {
      SEVEN_DAYS: 10080,
      TXT_DATE_SHORT: "presence_lastseen_date_short",
      TXT_DATE_FULL: "presence_lastseen_date_full"
    }, a = i.globalizationFormatKeys;
  t.getMessage = function (e) {
    var t, i, s = {};
    return typeof e != "number" ? "" : (c(e) ? (i = f(e), l(i) ? (s.key = u.TXT_DATE_SHORT, s.params = { shortdate: r.formatDate(i, a.date.DAY_MONTH) }) : (s.key = u.TXT_DATE_FULL, s.params = { fulldate: r.formatDate(i, a.date.DAY_MONTH_YEAR) })) : s = h(e), t = n.fetch(s), t);
  };
});
