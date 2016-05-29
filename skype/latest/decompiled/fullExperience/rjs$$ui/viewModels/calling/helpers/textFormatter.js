define("ui/viewModels/calling/helpers/textFormatter", [], function () {
  function e(e) {
    var n = [], r = Math.floor(e / 1000 / 60 / 60);
    e -= r * 1000 * 60 * 60;
    var i = Math.floor(e / 1000 / 60);
    e -= i * 1000 * 60;
    var s = Math.floor(e / 1000);
    return r && n.push(t(r)), n.push(t(i)), n.push(t(s)), n.join(":");
  }
  function t(e) {
    return e = e.toString(), e.length > 1 ? e : "0" + e;
  }
  return { getFormattedDuration: e };
});
