define("utils/common/ko", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "lodash-compat",
  "swx-utils-common"
], function (e, t) {
  function s(e, t) {
    return t(e()), e.subscribe(t);
  }
  function o(e, t, n) {
    var i = r.isFunction(t) ? t : function (e) {
        return e === t;
      }, o = !1, u = {
        dispose: function () {
          o = !0;
        }
      };
    return u = s(e, function (e) {
      i(e) && n.call(u, e);
    }), o && u.dispose(), u;
  }
  var n = e("vendor/knockout"), r = e("lodash-compat"), i = e("swx-utils-common").array;
  t.disposeAndClearArray = function (e) {
    var t = e();
    t.forEach(function (e) {
      e.dispose && e.dispose();
    });
    t.splice(0);
  };
  t.wrapObservable = function (e) {
    return e === null || r.isUndefined(e) ? n.observable() : n.isObservable(e) ? e : n.observable(e);
  };
  t.changed = s;
  t.when = o;
  t.once = function (e, t, n) {
    return o(e, t, function (e) {
      this.dispose();
      n(e);
    });
  };
  t.handleArrayChanges = function (e, t, n, r) {
    function f(e) {
      return o.filter(function (t) {
        return t.key === e;
      })[0];
    }
    function l(t) {
      t.moved >= 0 ? (a = f(t.value), i.insertAt(e, t.index, a ? a.value : e[t.moved + s])) : n(t.index, t.value);
      s++;
    }
    function c(t) {
      var n = t.index + s;
      t.moved >= 0 && o.push({
        key: t.value,
        value: e[n]
      });
      r(n, t.value);
      s--;
    }
    var s = 0, o = [], u, a;
    n = n || i.insertAt.bind(null, e);
    r = r || i.removeFrom.bind(null, e);
    for (var h = 0; h < t.length; h++)
      u = t[h], u.status === "added" ? l(u) : c(u);
  };
});
