define("ui/viewModels/userSettings/aboutViewModel", [
  "require",
  "experience/settings"
], function (e) {
  function n() {
    function n() {
      var e = t.assetsBaseUrl.match(/\d+.\d+.\d+/);
      if (e)
        return e[0];
    }
    var e = this;
    e.appVersion = t.version, e.assetsVersion = n(), e.faqLink = t.faqPageUrl;
  }
  var t = e("experience/settings");
  return n;
})
