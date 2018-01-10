(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-g11n/lib/formatter", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function r(e, t, r) {
    var i = r.calendar, s = r.time, o = i.days, u = i.months;
    return t.replace(n, function (t) {
      var n;
      switch (t) {
      case "dName":
        n = o.names[e.getDay()];
        break;
      case "dAbbr":
        n = o.namesAbbr[e.getDay()];
        break;
      case "mName":
        n = u.names[e.getMonth()];
        break;
      case "mAbbr":
        n = u.namesAbbr[e.getMonth()];
        break;
      case "tt":
        n = e.getHours() < 12 ? s.AM : s.PM;
        break;
      case "yyyy":
        n = e.getFullYear();
        break;
      case "yy":
        n = e.getFullYear() % 100;
        break;
      case "d":
        n = e.getDate();
        break;
      case "dd":
        n = e.getDate(), n.toString().length === 1 && (n = "0" + n);
        break;
      case "M":
        n = e.getMonth() + 1;
        break;
      case "MM":
        n = e.getMonth() + 1, n.toString().length === 1 && (n = "0" + n);
        break;
      case "h":
        n = e.getHours() % 12 || 12;
        break;
      case "hh":
        n = e.getHours() % 12 || 12, n.toString().length === 1 && (n = "0" + n);
        break;
      case "H":
        n = e.getHours();
        break;
      case "HH":
        n = e.getHours(), n.toString().length === 1 && (n = "0" + n);
        break;
      case "m":
        n = e.getMinutes();
        break;
      case "mm":
        n = e.getMinutes(), n.toString().length === 1 && (n = "0" + n);
        break;
      case "s":
        n = e.getSeconds();
        break;
      case "ss":
        n = e.getSeconds(), n.toString().length === 1 && (n = "0" + n);
      }
      return n !== undefined ? n : t.slice(1, t.length - 1);
    });
  }
  function i(e, t) {
    var r, i;
    return s(t) && (r = Math.floor(e / 60 / 60), e -= r * 60 * 60), o(t) && (i = Math.floor(e / 60), e -= i * 60), t.replace(n, function (t) {
      var n;
      switch (t) {
      case "h":
        n = r;
        break;
      case "hh":
        n = r, n.toString().length === 1 && (n = "0" + n);
        break;
      case "H":
        n = r;
        break;
      case "HH":
        n = r, n.toString().length === 1 && (n = "0" + n);
        break;
      case "m":
        n = i;
        break;
      case "mm":
        n = i, n.toString().length === 1 && (n = "0" + n);
        break;
      case "s":
        n = e;
        break;
      case "ss":
        n = e, n.toString().length === 1 && (n = "0" + n);
      }
      return n !== undefined ? n : t.slice(1, t.length - 1);
    });
  }
  function s(e) {
    return /HH|H|hh|h/.test(e);
  }
  function o(e) {
    return /mm|m/.test(e);
  }
  var n = /dName|dAbbr|mName|mAbbr|dd|d|MM|M|yyyy|yy|HH|H|hh|h|mm|m|tt|ss|s|'[^']*'|'[^']*'/g;
  t.formatDate = r;
  t.formatDuration = i;
}));
