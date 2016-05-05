define("utils/common/cancelation", [
  "require",
  "exports",
  "module",
  "lodash-compat"
], function (e, t) {
  function r() {
  }
  function i() {
    Error.call(this, "Operation canceled");
  }
  var n = e("lodash-compat");
  i.prototype = Error.prototype, r.prototype.getToken = function () {
    var t = this, n = function () {
        var n = new Promise(function (e, n) {
          t.rejectTokenFn = n;
        });
        return Object.defineProperty(n, "isCanceled", {
          get: function () {
            return t.isCanceled;
          }
        }), n.throwIfCanceled = function () {
          if (t.isCanceled)
            throw new i();
        }, t.isCanceled = !1, n;
      };
    return this.token = this.token || n(), this.token;
  }, r.prototype.cancel = function (t) {
    t = t || new i(), this.isCanceled = !0, this.rejectTokenFn(t);
  }, t.makeCancelablePromise = function (t, n) {
    return Promise.race([
      Promise.resolve(t),
      n
    ]);
  }, t.makeCancelable = function (r, i) {
    if (!i || !r || !n.isObject(r))
      return Promise.resolve(r);
    if (n.isFunction(r.makeCancelable))
      return r.makeCancelable(i);
    if (n.isFunction(r.then))
      return t.makeCancelablePromise(r, i);
  }, t.adaptAbortable = function (t) {
    return !t || !n.isObject(t) || !n.isFunction(t.abort) ? t : (t.makeCancelable = function (e) {
      var t = this, n;
      return e.catch(function (e) {
        n = e, t.abort();
      }), Promise.resolve(this).catch(function (t) {
        throw e.isCanceled ? (n.innerException = t, n) : t;
      });
    }, t);
  }, t.cancelableOperation = function () {
    return new r();
  }, t.OperationCanceledError = i;
})
