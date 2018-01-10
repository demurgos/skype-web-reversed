define("services/store/pes/catalogItemProcessor", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "services/pes/constants",
  "services/pes/tabs/stylesFactory",
  "services/pes/mojis/stylesFactory",
  "services/pes/emoticons/stylesFactory",
  "utils/chat/pesUtils",
  "services/pes/configProcessor",
  "experience/settings"
], function (e, t) {
  function l(e, t) {
    var n, r, i = t.packs;
    for (n = 0; n < i.length; n++) {
      r = i[n];
      if (r.id === e)
        return r.itemIds = r.items, r.isHidden = !1, r.items = [], c(r, t), r;
    }
  }
  function c(e, t) {
    var n, i, s = t.items;
    for (n = 0; n < s.length; n++)
      i = s[n], e.itemIds.indexOf(i.id) > -1 && (i.thumbnail = i.type === r.itemTypes.moji.id ? t.itemsRoot + "/" + i.id + "/views/thumbnail" : t.emoticonsRoot + "/" + i.id + "/views/default_40", e.items.push(i));
  }
  function h(e, t, n) {
    if (!e)
      return;
    var r, s, o = i.create(e.tabs[0]), u, a = e.tabs[0].packs, f;
    for (f = 0; f < a.length; f++)
      u = a[f].items, o = p(o, u, t, n, e), r = document.createElement("style"), s = document.createTextNode(o), r.appendChild(s), document.head.appendChild(r);
  }
  function p(e, t, i, u, a) {
    return n.forEach(t, function (t) {
      t.type === r.itemTypes.moji.id ? (t.thumbnailUrl = u ? t.thumbnail + "?" + i : t.thumbnail, e += s.create(t), t.thumbnailClass = "id_" + t.id + " thumbnail", t.keyframeClass = "id_" + t.id + " keyframe", t.contentUrl = a.itemsRoot + "/" + t.id + "/views/" + r.profiles.moji.content, u && (t.contentUrl += "?" + i)) : e += o.create(t);
    }), e;
  }
  var n = e("lodash-compat"), r = e("services/pes/constants"), i = e("services/pes/tabs/stylesFactory"), s = e("services/pes/mojis/stylesFactory"), o = e("services/pes/emoticons/stylesFactory"), u = e("utils/chat/pesUtils"), a = e("services/pes/configProcessor"), f = e("experience/settings");
  t.processTabConfig = function (e) {
    var t = e.tabs, n, i, s, o;
    e.itemsRoot = u.rewriteUrls(e.itemsRoot, f.pesCDNAuthentication.rewriteRules);
    for (n = 0; n < t.length; n++) {
      s = t[n];
      s.packs = [];
      s.type || (s.type = r.itemTypes.tab.id);
      s.thumbnailUrl || (s.thumbnailUrl = e.tabsRoot + "/" + s.id + "/views/thumbnail");
      for (i = 0; s.sections && i < s.sections.length; i++)
        o = l(s.sections[i].pack, e), o.parentTab = s, s.packs.push(o);
    }
    a.process(e);
  };
  t.processSKUs = function (e) {
    e.forEach(function (e) {
      var t = e.attributes;
      t && (e.bgColor = "#" + t.glyphBgColor.substring(0, 6), e.opacity = parseInt(t.glyphBgColor.substring(6, 8), 16) / 255, e.items = t.items.__metadata.links.self, e.copyright = t.copyright, e.expiry = t.expiry);
    });
  };
  t.loadStyles = function (e, t, n) {
    h(e, t, n);
  };
});
