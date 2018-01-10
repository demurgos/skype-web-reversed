define("ui/viewModels/calling/helpers/textFormatter", [], function () {
  function e(e, n) {
    var r = [], i = Math.floor(e / 1000 / 60 / 60);
    e -= i * 1000 * 60 * 60;
    var s = Math.floor(e / 1000 / 60);
    e -= s * 1000 * 60;
    var o = Math.floor(e / 1000);
    return i && r.push(t(i)), r.push(t(s)), (!n || !i) && r.push(t(o)), r.join(":");
  }
  function t(e) {
    return e = e.toString(), e.length > 1 ? e : "0" + e;
  }
  return { getFormattedDuration: e };
});
