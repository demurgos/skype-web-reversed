(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/batch", [
      "require",
      "exports",
      "jskype-constants"
    ], e);
}(function (e, t) {
  function o(e) {
    return e ? new s(e) : null;
  }
  var n = e("jskype-constants"), r = n.PEOPLE.batch.MAX_ITEMS, i = n.PEOPLE.batch.MAX_DELAY, s = function () {
      function e(e) {
        this.items = [];
        this.callback = e;
      }
      return e.prototype.add = function (e) {
        window.clearTimeout(this.timerId);
        this.items.push(e);
        this.items.length >= r ? this.releaseBatch() : this.timerId = window.setTimeout(this.releaseBatch.bind(this), i);
      }, e.prototype.clear = function () {
        window.clearTimeout(this.timerId);
        this.items = [];
      }, e.prototype.releaseBatch = function () {
        this.callback(this.items);
        this.items = [];
      }, e;
    }();
  t.Batch = s;
  t.create = o;
}));
