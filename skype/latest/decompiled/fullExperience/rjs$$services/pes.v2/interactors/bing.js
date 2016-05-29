define("services/pes.v2/interactors/bing", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-i18n",
  "utils/common/interactor",
  "experience/settings",
  "services/pes/constants"
], function (e, t) {
  var n = e("lodash-compat"), r = e("swx-i18n").localization, i = e("utils/common/interactor"), s = e("experience/settings"), o = e("services/pes/constants");
  t.computeAspectRatios = i.defineSimpleInteractor(function (e) {
    var t = e.items || [];
    n.forEach(t, function (e) {
      e.aspectRatio = e.width / e.height;
    });
  });
  t.computeGridLayoutSizes = i.defineInteractor(function (e) {
    function t(e, t) {
      var n = [], r, i;
      for (r = 0; r < e; r += 1) {
        var s = [];
        for (i = 0; i < t; i += 1)
          s.push(0);
        n.push(s);
      }
      return n;
    }
    function r(e, r) {
      var i, s, o, u, a, f, l, c, h;
      a = e.length;
      if (r <= 0)
        return [];
      if (r > a)
        return e.map(function (e) {
          return [e];
        });
      l = t(a, r);
      f = t(a - 1, r - 1);
      for (s = 0; s < a; s += 1)
        l[s][0] = e[s] + (s ? l[s - 1][0] : 0);
      for (o = 0; o < r; o += 1)
        l[0][o] = e[0];
      for (s = 1; s < a; s += 1)
        for (o = 1; o < r; o += 1) {
          h = [];
          for (c = 0; c < s; c += 1)
            h.push([
              n.max([
                l[c][o - 1],
                l[s][0] - l[c][0]
              ]),
              c
            ]);
          u = n.min(h, function (e) {
            return e[0];
          });
          l[s][o] = u[0];
          f[s - 1][o - 1] = u[1];
        }
      a -= 1;
      r -= 2;
      i = [];
      while (r >= 0)
        i = [function () {
            var t, n, i, o;
            o = [];
            for (s = t = n = f[a - 1][r] + 1, i = a + 1; n <= i ? t < i : t > i; s = n <= i ? ++t : --t)
              o.push(e[s]);
            return o;
          }()].concat(i), a = f[a - 1][r], r -= 1;
      return [function () {
          var t, n, r;
          r = [];
          for (s = t = 0, n = a + 1; 0 <= n ? t < n : t > n; s = 0 <= n ? ++t : --t)
            r.push(e[s]);
          return r;
        }()].concat(i);
    }
    e(function (e, t, i, s, o) {
      t = t || 6;
      i = i || 100;
      s = s || 100;
      o = o || 0;
      var u = e.items || [], a = s / t, f = u.reduce(function (e, t) {
          return e + t.aspectRatio * a;
        }, 0), l = Math.round(f / i) || 1, c = u.map(function (e) {
          return e.aspectRatio * 100;
        }), h = r(c, l), p = 0;
      n.forEach(h, function (e) {
        var t = [], r = i - o * e.length;
        n.forEach(e, function () {
          t.push(u[p]);
          p += 1;
        });
        var s = t.reduce(function (e, t) {
          return e + t.aspectRatio;
        }, 0);
        n.forEach(t, function (e) {
          e.scaledWidth = parseInt(r / s * e.aspectRatio);
          e.scaledHeight = parseInt(r / s);
        });
      });
    });
  });
  t.collectItemsToPack = i.defineSimpleInteractor(function (e) {
    var t = e.items || [], n = {
        ariaLabel: r.fetch({ key: e.packAriaLabelKey }),
        title: r.fetch({ key: e.packTitleKey }),
        id: e.packID,
        isHidden: !1,
        items: []
      };
    n.items = n.items.concat(t);
    e.pack = n;
  });
  t.assignImageItemProperties = i.defineSimpleInteractor(function (e) {
    var t = e.items || [], r = e.sizingUnit || "em";
    n.forEach(t, function (e) {
      e.thumbnail = e.thumbnail.replace("http:", "https:");
      e.staticThumbnail = e.thumbnail;
      e.type = "image";
      e.thumbnailStyle = "width: " + e.scaledWidth + r + "; height: " + e.scaledHeight + r + ";";
      [
        "aspectRatio",
        "height",
        "scaledHeight",
        "scaledWidth",
        "width"
      ].forEach(function (t) {
        e.hasOwnProperty(t) && delete e[t];
      });
    });
  });
  t.createBingPacks = i.defineSimpleInteractor(function (e) {
    var r, s, u = i.defineComposer([
        t.computeAspectRatios,
        function (e) {
          t.computeGridLayoutSizes.run(e, 6, 99, 200);
        },
        t.assignImageItemProperties,
        t.collectItemsToPack
      ]), a, f;
    e.packs = [];
    e.items = [];
    e.featureGifsFirst ? (r = e.gifResults, s = e.memeResults) : (r = e.memeResults, s = e.gifResults);
    e.featureCombine ? (a = n.compact(n.flatten(n.flatten(n.zip(r, s)))), f = u.run(n.assign({
      items: a,
      packTitleKey: "expressionPicker_bingPack_title",
      packAriaLabelKey: "expressionPicker_bingPack_ariaLabel",
      packID: o.bingSearch.PACK_PREFIX + "items"
    }, n.pick(e, [
      "desiredRows",
      "idealWidth",
      "availableHeight",
      "lossToPadding"
    ]))), f.pack && (e.packs.push(f.pack), e.items = e.items.concat(f.items))) : (f = u.run(n.assign({
      items: r,
      packTitleKey: e.featureGifsFirst ? "expressionPicker_bingGifsPack_title" : "expressionPicker_bingMemePack_title",
      packAriaLabelKey: e.featureGifsFirst ? "expressionPicker_bingGifsPack_ariaLabel" : "expressionPicker_bingMemePack_ariaLabel",
      packID: o.bingSearch.PACK_PREFIX + (e.featureGifsFirst ? "gifs" : "memes")
    }, n.pick(e, [
      "desiredRows",
      "idealWidth",
      "availableHeight",
      "lossToPadding"
    ]))), f.pack && (e.packs.push(f.pack), e.items = e.items.concat(f.items)), f = u.run(n.assign({
      items: s,
      packTitleKey: e.featureGifsFirst ? "expressionPicker_bingMemePack_title" : "expressionPicker_bingGifsPack_title",
      packAriaLabelKey: e.featureGifsFirst ? "expressionPicker_bingMemePack_ariaLabel" : "expressionPicker_bingGifsPack_ariaLabel",
      packID: o.bingSearch.PACK_PREFIX + (e.featureGifsFirst ? "memes" : "gifs")
    }, n.pick(e, [
      "desiredRows",
      "idealWidth",
      "availableHeight",
      "lossToPadding"
    ]))), f.pack && (e.packs.push(f.pack), e.items = e.items.concat(f.items)));
  });
  t.putBingTab = i.defineSimpleInteractor(function (e) {
    var t = {
      id: o.bingSearch.TAB_ID,
      type: o.itemTypes.tab.id,
      title: r.fetch({ key: "expressionPicker_bingTab_title" }),
      ariaLabel: r.fetch({ key: "expressionPicker_bingTab_ariaLabel" }),
      emptyTabMessageKey: "expressionPicker_bingTab_emptyText",
      thumbnailUrl: s.appBaseUrl + "/assets/images/components/chat/pes/tab_bing.png",
      styleOverride: "large-tab",
      packs: []
    };
    n.remove(e.tabs, { id: o.bingSearch.TAB_ID });
    e.tabs.push(t);
  });
  t.setBingTabProperties = i.defineSimpleInteractor(function (e) {
    e.selectedTab && e.selectedTab.id === o.bingSearch.TAB_ID && (e.pickerMaximized = !0, e.searchCapabilityEnabled = !0);
  });
});
