define("utils/common/cafeObservable", [
  "require",
  "vendor/knockout"
], function (e) {
  function r(e, t) {
    if (n[t])
      return n[t];
    for (var r in e)
      if (r !== t && e[r] === e[t])
        return n[t] = r, r;
    return n[t] = t, t;
  }
  function i(e) {
    return t.utils.extend(e, t.observableArray.fn), e.extend({ trackArrayChanges: !0 });
  }
  function s(e, n) {
    function l() {
      i.valueHasMutated();
    }
    function c() {
      var t;
      s.getSubscriptionsCount() || (e.observed() || (t = e.get.bind(e)), f && (a = e.subscribe()), e.changed(l, t));
    }
    function h() {
      e.changed.off(l);
      a && (a.dispose(), a = null);
    }
    var i = t.observable(), s, o, u, a, f;
    return n = n || {}, f = n.keepAlive, s = t.pureComputed({
      deferEvaluation: !0,
      read: function () {
        return i(), e();
      }
    }), o = r(s, "subscribe"), u = s[o], s.subscribe = s[o] = function () {
      var e, t, n;
      return c(), t = r(s, "dispose"), e = u.apply(s, arguments), n = e[t].bind(e), e.dispose = e[t] = function () {
        n();
        s.getSubscriptionsCount() || h();
      }, e;
    }, s;
  }
  function o(e, n) {
    function c() {
      i.valueHasMutated();
    }
    function h() {
      var e;
      s && !f && u.getSubscriptionsCount() && (s.observed() || (e = s.get.bind(s)), l && (f = s.subscribe()), s.changed(c, e));
    }
    function p() {
      s && !u.getSubscriptionsCount() && (s.changed.off(c), f && (f.dispose(), f = null));
    }
    var i = t.observable(), s, o, u, a, f, l;
    return n = n || {}, l = n.keepAlive, u = t.pureComputed({
      deferEvaluation: !0,
      read: function () {
        return i(), s ? s() : e;
      }
    }), o = r(u, "subscribe"), a = u[o], u.subscribe = u[o] = function () {
      var e, t, n;
      return t = r(u, "dispose"), e = a.apply(u, arguments), n = e[t].bind(e), h(), e.dispose = e[t] = function () {
        n();
        p();
      }, e;
    }, u.bindToProperty = function (e) {
      s = e;
      h();
      c();
    }, u;
  }
  function u(e, n) {
    function h() {
      var t;
      o.getSubscriptionsCount() || (e.observed() || (t = e.get.bind(e)), c && (l = e.subscribe()), f = f || e.observe(function () {
        s.valueHasMutated();
      }), t && t());
    }
    function p() {
      f && (f.dispose(), f = null);
      l && (l.dispose(), l = null);
    }
    var s = t.observable(), o, u, a, f, l, c;
    return n = n || {}, c = n.keepAlive, o = t.pureComputed({
      deferEvaluation: !0,
      read: function () {
        return s(), e();
      }
    }), u = r(o, "subscribe"), a = o[u].bind(o), o.subscribe = o[u] = function () {
      var e, t, n;
      return h(), t = r(o, "dispose"), e = a.apply(o, arguments), n = e[t].bind(e), e.dispose = e[t] = function () {
        n();
        o.getSubscriptionsCount() === s.getSubscriptionsCount() && p();
      }, e;
    }, o = i(o), o;
  }
  var t = e("vendor/knockout"), n = {};
  return {
    newObservableProperty: s,
    newDeferredObservableProperty: o,
    newObservableCollection: u
  };
});
