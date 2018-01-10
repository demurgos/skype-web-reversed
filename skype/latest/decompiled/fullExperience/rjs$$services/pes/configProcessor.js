define("services/pes/configProcessor", [
  "require",
  "lodash-compat",
  "swx-constants",
  "swx-emoticon-map-instance",
  "services/pes/emoticons/fetcher",
  "services/pes/emoticons/renderLoop",
  "services/pes/mojis/fetcher",
  "services/pes/constants",
  "utils/common/prefetcher",
  "swx-service-locator-instance",
  "services/pes/tabs/fetcher"
], function (e) {
  function c() {
    function c(e) {
      var t, n, r;
      return r = document.getElementById("pesStyles"), r || (n = document.head, r = document.createElement("style"), r.id = "pesStyles", r.type = "text/css"), r.styleSheet ? r.styleSheet.cssText = e : (t = document.createTextNode(e), r.firstChild && r.removeChild(r.firstChild), r.appendChild(t)), n && n.appendChild(r), e;
    }
    var e = this;
    e.process = function (n) {
      n.tabs.forEach(function (t, r) {
        l.process(t, r);
        t.packs.forEach(function (t) {
          t.items.forEach(function (t) {
            e._processItem(t, n, "process");
          });
        });
      });
    };
    e._processItem = function (e, t, n) {
      n = n || "process";
      if (!e)
        throw new Error("Ad hoc fetching is not implemented, yet!");
      switch (e.type) {
      case u.itemTypes.emoticon.id:
        return i[n](e, t);
      case u.itemTypes.moji.id:
        return o[n](e, t);
      case u.itemTypes.sticker.id:
        throw new Error("Stickers are not implemented, yet!");
      default:
        throw new Error(e.type + " is not supported, yet!");
      }
    };
    e.prefetch = function (i) {
      var o = [], u = [], a = [], c = t.cloneDeep(i, function (e) {
          return e && t.isFunction(e.then) ? {} : undefined;
        }), h = f.resolve(n.serviceLocator.FEATURE_FLAGS);
      return c.tabs.forEach(function (t) {
        var n = l.getResources(t);
        o.push(n.styleDef);
        u.splice(0, 0, n.prefetchUrls[0]);
        t.packs.forEach(function (t) {
          t.items.forEach(function (t) {
            var n = e._processItem(t, i, "getResources");
            o.push(n.styleDef);
            n.encoderMaps.forEach(function (e) {
              a.push(e);
            });
            n.prefetchUrls.forEach(function (e) {
              u.push(e);
            });
          });
        });
      }), h.isFeatureOn(n.featureFlags.CANVAS_EMOTICONS_ENABLED) && (s.isRunning() || s.start(), s.updateCache()), {
        pesStyles: o,
        prefetchUrls: u,
        encodingMaps: a
      };
    };
    e.register = function (t) {
      var n = "";
      r.map = {};
      t.encodingMaps.forEach(function (e) {
        switch (e.type) {
        case u.itemTypes.emoticon.id:
          r.map[e.shortcut] = e.id;
          break;
        case u.itemTypes.tab.id:
        case u.itemTypes.moji.id:
        case u.itemTypes.sticker.id:
          throw new Error("mapping.type not implemented yet:" + e.type);
        default:
          throw new Error("mapping.type not supported yet:" + e.type);
        }
      });
      t.pesStyles.forEach(function (e) {
        n += e;
      });
      c(n);
    };
    e.prefetchImages = function (t) {
      a.prefetchImages(t.prefetchUrls || []);
    };
  }
  var t = e("lodash-compat"), n = e("swx-constants").COMMON, r = e("swx-emoticon-map-instance"), i = e("services/pes/emoticons/fetcher"), s = e("services/pes/emoticons/renderLoop"), o = e("services/pes/mojis/fetcher"), u = e("services/pes/constants"), a = e("utils/common/prefetcher"), f = e("swx-service-locator-instance").default, l = e("services/pes/tabs/fetcher");
  return new c();
});
