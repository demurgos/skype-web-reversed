define("experience/entryPoints/fullExperience", [
  "require",
  "experience/experience",
  "browser/window"
], function (e) {
  function r(e) {
    n.Skype && n.Skype.onExperienceLoaded && n.Skype.onExperienceLoaded(e);
  }
  var t = e("experience/experience"), n = e("browser/window");
  r({
    init: function (e, n, r) {
      t.init(e, n, r);
    }
  });
});
