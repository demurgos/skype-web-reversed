define("services/pes/configProcessor", [
  "require",
  "services/pes/emoticons/encoder",
  "lodash-compat",
  "services/pes/tabs/fetcher",
  "services/pes/emoticons/fetcher",
  "services/pes/mojis/fetcher",
  "services/pes/constants",
  "utils/common/prefetcher"
], function (e) {
  function a() {
    function a(e) {
      var t, n, r;
      return r = document.getElementById("pesStyles"), r || (n = document.head, r = document.createElement("style"), r.id = "pesStyles", r.type = "text/css"), r.styleSheet ? r.styleSheet.cssText = e : (t = document.createTextNode(e), r.firstChild && r.removeChild(r.firstChild), r.appendChild(t)), n && n.appendChild(r), e;
    }
    var e = this;
    e.process = function (n) {
      n.tabs.forEach(function (t, i) {
        r.process(t, i);
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
      case o.itemTypes.emoticon.id:
        return i[n](e, t);
      case o.itemTypes.moji.id:
        return s[n](e, t);
      case o.itemTypes.sticker.id:
        throw new Error("Stickers are not implemented, yet!");
      default:
        throw new Error(e.type + " is not supported, yet!");
      }
    };
    e.prefetch = function (i) {
      var s = [], o = [], u = [], a = n.cloneDeep(i, function (e) {
          return e && n.isFunction(e.then) ? {} : undefined;
        });
      return a.tabs.forEach(function (t) {
        var n = r.getResources(t);
        s.push(n.styleDef);
        o.splice(0, 0, n.prefetchUrls[0]);
        t.packs.forEach(function (t) {
          t.items.forEach(function (t) {
            var n = e._processItem(t, i, "getResources");
            s.push(n.styleDef);
            n.encoderMaps.forEach(function (e) {
              u.push(e);
            });
            n.prefetchUrls.forEach(function (e) {
              o.push(e);
            });
          });
        });
      }), {
        pesStyles: s,
        prefetchUrls: o,
        encodingMaps: u
      };
    };
    e.register = function (n) {
      var r = "";
      t.map = {};
      n.encodingMaps.forEach(function (e) {
        switch (e.type) {
        case o.itemTypes.emoticon.id:
          t.map[e.shortcut] = e.id;
          break;
        case o.itemTypes.tab.id:
        case o.itemTypes.moji.id:
        case o.itemTypes.sticker.id:
          throw new Error("mapping.type not implemented yet:" + e.type);
        default:
          throw new Error("mapping.type not supported yet:" + e.type);
        }
      });
      n.pesStyles.forEach(function (e) {
        r += e;
      });
      a(r);
    };
    e.prefetchImages = function (t) {
      u.prefetchImages(t.prefetchUrls || []);
    };
  }
  var t = e("services/pes/emoticons/encoder"), n = e("lodash-compat"), r = e("services/pes/tabs/fetcher"), i = e("services/pes/emoticons/fetcher"), s = e("services/pes/mojis/fetcher"), o = e("services/pes/constants"), u = e("utils/common/prefetcher");
  return new a();
});
