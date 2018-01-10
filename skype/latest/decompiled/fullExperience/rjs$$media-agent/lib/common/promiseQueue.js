(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/promiseQueue", [
      "require",
      "exports",
      "./settablePromise"
    ], e);
}(function (e, t) {
  var n = e("./settablePromise"), r = function () {
      function e(e) {
        this.logger = e;
        this.queue = Promise.resolve();
        this.logger.createChild("queue");
      }
      return e.prototype.add = function (e) {
        var t = this, r;
        return e instanceof n.SettablePromise ? r = function () {
          return e.promise();
        } : r = e, this.queue = this.queue.then(r)["catch"](function (e) {
          t.logger.error("Error! ", e);
        }), this.queue;
      }, e;
    }();
  t.PromiseQueue = r;
}));
