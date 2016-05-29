define("jSkype/services/mediaAgent/mediaLegId", [], function () {
  function e() {
    function t() {
      function e() {
        return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1).toUpperCase();
      }
      function t() {
        return e() + e() + e() + "4" + e().substring(1) + "B" + e().substring(1) + e() + e() + e();
      }
      return t();
    }
    var e;
    this.process = function (n) {
      return e || (e = n || t()), e;
    };
  }
  return {
    build: function () {
      return new e();
    }
  };
});
