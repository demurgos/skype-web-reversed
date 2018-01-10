define("services/pes/mruService", [
  "require",
  "lodash-compat",
  "swx-constants",
  "utils/common/cache/instance",
  "swx-utils-common",
  "services/pes/constants"
], function (e) {
  function a(e, t) {
    return e === t;
  }
  function f(e, n) {
    var r = 5;
    return o.itemTypes[n] && t.isNumber(o.itemTypes[n].mruLimit) && (r = o.itemTypes[n].mruLimit), t.take(e, r);
  }
  function l(e, n) {
    t.forEach(e, function (e) {
      var r, i = e.id, s = e.type;
      n.configuration[s] = n.configuration[s] || [];
      r = t.findIndex(n.configuration[s], t.partial(a, i));
      r >= 0 && n.configuration[s].splice(r, 1);
      n.configuration[s].unshift(i);
      n.configuration[s] = f(n.configuration[s], s);
    });
  }
  function c(e) {
    t.forEach(e.registeredEvents[r.personalExpression.CONFIG_INITIALIZED], t.partial(t.attempt, t, e.getMRUItems()));
  }
  function h() {
    return i.get().getItem(u);
  }
  function p() {
    return h().then(function (e) {
      return e && e.mruItems && t.isObject(e.mruItems) && !t.isArray(e.mruItems) && e.version === o.SAVED_DATA_VERSION ? e.mruItems : {};
    });
  }
  function d(e) {
    return i.get().setItem(u, {
      mruItems: e,
      version: o.SAVED_DATA_VERSION
    }, 0);
  }
  function v() {
    var e = this;
    this.configuration = {};
    this.registeredEvents = {};
    p().then(function (t) {
      var n = e.getMRUItems();
      e.configuration = t;
      l(n, e);
      c(e);
    });
  }
  var t = e("lodash-compat"), n = e("swx-constants").COMMON, r = n.events, i = e("utils/common/cache/instance"), s = e("swx-utils-common").builderMixin, o = e("services/pes/constants"), u = "pes2";
  return v.prototype.addItemsToMru = function (e) {
    var n = this;
    return e ? (t.isArray(e) || (e = [e]), e.length === 0 ? Promise.resolve() : (l(e, n), c(n), d(this.configuration))) : Promise.resolve();
  }, v.prototype.getMRUItems = function () {
    return t(this.configuration).map(function (e, n) {
      return t.map(e, function (e) {
        return {
          id: e,
          type: n
        };
      });
    }).flatten().value();
  }, v.prototype.on = function (n, r) {
    if (!n || !r)
      return;
    return this.registeredEvents.hasOwnProperty(n) || (this.registeredEvents[n] = []), t.any(this.registeredEvents[n], t.partial(a, r)) || this.registeredEvents[n].push(r), { cancel: this.off.bind(this, n, r) };
  }, v.prototype.off = function (n, r) {
    return this.registeredEvents.hasOwnProperty(n) ? t.first(t.remove(this.registeredEvents[n], t.partial(a, r))) : null;
  }, t.extend(v, s), v;
});
