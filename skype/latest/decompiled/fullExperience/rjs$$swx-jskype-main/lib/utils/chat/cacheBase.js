(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/chat/cacheBase", [
      "require",
      "exports",
      "swx-constants",
      "swx-log-tracer",
      "jskype-settings-instance",
      "jcafe-property-model",
      "lodash-compat"
    ], e);
}(function (e, t) {
  var n = e("swx-constants"), r = e("swx-log-tracer"), i = e("jskype-settings-instance"), s = e("jcafe-property-model"), o = e("lodash-compat"), u = function () {
      function e(e, t) {
        var o = this;
        this.$unit = {
          getCachedItems: this._getCachedItems.bind(this),
          getNewUnconsumedItems: this._getNewUnconsumedItems.bind(this),
          obtain: this._obtain.bind(this),
          onItemAddedOrUpdated: this._onItemAddedOrUpdated.bind(this)
        };
        this.cacheLogger = r.getLogger("Cache");
        this.cache = s.collection();
        this.consumed = {};
        this.log = function () {
          var e = [];
          for (var t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          i.isFeatureOn(n.COMMON.featureFlags.UNREAD_MSG_LOGGING) && o.cacheLogger.log.apply(o.cacheLogger, e);
        };
        this.onNewItemsLoaded = function () {
          o.log("onNewItemsLoaded");
          o.serviceLoadTask = null;
        };
        this.forAllItems = function (e) {
          o.cache().forEach(e);
        };
        this.clean = function (e) {
          e === void 0 && (e = null);
          o.log("clean:", e);
          e ? e.forEach(function (e) {
            o.cache.remove(e.id + "");
          }) : o.cache.empty();
        };
        this.size = function () {
          return o.cache.size();
        };
        this.getItems = function (e, t) {
          function s() {
            var e = [];
            for (var i = 0; i < n.length; i++)
              r[i] && e.push(n[i]);
            t(e);
          }
          var n = o.cache();
          if (!t)
            return n.filter(e);
          var r = new Array(n.length), i = n.length;
          return n.forEach(function (t, n) {
            var o = !1;
            e(t, function (e) {
              o || (o = !0, r[n] = e, i--, i === 0 && s());
            });
          }), undefined;
        };
        this.getItem = function (e) {
          return o.cache(e + "");
        };
        this.getAllItems = function () {
          return o.cache();
        };
        this.replaceItem = function (e, t) {
          o.log("replaceItem:", e, t);
          t += "";
          o.cache.remove(t);
          o.cacheItem(e, t);
        };
        this.cacheItem = function (e, t) {
          if (typeof e.id == "undefined")
            throw new Error("Cached item has to have \"id\" property");
          o.log("Caching item:", e, t);
          o.cache.add(e, t + "");
          o._cacheItem(e, t);
        };
        this.hasMoreItems = function () {
          return o.getRemainingUnconsumedSize() > 0 || !!o._serverHasMoreItems();
        };
        this.onItemAdded = function (e) {
          o.consumed[e.id] = !0;
          o._onItemAddedOrUpdated(e);
        };
        this.onItemUpdated = function (e) {
          o._onItemAddedOrUpdated(e);
        };
        this.onItemRemoved = function (e) {
          o.log("onItemRemoved:", e);
          o.cache.remove(e + "");
          o._onItemRemoved(e);
        };
        this.get = function (e) {
          var t = s.task(), n = o._getCachedItems(e);
          return n.length === 0 ? (o.log("No items in cache, getting them from service:", e), o.serviceLoadTask = o.serviceLoadTask || o._getItemsFromService(e), o.serviceLoadTask) : (o.log("Returning items from cache:", n), t.resolve(n), o._serverHasMoreItems() && o.getRemainingUnconsumedSize() < o.preCacheLimit && (o.log("Not enough items in cache, get more:", o.getRemainingUnconsumedSize(), o._serverHasMoreItems()), o.serviceLoadTask = o.serviceLoadTask || o._getItemsFromService(e - n.length)), t.promise);
        };
        this.reset = function (e) {
          e === void 0 && (e = !1);
          o.log("resetting:", e);
          e && o._emptyCache();
          o.consumed = {};
        };
        this.preCacheLimit = e;
        this.sortingFunction = t;
      }
      return e.prototype._obtain = function () {
        return this.serviceLoadTask = this.serviceLoadTask || this._getItemsFromService(0), this.serviceLoadTask;
      }, e.prototype._getCachedItems = function (e) {
        var t = this.cache().filter(this.outConsumed.bind(this)).sort(this.sortingFunction), n = Math.max(0, t.length - e), r = t.slice(n);
        return this.consumeItems(r), r;
      }, e.prototype._getNewUnconsumedItems = function () {
        var e = this;
        if (o.isEmpty(this.consumed))
          return [];
        var t = this.cache().sort(this.sortingFunction), n = [], r = !1;
        return t.forEach(function (t) {
          !r && e.consumed[t.id] && (r = !0);
          r && !e.consumed[t.id] && n.push(t);
        }), this.consumeItems(n), n;
      }, e.prototype.outConsumed = function (e) {
        return !this.consumed[e.id];
      }, e.prototype.getRemainingUnconsumedSize = function () {
        return this.cache().filter(this.outConsumed.bind(this)).length;
      }, e.prototype.consumeItems = function (e) {
        var t = this;
        e.forEach(function (e) {
          t.consumed[e.id] = !0;
        });
      }, e;
    }();
  t.CacheBase = u;
}));
