define("jSkype/modelHelpers/contacts/dataHandlers/peopleSettings", [
  "require",
  "exports",
  "module"
], function (e, t) {
  function r() {
    function e(e) {
      return e.response && e.response.Settings && e.response.Settings.length > 0;
    }
    function t(t) {
      var i = !1;
      return e(t) ? (t.response.Settings.some(function (e) {
        if (e.Name.toLowerCase() === n) {
          i = r(e);
          return;
        }
      }), i) : i;
    }
    function r(e) {
      var t;
      try {
        t = JSON.parse(e.Value.toLowerCase());
      } catch (n) {
        t = !1;
      }
      return t;
    }
    this.onSuccess = function (e) {
      return new Promise(function (n) {
        n(t(e));
      });
    }, this.onError = function (e) {
      return new Promise(function (t, n) {
        n(e);
      });
    };
  }
  var n = "skype.autobuddy";
  t.build = function () {
    return new r();
  };
})
