define("utils/common/disposableMixin", [
  "require",
  "swx-pubsub-instance",
  "browser/window",
  "swx-constants",
  "vendor/knockout"
], function (e) {
  function s(e) {
    if (e._dmDisposeExtended)
      return;
    var t = e.dispose;
    e.dispose = function () {
      e._dmDisposeAll();
      t && t.call(e);
    };
    e._dmDisposeExtended = !0;
  }
  var t = e("swx-pubsub-instance").default, n = e("browser/window"), r = e("swx-constants").COMMON.disposableGroups, i = e("vendor/knockout");
  return {
    registerPubSubEvent: function (e, n) {
      t.subscribe(e, n);
      this._dmRegisterDisposableItem(r.PUB_SUB, {
        eventName: e,
        callback: n
      });
    },
    unregisterPubSubEvent: function (e, n) {
      t.unsubscribe(e, n);
      this._dmUnRegisterDisposableItem(r.PUB_SUB, function (t) {
        return t.eventName === e && t.callback === n;
      });
    },
    registerComputed: function (e) {
      var t = i.computed(e);
      return this.registerDisposable(t), t;
    },
    observable: function () {
      return i.observable.apply(i, arguments);
    },
    observableArray: function () {
      return i.observableArray.apply(i, arguments);
    },
    registerDisposable: function (e) {
      if (!e.dispose)
        throw new TypeError("Item does not implement Disposable");
      this._dmRegisterDisposableItem(r.GENERIC_DISPOSABLE, e);
    },
    unregisterDisposable: function (e) {
      e.dispose();
      this._dmUnRegisterDisposableItem(r.GENERIC_DISPOSABLE, function (t) {
        return t === e;
      });
    },
    registerInterval: function (e, t) {
      var i = n.setInterval(e, t);
      return this._dmRegisterDisposableItem(r.INTERVAL, i), i;
    },
    unregisterInterval: function (e) {
      n.clearInterval(e);
      this._dmUnRegisterDisposableItem(r.INTERVAL, function (t) {
        return t === e;
      });
    },
    registerDOMEvent: function (e, t, n, i) {
      e.addEventListener(t, n, i);
      this._dmRegisterDisposableItem(r.DOM_EVENT, {
        object: e,
        event: t,
        handler: n,
        useCapture: i
      });
    },
    unregisterDOMEvent: function (e, t, n, i) {
      e.removeEventListener(t, n, i);
      this._dmUnRegisterDisposableItem(r.DOM_EVENT, function (r) {
        return r.object === e && r.event === t && r.handler === n && r.useCapture === i;
      });
    },
    registerTimeout: function (e, t) {
      var i = n.setTimeout(e, t);
      return this._dmRegisterDisposableItem(r.TIMEOUT, i), i;
    },
    unregisterTimeout: function (e) {
      n.clearTimeout(e);
      this._dmUnRegisterDisposableItem(r.TIMEOUT, function (t) {
        return t === e;
      });
    },
    _dmDisposeAll: function () {
      function i(e, i) {
        switch (e) {
        case r.PUB_SUB:
          i.forEach(function (e) {
            t.unsubscribe(e.eventName, e.callback);
          });
          break;
        case r.GENERIC_DISPOSABLE:
          i.forEach(function (e) {
            e.dispose();
          });
          break;
        case r.INTERVAL:
          i.forEach(n.clearInterval);
          break;
        case r.TIMEOUT:
          i.forEach(n.clearTimeout);
          break;
        case r.DOM_EVENT:
          i.forEach(function (e) {
            e.object.removeEventListener(e.event, e.handler, e.useCapture);
          });
        }
      }
      if (!this._disposableItems)
        return;
      for (var e in this._disposableItems)
        this._disposableItems.hasOwnProperty(e) && i(e, this._disposableItems[e] || []);
      this._disposableItems = null;
    },
    _dmRegisterDisposableItem: function (e, t) {
      s(this);
      this._disposableItems = this._disposableItems || {};
      this._disposableItems[e] = this._disposableItems[e] || [];
      this._disposableItems[e].push(t);
    },
    _dmUnRegisterDisposableItem: function (e, t) {
      this._disposableItems = this._disposableItems || {};
      var n = this._disposableItems[e] || [];
      for (var r = 0; r < n.length; r++)
        if (t(n[r])) {
          n.splice(r, 1);
          break;
        }
    }
  };
});
