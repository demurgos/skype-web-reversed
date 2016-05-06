module.exports = function () {
  function e() {
  }
  return e.GetBytes = function (e) {
    if (t.BrowserChecker.IsDataViewSupport()) {
      var n = new DataView(new ArrayBuffer(4));
      n.setFloat32(0, e, !0);
      var r = [];
      for (var s = 0; s < 4; ++s)
        r.push(n.getUint8(s));
      return r;
    }
    return i.ConvertNumberToArray(e, !1);
  }, e;
}()
