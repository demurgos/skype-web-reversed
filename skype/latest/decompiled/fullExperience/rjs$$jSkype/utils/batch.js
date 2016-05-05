define("jSkype/utils/batch", [
  "require",
  "jSkype/constants/people"
], function (e) {
  function n(e) {
    function o() {
      e(n), n = [];
    }
    var n = [], r = t.MAX_ITEMS, i = t.MAX_DELAY, s = null;
    this.add = function (e) {
      clearTimeout(s), n.push(e), n.length >= r ? o() : s = window.setTimeout(o, i);
    }, this.clear = function () {
      clearTimeout(s), n = [];
    };
  }
  var t = e("jSkype/constants/people").batch;
  return {
    create: function (e) {
      return e ? new n(e) : null;
    }
  };
})
