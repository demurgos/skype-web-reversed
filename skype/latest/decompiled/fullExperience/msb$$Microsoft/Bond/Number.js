module.exports = function () {
  function e() {
  }
  return e.ToByte = function (e) {
    return this.ToUInt8(e);
  }, e.ToInt8 = function (e) {
    var t = (e & 128) << 24 >> 24;
    return e & 127 | t;
  }, e.ToInt16 = function (e) {
    var t = (e & 32768) << 16 >> 16;
    return e & 32767 | t;
  }, e.ToInt32 = function (e) {
    var t = e & 2147483648;
    return e & 2147483647 | t;
  }, e.ToUInt8 = function (e) {
    return e & 255;
  }, e.ToUInt16 = function (e) {
    return e & 65535;
  }, e.ToUInt32 = function (e) {
    return e & 4294967295;
  }, e;
}()
