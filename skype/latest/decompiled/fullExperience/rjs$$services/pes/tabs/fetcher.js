define("services/pes/tabs/fetcher", [
  "require",
  "services/pes/tabs/stylesFactory",
  "services/pes/constants"
], function (e) {
  function r() {
    var e = this;
    e.process = function () {
      return null;
    };
    e.getResources = function (e) {
      return e.type !== n.itemTypes.tab.id ? null : {
        styleDef: t.create(e),
        prefetchUrls: [e.thumbnailUrl],
        encoderMaps: []
      };
    };
  }
  var t = e("services/pes/tabs/stylesFactory"), n = e("services/pes/constants");
  return new r();
});
