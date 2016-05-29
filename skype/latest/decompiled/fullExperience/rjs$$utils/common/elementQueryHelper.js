define("utils/common/elementQueryHelper", [
  "require",
  "exports",
  "module",
  "browser/window"
], function (e, t) {
  var n = e("browser/window"), r = {
      ".swx .av": {
        "max-width": [
          "680px",
          "600px",
          "420px",
          "305px"
        ],
        "max-height": [
          "600px",
          "480px",
          "420px"
        ]
      }
    };
  t.initialiseSelectors = function () {
    n.elementQuery && n.elementQuery(r);
  };
  t.refresh = function () {
    n.elementQuery && n.elementQuery();
  };
});
