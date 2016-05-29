define("utils/common/eventMixin", [
  "require",
  "lodash-compat"
], function (e) {
  function n() {
    this.listeners = null;
    this._disposeExtended = !1;
    this._parentContext = null;
    this._childrenContexts = null;
  }
  function r(e, t, n) {
    return e.filter(function (e) {
      return e.callback === t && e.context === n;
    })[0];
  }
  function i(e, t) {
    e.splice(e.indexOf(t), 1);
  }
  function s(e, t, n, r) {
    var i = e && e.listeners && e.listeners[t], s = !1;
    return i ? (i.forEach(function (e) {
      e.direction & n && (e.callback.call(e.context, r), s = !0);
    }), s) : !1;
  }
  function o(e) {
    if (e._disposeExtended)
      return;
    var t = e.dispose;
    e.dispose = function () {
      e.disposeEvents();
      t && t.call(e);
    };
    e._disposeExtended = !0;
  }
  var t = e("lodash-compat");
  return n.prototype.DIRECTION = {
    PARENT: 1,
    CHILD: 2,
    ANY: 3
  }, n.prototype.dispatchEvent = function (t, r, i) {
    var o = !1;
    return t ? (i = i || n.DIRECTION.ANY, i & n.DIRECTION.PARENT && (!this._parentContext, o = s(this._parentContext, t, n.DIRECTION.CHILD, r)), i & n.DIRECTION.CHILD && this._childrenContexts && this._childrenContexts.forEach(function (e) {
      o = s(e, t, n.DIRECTION.PARENT, r) || o;
    }), o) : !1;
  }, n.prototype.addChildContext = function (t) {
    this._childrenContexts = this._childrenContexts || [];
    this._childrenContexts.push(t);
    o(this);
  }, n.prototype.removeChildContext = function (t) {
    if (this._childrenContexts) {
      var n = this._childrenContexts.indexOf(t);
      n !== -1 && this._childrenContexts.splice(n, 1);
    }
  }, n.prototype.setContext = function (t) {
    this._parentContext = t;
    this._parentContext.addChildContext && this._parentContext.addChildContext(this);
    o(this);
  }, n.prototype.disposeEvents = function () {
    this.listeners = null;
    this._childrenContexts = null;
    this._parentContext && this._parentContext.removeChildContext && this._parentContext.removeChildContext(this);
    this._parentContext = null;
  }, n.prototype.registerEvent = function (t, s, u, a) {
    var f, l, c;
    return !t || !s ? null : (o(this), this.listeners = this.listeners || {}, this.listeners[t] = this.listeners[t] || [], f = this.listeners[t], (u & n.DIRECTION.ANY) === 0 && (a = u, u = n.DIRECTION.ANY), u = u || n.DIRECTION.ANY, l = r(f, s, a), l ? null : (c = {
      callback: s,
      direction: u,
      context: a
    }, f.push(c), {
      dispose: function () {
        i(f, c);
      }
    }));
  }, n.prototype.forwardEvent = function (t, r, i, s, o) {
    (s & n.DIRECTION.ANY) === 0 && (o = s, s = n.DIRECTION.ANY);
    this.registerEvent(t, function (e) {
      i && i.call(o, e);
      this.dispatchEvent(t, e, r, o);
    }, s, this);
  }, t.assign(n, n.prototype), n;
});
