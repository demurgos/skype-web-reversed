define("jSkype/utils/chat/cacheBase", [
  "require",
  "lodash-compat",
  "jcafe-property-model",
  "jSkype/settings",
  "constants/common",
  "vendor/async",
  "utils/common/logTracer/api"
], function (e) {
  function u(e, u) {
    function p(e) {
      return !h[e.id];
    }
    function d() {
      return c().filter(p).length;
    }
    function v(e) {
      e.forEach(function (e) {
        h[e.id] = !0;
      });
    }
    var a = this, f, l = o.getLogger("Cache"), c = n.collection(), h = {};
    a.size = c.size;
    a.log = function () {
      r.isFeatureOn(i.featureFlags.UNREAD_MSG_LOGGING) && l.log.apply(l, arguments);
    };
    a.onNewItemsLoaded = function () {
      a.log("onNewItemsLoaded");
      f = null;
    };
    a.forAllItems = function (e) {
      c().forEach(e);
    };
    a.clean = function (e) {
      a.log("clean:", e);
      e ? e.forEach(function (e) {
        c.remove(e.id + "");
      }) : c.empty();
    };
    a.getItems = function (e, t) {
      if (!t)
        return c().filter(e);
      s.filter(c(), e, t);
    };
    a.getItem = function (e) {
      return c(e + "");
    };
    a.getAllItems = function () {
      return c();
    };
    a.replaceItem = function (e, t) {
      a.log("replaceItem:", e, t);
      t += "";
      c.remove(t);
      a.cacheItem(e, t);
    };
    a.cacheItem = function (e, t) {
      if (typeof e.id == "undefined")
        throw new Error("Cached item has to have \"id\" property");
      a.log("Caching item:", e, t);
      c.add(e, t + "");
      a._cacheItem && a._cacheItem(e, t);
    };
    a.hasMoreItems = function () {
      return d() > 0 || !!a._serverHasMoreItems;
    };
    a.onItemAdded = function (e) {
      h[e.id] = !0;
      a._onItemAddedOrUpdated(e);
    };
    a.onItemUpdated = function (e) {
      a._onItemAddedOrUpdated(e);
    };
    a.onItemRemoved = function (e) {
      a.log("onItemRemoved:", e);
      c.remove(e + "");
      a._onItemRemoved && a._onItemRemoved(e);
    };
    a.get = function (t) {
      var r = n.task(), i = a._getCachedItems(t);
      return i.length === 0 ? (a.log("No items in cache, getting them from service:", t), f = f || a._getItemsFromService(t), f) : (a.log("Returning items from cache:", i), r.resolve(i), a._serverHasMoreItems && d() < e && (a.log("Not enough items in cache, get more:", d(), a._serverHasMoreItems), f = f || a._getItemsFromService(t - i.length)), r.promise);
    };
    a.reset = function (e) {
      a.log("resetting:", e);
      e && a._emptyCache();
      h = {};
    };
    a._emptyCache = a.clean;
    a._obtain = function () {
      return f = f || a._getItemsFromService(0), f;
    };
    a._getCachedItems = function (e) {
      var t, n, r;
      return r = c().filter(p).sort(u), t = Math.max(0, r.length - e), n = r.slice(t), v(n), n;
    };
    a._getNewUnconsumedItems = function () {
      var e, n, r;
      return t.isEmpty(h) ? [] : (e = c().sort(u), n = [], r = !1, e.forEach(function (e) {
        !r && h[e.id] && (r = !0);
        r && !h[e.id] && n.push(e);
      }), v(n), n);
    };
  }
  var t = e("lodash-compat"), n = e("jcafe-property-model"), r = e("jSkype/settings"), i = e("constants/common"), s = e("vendor/async"), o = e("utils/common/logTracer/api");
  return u;
});
