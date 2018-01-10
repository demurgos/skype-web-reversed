(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/peopleSettings", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function i() {
    return new r();
  }
  var n = "skype.autobuddy", r = function () {
      function e() {
        var e = this;
        this.onSuccess = function (t) {
          return new Promise(function (n) {
            n(e.getSettingValue(t));
          });
        };
        this.onError = function (e) {
          return new Promise(function (t, n) {
            n(e);
          });
        };
      }
      return e.prototype.hasData = function (e) {
        return e.response && e.response.Settings && e.response.Settings.length > 0;
      }, e.prototype.getSettingValue = function (e) {
        var t = this, r = !1;
        return this.hasData(e) ? (e.response.Settings.some(function (e) {
          if (e.Name.toLowerCase() === n) {
            r = t.extractValue(e);
            return;
          }
        }), r) : r;
      }, e.prototype.extractValue = function (e) {
        var t;
        try {
          t = JSON.parse(e.Value.toLowerCase());
        } catch (n) {
          t = !1;
        }
        return t;
      }, e;
    }();
  t.build = i;
}));
