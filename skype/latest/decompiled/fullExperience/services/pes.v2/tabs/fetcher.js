define("services/pes.v2/tabs/fetcher", [
  "require",
  "services/pes.v2/tabs/stylesFactory",
  "services/pes/constants"
], function (e) {
  function r() {
    var e = this;
    e.process = function () {
      return null;
    }, e.getResources = function (e) {
      return e.type !== n.itemTypes.tab.id ? null : {
        styleDef: t.create(e),
        prefetchUrls: [e.thumbnailUrl],
        encoderMaps: []
      };
    };
  }
  var t = e("services/pes.v2/tabs/stylesFactory"), n = e("services/pes/constants");
  return new r();
})
