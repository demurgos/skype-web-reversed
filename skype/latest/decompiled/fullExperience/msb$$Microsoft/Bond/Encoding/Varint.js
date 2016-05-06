module.exports = function () {
  function e() {
  }
  return e.GetBytes = function (e) {
    var t = [];
    while (e & 4294967168)
      t.push(e & 127 | 128), e >>>= 7;
    return t.push(e & 127), t;
  }, e;
}()
