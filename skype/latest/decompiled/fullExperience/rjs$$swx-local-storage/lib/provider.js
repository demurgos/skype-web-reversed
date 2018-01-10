(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-local-storage/lib/provider", [
      "require",
      "exports",
      "./constants",
      "swx-util-encryption",
      "./keyHasher",
      "./local-storage-driver",
      "swx-browser-globals",
      "lodash-compat",
      "swx-utils-common"
    ], e);
}(function (e, t) {
  function h(e) {
    return new c(e);
  }
  var n = e("./constants"), r = e("swx-util-encryption"), i = e("./keyHasher"), s = e("./local-storage-driver"), o = e("swx-browser-globals"), u = e("lodash-compat"), a = e("swx-utils-common"), f = "[CacheProvider]", l = n.CACHE, c = function () {
      function e(e) {
        var t = this;
        this.options = e;
        this.chainingPromise = a.settablePromise.build();
        this.debugSettings = {
          log: !1,
          showKeys: !1,
          plainData: !1
        };
        this.setSensitiveItemBuffer = {};
        this.internalCache = {};
        this.VERSION = l.VERSION;
        this.resolveChainingPromise = function () {
          t.chainingPromise.resolve();
        };
        this._onVersionReceived = function (e) {
          var n = t.printDebug.bind(t, "[_onVersionReceived]"), r = function () {
              return t.storageDriver.setItemInStorage(l.INTERNAL_KEYS.VERSION, t.VERSION);
            };
          return u.forEach(t.debugSettings, function (e, n) {
            if (n === "log")
              return;
            e && (t.VERSION += "|" + n);
          }), e !== t.VERSION ? (e ? n("Version changed from " + e + " to " + t.VERSION) : n("Version not found"), t.storageDriver.invalidateCache(!0).then(r)) : Promise.resolve();
        };
        this._initializeEncryption = function (e) {
          var n = t.printDebug.bind(t, "[_initializeEncryption]");
          if (t.isDeactivated())
            return n("Cache is deactivated -> initialization completed"), Promise.resolve();
          var i = function (t) {
              return t ? (n("Getting key from KES", t), e.decrypt(t).then(s, o)) : o();
            }, s = function (e) {
              return r.importEncryptionKey(e.response).then(function (e) {
                t.encryptionKey = e;
                n("Key decrypted -> initialization completed");
              }, c);
            }, o = function () {
              return n("Starting with fresh cache"), t.storageDriver.invalidateCache(!1).then(u);
            }, u = function () {
              return r.generateEncryptionKey().then(a, c);
            }, a = function (n) {
              return t.encryptionKey = n, r.exportEncryptionKey(n).then(function (t) {
                return e.encrypt(t).then(f);
              });
            }, f = function (e) {
              return n("New key generated -> initialization completed"), t.storageDriver.setItemInStorage(l.INTERNAL_KEYS.ENCRYPTION_KEY, e.response);
            }, c = function () {
              throw n("Encryption key manipulation failed"), new Error("Encryption key manipulation failed");
            };
          return t.storageDriver.getItemFromStorage(l.INTERNAL_KEYS.ENCRYPTION_KEY).then(i);
        };
        this._prepareKeysMap = function () {
          return t.getSensitiveItem(l.INTERNAL_KEYS.KEYS_MAP).then(function (e) {
            t.keyHasher.fillMap(e);
          });
        };
        this.setItem = function (e, n) {
          var r = t.printDebug.bind(t, "[SetItem: " + e + "]");
          return t.chainingPromise.then(function () {
            t.internalCache[e] = n;
            if (t.isDeactivated())
              return r("Cache deactivated, resolving"), Promise.resolve();
            var i = t.keyHasher.getHashByKey(e);
            return t.storageDriver.setItemInStorage(i, JSON.stringify(n)).then(function () {
              return r("stored");
            }, function (e) {
              return r("storage failed", e);
            });
          });
        };
        this._deactivateCache = function (e) {
          t.printDebug("[_deactivateCache]", e);
          t.isCacheDeactivated = !0;
        };
        this._encrypt = function (e) {
          return t.debugSettings.plainData ? Promise.resolve(JSON.stringify(e)) : r.encrypt(t.encryptionKey, e).then(function (e) {
            return JSON.stringify(e);
          });
        };
        this._decrypt = function (e) {
          return t.debugSettings.plainData ? Promise.resolve(JSON.parse(e)) : r.decrypt(t.encryptionKey, JSON.parse(e));
        };
        this._getAllSwxKeys = function (e, n) {
          return t.storageDriver.getAllKeys().then(function (r) {
            var i = u(r).map(function (e) {
              return t.keyHasher.getKeyByHash(e);
            });
            return n || (i = i.without(l.INTERNAL_KEYS.VERSION)), e && (i = i.filter(function (t) {
              return e.test(t);
            })), i.value();
          });
        };
        this.isCacheDeactivated = e.serviceLocator.featureFlagApi.isFeatureOn(n.featureFlags.DEACTIVATE_CACHE);
        u.merge(this.debugSettings, e.debugSettings);
      }
      return e.prototype.init = function (e) {
        var t = this;
        return this.initializePromise ? this.initializePromise : this.isCacheDeactivated ? (this.initializePromise = this.chainingPromise, this.resolveChainingPromise(), this.initializePromise) : (this.storageDriver = new s.LocalStorageDriver(), this.keyHasher = i.build(function (e, n) {
          return t.setSensitiveItem(e, n);
        }, this.debugSettings.showKeys), this.initializePromise = this.storageDriver.getItemFromStorage(l.INTERNAL_KEYS.VERSION).then(this._onVersionReceived).then(function () {
          return t._initializeEncryption(e);
        }).then(this._prepareKeysMap)["catch"](this._deactivateCache).then(this.resolveChainingPromise, this.resolveChainingPromise), this.initializePromise);
      }, e.prototype.isDeactivated = function () {
        return this.isCacheDeactivated;
      }, e.prototype.destroy = function (e) {
        e === void 0 && (e = !1);
        var t = Promise.resolve();
        return !this.isDeactivated() && e && this.initializePromise && (t = this.storageDriver.invalidateCache(!1)), this.initializePromise = null, this.setSensitiveItemBuffer = {}, this.internalCache = {}, t;
      }, e.prototype.getAllKeys = function (e) {
        var t = this;
        return this.isDeactivated() ? Promise.resolve([]) : this.chainingPromise.then(function () {
          return t._getAllSwxKeys(e);
        });
      }, e.prototype.setSensitiveItem = function (e, t, r) {
        var i = this, s = this.setSensitiveItemBuffer[e] || {}, u = this.printDebug.bind(this, "[SetSensitiveItem: " + e + "]");
        isNaN(r) && (r = n.CACHE.DEFAULT_BUFFER_TIMEOUT);
        var a = function () {
            var t = function (t) {
              var n = i.keyHasher.getHashByKey(e);
              i.storageDriver.setItemInStorage(n, t).then(function () {
                u("encrypted");
                s.resolvePromise();
                delete i.setSensitiveItemBuffer[e];
              }, s.rejectPromise);
            };
            u("encrypting", i.internalCache[e]);
            i._encrypt(i.internalCache[e]).then(t, function (e) {
              u("Encryption failed");
              s.rejectPromise(e);
            });
          }, f = function () {
            u("Starting new writing operation with delay of " + r + "ms");
            s.promise = new Promise(function (e, t) {
              s.resolvePromise = e;
              s.rejectPromise = t;
              r ? s.timeout = o.getWindow().setTimeout(function () {
                return i.chainingPromise.then(a);
              }, r) : (s.timeout = 0, i.chainingPromise.then(a));
            });
            i.setSensitiveItemBuffer[e] = s;
          }, l = function () {
            u("Resetting writing operation timeout");
            o.getWindow().clearTimeout(s.timeout);
            s.timeout = o.getWindow().setTimeout(function () {
              return i.chainingPromise.then(a);
            }, r);
          };
        return this.internalCache[e] = t, this.isDeactivated() ? this.chainingPromise.then(function () {
          u("Cache deactivated, resolving");
        }) : (s.promise ? l() : f(), s.promise);
      }, e.prototype.getSensitiveItem = function (e) {
        var t = this, n = this.printDebug.bind(this, "[GetSensitiveItem: " + e + "]"), r = e === l.INTERNAL_KEYS.KEYS_MAP ? Promise.resolve() : this.chainingPromise;
        return r.then(function () {
          n("Getting");
          if (t.isDeactivated())
            return n("Cache deactivated, returning internal value", t.internalCache[e]), t.internalCache[e] || null;
          if (typeof t.internalCache[e] != "undefined")
            return n("Retrieved value already before, returning it", t.internalCache[e]), t.internalCache[e];
          var r = t.keyHasher.getHashByKey(e);
          return t.storageDriver.getItemFromStorage(r).then(function (r) {
            return r ? t._decrypt(r).then(function (r) {
              return t.internalCache[e] = r, n("Decrypted", r), r;
            }, function (e) {
              throw n("Decryption failed", e), e;
            }) : (n("No data found in storage"), null);
          });
        });
      }, e.prototype.getSensitiveItems = function (e) {
        var t = this;
        return this.getAllKeys(e).then(function (e) {
          return Promise.all(e.map(function (e) {
            return t.getSensitiveItem(e);
          }));
        });
      }, e.prototype.getItem = function (e) {
        var t = this, n = this.printDebug.bind(this, "[GetItem: " + e + "]");
        return this.chainingPromise.then(function () {
          n("Getting");
          if (t.isDeactivated())
            return n("Cache deactivated, returning internal value", t.internalCache[e]), t.internalCache[e] || null;
          if (typeof t.internalCache[e] != "undefined")
            return n("Retrieved value already before, returning it", t.internalCache[e]), t.internalCache[e];
          var r = t.keyHasher.getHashByKey(e);
          return t.storageDriver.getItemFromStorage(r).then(function (r) {
            return r ? (n("Found", r), t.internalCache[e] = JSON.parse(r), t.internalCache[e]) : (n("No data found in storage"), null);
          });
        });
      }, e.prototype.removeItem = function (e) {
        var t = this, n = this.printDebug.bind(this, "[RemoveItem: " + e + "]");
        return this.chainingPromise.then(function () {
          return delete t.internalCache[e], t.isDeactivated() ? (n("Removed"), Promise.resolve()) : t.storageDriver.removeItemFromStorage(t.keyHasher.getHashByKey(e)).then(function () {
            t.keyHasher.removeKeyFromMap(e);
            typeof t.setSensitiveItemBuffer[e] != "undefined" && (n("Item is removed prior encryption timeout finished. Cancelling encryption."), o.getWindow().clearTimeout(t.setSensitiveItemBuffer[e].timeout), t.setSensitiveItemBuffer[e].rejectPromise(), delete t.setSensitiveItemBuffer[e]);
            n("Removed");
          });
        });
      }, e.prototype.printDebug = function (e, t, n) {
        if (!this.debugSettings.log)
          return;
        n;
      }, e;
    }();
  t.build = h;
}));
