(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/cancelation", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function s(e, t) {
    return Promise.race([
      Promise.resolve(e),
      t
    ]);
  }
  function o(e, t) {
    if (!t || !e || !n.isObject(e))
      return Promise.resolve(e);
    var r = e;
    if (n.isFunction(r.makeCancelable))
      return r.makeCancelable(t);
    var i = e;
    return n.isFunction(i.then) ? s(i, t) : undefined;
  }
  function u(e) {
    if (!e || !n.isObject(e) || !n.isFunction(e.abort))
      return e;
    var t = e;
    return t.makeCancelable = function (e) {
      var t = this, n;
      return e["catch"](function (e) {
        n = e;
        t.abort();
      }), Promise.resolve(this)["catch"](function (t) {
        throw e.isCanceled ? (n.innerException = t, n) : t;
      });
    }, t;
  }
  function a() {
    return new r();
  }
  var n = e("lodash-compat"), r = function () {
      function e() {
      }
      return e.prototype.getToken = function () {
        var e = this, t = function () {
            var t = new Promise(function (t, n) {
              e.rejectTokenFn = n;
            });
            return Object.defineProperty(t, "isCanceled", {
              get: function () {
                return e.isCanceled;
              }
            }), t.throwIfCanceled = function () {
              if (e.isCanceled)
                throw new i();
            }, e.isCanceled = !1, t;
          };
        return this.token = this.token || t(), this.token;
      }, e.prototype.cancel = function (e) {
        e = e || new i();
        this.token || this.getToken();
        if (this.isCanceled)
          throw new Error("The token is already canceled");
        this.isCanceled = !0;
        this.rejectTokenFn(e);
      }, e;
    }();
  t.CancelationTokenFactory = r;
  var i = function (e) {
    function t() {
      return e.call(this, "Operation canceled") || this;
    }
    return __extends(t, e), t;
  }(Error);
  t.OperationCanceledError = i;
  t.makeCancelablePromise = s;
  t.makeCancelable = o;
  t.adaptAbortable = u;
  t.cancelableOperation = a;
}));
