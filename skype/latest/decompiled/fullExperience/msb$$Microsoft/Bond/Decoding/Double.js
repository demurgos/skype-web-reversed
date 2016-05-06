module.exports = function () {
  function e() {
  }
  return e.GetNumber = function (e) {
    if (t.BrowserChecker.IsDataViewSupport()) {
      var n = new DataView(new ArrayBuffer(8));
      for (var r = 0; r < 8; ++r)
        n.setUint8(r, e[r]);
      return n.getFloat64(0, !0);
    }
    return i.ConvertArrayToNumber(e, !0);
  }, e;
}()
