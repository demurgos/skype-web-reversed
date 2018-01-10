(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/propertyModelHelper", [
      "require",
      "exports",
      "jcafe-property-model"
    ], e);
}(function (e, t) {
  function r(e) {
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
  }
  function i(e, t, r) {
    var i = n.property({ value: !!r }), s = n.command(t, i), o = n.property({
        value: e,
        set: s
      });
    return o.set._enabled = i, o;
  }
  function s(e, t) {
    var r = n.command(e, t);
    return r._enabled = t, r;
  }
  function o(e) {
    var t = n.task();
    return t.resolve(e), t.promise;
  }
  function u(e) {
    var t = n.task();
    return t.reject(e), t.promise;
  }
  function a(e, t) {
    return function () {
      return t() ? u() : e();
    };
  }
  var n = e("jcafe-property-model");
  t.exposeReadOnlyCollection = r;
  t.createPropertyWithSetter = i;
  t.createCommandWithSetter = s;
  t.createResolvedPromise = o;
  t.createRejectedPromise = u;
  t.createCancellablePromiseFunction = a;
}));
