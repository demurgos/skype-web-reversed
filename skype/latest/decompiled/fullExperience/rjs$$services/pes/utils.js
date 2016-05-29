define("services/pes/utils", [], function () {
  function e() {
    this.getConfigItem = function (e, t) {
      function o(t) {
        for (i = 0; i < t.items.length; i++) {
          s = t.items[i];
          if (s.id === e)
            return s;
        }
      }
      function u(e) {
        for (r = 0; r < e.packs.length; r++) {
          s = o(e.packs[r]);
          if (s)
            return s;
        }
      }
      var n, r, i, s;
      for (n = 0; n < t.tabs.length; n++) {
        s = u(t.tabs[n]);
        if (s)
          return s;
      }
    };
  }
  return new e();
});
