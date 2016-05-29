define("services/g11n/formatter", [], function () {
  function n(e) {
    return /HH|H|hh|h/.test(e);
  }
  function r(e) {
    return /mm|m/.test(e);
  }
  var e = /dName|dAbbr|mName|mAbbr|dd|d|MM|M|yyyy|yy|HH|H|hh|h|mm|m|tt|ss|s|'[^']*'|'[^']*'/g, t = function (t, n, r) {
      var i = r.calendar, s = r.time, o = i.days, u = i.months;
      return n.replace(e, function (e) {
        var n;
        switch (e) {
        case "dName":
          n = o.names[t.getDay()];
          break;
        case "dAbbr":
          n = o.namesAbbr[t.getDay()];
          break;
        case "mName":
          n = u.names[t.getMonth()];
          break;
        case "mAbbr":
          n = u.namesAbbr[t.getMonth()];
          break;
        case "tt":
          n = t.getHours() < 12 ? s.AM : s.PM;
          break;
        case "yyyy":
          n = t.getFullYear();
          break;
        case "yy":
          n = t.getFullYear() % 100;
          break;
        case "d":
          n = t.getDate();
          break;
        case "dd":
          n = t.getDate(), n.toString().length === 1 && (n = "0" + n);
          break;
        case "M":
          n = t.getMonth() + 1;
          break;
        case "MM":
          n = t.getMonth() + 1, n.toString().length === 1 && (n = "0" + n);
          break;
        case "h":
          n = t.getHours() % 12 || 12;
          break;
        case "hh":
          n = t.getHours() % 12 || 12, n.toString().length === 1 && (n = "0" + n);
          break;
        case "H":
          n = t.getHours();
          break;
        case "HH":
          n = t.getHours(), n.toString().length === 1 && (n = "0" + n);
          break;
        case "m":
          n = t.getMinutes();
          break;
        case "mm":
          n = t.getMinutes(), n.toString().length === 1 && (n = "0" + n);
          break;
        case "s":
          n = t.getSeconds();
          break;
        case "ss":
          n = t.getSeconds(), n.toString().length === 1 && (n = "0" + n);
        }
        return n !== undefined ? n : e.slice(1, e.length - 1);
      });
    }, i = function (t, i) {
      var s, o;
      return n(i) && (s = Math.floor(t / 60 / 60), t -= s * 60 * 60), r(i) && (o = Math.floor(t / 60), t -= o * 60), i.replace(e, function (e) {
        var n;
        switch (e) {
        case "h":
          n = s;
          break;
        case "hh":
          n = s, n.toString().length === 1 && (n = "0" + n);
          break;
        case "H":
          n = s;
          break;
        case "HH":
          n = s, n.toString().length === 1 && (n = "0" + n);
          break;
        case "m":
          n = o;
          break;
        case "mm":
          n = o, n.toString().length === 1 && (n = "0" + n);
          break;
        case "s":
          n = t;
          break;
        case "ss":
          n = t, n.toString().length === 1 && (n = "0" + n);
        }
        return n !== undefined ? n : e.slice(1, e.length - 1);
      });
    };
  return {
    formatDate: t,
    formatDuration: i
  };
});
