define("utils/common/interactor", [
  "require",
  "exports",
  "module",
  "lodash-compat"
], function (e, t) {
  function r(e) {
    return e.hasOwnProperty("success") || Object.defineProperties(e, {
      failure: {
        value: !1,
        writable: !0,
        enumerable: !1
      },
      success: {
        value: !0,
        writable: !0,
        enumerable: !1
      },
      error: {
        value: null,
        writable: !0,
        enumerable: !1
      },
      fail: {
        value: function (e) {
          this.failure = !0, this.success = !1, this.error = e;
        },
        writable: !0,
        enumerable: !1
      }
    }), e;
  }
  function i() {
    this.definition = {
      before: [],
      after: [],
      around: [],
      run: null,
      rollback: null
    };
  }
  function s(e) {
    this._definition = e;
  }
  function o(e) {
    return e instanceof s ? function () {
      Function.prototype.apply.call(e.run, e, arguments);
    } : e;
  }
  function u(e) {
    return e instanceof s ? e : t.defineSimpleInteractor(e);
  }
  function a() {
  }
  function f(e) {
    if (!e.success)
      throw new a();
  }
  function l(e, t) {
    n.forEach(e.before, function (e) {
      Function.prototype.apply.call(e, t, [t.context].concat(t.arguments)), f(t.context);
    });
  }
  function c(e, t) {
    e.rollback && Function.prototype.apply.call(e.rollback, t, [t.context].concat(t.arguments));
  }
  function h(e, t) {
    (function n(r) {
      f(t.context), r < e.around.length ? Function.prototype.apply.call(e.around[r], t, [
        t.context,
        n.bind(null, r + 1)
      ].concat(t.arguments)) : Function.prototype.apply.call(e.run, t, [t.context].concat(t.arguments)), f(t.context);
    }(0));
  }
  function p(e, t) {
    n.forEachRight(e.after, function (e) {
      Function.prototype.apply.call(e, t, [t.context].concat(t.arguments)), f(t.context);
    });
  }
  function d(e, t) {
    l(e, t), h(e, t), p(e, t);
  }
  function v(e) {
    var t = n.map(e, u), r = {
        before: [],
        after: [],
        around: [],
        run: function () {
          var e = this, n = 0, r;
          try {
            while (n < t.length)
              r = t[n]._definition, d(r, e), n++;
          } catch (i) {
            i instanceof a || e.context.fail(i), n--;
            while (n >= 0)
              r = t[n]._definition, c(r, e), n--;
            throw i;
          }
        },
        rollback: function () {
          var e = this, n = 0, r;
          n = t.length - 1;
          while (n >= 0)
            r = t[n]._definition, c(r, e), n--;
        }
      };
    s.call(this, r);
  }
  function m(e) {
    var t;
    if (!e)
      return;
    e.run && this.run(e.run), e.before && (t = n.isArray(e.before) ? e.before : [e.before], n.forEach(t, function (e) {
      this.before(e);
    }, this)), e.after && (t = n.isArray(e.after) ? e.after : [e.after], n.forEach(t, function (e) {
      this.after(e);
    }, this)), e.onlyIf && (t = n.isArray(e.onlyIf) ? e.onlyIf : [e.onlyIf], n.forEach(t, function (e) {
      this.onlyIf(e);
    }, this)), e.around && (t = n.isArray(e.around) ? e.around : [e.around], n.forEach(t, function (e) {
      this.around(e);
    }, this)), e.rollback && this.rollback(e.rollback);
  }
  var n = e("lodash-compat");
  i.prototype = {
    run: function (e) {
      this.definition.run = o(e);
    },
    before: function (e) {
      this.definition.before.push(o(e));
    },
    after: function (e) {
      this.definition.after.push(o(e));
    },
    around: function (e) {
      this.definition.around.push(o(e));
    },
    onlyIf: function (e) {
      var t = e;
      n.isFunction(e) || (t = function () {
        return e;
      }), this.around(function (e, n) {
        t() && n();
      });
    },
    rollback: function (e) {
      this.definition.rollback = o(e);
    }
  }, s.prototype.run = function () {
    var e = Array.prototype.slice.call(arguments), t = {
        context: r(e[0] || {}),
        arguments: e.slice(1)
      }, n = this, i = n._definition;
    try {
      d(i, t);
    } catch (s) {
      !s instanceof a && t.context.fail(s);
    }
    return t.context;
  }, v.prototype = Object.create(s.prototype), t.defineInteractor = function (t) {
    var r = new i(), o = t;
    return n.isFunction(t) || (o = function () {
      m.call(this, t);
    }), o.call(r, r.run.bind(r), r.before.bind(r), r.after.bind(r), r.around.bind(r), r.rollback.bind(r)), new s(r.definition);
  }, t.defineSimpleInteractor = function (n) {
    return t.defineInteractor({ run: n });
  }, t.defineComposer = function (t) {
    return new v(t);
  };
})
