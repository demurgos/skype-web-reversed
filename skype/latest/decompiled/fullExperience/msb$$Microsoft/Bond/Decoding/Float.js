module.exports = function () {
  function e() {
  }
  return e.GetNumber = function (e) {
    if (t.BrowserChecker.IsDataViewSupport()) {
      var n = new DataView(new ArrayBuffer(4));
      for (var r = 0; r < 4; ++r)
        n.setUint8(r, e[r]);
      return n.getFloat32(0, !0);
    }
    return i.ConvertArrayToNumber(e, !1);
  }, e;
}()
