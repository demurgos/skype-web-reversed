define("ui/components/userSettings/audioVideoSettingsPane", [
  "require",
  "exports",
  "module",
  "ui/viewModels/userSettings/audioVideoSettingsPaneViewModel",
  "vendor/knockout",
  "constants/components",
  "text!views/userSettings/audioVideoSettingsPane.html"
], function (e, t) {
  function i(e, t) {
    var i = n.build(e.conversation, t.element);
    return i.setContext(r.dataFor(t.element)), i.init(), i;
  }
  var n = e("ui/viewModels/userSettings/audioVideoSettingsPaneViewModel"), r = e("vendor/knockout");
  t.name = e("constants/components").userSettings.AUDIO_VIDEO_SETTINGS_PANE;
  t.template = e("text!views/userSettings/audioVideoSettingsPane.html");
  t.viewModel = { createViewModel: i };
});
