(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-people/lib/lastSeenConverter", [
      "require",
      "exports",
      "swx-i18n",
      "swx-constants"
    ], e);
}(function (e, t) {
  var n = e("swx-i18n"), r = e("swx-constants"), i = [
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
    ], s = {
      SEVEN_DAYS: 10080,
      TXT_DATE_SHORT: "presence_lastseen_date_short",
      TXT_DATE_FULL: "presence_lastseen_date_full"
    }, o = r.COMMON.globalizationFormatKeys, u = function () {
      function e(e, t) {
        this.dateTime = e;
        this.g11nFormatter = t;
      }
      return e.prototype.getMessage = function (e) {
        var t, r = {};
        return typeof e != "number" ? "" : (this.isMoreThanOneWeek(e) ? (t = this.toDate(e), this.isWithinThisCalendarYear(t) ? (r.key = s.TXT_DATE_SHORT, r.params = { shortdate: this.g11nFormatter.formatDate(t, o.date.DAY_MONTH) }) : (r.key = s.TXT_DATE_FULL, r.params = { fulldate: this.g11nFormatter.formatDate(t, o.date.DAY_MONTH_YEAR) })) : r = this.getLastSeenTranslationOptions(e), n.localization.fetch(r));
      }, e.prototype.toDate = function (e) {
        return this.dateTime.getDate(this.dateTime.now() - e * 60000);
      }, e.prototype.isWithinThisCalendarYear = function (e) {
        return e.getFullYear() === this.dateTime.getDate(null).getFullYear();
      }, e.prototype.isMoreThanOneWeek = function (e) {
        return e > s.SEVEN_DAYS;
      }, e.prototype.getLastSeenTranslationOptions = function (e) {
        var t = {};
        for (var n = 0; n < i.length; n++) {
          var r = i[n];
          t = {};
          if (e > r.max)
            continue;
          var s = r.recalculate !== undefined ? Math.floor(e / r.recalculate) : e;
          t.key = r.msg;
          t.params = { number: s };
          break;
        }
        return t;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = u;
}));
