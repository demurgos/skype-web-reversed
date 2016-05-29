module.exports = function () {
  function e() {
  }
  return e.GetGuid = function () {
    var e = function () {
      return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1, 5);
    };
    return [
      e(),
      e(),
      "-",
      e(),
      "-",
      e(),
      "-",
      e(),
      "-",
      e(),
      e(),
      e()
    ].join("");
  }, e.GetTimeStamp = function () {
    var e = new Date().getTime(), t = new Microsoft.Bond.Int64("0");
    return t.low = e & 4294967295, t.high = Math.floor(e / 4294967296), t;
  }, e.GetTimeStampWithValue = function (e) {
    var t = new Microsoft.Bond.Int64("0");
    return t.low = e & 4294967295, t.high = Math.floor(e / 4294967296), t;
  }, e;
}()
