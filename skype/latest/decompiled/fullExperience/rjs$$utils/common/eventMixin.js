define("utils/common/eventMixin", [
  "require",
  "lodash-compat",
  "swx-log-tracer"
], function (e) {
  function r() {
    this.listeners = null;
    this._disposeExtended = !1;
    this._parentContext = null;
    this._childrenContexts = null;
  }
  function i(e, t, n) {
    return e.filter(function (e) {
      return e.callback === t && e.context === n;
    })[0];
  }
  function s(e, t) {
    e.splice(e.indexOf(t), 1);
  }
  function o(e, t, n, r) {
    var i = e && e.listeners && e.listeners[t], s = !1;
    return i ? (i.forEach(function (e) {
      e.direction & n && (e.callback.call(e.context, r), s = !0);
    }), s) : !1;
  }
  function u(e) {
    if (e._disposeExtended)
      return;
    var t = e.dispose;
    e.dispose = function () {
      t && t.call(e);
      e.disposeEvents();
    };
    e._disposeExtended = !0;
  }
  var t = e("lodash-compat"), n = e("swx-log-tracer").getLogger();
  return r.prototype.DIRECTION = {
    PARENT: 1,
    CHILD: 2,
    ANY: 3
  }, r.prototype.dispatchEvent = function (t, i, s) {
    var u = !1;
    return t ? (s = s || r.DIRECTION.ANY, s & r.DIRECTION.PARENT && (this._parentContext || n.error("Dispatching to parent, but parent context wasn't set !"), u = o(this._parentContext, t, r.DIRECTION.CHILD, i)), s & r.DIRECTION.CHILD && this._childrenContexts && this._childrenContexts.forEach(function (e) {
      u = o(e, t, r.DIRECTION.PARENT, i) || u;
    }), u) : !1;
  }, r.prototype.addChildContext = function (t) {
    this._childrenContexts = this._childrenContexts || [];
    this._childrenContexts.push(t);
    u(this);
  }, r.prototype.removeChildContext = function (t) {
    if (this._childrenContexts) {
      var n = this._childrenContexts.indexOf(t);
      n !== -1 && this._childrenContexts.splice(n, 1);
    }
  }, r.prototype.setContext = function (t) {
    this._parentContext = t;
    this._parentContext.addChildContext && this._parentContext.addChildContext(this);
    u(this);
  }, r.prototype.disposeEvents = function () {
    this.listeners = null;
    this._childrenContexts = null;
    this._parentContext && this._parentContext.removeChildContext && this._parentContext.removeChildContext(this);
    this._parentContext = null;
  }, r.prototype.registerEvent = function (t, n, o, a) {
    var f, l, c;
    return !t || !n ? null : (u(this), this.listeners = this.listeners || {}, this.listeners[t] = this.listeners[t] || [], f = this.listeners[t], (o & r.DIRECTION.ANY) === 0 && (a = o, o = r.DIRECTION.ANY), o = o || r.DIRECTION.ANY, l = i(f, n, a), l ? null : (c = {
      callback: n,
      direction: o,
      context: a
    }, f.push(c), {
      dispose: function () {
        s(f, c);
      }
    }));
  }, r.prototype.forwardEvent = function (t, n, i, s, o) {
    (s & r.DIRECTION.ANY) === 0 && (o = s, s = r.DIRECTION.ANY);
    this.registerEvent(t, function (e) {
      i && i.call(o, e);
      this.dispatchEvent(t, e, n, o);
    }, s, this);
  }, t.assign(r, r.prototype), r;
});
