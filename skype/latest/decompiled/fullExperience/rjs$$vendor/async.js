(function () {
  function r(e) {
    var n = !1;
    return function () {
      if (n)
        throw new Error("Callback was already called.");
      n = !0;
      e.apply(t, arguments);
    };
  }
  var e = {}, t, n;
  t = this;
  t != null && (n = t.async);
  e.noConflict = function () {
    return t.async = n, e;
  };
  var i = Object.prototype.toString, s = Array.isArray || function (e) {
      return i.call(e) === "[object Array]";
    }, o = function (e, t) {
      for (var n = 0; n < e.length; n += 1)
        t(e[n], n, e);
    }, u = function (e, t) {
      if (e.map)
        return e.map(t);
      var n = [];
      return o(e, function (e, r, i) {
        n.push(t(e, r, i));
      }), n;
    }, a = function (e, t, n) {
      return e.reduce ? e.reduce(t, n) : (o(e, function (e, r, i) {
        n = t(n, e, r, i);
      }), n);
    }, f = function (e) {
      if (Object.keys)
        return Object.keys(e);
      var t = [];
      for (var n in e)
        e.hasOwnProperty(n) && t.push(n);
      return t;
    };
  typeof process == "undefined" || !process.nextTick ? typeof setImmediate == "function" ? (e.nextTick = function (e) {
    setImmediate(e);
  }, e.setImmediate = e.nextTick) : (e.nextTick = function (e) {
    setTimeout(e, 0);
  }, e.setImmediate = e.nextTick) : (e.nextTick = process.nextTick, typeof setImmediate != "undefined" ? e.setImmediate = function (e) {
    setImmediate(e);
  } : e.setImmediate = e.nextTick);
  e.each = function (e, t, n) {
    function s(t) {
      t ? (n(t), n = function () {
      }) : (i += 1, i >= e.length && n());
    }
    n = n || function () {
    };
    if (!e.length)
      return n();
    var i = 0;
    o(e, function (e) {
      t(e, r(s));
    });
  };
  e.forEach = e.each;
  e.eachSeries = function (e, t, n) {
    n = n || function () {
    };
    if (!e.length)
      return n();
    var r = 0, i = function () {
        t(e[r], function (t) {
          t ? (n(t), n = function () {
          }) : (r += 1, r >= e.length ? n() : i());
        });
      };
    i();
  };
  e.forEachSeries = e.eachSeries;
  e.eachLimit = function (e, t, n, r) {
    var i = l(t);
    i.apply(null, [
      e,
      n,
      r
    ]);
  };
  e.forEachLimit = e.eachLimit;
  var l = function (e) {
      return function (t, n, r) {
        r = r || function () {
        };
        if (!t.length || e <= 0)
          return r();
        var i = 0, s = 0, o = 0;
        (function u() {
          if (i >= t.length)
            return r();
          while (o < e && s < t.length)
            s += 1, o += 1, n(t[s - 1], function (e) {
              e ? (r(e), r = function () {
              }) : (i += 1, o -= 1, i >= t.length ? r() : u());
            });
        }());
      };
    }, c = function (t) {
      return function () {
        var n = Array.prototype.slice.call(arguments);
        return t.apply(null, [e.each].concat(n));
      };
    }, h = function (e, t) {
      return function () {
        var n = Array.prototype.slice.call(arguments);
        return t.apply(null, [l(e)].concat(n));
      };
    }, p = function (t) {
      return function () {
        var n = Array.prototype.slice.call(arguments);
        return t.apply(null, [e.eachSeries].concat(n));
      };
    }, d = function (e, t, n, r) {
      t = u(t, function (e, t) {
        return {
          index: t,
          value: e
        };
      });
      if (!r)
        e(t, function (e, t) {
          n(e.value, function (e) {
            t(e);
          });
        });
      else {
        var i = [];
        e(t, function (e, t) {
          n(e.value, function (n, r) {
            i[e.index] = r;
            t(n);
          });
        }, function (e) {
          r(e, i);
        });
      }
    };
  e.map = c(d);
  e.mapSeries = p(d);
  e.mapLimit = function (e, t, n, r) {
    return v(t)(e, n, r);
  };
  var v = function (e) {
    return h(e, d);
  };
  e.reduce = function (t, n, r, i) {
    e.eachSeries(t, function (e, t) {
      r(n, e, function (e, r) {
        n = r;
        t(e);
      });
    }, function (e) {
      i(e, n);
    });
  };
  e.inject = e.reduce;
  e.foldl = e.reduce;
  e.reduceRight = function (t, n, r, i) {
    var s = u(t, function (e) {
      return e;
    }).reverse();
    e.reduce(s, n, r, i);
  };
  e.foldr = e.reduceRight;
  var m = function (e, t, n, r) {
    var i = [];
    t = u(t, function (e, t) {
      return {
        index: t,
        value: e
      };
    });
    e(t, function (e, t) {
      n(e.value, function (n) {
        n && i.push(e);
        t();
      });
    }, function (e) {
      r(u(i.sort(function (e, t) {
        return e.index - t.index;
      }), function (e) {
        return e.value;
      }));
    });
  };
  e.filter = c(m);
  e.filterSeries = p(m);
  e.select = e.filter;
  e.selectSeries = e.filterSeries;
  var g = function (e, t, n, r) {
    var i = [];
    t = u(t, function (e, t) {
      return {
        index: t,
        value: e
      };
    });
    e(t, function (e, t) {
      n(e.value, function (n) {
        n || i.push(e);
        t();
      });
    }, function (e) {
      r(u(i.sort(function (e, t) {
        return e.index - t.index;
      }), function (e) {
        return e.value;
      }));
    });
  };
  e.reject = c(g);
  e.rejectSeries = p(g);
  var y = function (e, t, n, r) {
    e(t, function (e, t) {
      n(e, function (n) {
        n ? (r(e), r = function () {
        }) : t();
      });
    }, function (e) {
      r();
    });
  };
  e.detect = c(y);
  e.detectSeries = p(y);
  e.some = function (t, n, r) {
    e.each(t, function (e, t) {
      n(e, function (e) {
        e && (r(!0), r = function () {
        });
        t();
      });
    }, function (e) {
      r(!1);
    });
  };
  e.any = e.some;
  e.every = function (t, n, r) {
    e.each(t, function (e, t) {
      n(e, function (e) {
        e || (r(!1), r = function () {
        });
        t();
      });
    }, function (e) {
      r(!0);
    });
  };
  e.all = e.every;
  e.sortBy = function (t, n, r) {
    e.map(t, function (e, t) {
      n(e, function (n, r) {
        n ? t(n) : t(null, {
          value: e,
          criteria: r
        });
      });
    }, function (e, t) {
      if (e)
        return r(e);
      var n = function (e, t) {
        var n = e.criteria, r = t.criteria;
        return n < r ? -1 : n > r ? 1 : 0;
      };
      r(null, u(t.sort(n), function (e) {
        return e.value;
      }));
    });
  };
  e.auto = function (t, n) {
    n = n || function () {
    };
    var r = f(t), i = r.length;
    if (!i)
      return n();
    var u = {}, l = [], c = function (e) {
        l.unshift(e);
      }, h = function (e) {
        for (var t = 0; t < l.length; t += 1)
          if (l[t] === e) {
            l.splice(t, 1);
            return;
          }
      }, p = function () {
        i--;
        o(l.slice(0), function (e) {
          e();
        });
      };
    c(function () {
      if (!i) {
        var e = n;
        n = function () {
        };
        e(null, u);
      }
    });
    o(r, function (r) {
      var i = s(t[r]) ? t[r] : [t[r]], l = function (t) {
          var i = Array.prototype.slice.call(arguments, 1);
          i.length <= 1 && (i = i[0]);
          if (t) {
            var s = {};
            o(f(u), function (e) {
              s[e] = u[e];
            });
            s[r] = i;
            n(t, s);
            n = function () {
            };
          } else
            u[r] = i, e.setImmediate(p);
        }, d = i.slice(0, Math.abs(i.length - 1)) || [], v = function () {
          return a(d, function (e, t) {
            return e && u.hasOwnProperty(t);
          }, !0) && !u.hasOwnProperty(r);
        };
      if (v())
        i[i.length - 1](l, u);
      else {
        var m = function () {
          v() && (h(m), i[i.length - 1](l, u));
        };
        c(m);
      }
    });
  };
  e.retry = function (t, n, r) {
    var i = 5, s = [];
    typeof t == "function" && (r = n, n = t, t = i);
    t = parseInt(t, 10) || i;
    var o = function (i, o) {
      var u = function (e, t) {
        return function (n) {
          e(function (e, r) {
            n(!e || t, {
              err: e,
              result: r
            });
          }, o);
        };
      };
      while (t)
        s.push(u(n, !(t -= 1)));
      e.series(s, function (e, t) {
        t = t[t.length - 1];
        (i || r)(t.err, t.result);
      });
    };
    return r ? o() : o;
  };
  e.waterfall = function (t, n) {
    n = n || function () {
    };
    if (!s(t)) {
      var r = new Error("First argument to waterfall must be an array of functions");
      return n(r);
    }
    if (!t.length)
      return n();
    var i = function (t) {
      return function (r) {
        if (r)
          n.apply(null, arguments), n = function () {
          };
        else {
          var s = Array.prototype.slice.call(arguments, 1), o = t.next();
          o ? s.push(i(o)) : s.push(n);
          e.setImmediate(function () {
            t.apply(null, s);
          });
        }
      };
    };
    i(e.iterator(t))();
  };
  var b = function (e, t, n) {
    n = n || function () {
    };
    if (s(t))
      e.map(t, function (e, t) {
        e && e(function (e) {
          var n = Array.prototype.slice.call(arguments, 1);
          n.length <= 1 && (n = n[0]);
          t.call(null, e, n);
        });
      }, n);
    else {
      var r = {};
      e.each(f(t), function (e, n) {
        t[e](function (t) {
          var i = Array.prototype.slice.call(arguments, 1);
          i.length <= 1 && (i = i[0]);
          r[e] = i;
          n(t);
        });
      }, function (e) {
        n(e, r);
      });
    }
  };
  e.parallel = function (t, n) {
    b({
      map: e.map,
      each: e.each
    }, t, n);
  };
  e.parallelLimit = function (e, t, n) {
    b({
      map: v(t),
      each: l(t)
    }, e, n);
  };
  e.series = function (t, n) {
    n = n || function () {
    };
    if (s(t))
      e.mapSeries(t, function (e, t) {
        e && e(function (e) {
          var n = Array.prototype.slice.call(arguments, 1);
          n.length <= 1 && (n = n[0]);
          t.call(null, e, n);
        });
      }, n);
    else {
      var r = {};
      e.eachSeries(f(t), function (e, n) {
        t[e](function (t) {
          var i = Array.prototype.slice.call(arguments, 1);
          i.length <= 1 && (i = i[0]);
          r[e] = i;
          n(t);
        });
      }, function (e) {
        n(e, r);
      });
    }
  };
  e.iterator = function (e) {
    var t = function (n) {
      var r = function () {
        return e.length && e[n].apply(null, arguments), r.next();
      };
      return r.next = function () {
        return n < e.length - 1 ? t(n + 1) : null;
      }, r;
    };
    return t(0);
  };
  e.apply = function (e) {
    var t = Array.prototype.slice.call(arguments, 1);
    return function () {
      return e.apply(null, t.concat(Array.prototype.slice.call(arguments)));
    };
  };
  var w = function (e, t, n, r) {
    var i = [];
    e(t, function (e, t) {
      n(e, function (e, n) {
        i = i.concat(n || []);
        t(e);
      });
    }, function (e) {
      r(e, i);
    });
  };
  e.concat = c(w);
  e.concatSeries = p(w);
  e.whilst = function (t, n, r) {
    t() ? n(function (i) {
      if (i)
        return r(i);
      e.whilst(t, n, r);
    }) : r();
  };
  e.doWhilst = function (t, n, r) {
    t(function (i) {
      if (i)
        return r(i);
      var s = Array.prototype.slice.call(arguments, 1);
      n.apply(null, s) ? e.doWhilst(t, n, r) : r();
    });
  };
  e.until = function (t, n, r) {
    t() ? r() : n(function (i) {
      if (i)
        return r(i);
      e.until(t, n, r);
    });
  };
  e.doUntil = function (t, n, r) {
    t(function (i) {
      if (i)
        return r(i);
      var s = Array.prototype.slice.call(arguments, 1);
      n.apply(null, s) ? r() : e.doUntil(t, n, r);
    });
  };
  e.queue = function (t, n) {
    function i(t, n, r, i) {
      t.started || (t.started = !0);
      s(n) || (n = [n]);
      if (n.length == 0)
        return e.setImmediate(function () {
          t.drain && t.drain();
        });
      o(n, function (n) {
        var s = {
          data: n,
          callback: typeof i == "function" ? i : null
        };
        r ? t.tasks.unshift(s) : t.tasks.push(s);
        t.saturated && t.tasks.length === t.concurrency && t.saturated();
        e.setImmediate(t.process);
      });
    }
    n === undefined && (n = 1);
    var u = 0, a = {
        tasks: [],
        concurrency: n,
        saturated: null,
        empty: null,
        drain: null,
        started: !1,
        paused: !1,
        push: function (e, t) {
          i(a, e, !1, t);
        },
        kill: function () {
          a.drain = null;
          a.tasks = [];
        },
        unshift: function (e, t) {
          i(a, e, !0, t);
        },
        process: function () {
          if (!a.paused && u < a.concurrency && a.tasks.length) {
            var e = a.tasks.shift();
            a.empty && a.tasks.length === 0 && a.empty();
            u += 1;
            var n = function () {
                u -= 1;
                e.callback && e.callback.apply(e, arguments);
                a.drain && a.tasks.length + u === 0 && a.drain();
                a.process();
              }, i = r(n);
            t(e.data, i);
          }
        },
        length: function () {
          return a.tasks.length;
        },
        running: function () {
          return u;
        },
        idle: function () {
          return a.tasks.length + u === 0;
        },
        pause: function () {
          if (a.paused === !0)
            return;
          a.paused = !0;
        },
        resume: function () {
          if (a.paused === !1)
            return;
          a.paused = !1;
          for (var t = 1; t <= a.concurrency; t++)
            e.setImmediate(a.process);
        }
      };
    return a;
  };
  e.priorityQueue = function (t, n) {
    function r(e, t) {
      return e.priority - t.priority;
    }
    function i(e, t, n) {
      var r = -1, i = e.length - 1;
      while (r < i) {
        var s = r + (i - r + 1 >>> 1);
        n(t, e[s]) >= 0 ? r = s : i = s - 1;
      }
      return r;
    }
    function u(t, n, u, a) {
      t.started || (t.started = !0);
      s(n) || (n = [n]);
      if (n.length == 0)
        return e.setImmediate(function () {
          t.drain && t.drain();
        });
      o(n, function (n) {
        var s = {
          data: n,
          priority: u,
          callback: typeof a == "function" ? a : null
        };
        t.tasks.splice(i(t.tasks, s, r) + 1, 0, s);
        t.saturated && t.tasks.length === t.concurrency && t.saturated();
        e.setImmediate(t.process);
      });
    }
    var a = e.queue(t, n);
    return a.push = function (e, t, n) {
      u(a, e, t, n);
    }, delete a.unshift, a;
  };
  e.cargo = function (t, n) {
    var r = !1, i = [], a = {
        tasks: i,
        payload: n,
        saturated: null,
        empty: null,
        drain: null,
        drained: !0,
        push: function (t, r) {
          s(t) || (t = [t]);
          o(t, function (e) {
            i.push({
              data: e,
              callback: typeof r == "function" ? r : null
            });
            a.drained = !1;
            a.saturated && i.length === n && a.saturated();
          });
          e.setImmediate(a.process);
        },
        process: function f() {
          if (r)
            return;
          if (i.length === 0) {
            a.drain && !a.drained && a.drain();
            a.drained = !0;
            return;
          }
          var e = typeof n == "number" ? i.splice(0, n) : i.splice(0, i.length), s = u(e, function (e) {
              return e.data;
            });
          a.empty && a.empty();
          r = !0;
          t(s, function () {
            r = !1;
            var t = arguments;
            o(e, function (e) {
              e.callback && e.callback.apply(null, t);
            });
            f();
          });
        },
        length: function () {
          return i.length;
        },
        running: function () {
          return r;
        }
      };
    return a;
  };
  var E = function (e) {
    return function (t) {
      var n = Array.prototype.slice.call(arguments, 1);
      t.apply(null, n.concat([function (t) {
          var n = Array.prototype.slice.call(arguments, 1);
          typeof console != "undefined" && (t ? console.error : console[e] && o(n, function (t) {
            console[e](t);
          }));
        }]));
    };
  };
  e.log = E("log");
  e.dir = E("dir");
  e.memoize = function (t, n) {
    var r = {}, i = {};
    n = n || function (e) {
      return e;
    };
    var s = function () {
      var s = Array.prototype.slice.call(arguments), o = s.pop(), u = n.apply(null, s);
      u in r ? e.nextTick(function () {
        o.apply(null, r[u]);
      }) : u in i ? i[u].push(o) : (i[u] = [o], t.apply(null, s.concat([function () {
          r[u] = arguments;
          var e = i[u];
          delete i[u];
          for (var t = 0, n = e.length; t < n; t++)
            e[t].apply(null, arguments);
        }])));
    };
    return s.memo = r, s.unmemoized = t, s;
  };
  e.unmemoize = function (e) {
    return function () {
      return (e.unmemoized || e).apply(null, arguments);
    };
  };
  e.times = function (t, n, r) {
    var i = [];
    for (var s = 0; s < t; s++)
      i.push(s);
    return e.map(i, n, r);
  };
  e.timesSeries = function (t, n, r) {
    var i = [];
    for (var s = 0; s < t; s++)
      i.push(s);
    return e.mapSeries(i, n, r);
  };
  e.seq = function () {
    var t = arguments;
    return function () {
      var n = this, r = Array.prototype.slice.call(arguments), i = r.pop();
      e.reduce(t, r, function (e, t, r) {
        t.apply(n, e.concat([function () {
            var e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
            r(e, t);
          }]));
      }, function (e, t) {
        i.apply(n, [e].concat(t));
      });
    };
  };
  e.compose = function () {
    return e.seq.apply(null, Array.prototype.reverse.call(arguments));
  };
  var S = function (e, t) {
    var n = function () {
      var n = this, r = Array.prototype.slice.call(arguments), i = r.pop();
      return e(t, function (e, t) {
        e.apply(n, r.concat([t]));
      }, i);
    };
    if (arguments.length > 2) {
      var r = Array.prototype.slice.call(arguments, 2);
      return n.apply(this, r);
    }
    return n;
  };
  e.applyEach = c(S);
  e.applyEachSeries = p(S);
  e.forever = function (e, t) {
    function n(r) {
      if (r) {
        if (t)
          return t(r);
        throw r;
      }
      e(n);
    }
    n();
  };
  typeof module != "undefined" && module.exports ? module.exports = e : typeof define != "undefined" && define.amd ? define("vendor/async", [], function () {
    return e;
  }) : t.async = e;
}());
