define("services/store/pes/catalogItemProcessor", [
  "require",
  "exports",
  "module",
  "services/pes/constants",
  "services/pes/tabs/stylesFactory",
  "services/pes/mojis/stylesFactory",
  "services/pes/emoticons/stylesFactory",
  "utils/chat/pesUtils",
  "services/pes/configProcessor",
  "experience/settings"
], function (e, t) {
  function f(e, t) {
    var n, r, i = t.packs;
    for (n = 0; n < i.length; n++) {
      r = i[n];
      if (r.id === e)
        return r.itemIds = r.items, r.isHidden = !1, r.items = [], l(r, t), r;
    }
  }
  function l(e, t) {
    var r, i, s = t.items;
    for (r = 0; r < s.length; r++)
      i = s[r], e.itemIds.indexOf(i.id) > -1 && (i.thumbnail = i.type === n.itemTypes.moji.id ? t.itemsRoot + "/" + i.id + "/views/thumbnail" : t.emoticonsRoot + "/" + i.id + "/views/default_40", e.items.push(i));
  }
  function c(e, t, n) {
    if (!e)
      return;
    var i, s, o = r.create(e.tabs[0]), u, a = e.tabs[0].packs, f;
    for (f = 0; f < a.length; f++)
      u = a[f].items, o = h(o, u, t, n), i = document.createElement("style"), s = document.createTextNode(o), i.appendChild(s), document.head.appendChild(i);
  }
  function h(e, t, r, o) {
    var u, a;
    for (u = 0; u < t.length; u++)
      a = t[u], a.type === n.itemTypes.moji.id ? (a.thumbnailUrl = o ? a.thumbnail + "?" + r : a.thumbnail, e += i.create(a)) : e += s.create(a);
    return e;
  }
  var n = e("services/pes/constants"), r = e("services/pes/tabs/stylesFactory"), i = e("services/pes/mojis/stylesFactory"), s = e("services/pes/emoticons/stylesFactory"), o = e("utils/chat/pesUtils"), u = e("services/pes/configProcessor"), a = e("experience/settings");
  t.processTabConfig = function (e) {
    var t = e.tabs, r, i, s, l;
    e.itemsRoot = o.rewriteUrls(e.itemsRoot, a.pesCDNAuthentication.rewriteRules);
    for (r = 0; r < t.length; r++) {
      s = t[r], s.packs = [], s.type || (s.type = n.itemTypes.tab.id), s.thumbnailUrl || (s.thumbnailUrl = e.tabsRoot + "/" + s.id + "/views/thumbnail");
      for (i = 0; s.sections && i < s.sections.length; i++)
        l = f(s.sections[i].pack, e), l.parentTab = s, s.packs.push(l);
    }
    u.process(e);
  }, t.processSKUs = function (e) {
    e.forEach(function (e) {
      var t = e.attributes;
      t && (e.bgColor = "#" + t.glyphBgColor.substring(0, 6), e.opacity = parseInt(t.glyphBgColor.substring(6, 8), 16) / 255, e.items = t.items.__metadata.links.self, e.copyright = t.copyright, e.expiry = t.expiry);
    });
  }, t.loadStyles = function (e, t, n) {
    c(e, t, n);
  };
})
