module.exports = function () {
  function t() {
  }
  return t.DecodeZigzag16 = function (e) {
    return ((65535 & e) >>> 1 ^ -(e & 1)) << 16 >> 16;
  }, t.DecodeZigzag32 = function (e) {
    return e >>> 1 ^ -(e & 1);
  }, t.DecodeZigzag64 = function (t) {
    var n = t.high & 1, r = t.high >>> 1, i = t.low & 1, s = t.low >>> 1;
    s = n << 31 | s, i && (s ^= 4294967295, r ^= 4294967295);
    var o = new e.Bond.UInt64("0");
    return o.low = s, o.high = r, o;
  }, t;
}()
