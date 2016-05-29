define("services/pes/tabs/fetcher", [
  "require",
  "services/pes/tabs/stylesFactory",
  "services/pes/constants",
  "vendor/knockout"
], function (e) {
  function i() {
    function i(e, t) {
      var i = "tabs tab id_" + e.id, s = "tabs tab active id_" + e.id, o = "tabs tab hover id_" + e.id;
      e.index = t;
      e.ariaLabel = e.title;
      e.active = r.observable(!1);
      e.hover = r.observable(!1);
      e.htmlClass = r.observable(i);
      e.showHiddenItems = e.id === n.mru.TAB_ID;
      e.onMouseOver = function () {
        e.hover(!0);
      };
      e.onMouseOut = function () {
        e.hover(!1);
      };
      e.htmlClass = r.computed(function () {
        return e.active() ? s : e.hover() ? o : i;
      });
    }
    var e = this;
    e.process = function (e, t) {
      return e.type !== n.itemTypes.tab.id ? null : (i(e, t), e);
    };
    e.getResources = function (e) {
      return e.type !== n.itemTypes.tab.id ? null : {
        styleDef: t.create(e),
        prefetchUrls: [e.thumbnailUrl],
        encoderMaps: []
      };
    };
  }
  var t = e("services/pes/tabs/stylesFactory"), n = e("services/pes/constants"), r = e("vendor/knockout");
  return new i();
});
