define("jSkype/modelHelpers/propertyModelHelper", [
  "require",
  "exports",
  "module",
  "jcafe-property-model"
], function (e, t) {
  var n = e("jcafe-property-model");
  t.exposeReadOnlyCollection = function (e) {
    function n(e, t) {
      var n;
      for (n = 0; n < e.size(); ++n)
        if (t(e(n)))
          return n;
      return -1;
    }
    var t = e.asReadOnly();
    return t._add = e.add, t._remove = e.remove, t._removeAll = e.empty, t._removeByCondition = function (t) {
      var r = n(e, t);
      r >= 0 && e.remove(r);
    }, t;
  };
  t.createPropertyWithSetter = function (e, t, r) {
    var i = n.property({ value: !!r }), s = n.command(t, i), o = n.property({
        value: e,
        set: s
      });
    return o.set._enabled = i, o;
  };
  t.createCommandWithSetter = function (e, t) {
    var r = n.command(e, t);
    return r._enabled = t, r;
  };
  t.createResolvedPromise = function (e) {
    var t = n.task();
    return t.resolve(e), t.promise;
  };
  t.createRejectedPromise = function (e) {
    var t = n.task();
    return t.reject(e), t.promise;
  };
  t.createCancellablePromiseFunction = function (e, n) {
    return function () {
      return n() ? t.createRejectedPromise() : e();
    };
  };
});
