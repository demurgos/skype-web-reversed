module.exports = function () {
  function e(e) {
    this.low = 0, this.high = 0, this.low = parseInt(e), this.low < 0 && (this.high = -1);
  }
  return e.prototype.Equals = function (t) {
    var n = new e(t);
    return this.low == n.low && this.high == n.high;
  }, e;
}()
