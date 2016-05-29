define("utils/common/stateMixin", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "browser/window"
], function (e) {
  function i() {
  }
  function s() {
    this.storage = [];
    this.lastFreeSlot = -1;
  }
  function u() {
  }
  function a() {
  }
  function f() {
  }
  function p(e, t) {
    return n.isObservable(e[t]) ? e[t].push ? h : c : l;
  }
  function v(e) {
    if (typeof e == "string" || typeof e == "number")
      e = [e];
    this.key = e;
  }
  function g(e) {
    return typeof e in m || e === null || e instanceof Date || t.isElement(e) || Promise && e instanceof Promise;
  }
  function y() {
  }
  function b() {
    this.preserveReferences = !1;
  }
  function E(e, n, r, i, s) {
    var o = i.resolve(e), u = s.resolve(e), a, f = undefined, l;
    o !== d && (l = t.findIndex(r, w.bind(null, i, o)), l !== -1 && l !== n && (f = r[l], r[l] = undefined));
    f || (f = r[n]);
    if (f && u !== d) {
      a = s.resolve(f);
      if (a === d || a !== u && !t.isEqual(a, u))
        f = undefined;
    }
    return f;
  }
  function S() {
    this._scheduledTaskHandler && (r.requestAnimationFrame ? r.cancelAnimationFrame(this._scheduledTaskHandler) : n.tasks.cancel(this._scheduledTaskHandler));
  }
  function x() {
    var e = this._taskQueue;
    return this._taskQueue = [], e;
  }
  function T(e, n) {
    var r = t.reduce(e, function (e, r) {
      var i = r.newState;
      return t.isFunction(i) ? i = i(this.state, this.props) : r.limitKeys && (i = t.pick(i, r.limitKeys)), r.callback && n.push(r.callback), t.assign(e, i);
    }, {}, this);
    return r;
  }
  function N(e) {
    return this.beforeStateApplied && (e = this.beforeStateApplied(e) || e), e;
  }
  function C(e) {
    var t = new b();
    new y().execute(this.state, e, t);
  }
  function k(e) {
    this.afterStateApplied && this.afterStateApplied();
    t.forEach(e, function (e) {
      e && t.isFunction(e) && e.call(this);
    });
  }
  function L(e, r) {
    return t.isFunction(r) ? r : t.isArray(r) ? n.observableArray(r) : t.isPlainObject(r) || t.isBoolean(r) || t.isString(r) || t.isNumber(r) || t.isNull(r) || t.isUndefined(r) || t.isDate(r) || t.isElement(r) ? n.observable(r) : r;
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("browser/window");
  s.prototype.get = function (e) {
    var n = t.find(this.storage, { key: e });
    return n && n.value;
  };
  s.prototype.set = function (e, n) {
    var r = this.lastFreeSlot;
    if (r === -1) {
      r = t.findIndex(this.storage, null);
      if (r === -1) {
        this.storage.push({
          key: e,
          value: n
        });
        return;
      }
    }
    this.storage[r] = {
      key: e,
      value: n
    };
    this.lastFreeSlot = -1;
  };
  s.prototype.delete = function (e) {
    var n = t.findIndex(this.storage, { key: e });
    if (n === -1)
      return;
    this.storage[n] = null;
    this.lastFreeSlot = n;
  };
  var o = s;
  typeof WeakMap == "function" && (o = WeakMap);
  u.prototype.EMPTY_VALUE = null;
  u.prototype.isBound = function (e, t) {
    return t === null ? !0 : e && e.hasOwnProperty(t);
  };
  u.prototype.resolve = function (e, t) {
    return t === null ? e : e && e[t];
  };
  u.prototype.assign = function (e, t, n) {
    if (t === null)
      throw new Error("References are immutable");
    e[t] = n;
  };
  u.prototype.delete = function (e, t) {
    if (t === null)
      throw new Error("References are immutable");
    e.hasOwnProperty(t) ? delete e[t] : e[t] = undefined;
  };
  a.prototype = Object.create(u.prototype);
  a.prototype.resolve = function (e, t) {
    return t === null ? e && e() : e && e[t] && e[t]();
  };
  a.prototype.assign = function (e, t, r) {
    t !== null ? e[t] ? e[t](r) : e[t] = n.observable(r) : e(r);
  };
  a.prototype.delete = function (e) {
    this.assign(e, undefined);
  };
  f.prototype = Object.create(a.prototype);
  f.prototype.assign = function (e, t, r) {
    t !== null ? e[t] ? e[t](r) : e[t] = n.observableArray(r) : e(r);
  };
  f.prototype.EMPTY_VALUE = [];
  var l = new u(), c = new a(), h = new f(), d = [NaN];
  v.prototype = Object.create(u.prototype);
  v.prototype.resolve = function (e) {
    return this.key ? typeof this.key == "function" ? this.key(e) || d : this.key.map(function (t) {
      return p(e, t).resolve(e, t);
    }) : d;
  };
  var m = {
    "undefined": 1,
    "boolean": 1,
    number: 1,
    string: 1,
    "function": 1
  };
  b.prototype.valueAssign = function (e, t, n) {
    var r;
    typeof t != "string" && typeof t != "number" || !!e.hasOwnProperty(t) ? r = p(e, t) : r = typeof n == "function" ? l : c;
    r.assign(e, t, n);
  };
  var w = function (n, r, i) {
    return t.isEqual(n.resolve(i), r);
  };
  return b.prototype.deepArrayAssign = function (e, r, i) {
    var s, o, u;
    (typeof r == "string" || typeof r == "number") && !e.hasOwnProperty(r) && (e[r] = n.observableArray());
    var a = p(e, r), f = a.resolve(e, r) || [], l = [], c;
    o = new v(this.typeKeyFor(i));
    s = new v(this.keyFor(i));
    for (c = 0; c < i.length; ++c) {
      var h = p(i, c).resolve(i, c);
      g(h) ? p(l, c).assign(l, c, h) : t.isArray(h) ? this.deepArrayAssign(l, c, h) : (u = E(h, c, f, s, o) || {}, p(l, c).assign(l, c, u), this.deepObjectAssign(l, c, h));
    }
    Array.prototype.splice.apply(f, [
      0,
      f.length
    ].concat(l));
    a.assign(e, r, f);
  }, b.prototype.deepObjectAssign = function (e, n, r) {
    var i, s, o = p(e, n), u = new v(this.typeKeyFor(r)), a, f, l = !1;
    if (!r) {
      o.assign(e, n, i);
      return;
    }
    i = this.getFromStack(r);
    if (i) {
      this.breakCycles && (i = null);
      o.assign(e, n, i);
      return;
    }
    if (this.preserveReferences) {
      i = this.getKnownObject(r);
      if (i) {
        o.assign(e, n, i);
        return;
      }
    }
    s = null;
    o.isBound(e, n) && (s = o.resolve(e, n));
    a = u.resolve(r);
    if (s && a !== d) {
      f = u.resolve(s);
      l = !0;
      if (f === d || f !== a && !t.isEqual(f, a))
        l = !1;
    }
    s === null && (s = {});
    this.pushContextUpdate(r, s);
    y.prototype.execute(s, r, this);
    this.popContext(r);
    l || o.assign(e, n, s);
  }, b.prototype.getFromStack = function (e) {
    var t = this.contextStack && this.contextStack.get(e);
    return t && t.target;
  }, b.prototype.getKnownObject = function (e) {
    return this.knownObjects && this.knownObjects.get(e);
  }, b.prototype.pushContextUpdate = function (e, t) {
    var n = this.contextStack || new o(), r;
    this.contextStack = n;
    this.preserveReferences && (r = this.knownObjects || new o(), this.knownObjects = r, r.set(e, t));
    n.set(e, {
      target: t,
      breakCycles: this.breakCycles,
      removeExtra: this.removeExtra
    });
    this.breakCycles = !0;
    this.removeExtra = !1;
  }, b.prototype.popContext = function (e) {
    var t = this.contextStack && this.contextStack.get(e);
    if (!t)
      return;
    this.breakCycles = t.breakCycles;
    this.removeExtra = t.removeExtra;
    this.contextStack.delete(e);
  }, b.prototype.ignoreProperty = function (e) {
    return e && (e[0] === "_" || e[0] === "@");
  }, b.prototype.keyFor = function () {
    return null;
  }, b.prototype.typeKeyFor = function (e) {
    return e["@Meta"] && e["@Meta"].typeKey;
  }, y.prototype.execute = function (e, n, r) {
    var i, s, o = [], u, a, f, l;
    r.removeExtra && t.forOwn(e, function (t, r) {
      n.hasOwnProperty(r) || p(e, r).delete(e, r);
    });
    for (u in n)
      n.hasOwnProperty(u) && !r.ignoreProperty(u) && (s = p(n, u), i = s.resolve(n, u), l = g(i) ? 1 : t.isArray(i) ? 2 : 3, o.push({
        name: u,
        value: i,
        semantics: l
      }));
    a = o.length;
    switch (a) {
    case 4:
      f = o[3];
      switch (f.semantics) {
      case 1:
        r.valueAssign(e, f.name, f.value);
        break;
      case 2:
        r.deepArrayAssign(e, f.name, f.value);
        break;
      case 3:
        r.deepObjectAssign(e, f.name, f.value);
      }
      ;
    case 3:
      f = o[2];
      switch (f.semantics) {
      case 1:
        r.valueAssign(e, f.name, f.value);
        break;
      case 2:
        r.deepArrayAssign(e, f.name, f.value);
        break;
      case 3:
        r.deepObjectAssign(e, f.name, f.value);
      }
      ;
    case 2:
      f = o[1];
      switch (f.semantics) {
      case 1:
        r.valueAssign(e, f.name, f.value);
        break;
      case 2:
        r.deepArrayAssign(e, f.name, f.value);
        break;
      case 3:
        r.deepObjectAssign(e, f.name, f.value);
      }
      ;
    case 1:
      f = o[0];
      switch (f.semantics) {
      case 1:
        r.valueAssign(e, f.name, f.value);
        break;
      case 2:
        r.deepArrayAssign(e, f.name, f.value);
        break;
      case 3:
        r.deepObjectAssign(e, f.name, f.value);
      }
      ;
    case 0:
      break;
    default:
      t.forEach(o, function (t) {
        switch (t.semantics) {
        case 1:
          r.valueAssign(e, t.name, t.value);
          break;
        case 2:
          r.deepArrayAssign(e, t.name, t.value);
          break;
        case 3:
          r.deepObjectAssign(e, t.name, t.value);
        }
      });
    }
  }, i.prototype.baseApplyState = function (e, n, r) {
    var s = this.scheduleStateMerge || i.prototype.scheduleStateMerge;
    this.state = this.state || {};
    if (t.isString(n) || t.isArray(n))
      r = n, n = null;
    t.isString(r) && (r = [r]);
    this._taskQueue = this._taskQueue || [];
    this._taskQueue.push({
      newState: e,
      callback: n,
      limitKeys: r
    });
    s.call(this);
  }, i.prototype.applyState = i.prototype.baseApplyState, i.prototype.scheduleStateMerge = function () {
    var e = this.processTaskQueue || i.prototype.processTaskQueue;
    if (this._scheduledTaskHandler)
      return;
    r.requestAnimationFrame ? this._scheduledTaskHandler = r.requestAnimationFrame(e.bind(this)) : this._scheduledTaskHandler = n.tasks.schedule(e.bind(this));
  }, i.prototype.processTaskQueue = function () {
    var e, t = [], n, r = this.scheduleStateMerge || i.prototype.scheduleStateMerge;
    S.call(this);
    if (!this._taskQueue || this._taskQueue.length === 0) {
      this._scheduledTaskHandler = null;
      return;
    }
    n = x.call(this);
    e = T.call(this, n, t);
    e = N.call(this, e);
    C.call(this, e);
    this._scheduledTaskHandler = null;
    this._taskQueue.length && r.call(this);
    k.call(this, t);
  }, i.overrideDefaults = function () {
    var e = Array.prototype.slice.call(arguments);
    return e.push(L), t.assign.apply(t, e), e[0];
  }, t.assign(i, i.prototype), i;
});
