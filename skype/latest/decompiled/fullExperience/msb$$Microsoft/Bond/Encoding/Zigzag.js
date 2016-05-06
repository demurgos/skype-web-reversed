module.exports = function () {
  function e() {
  }
  return e.EncodeZigzag16 = function (e) {
    return e = t.Number.ToInt16(e), e << 1 ^ e >> 15;
  }, e.EncodeZigzag32 = function (e) {
    return e = t.Number.ToInt32(e), e << 1 ^ e >> 31;
  }, e.EncodeZigzag64 = function (e) {
    var n = e.low, r = e.high, i = r << 1 | n >>> 31, s = n << 1;
    r & 2147483648 && (i = ~i, s = ~s);
    var o = new t.UInt64("0");
    return o.low = s, o.high = i, o;
  }, e;
}()
